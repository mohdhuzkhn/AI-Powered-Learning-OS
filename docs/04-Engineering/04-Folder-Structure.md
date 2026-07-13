---
title: Folder Structure
document: 04-Folder-Structure.md
version: 1.0.0
status: Approved

owner: Muhammad Huzaifa Khan

phase: Phase 1

priority: Critical
---

# Folder Structure

---

# 1. Purpose

This document defines the official project structure for Learning OS.

Every contributor—including human developers and AI coding agents—must follow this structure.

A consistent folder organization improves:

- Discoverability
- Maintainability
- Scalability
- Code Generation
- Code Reviews
- Onboarding

No feature should invent its own structure.

---

# 2. Folder Philosophy

Learning OS follows a **Feature-First Modular Architecture**.

Each feature owns its own:

- Components
- Pages
- Hooks
- Services
- Repositories
- Types
- Validators
- Tests

This minimizes coupling and keeps related code together.

---

# 3. High-Level Structure

```
learning-os/

├── public/
├── src/
├── docs/
├── scripts/
├── firebase/
├── .github/
├── package.json
├── firebase.json
├── firestore.rules
├── firestore.indexes.json
└── README.md
```

---

# 4. Source Structure

```
src/

├── app/
├── features/
├── shared/
├── services/
├── infrastructure/
├── hooks/
├── providers/
├── router/
├── types/
├── utils/
├── assets/
├── config/
└── styles/
```

---

# 5. App Directory

The app directory contains application initialization.

```
app/

App.tsx

main.tsx

AppProviders.tsx

ErrorBoundary.tsx
```

Responsibilities

- Bootstrapping
- Global Providers
- Global Error Boundary
- Root Layout

No business logic belongs here.

---

# 6. Features Directory

Every business capability is implemented as a feature.

```
features/

authentication/

dashboard/

missions/

submissions/

resources/

announcements/
```

Future

```
chat/

github/

notifications/

analytics/

ai/
```

Features should remain independent whenever possible.

---

# 7. Feature Structure

Every feature follows exactly the same structure.

```
missions/

components/

pages/

hooks/

services/

repositories/

validators/

types/

constants/

tests/

index.ts
```

Purpose

### components/

Reusable UI for the feature.

### pages/

Route-level screens.

### hooks/

Feature-specific React hooks.

### services/

Business operations.

### repositories/

Firestore interaction.

### validators/

Input validation.

### types/

TypeScript interfaces.

### constants/

Feature constants.

### tests/

Unit and integration tests.

### index.ts

Public exports.

---

# 8. Shared Directory

Contains reusable modules used across multiple features.

```
shared/

components/

layouts/

icons/

ui/

hooks/

constants/

types/
```

Shared code must remain generic.

Business-specific code is not allowed.

---

# 9. Services Directory

Contains cross-feature services.

Examples

```
AuthService

StorageService

LoggerService

NotificationService (Future)

AIService (Future)
```

Feature-specific services belong inside their feature.

---

# 10. Infrastructure Directory

Contains implementations that interact with external systems.

```
infrastructure/

firebase/

storage/

logging/

github/

ai/

email/
```

Responsibilities

- Firebase SDK
- Third-party APIs
- Environment
- Configuration

Business rules never belong here.

---

# 11. Providers

```
providers/

AuthProvider

ThemeProvider

QueryProvider

RouterProvider
```

Providers initialize global application services.

---

# 12. Router

```
router/

routes.tsx

ProtectedRoute.tsx

AdminRoute.tsx

StudentRoute.tsx
```

Responsibilities

- Route definitions
- Route guards
- Lazy loading

Business logic is prohibited.

---

# 13. Hooks

Global reusable hooks.

Examples

```
useDebounce()

useLocalStorage()

useOnlineStatus()
```

Feature hooks remain inside their own feature.

---

# 14. Config

Application configuration.

```
config/

firebase.ts

env.ts

constants.ts

featureFlags.ts (Future)
```

No hardcoded configuration elsewhere.

---

# 15. Assets

```
assets/

images/

icons/

logos/

illustrations/

fonts/
```

Assets should never be mixed with business logic.

---

# 16. Styles

```
styles/

globals.css

variables.css

animations.css
```

Feature-specific styling stays with the feature.

---

# 17. Documentation

```
docs/

Product/

Engineering/

Architecture/

API/

Database/
```

Documentation evolves with the codebase.

---

# 18. Firebase Directory

```
firebase/

functions/ (Future)

emulators/

seed/
```

Purpose

- Local development
- Emulators
- Seed data
- Cloud Functions

---

# 19. Naming Convention

Folders

```
camelCase
```

Features

```
missions

submissions

resources
```

Components

```
MissionCard.tsx

SubmissionForm.tsx

DashboardHeader.tsx
```

Hooks

```
useMission.ts

useDashboard.ts
```

Services

```
MissionService.ts

SubmissionService.ts
```

Repositories

```
MissionRepository.ts

SubmissionRepository.ts
```

Types

```
mission.types.ts
```

Validators

```
mission.validator.ts
```

---

# 20. Import Rules

Preferred

```
Feature

↓

Shared

↓

Infrastructure
```

Forbidden

```
Feature A

↓

Feature B

↓

Feature A
```

Avoid circular dependencies.

---

# 21. Testing Structure

```
tests/

unit/

integration/

e2e/
```

Feature tests remain inside the feature.

Cross-feature tests live here.

---

# 22. Future Growth

As Learning OS expands, new features are added without modifying existing ones.

Example

```
features/

chat/

ai/

github/

certificates/

organizations/

bootcamps/

payments/
```

The architecture remains stable.

---

# 23. Anti-Patterns

Avoid

❌ Large utility folders

❌ Massive shared components

❌ Business logic inside UI

❌ Firestore SDK in components

❌ Deep folder nesting

❌ Circular imports

❌ Generic "helpers" folders without ownership

---

# 24. AI Coding Rules

Every AI-generated feature must:

- Follow the standard folder layout.
- Create only necessary files.
- Respect architectural boundaries.
- Reuse shared modules before creating new ones.
- Export through `index.ts`.
- Keep responsibilities isolated.

AI-generated code should never introduce a new folder structure.

---

# 25. Complete Project Structure

```
learning-os/

├── docs/
│
├── public/
│
├── src/
│   ├── app/
│   ├── assets/
│   ├── config/
│   ├── features/
│   │   ├── authentication/
│   │   ├── dashboard/
│   │   ├── missions/
│   │   ├── submissions/
│   │   ├── resources/
│   │   └── announcements/
│   │
│   ├── hooks/
│   ├── infrastructure/
│   ├── providers/
│   ├── router/
│   ├── services/
│   ├── shared/
│   ├── styles/
│   ├── types/
│   └── utils/
│
├── firebase/
│
├── scripts/
│
├── .github/
│
├── firestore.rules
├── firestore.indexes.json
├── firebase.json
├── package.json
└── README.md
```

---

# Definition of Done

The folder structure is considered complete when:

- Every feature follows the standard layout.
- Responsibilities are clearly separated.
- Shared modules remain generic.
- Infrastructure is isolated.
- Naming conventions are consistent.
- Import rules prevent circular dependencies.
- AI-generated code can be placed without architectural changes.
- The structure can scale from Phase 1 to enterprise-level development.