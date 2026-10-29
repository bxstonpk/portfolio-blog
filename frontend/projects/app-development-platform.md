## Overview

This is the company's standard for building internal apps, covering the whole path from the moment an employee decides to build an app to the app running in production and being looked after. It isn't just a deployment tool.

Employees build apps with Claude Code. Claude follows the company's skill and talks to the platform through a single MCP server. Every rule is enforced on the server side, not just requested of Claude: register first, use the standard stack, avoid forbidden libraries, pass the tests, and get a signature before production.

**The problem it solves:** employees were already using Claude Code to build apps with whatever technology they liked, then handing each one to IT to deploy by hand. There was no standard, security depended on whoever did the work, there was no record of which apps existed or who owned them, and IT's workload grew with every new app.

It's internal only. It runs on a single on-prem Linux host with Docker, reachable from the company LAN. I built it between August and October 2026, starting with the BRD, requirements, architecture, and a decision log before writing the system.

![The path from setting up a machine to an app running in production and being operated](images/projects/app-development-platform/flow-en.webp)

## 1. Setting up an employee's machine

- A one-line installer sets up the MCP server, the skill, and the company templates for Claude Code.
- Employees register with an enrollment code from IT. Each machine then requests its own API key, which the account owner must approve in the Portal before it can be used.
- When the platform releases a new version, outdated machines are refused until they update. Claude runs the update command itself, so every machine follows the same rules.

## 2. Starting an app: register before any code

Before writing the first line, Claude reads the standard from the platform (`get_standards`) and asks the employee:

- What does the app do, who uses it, and roughly how many people?
- Does it handle personal data, and if so, what?
- Which language should the API use: Python, Node.js, TypeScript, or Go?

It then registers the app with this profile (`start_project`). Starting an app needs no approval, but an app without a profile can't be built. Claude is required to ask, never to guess an app's purpose or whether it handles personal data.

## 3. Scaffolding from the company templates

`scaffold_project` creates the project from the standard templates: a React frontend, an API in the chosen language, `deployment.yaml`, a `REVIEW.md` to fill in, and a `STANDARD.md` describing the company conventions (for example, the API listens on `$PORT` and reads database settings from the environment).

The new app is deployed to its **dev copy** right away, and the employee gets a link to open while Claude keeps building. The dev copy has its own MySQL database and address.

## 4. During development: checked against the standard as you go

- **Always viewed on the server:** after every change, Claude deploys to the dev copy and gives the same link again, with the employee's data kept. Employees don't install Node, Go, or Python, and never run the app locally.
- **Checked while writing:** `check_project` runs the same dependency check the build uses, and also checks the profile, `REVIEW.md`, and pending exceptions.
- **Tests on the platform:** `run_tests` runs each service's tests in a sandbox (`go vet`, `go test`, `pytest`, npm `build`/`test`). A service without tests is reported as untested rather than passed.
- **Outside the standard needs asking first:** for a library or technology outside the standard, Claude tells the employee first, then sends an exception request with a reason. An administrator decides on the Standards page. Until it's approved, a forbidden library fails the build.
- **Test data kept separate:** data Claude adds to the dev copy itself is recorded as test data, so it's never mistaken for real data.

![The administrator's Standards page: an exception waiting for a decision, and the libraries the company doesn't allow (mock data)](images/projects/app-development-platform/standards.webp)

## 5. Requesting production: every file reviewed and signed

Production is a separate step that happens only when the employee asks for it, and it has to pass these gates:

- **REVIEW.md:** Claude writes it from the actual code. It covers what the app does; the workflow from page through API to database; the path and purpose of every file; the data stored; the config and secret names used (never their values); what changed; the tests run; and the risks. Without it, the request is refused before anything is built.
- **Tests and scans:** tests run again on exactly the source being built, and every image must pass a CRITICAL-severity Trivy scan.
- **Data from dev:** the first production deployment asks the employee whether the dev copy's data is real and should be kept. Claude must never decide that itself.
- **Signed approval:** on the approval page, the system downloads the source and checks its hash, and the administrator reads every file. The administrator then signs with an Ed25519 private key that only they hold. The signature covers the images, source, test report, and REVIEW.md. Forged or replayed signatures are refused.

![Production approval: check the source, REVIEW.md, test report, and image scans before signing (mock data)](images/projects/app-development-platform/approval.webp)

## 6. After go-live: the platform keeps running it

- **Deploys:** health checks run before traffic is switched, a redeploy never takes down the working version, and a version that keeps failing after release is rolled back automatically.
- **Scale-to-zero:** idle apps stop and the first request wakes them at the same address. Their databases sleep with them.
- **Backups:** a full every Sunday and differentials Monday to Saturday, encrypted with the platform key and restorable by the app's owner.
- **Logs and metrics:** logs are kept for 90 days with secrets redacted. The platform measures CPU, memory, requests, errors, and latency itself, with alerts on thresholds.
- **Administrators' dashboard:** the whole host and every app at a glance, like a task manager. Administrators can suspend a problem app with a reason, and only an administrator can resume it.
- **Audit log:** hash-chained and append-only.

## Who does what

| Role | Responsibilities |
|---|---|
| Employee | Sets up the machine once; asks Claude to build or change apps and tries them on the dev link; says whether dev data is real; manages their own apps in the Portal |
| Administrator | Holds the private key; reviews and signs production; sets forbidden libraries; decides exceptions; suspends problem apps |
| IT | Installs and updates the server; seals the encryption key with the TPM; copies backups off the host; hands out the enrollment code |

Each app can only be managed by its owners, except when an administrator suspends it.

## Components

| Part | Language | Role |
|---|---|---|
| Company Deployment Skill + templates | Markdown | The procedure Claude follows from starting an app to production, the `deployment.yaml` schema, and starter code per language |
| MCP server + CLI | Python | 34 tools Claude uses: the standard (start, scaffold, check, exceptions), tests, dev copies, deploy, logs, and metrics, plus the approver's CLI |
| Platform API | Go | The only component that touches PostgreSQL and Docker; it checks permissions, enforces the rules, and builds, scans, and runs apps |
| Admin Portal | React + TypeScript | The web UI for employees and administrators |
| Gateway | nginx | One port for the Portal, the API, every app, and the per-machine installers |

On security: secrets are write-only, AES-256-GCM encrypted, and never returned by any API. Each app's database sits on its own private network, and the platform's encryption key is sealed with the host's TPM.

## Documentation and testing

- **Documents:** the BRD, functional and non-functional requirements, architecture, SDLC, risk register, and a decision log (30 decisions), plus a Thai-language IT standard document for employees.
- **Unit tests:** 391 Go test functions, 155 Python tests, and 109 Portal test cases.
- **Verification scripts:** run against the live stack. They cover:
  - starting an app per the standard: scaffolding, a forbidden library being refused, and exceptions;
  - tests on the platform, and dev copies that keep their data;
  - deploying React plus every API language plus MySQL from the templates through to real use in a browser;
  - all 34 MCP tools over stdio;
  - signed approvals, and backup and restore.

## Not done yet

- Alerts are in-app only; there's no email or chat channel yet.
- The encryption key can't be rotated yet, and the TPM scripts have only run against a software TPM.
- Everything is on one host: no high availability, and backups sit on the same host as the databases.
- There's no password reset, and stack/other exceptions are a recorded decision that the platform doesn't enforce by itself.
