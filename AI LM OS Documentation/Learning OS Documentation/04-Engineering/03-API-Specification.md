---
title: API Specification
document: 03-API-Specification.md
version: 1.0.0
status: Approved

owner: Muhammad Huzaifa Khan

phase: Phase 1

priority: Critical
---

# API Specification

---

# 1. Purpose

This document defines the public service contracts of Learning OS.

During Phase 1, Firebase acts as the backend, so the platform does not expose traditional REST endpoints.

Instead, every business capability exposes a **Service API**.

This document defines those contracts.

---

# 2. API Philosophy

Learning OS follows a Service-Oriented Architecture.

```
UI

↓

Application Service

↓

Repository

↓

Firestore
```

Components communicate only with services.

Repositories communicate only with Firestore.

---

# 3. API Principles

✓ Business-first naming

✓ Consistent responses

✓ Predictable errors

✓ Strong typing

✓ Role validation

✓ No direct database access

---

# 4. Standard Response

Every service returns the same response format.

```ts
{
  success: boolean,
  data?: T,
  error?: {
    code: string,
    message: string
  }
}
```

---

# 5. Authentication Service

## loginWithGoogle()

Purpose

Authenticate user with Google.

Returns

```
User
```

---

## logout()

Purpose

Terminate current session.

Returns

```
Success
```

---

## getCurrentUser()

Purpose

Return authenticated user.

---

## getUserRole()

Purpose

Resolve RBAC permissions.

---

# 6. Dashboard Service

## getDashboard()

Returns

Admin Dashboard

or

Student Dashboard

depending on role.

---

## getDashboardStats()

Returns

- Active Missions
- Pending Reviews
- Completed Missions
- Recent Activity

---

# 7. Mission Service

## createMission()

Admin only.

---

## updateMission()

Admin only.

---

## archiveMission()

Admin only.

---

## publishMission()

Admin only.

---

## assignMission()

Admin only.

Assigns a mission to one or more students.

---

## getMission()

Returns mission details.

---

## getAssignedMissions()

Returns missions assigned to a student.

---

# 8. Submission Service

## submitMission()

Student uploads:

- Screenshot
- Description

Creates submission.

---

## reviewSubmission()

Admin only.

Updates

Approved

Rejected

Feedback

---

## getSubmission()

Returns submission.

---

## getStudentSubmissions()

Returns student's submission history.

---

# 9. Resource Service

## createResource()

Admin only.

---

## updateResource()

Admin only.

---

## deleteResource()

Admin only.

---

## getResources()

Returns all resources.

---

## getMissionResources()

Returns resources attached to a mission.

---

# 10. Announcement Service

## publishAnnouncement()

Admin only.

---

## updateAnnouncement()

Admin only.

---

## archiveAnnouncement()

Admin only.

---

## getAnnouncements()

Returns published announcements.

---

# 11. Activity Service

## createActivity()

Internal service.

---

## getActivityFeed()

Returns dashboard activity.

---

# 12. Authorization Rules

Student

Can

- View assigned missions
- Submit work
- View resources
- Read announcements

Cannot

- Publish missions
- Review submissions
- Create announcements

---

Admin

Can access every service.

---

# 13. Error Codes

```
AUTH_REQUIRED

PERMISSION_DENIED

MISSION_NOT_FOUND

SUBMISSION_NOT_FOUND

RESOURCE_NOT_FOUND

VALIDATION_ERROR

UPLOAD_FAILED

NETWORK_ERROR

UNKNOWN_ERROR
```

---

# 14. Validation

Every service validates

- Authentication
- Authorization
- Required Fields
- Business Rules

before repository access.

---

# 15. Versioning

Current Version

```
v1
```

Future versions

```
v2

v3
```

Business contracts should remain backward compatible whenever possible.

---

# 16. Future REST Mapping

If Learning OS adopts a backend server, services map naturally to REST endpoints.

Example

```
MissionService.createMission()

↓

POST /missions
```

```
MissionService.getMission()

↓

GET /missions/{id}
```

```
MissionService.assignMission()

↓

POST /missions/{id}/assign
```

The service contract remains unchanged.

---

# 17. API Security

Every service must:

- Verify authentication.
- Verify RBAC.
- Validate input.
- Return standardized errors.
- Never expose internal implementation details.

---

# 18. API Design Rules

✓ Use business terminology.

✓ Keep services stateless.

✓ Return typed objects.

✓ Never expose Firestore documents directly.

✓ Hide infrastructure details.

✓ Prefer business operations over CRUD.

---

# Service Dependency Diagram

```
React Components
        │
        ▼
Application Services
        │
 ┌──────┼──────────────┐
 ▼      ▼              ▼
Mission Submission Announcement
Service Service      Service
        │
        ▼
Repositories
        │
        ▼
Firestore
```

---

# Definition of Done

The API Specification is complete when:

- Every domain exposes a service.
- Service responsibilities are documented.
- Response format is standardized.
- Error handling is defined.
- Authorization rules are documented.
- Future backend migration is supported.