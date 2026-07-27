# Learning OS - AI Context

> **Purpose:** This document provides the current state of the project.
>
> Unlike architecture and product documentation, this file is expected to evolve throughout development.
>
> Every AI coding session should read this file before implementation.

---

# Project Overview

**Project Name**

Learning OS (AI-Powered Learning Operating System)

**Repository Status**

🚧 Active Development

**Current Version**

v0.1.0 (Phase 1)

**Project Owner**

Muhammad Huzaifa Khan

**Architecture Status**

Approved

**Documentation Status**

Complete for Phase 1

---

# Vision

Learning OS is an AI-first learning platform designed to help students, developers, and bootcamp participants learn through structured missions instead of traditional courses.

The long-term vision is to build an operating system for learning where AI becomes an intelligent mentor, reviewer, and learning companion.

Current development is focused only on Phase 1.

---

# Current Development Phase

## Phase 1

**Status**

🟢 In Progress

**Objective**

Build the core learning platform where:

- Users authenticate securely.
- Admin creates learning missions.
- Students complete assigned missions.
- Students submit proof of work.
- Admin reviews submissions.
- Learning resources are shared.
- Announcements are published.

---

# Current Milestone

Refer to:

```
IMPLEMENTATION_PLAN.md
```

Always determine the active milestone before writing code.

Never implement future milestones.

---

# Current Scope

The following features are inside the current scope.

✅ Authentication

✅ Student Dashboard

✅ Admin Dashboard

✅ Mission Management

✅ Submission System

✅ Announcement System

✅ Resource System

✅ Firebase Deployment

---

# Out of Scope

The following features must NOT be implemented during Phase 1.

❌ Chat System

❌ GitHub Integration

❌ AI Suggestions

❌ Notifications

❌ Certificates

❌ Analytics

❌ Cloud Functions

❌ Multi-Tenant Organizations

❌ Payments

❌ Mentor Management

These belong to future phases.

---

# Technology Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack Query
- React Hook Form
- Zod

---

## Backend

Firebase

- Authentication
- Firestore
- Storage
- Hosting

---

## Development

- ESLint
- Prettier
- Git
- GitHub

---

# Architecture Summary

The project follows a layered architecture.

```
UI

↓

Components

↓

Hooks

↓

Services

↓

Repositories

↓

Firebase
```

Never bypass layers.

React components must never communicate directly with Firebase.

---

# Engineering Principles

Every implementation must follow:

- SOLID
- DRY
- KISS
- YAGNI
- Clean Architecture
- Repository Pattern
- Service Layer
- Feature-first Folder Structure
- Separation of Concerns
- Strict TypeScript

---

# Documentation Hierarchy

Always follow this order.

```
.ai/

↓

IMPLEMENTATION_PLAN.md

↓

docs/

↓

Source Code
```

Documentation overrides assumptions.

---

# AI Development Workflow

Every coding session follows this sequence.

```
Read AGENTS.md

↓

Read WORKFLOW.md

↓

Read CONTEXT.md

↓

Read IMPLEMENTATION_PLAN.md

↓

Identify Current Milestone

↓

Read Required Documentation

↓

Plan

↓

Implement ONE Task

↓

Validate

↓

Summarize

↓

Wait
```

Never continue automatically.

---

# Coding Rules

Always

- Build one task at a time.
- Preserve architecture.
- Follow folder structure.
- Write reusable code.
- Use strict typing.
- Handle loading states.
- Handle error states.
- Handle empty states.
- Keep business logic outside UI.
- Keep components focused.

---

# Repository Structure

```
.ai/

docs/

src/

firebase/

public/

IMPLEMENTATION_PLAN.md

README.md
```

---

# Source of Truth

When uncertainty exists, follow this priority.

```
AGENTS.md

↓

WORKFLOW.md

↓

CONTEXT.md

↓

IMPLEMENTATION_PLAN.md

↓

Engineering Documentation

↓

Feature Specifications

↓

Existing Code
```

Never invent architecture.

Never guess requirements.

---

# Definition of Success

Phase 1 is complete when:

- Authentication works.
- Dashboard works.
- Mission System works.
- Submission System works.
- Announcement System works.
- Resource System works.
- Firebase deployment is complete.
- Documentation matches implementation.

---

# Current Engineering Goal

The immediate objective is **not** to finish the application quickly.

The objective is to build a scalable, maintainable, production-quality foundation that future phases can extend without major architectural changes.

---

# AI Behavior

When working on this repository:

- Think before coding.
- Read documentation before implementation.
- Implement only the requested scope.
- Validate before completing.
- Recommend the next engineering task.
- Stop and wait for approval.

Never continue automatically.

---

# End of Context

This file represents the current state of Learning OS.

If any architectural or product decision changes, update this document before continuing development.


## Current Status

Phase 1

Milestone 2 Complete

Completed

- Firebase Authentication
- Firestore Integration
- User Repository
- Auth Provider
- Login
- Forgot Password
- Route Protection

Next Milestone

Milestone 3
Dashboard
Mission System


