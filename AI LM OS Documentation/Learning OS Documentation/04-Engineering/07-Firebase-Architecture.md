---
title: Firebase Architecture
document: 07-Firebase-Architecture.md

version: 1.0.0

status: Approved

owner: Muhammad Huzaifa Khan

phase: Phase 1

priority: Critical
---

# Firebase Architecture

---

# 1. Purpose

This document defines the backend architecture of Learning OS using Firebase.

Firebase provides the infrastructure for:

- Authentication
- Database
- Storage
- Hosting
- Security Rules
- Deployment

The architecture is designed to support Phase 1 while allowing future migration to custom backend services without major changes to business logic.

---

# 2. Firebase Philosophy

Firebase is an implementation detail—not the architecture.

Learning OS follows this dependency direction:

```
React

↓

Application Services

↓

Repositories

↓

Firebase SDK

↓

Firebase Services
```

React components must never communicate directly with Firebase.

---

# 3. Firebase Project Structure

Phase 1

```
learning-os-dev
```

Future

```
learning-os-dev

learning-os-staging

learning-os-production
```

Each project owns its own:

- Authentication
- Firestore
- Storage
- Hosting
- Rules
- Indexes

Production data is isolated.

---

# 4. Firebase Services

Learning OS uses

```
Firebase Authentication

Cloud Firestore

Firebase Storage

Firebase Hosting
```

Reserved for future

```
Cloud Functions

Cloud Messaging

Remote Config

Analytics

Crashlytics

App Check
```

---

# 5. Backend Architecture

```
React UI

↓

TanStack Query

↓

Application Services

↓

Repositories

↓

Firebase SDK

↓

Firestore
Storage
Authentication
```

Business logic never exists inside Firebase SDK wrappers.

---

# 6. Authentication Architecture

Authentication provider

```
Google Sign-In
```

Optional

```
Admin-created Email Accounts
```

Authentication Flow

```
User

↓

Firebase Authentication

↓

User UID

↓

users Collection

↓

Role Resolution

↓

Protected Routes
```

Authentication only verifies identity.

Authorization is handled separately.

---

# 7. User Synchronization

After first login

```
Firebase Auth

↓

UID

↓

Check users Collection

↓

Create Profile (if missing)

↓

Continue
```

The Authentication user and Firestore profile remain synchronized.

---

# 8. Firestore Architecture

Primary collections

```
users

missions

missionAssignments

submissions

resources

announcements

activityLogs
```

Collections remain flat.

Deep nesting is avoided.

---

# 9. Data Ownership

Each document has exactly one owner.

| Collection | Owner |
|------------|-------|
| users | Identity |
| missions | Admin |
| missionAssignments | Assignment Engine |
| submissions | Student |
| resources | Admin |
| announcements | Admin |
| activityLogs | System |

---

# 10. Storage Architecture

Firebase Storage contains binary assets only.

```
submission-images/

resources/

profile-images/
```

Firestore stores metadata.

Storage stores files.

---

# 11. Storage Structure

```
submission-images/

    studentId/

        submissionId.jpg

resources/

    missionId/

        resource.pdf

profile-images/

    uid.jpg
```

A predictable structure simplifies rule management.

---

# 12. Repository Mapping

Each repository owns one collection.

```
UserRepository

↓

users
```

```
MissionRepository

↓

missions
```

```
SubmissionRepository

↓

submissions
```

Repositories never access multiple domains unless explicitly required.

---

# 13. Firestore Rules Strategy

Rules enforce

- Authentication
- Authorization
- Ownership
- Field restrictions

Example

Student

✓ Read assigned missions

✓ Create own submissions

✗ Modify another student's submission

Admin

✓ Full access

Rules are the final security layer.

---

# 14. Storage Rules Strategy

Students

✓ Upload submission proof

✓ Read their own uploads

Admins

✓ Upload resources

✓ Delete resources

Uploads require authentication.

---

# 15. Firestore Indexes

Phase 1 indexes

