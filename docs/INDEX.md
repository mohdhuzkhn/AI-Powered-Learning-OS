# Learning OS Documentation

> **The single source of truth for the Learning OS platform.**

---

# Overview

Welcome to the documentation repository for **Learning OS**, an AI-first platform designed to manage technical bootcamps, academies, engineering teams, and future AI-assisted learning experiences.

This repository contains the complete product, engineering, and development documentation required to build, maintain, and evolve the platform.

The documentation is written for both **human developers** and **AI coding agents**.

---

# Project Philosophy

Learning OS follows three core principles.

## 1. Build in Phases

The platform is intentionally developed incrementally.

Each phase delivers a fully usable product instead of an unfinished collection of features.

```
Phase 1
↓

Foundation Platform

↓

Phase 2
↓

Collaboration Platform

↓

Phase 3
↓

AI Learning Operating System
```

---

## 2. Documentation First

Before implementing any feature, its requirements, workflows, constraints, and architecture must be documented.

Documentation is treated as part of the software itself.

---

## 3. AI-First Development

Learning OS is designed for the Software 3.0 era.

Instead of AI generating isolated snippets of code, AI agents receive structured project knowledge and engineering standards before implementation.

The documentation serves as long-term context for AI-assisted software development.

---

# Documentation Structure

```
docs/

│
├── INDEX.md
│
├── 01-Product/
│
├── 02-Users/
│
├── 03-Features/
│
├── 04-Engineering/
│
├── 05-Design/
│
├── 06-AI/
│
├── 07-Development/
│
└── glossary.md
```

Each folder represents one aspect of the platform.

---

# Reading Order

Developers and AI agents should read documents in the following order.

## Phase 1

```
INDEX

↓

Product Vision

↓

Product Requirements Document

↓

Roadmap

↓

Personas

↓

User Stories

↓

Feature Specifications

↓

System Architecture

↓

Database Design

↓

API Specification

↓

Folder Structure

↓

Security

↓

Deployment

↓

Development Checklist
```

This order minimizes ambiguity and ensures implementation decisions remain consistent.

---

# Documentation Categories

## 01 - Product

Defines **what** we are building.

Contains:

- Product Vision
- PRD
- Roadmap
- Success Metrics

---

## 02 - Users

Defines **who** uses the platform.

Contains:

- Personas
- User Stories
- User Journeys
- Permissions

---

## 03 - Features

Defines **how users interact** with the system.

Examples:

- Authentication
- Dashboard
- Mission System
- Submission System
- Resources
- Announcements

---

## 04 - Engineering

Defines **how the platform is implemented.**

Contains:

- Architecture
- Database
- APIs
- Folder Structure
- Security
- Deployment

---

## 05 - Design

Defines the visual language.

Contains:

- Design System
- UI Guidelines
- Accessibility

---

## 06 - AI

Documents AI-specific architecture for future phases.

Examples:

- AI Mentor
- AI Context
- AI Roadmap

---

## 07 - Development

Defines development workflows.

Examples:

- Git Workflow
- Coding Workflow
- Development Checklist
- Definition of Done

---

# Project Phases

## Phase 1 — Foundation Platform

Goal:

Build a functional platform for task assignment and submission.

Features:

- Authentication
- Admin Dashboard
- Student Dashboard
- Mission Management
- Submission System
- Resource Library
- Announcements

No AI features.

No GitHub integration.

No Chat System.

---

## Phase 2 — Collaboration Platform

Goal:

Transform the platform into a collaborative workspace.

Features:

- GitHub Integration
- Chat
- Notifications
- Teams
- Calendar
- Progress Tracking

---

## Phase 3 — AI Learning Operating System

Goal:

Introduce AI-powered learning assistance.

Features:

- AI Mentor
- AI Code Review
- AI Suggestions
- AI Learning Roadmaps
- AI Analytics
- Intelligent Recommendations

---

# Documentation Standards

Every document must follow a consistent structure.

```
Metadata

Purpose

Goals

Scope

Requirements

Business Rules

User Flow

Technical Notes

Future Enhancements

AI Agent Context

Checklist
```

Consistency is more important than brevity.

---

# Naming Conventions

## Files

Use Pascal Case with numeric prefixes.

Example

```
01-Product-Vision.md

02-PRD.md

03-Roadmap.md
```

---

## Folders

```
01-Product

02-Users

03-Features

04-Engineering
```

Numeric prefixes preserve logical reading order.

---

# Source of Truth

This repository is the authoritative source for:

- Product decisions
- Feature requirements
- Business rules
- Architecture decisions
- Development standards

If implementation differs from documentation, either:

1. Update the documentation, or

2. Refactor the implementation.

Documentation should never become outdated.

---

# Relationship with AI Engineer Knowledge

Learning OS documentation explains **what** should be built.

The AI Engineer Knowledge repository explains **how** software should be engineered.

```
AI Engineer Knowledge

↓

Engineering Standards

↓

Learning OS Documentation

↓

Project Requirements

↓

Codebase

↓

Implementation
```

Both repositories should always be used together during development.

---

# AI Agent Instructions

AI coding agents should follow this process before implementing any feature.

1. Read this INDEX document.

2. Read the relevant Product documents.

3. Read the corresponding Feature Specification.

4. Read the Engineering documents.

5. Follow the engineering standards defined in the AI Engineer Knowledge repository.

6. Only then generate or modify code.

AI agents must never infer undocumented requirements.

---

# Contribution Guidelines

Before adding a new feature:

- Update the Product documentation.
- Update Feature documentation.
- Update Database documentation (if applicable).
- Update API documentation (if applicable).
- Update Development Checklist.

Implementation comes after documentation.

---

# Long-Term Vision

Learning OS is not intended to become another Learning Management System (LMS).

The long-term vision is to create an AI-native Learning Operating System where product knowledge, engineering practices, and artificial intelligence work together to provide personalized learning experiences for students, educators, and engineering teams.

---

# Next Document

After reading this document, continue with:

```
01-Product/

↓

01-Product-Vision.md
```