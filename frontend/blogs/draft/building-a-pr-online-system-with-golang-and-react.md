---
title: "Building a PR Online System with Golang and React"
date: "2026-05-20"
category: "Technology"
tags:
  - Golang
  - React
  - System Design
---

Our old process relied on paper forms and manual data entry, which caused delays, lost requests, and no visibility into approval status. I set out to replace it with a web application that requesters, approvers, and accounting could all trust.

## The Problem

Purchase requests (PRs) were submitted on paper, routed by hand between departments, and re-typed into the accounting system once approved. That meant:

- No way to track where a request was stuck
- Duplicate data entry, and the errors that come with it
- No audit trail for who approved what, or when

## The Solution

I developed a web application with:

- Online PR creation and approval
- Real-time status tracking for requesters
- Integration with the accounting system via API
- Role-based access control for requesters, approvers, and finance

## Tech Stack

- **Backend:** Go, with a REST API for the frontend and accounting integration
- **Frontend:** React, for a fast and responsive dashboard
- **Database:** MySQL, for transactional data and audit history

## Challenges

The trickiest part was the approval workflow itself — requests can be routed differently depending on amount, department, and category, and approvers needed to see exactly why a request landed with them. I modeled this as a configurable chain of approval rules rather than hardcoding paths, which made it possible to adjust routing without shipping new code.

Keeping the accounting integration reliable was the other big challenge: a failed sync couldn't silently lose a PR. I added a retry queue with clear error surfacing so failures are visible instead of swallowed.

## What I Learned

- Designing for auditability from day one saves a lot of pain later
- A configurable workflow engine is worth the upfront complexity when business rules are still evolving
- Clear status visibility for end users cuts down support questions dramatically

## Conclusion

The new system cut PR turnaround time significantly and gave everyone — requesters, approvers, and finance — a single source of truth. It's also the foundation I'm building future automation on top of.