```
studentId

missionId

status

role

createdAt

deadline

publishedAt
```

Composite indexes created only when Firestore recommends them.

---

# 16. Query Optimization

Guidelines

- Fetch only required fields
- Prefer indexed queries
- Use pagination
- Avoid full collection scans
- Reuse cached results

Firestore costs scale with reads.

---

# 17. Offline Strategy

Firestore offline persistence may be enabled.

Benefits

- Faster loading
- Reduced network dependency
- Better user experience

Conflicts are resolved using Firestore synchronization.

---

# 18. Emulator Strategy

Development should use Firebase Emulator Suite.

```
Authentication

Firestore

Storage
```

Benefits

- Safe local development
- Faster testing
- No production data
- No billing impact

---

# 19. Error Handling

Firebase errors are translated.

Example

```
permission-denied
```

↓

```
You do not have permission to perform this action.
```

SDK errors never reach the UI directly.

---

# 20. Configuration

Configuration lives in

```
firebase.ts

env.ts
```

Never hardcode

- Project IDs
- API Keys
- Buckets

Environment determines configuration.

---

# 21. Deployment

Deployable resources

```
Hosting

Firestore Rules

Firestore Indexes

Storage Rules
```

Future

```
Cloud Functions
```

---

# 22. Cost Optimization

Reduce Firestore costs by

- Indexed queries
- Pagination
- TanStack Query caching
- Small documents
- Minimal reads

Reduce Storage costs by

- Image compression
- File size limits
- Remove unused uploads

---

# 23. Monitoring

Future monitoring

- Firestore Reads
- Storage Usage
- Authentication Activity
- Error Rate
- Upload Frequency

Metrics guide optimization decisions.

---

# 24. Cloud Functions (Future)

Future responsibilities

```
GitHub Sync

Email Notifications

Submission Review Pipeline

AI Processing

Image Compression

Certificate Generation
```

Cloud Functions should contain orchestration—not business logic already implemented in Application Services.

---

# 25. App Check (Future)

Enable Firebase App Check to protect backend resources from unauthorized clients.

Supported providers may include:

- reCAPTCHA Enterprise (Web)
- Play Integrity (Android)
- DeviceCheck/App Attest (Apple)

App Check complements—but does not replace—Authentication and Security Rules.

---

# 26. Migration Strategy

If Firebase is replaced

```
React

↓

Services

↓

Repositories

↓

PostgreSQL

or

Supabase

or

Custom API
```

Business logic remains unchanged.

Only repository implementations change.

---

# 27. Firebase Anti-Patterns

Never

❌ Call Firebase directly from React Components

❌ Store business logic inside Cloud Functions

❌ Duplicate business data unnecessarily

❌ Disable Firestore Rules

❌ Store large files inside Firestore

❌ Hardcode Firebase configuration

❌ Use production Firebase for development

---

# 28. Firebase Architecture Diagram

```
                React Application
                       │
                       ▼
               TanStack Query
                       │
                       ▼
            Application Services
                       │
                       ▼
                Repository Layer
                       │
                       ▼
                Firebase SDK Layer
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
 Authentication   Firestore      Storage
        │              │              │
        └──────────────┼──────────────┘
                       ▼
               Firebase Platform
```

---

# 29. Future Evolution

Phase 1

- Authentication
- Firestore
- Storage
- Hosting

Phase 2

- Cloud Functions
- Notifications
- GitHub Integration

Phase 3

- AI Services
- Remote Config
- Analytics
- App Check

Future

- Hybrid Firebase + Dedicated Backend
- Event-driven Architecture
- Multi-region Infrastructure

---

# Definition of Done

Firebase Architecture is complete when:

- Authentication flow is defined.
- Firestore collections are documented.
- Storage structure is standardized.
- Security Rules strategy is established.
- Indexing strategy is documented.
- Emulator usage is defined.
- Deployment process is documented.
- Cost optimization guidelines are included.
- Future migration path is identified.