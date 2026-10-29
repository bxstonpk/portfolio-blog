## Overview

This system monitors the tanks and lines in a fish-oil plant in real time. The real plant has 9 vessels and 14 sensors: 5 liquid-level sensors and 9 flow meters. The system collects sensor readings, keeps their history, shows them as dashboards and a 3D view, and raises alarms when a value crosses a threshold.

It started from a prototype whose backend had no database, no login, and only randomly generated data. I rewrote the backend from scratch in Go and adapted the existing React + TypeScript frontend to a real API and real authentication.

## Architecture

```
device / simulator ──MQTT──► Mosquitto ──► mqtt-ingestor ──► InfluxDB (sensor readings)
                                                │
                                                └──► PostgreSQL (alarm rules, alarm events)
                                                           │ LISTEN/NOTIFY
frontend (React) ◄──REST + WebSocket── api ◄───────────────┘
```

The Go backend uses a hexagonal (ports & adapters) layout and builds into three binaries that share one core:

- **api**: the REST API behind every screen, plus login, user management, and settings. It never talks to MQTT.
- **mqtt-ingestor**: the only service that consumes MQTT. It writes readings to InfluxDB and checks alarm thresholds.
- **simulator**: development only. It publishes simulated readings on the same topics real devices use, so it can be switched off once hardware is connected, with nothing else changing.

The api and the ingestor are separate so that neither can take the other down. A burst of MQTT traffic or a broker restart doesn't affect the dashboards.

The two databases have distinct jobs. **PostgreSQL** holds anything an admin edits: users, the tank list, the sensor-tag catalog, alarm rules, and work orders. **InfluxDB** holds only sensor time series. There's no Grafana, because the frontend already draws its own charts with ECharts.

## Ingest and alarms

For every reading it receives, the ingestor:

1. writes it to InfluxDB at the reading's own timestamp;
2. reads that tag's alarm rule from PostgreSQL on every message, so a threshold change in Settings applies to the very next reading;
3. records an alarm event on a breach, with a 5-minute cooldown per rule per level so a sustained breach doesn't flood the table;
4. stores readings older than 2 minutes (for example, a backlog a gateway sends after reconnecting) at their real time, but skips alarm checks for them, because alarms should describe the plant as it is now.

Alarms reach the browser over WebSocket. The ingestor and the api are separate processes, so when an alarm changes, the ingestor signals the api through PostgreSQL `LISTEN/NOTIFY`, and the api forwards the signal to every open screen. The message is only a nudge to refetch over REST; it never carries alarm contents. If the socket drops, the page falls back to slow polling. Sensor values on the dashboards are still polled (the 3D view refreshes every 10 seconds).

![Notifications: alarms split into Critical / Warning / Info, with acknowledgement](images/projects/tank-monitoring-iot/notifications.webp)

Besides readings already mapped to tags, the system also accepts raw frames from a gateway: just a device address and its channel values. The server then maps device → channel → tag and applies scaling from a data map stored in the database, so adding a sensor means adding a row, not changing code. Once a frame is written to InfluxDB, the server sends an ack back to the gateway.

## Field gateway

For the plant side, I wrote a Node-RED flow to run on an industrial gateway. It reads I/O modules over Modbus TCP, publishes over MQTT, and stores data locally while the network is down:

- While connected, it sends immediately and keeps frames in memory until they're acked, without writing to disk, to spare the gateway's eMMC/SD storage.
- While disconnected, it writes frames to files, writing a temp file first and then renaming it so there are never half-written files.
- After reconnecting, it sends the backlog oldest-first and deletes each file only after its ack arrives.

**Status:** this flow has only been tested with simulated data on a development machine. It hasn't been tested on the real gateway or I/O modules on site yet.

## Screens

All screenshots on this page come from a demo build that runs in the browser with no server and uses simulated data. Client names and logos have been removed.

![Operator dashboard: tank levels with trend lines, plus the flow on each line](images/projects/tank-monitoring-iot/operator.webp)

![Flow totalizer: volume through each line, summed by hour or day, with CSV export and print to PDF](images/projects/tank-monitoring-iot/totalizer.webp)

![Data logger: timestamped raw readings for every tag, filterable by tank, parameter, and time range](images/projects/tank-monitoring-iot/logger.webp)

## Auth and roles

- Access tokens are JWTs that last about 15 minutes.
- Refresh tokens last 30 days, are stored hashed, and are delivered as an httpOnly cookie that JavaScript can't read. Every refresh issues a new token, and logout really revokes the token.
- There are four roles: `admin`, `engineer`, `operator`, and `viewer`. Endpoints that change data require admin, except work-order updates, which engineers can also make.

## Deployment and CI/CD

- The whole stack runs with Docker Compose: PostgreSQL, InfluxDB, Mosquitto, api, mqtt-ingestor, and web (nginx). A separate reverse proxy with Let's Encrypt sits in front.
- CI on GitHub Actions runs `go build`, `go vet`, and `go test` for the backend, and lint and build for the frontend.
- On the `dev` branch, once CI passes, the full stack is brought up on the GitHub runner itself, health-checked, and torn down.
- On the `main` branch, once CI passes, a workflow deploys to the server over SSH.
- The simulator generates values deterministically from (tag, time), so it can backfill 90 days of history that lines up with live data, and charts have something to show from the first install.

## Not done yet

- The gateway hasn't been tested with real devices on site.
- Reports is only a list of report definitions; it can't generate PDF/XLSX files yet. The totalizer can already export CSV and print.
- Sensor values on the dashboards are still polled; only alarms are pushed over WebSocket.
- It supports one site only; there's no multi-site data separation.
