## Overview

This platform lets employees deploy the internal apps they build with Claude Code by themselves, without IT doing one-off work for each app. An employee asks Claude to deploy; Claude follows the company's skill and calls the platform's MCP server; the platform then validates, builds, scans, deploys, and runs the app.

```
Employee → Claude Code → Company Deployment Skill → MCP server
         → Platform API → build / image scan / deploy → Docker → app
```

It's internal only. It runs on a single on-prem Linux host with Docker, reachable only from the company LAN, with no cloud and no Kubernetes. I built it between late August and October 2026, starting with the BRD, requirements, architecture, and a decision log before writing the system.

## Components

| Part | Language | Role |
|---|---|---|
| Platform API | Go | The only component that touches PostgreSQL and Docker; everything else is a client of it |
| MCP server + CLI | Python | 34 tools Claude Code uses: sign-in, starting a project from the standard, tests, deploy, logs, metrics, and more |
| Company Deployment Skill | Markdown | The rules Claude must follow, the `deployment.yaml` schema, and starter templates per language |
| Admin Portal | React + TypeScript | The web UI for people: machine approval, apps, backups, alerts, and the administrators' pages |
| Gateway | nginx | One port for the Portal, the API, every app, and the per-machine installers |

The standard for new apps is a React frontend, one API in Python, Node.js, TypeScript, or Go, and a MySQL database that the platform provisions for each app.

## App lifecycle

The server enforces each app's state: Draft → Validated → Build → Deploying → Running → Suspended / Rolled back → Archived → Deleted.

- **Build:** one build recipe per runtime, no package manager in runtime images, and every image must pass a CRITICAL-severity Trivy scan.
- **Deploy:** health checks run before traffic is switched, and a redeploy never takes down a working version.
- **Health and rollback:** running instances are re-checked continuously and replaced when unhealthy. A version that keeps failing right after release is rolled back automatically.
- **Scale-to-zero:** idle services stop, and the first request wakes them at the same address. MySQL sleeps along with its app to save memory.
- **Dev copies:** every app has a `<app>-dev` copy with its own database and address. Changes go there right away without approval, and its data is kept.

## Security and approvals

- **Authentication:** employees register with a password and an enrollment code from IT. Each Claude Code machine requests its own API key, which its owner must approve in the Portal before it can deploy. Only hashes are stored.
- **Signed production approvals:** a production deployment waits for the administrator's Ed25519 signature, made with a private key only they hold. The signature covers the deployment, images, source archive, test report, and the requester's REVIEW.md. The approval page downloads the source and checks its hash before signing.
- **Secrets:** write-only, AES-256-GCM encrypted, and injected at container start. No API or tool returns a value.
- **Platform key:** sealed with the host's TPM and unsealed into RAM at boot, with an offline escrow copy.

![Production approval: check the source, read REVIEW.md, the test report, and image scans before signing (mock data)](images/projects/self-deployment-platform/approval.webp)

## Governance from the start

The company standard applies from the moment an app is started, not only at deployment:

- A new app is registered with a profile (purpose, users, personal data, stack) and starts from the company templates.
- Using a library the company forbids fails the build.
- Anything outside the standard needs an exception, which the administrator decides in the Portal first.
- The platform runs the app's tests (Go, Python, Node) in a sandbox, so employees' machines need no toolchain. A production deployment carries the test report only if the run passed on the same source.

![Standards page: an exception waiting for a decision, and the libraries the company doesn't allow (mock data)](images/projects/self-deployment-platform/standards.webp)

## Operations the platform handles

- A dedicated MySQL or PostgreSQL per app on its own private network. The password is never in source and can be rotated.
- Backups: a full every Sunday and differentials Monday to Saturday, encrypted with the platform key and restorable by the app's owner.
- Every log line an app prints, kept for 90 days with secrets redacted. CPU, memory, requests, errors, and latency are measured by the platform itself.
- Alerts on error rate, latency, CPU, memory, and disk, delivered to an inbox in the Portal.
- A hash-chained, append-only audit log.
- An administrator can suspend any app with a reason, and only an administrator can resume it.

## Testing

- **Unit tests:** 391 Go test functions, 155 Python tests, and 109 Portal test cases.
- **Verification scripts:** run against the live stack, with real Docker builds, real HTTP, real databases, and a headless browser. They cover deploying React plus every API language plus MySQL from the templates through to working use; all 34 MCP tools over stdio; backup and restore; rejection of forged or replayed signatures; and recovery after a Docker restart.

## Not done yet

- Alerts are in-app only; there's no email or chat channel yet.
- The encryption key can't be rotated yet, because there's no tool to re-encrypt existing data.
- The TPM scripts have only run against a software TPM, not the real host's chip.
- Everything is on one host: no high availability, and backups sit on the same host as the databases.
- There's no password reset, and deploys run synchronously with no job queue.
