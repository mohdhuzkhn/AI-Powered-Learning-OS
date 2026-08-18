---
title: User Personas
document: 01-Personas.md
version: 1.0.0
status: Approved
phase: Phase 1
owner: Muhammad Huzaifa Khan
created: YYYY-MM-DD
last_updated: YYYY-MM-DD

related_documents:
  - 01-Product-Vision.md
  - 02-Phase-1-PRD.md
  - 02-User-Stories.md

audience:
  - Product Managers
  - Designers
  - Developers
  - AI Coding Agents

priority: High
---

# User Personas

> Understanding the people who will use Learning OS.

---

# Purpose

This document defines the primary users of Learning OS.

Every feature, workflow, UI decision, database model, and API should be designed to solve real user problems.

If a feature does not improve the experience of at least one persona, it should be reconsidered.

---

# Persona Overview

Phase 1 introduces two active personas.

```
Administrator

↓

Student
```

Future phases will introduce additional personas such as Mentor and Organization Manager.

---

# Persona 1 — Administrator

## Description

The Administrator is responsible for managing the platform.

They create missions, assign work, review submissions, and manage students.

---

## Primary Goals

- Manage bootcamps efficiently
- Track student progress
- Reduce manual work
- Organize learning resources
- Review submissions quickly

---

## Daily Activities

- Login
- Create missions
- Assign missions
- Upload resources
- Review submissions
- Approve or reject work
- Publish announcements

---

## Pain Points

Current workflow uses multiple tools.

Examples

- WhatsApp
- Google Drive
- Google Classroom
- Excel Sheets

This causes

- Duplicate work
- Lost information
- Difficult tracking
- Poor organization

---

## Success Criteria

The Administrator should be able to manage an entire bootcamp without relying on external tools.

---

## Permissions

Can

- Manage users
- Manage missions
- Manage resources
- Review submissions
- Publish announcements

Cannot

- Bypass authentication
- Modify system configuration outside authorized settings

---

# Persona 2 — Student

## Description

Students complete learning missions assigned by the administrator.

They submit proof of work and receive feedback.

---

## Primary Goals

- View assigned missions
- Access learning resources
- Complete practical work
- Submit assignments
- Track progress

---

## Daily Activities

- Login
- View dashboard
- Read mission details
- Access resources
- Complete mission
- Upload screenshot
- Submit work
- Read announcements

---

## Pain Points

Students often experience

- Scattered learning materials
- Unclear deadlines
- Confusing submission process
- Delayed feedback

---

## Success Criteria

Students should always know

- What to do
- When it is due
- Where to submit
- Current submission status

---

## Permissions

Can

- View assigned missions
- Submit work
- View announcements
- Edit profile

Cannot

- Create missions
- Review submissions
- Manage users

---

# Future Personas

These personas are intentionally excluded from Phase 1.

---

## Mentor

Will review work.

Provide guidance.

Track student performance.

---

## Organization Owner

Manage multiple bootcamps.

View analytics.

Manage mentors.

---

## AI Mentor

Introduced in Phase 3.

Responsibilities

- Personalized recommendations
- Code review
- Learning roadmap
- AI explanations

---

# Shared User Needs

Regardless of role, every user expects

- Fast performance
- Secure authentication
- Responsive interface
- Reliable data
- Clear workflows

---

# Accessibility Requirements

Learning OS should support

- Desktop
- Tablet
- Mobile

Users with limited technical experience should be able to complete common tasks without assistance.

---

# Design Principles

Every screen should answer three questions immediately.

1.

Where am I?

2.

What should I do?

3.

What happens next?

If a screen fails to answer these questions, it should be redesigned.

---

# AI Agent Context

AI coding agents should use personas to understand why features exist.

Personas influence

- UI Design
- Navigation
- Database Relationships
- API Permissions
- Security Rules

Implementation should prioritize solving persona problems instead of simply satisfying technical requirements.

---

# Approval

Status

Approved