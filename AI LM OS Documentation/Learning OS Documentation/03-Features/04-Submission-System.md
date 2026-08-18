---
title: Submission System
document: 04-Submission-System.md
version: 1.0.0
status: Approved
phase: Phase 1
module: Submission System

owner: Muhammad Huzaifa Khan

priority: Critical

related_documents:
  - 01-Authentication.md
  - 02-Dashboard.md
  - 03-Mission-System.md
  - 02-Phase-1-PRD.md
  - 02-User-Stories.md
---

# Submission System

> A structured workflow for students to submit proof of completed work and for administrators to review, approve, or request revisions.

---

# Purpose

The Submission System is responsible for validating mission completion.

Instead of simply marking a task as "Done", students must provide evidence of their work. This evidence is reviewed by an administrator before the mission is considered complete.

The submission workflow should be simple, transparent, and scalable.

---

# Goals

The Submission System should:

- Collect proof of completed work.
- Support administrator review.
- Maintain submission history.
- Track review status.
- Enable resubmissions.
- Prepare for future GitHub integration.

---

# Scope

## Included in Phase 1

- Submit Mission
- Upload Screenshot
- Submission Description
- Review Submission
- Approve Submission
- Reject Submission
- Feedback
- Resubmission
- Submission History

---

## Excluded from Phase 1

- GitHub Repository Review
- Multiple File Uploads
- Video Submission
- PDF Reports
- AI Code Review
- Peer Review
- Automatic Grading
- Version Comparison

---

# Submission Philosophy

A submission is evidence that a mission has been completed.

The platform should verify work through a human review process rather than automatically assuming completion.

---

# Actors

## Student

Can

- Submit assigned missions
- Upload screenshot
- Add description
- View submission status
- Read feedback
- Resubmit rejected work

Cannot

- Approve submissions
- Reject submissions
- Modify review status

---

## Administrator

Can

- View submissions
- Review submissions
- Approve
- Reject
- Leave feedback

Cannot

- Submit work as a student

---

# Submission Lifecycle

```
Not Started
      │
      ▼
Submitted
      │
      ▼
Under Review
      │
 ┌────┴────┐
 ▼         ▼
Approved  Rejected
              │
              ▼
        Resubmitted
              │
              ▼
        Under Review
```

---

# Submission Status

Supported values

- Not Started
- Submitted
- Under Review
- Approved
- Rejected

---

# User Flows

## Student Flow

```
Dashboard
      │
Mission Details
      │
Submit Work
      │
Upload Screenshot
      │
Write Description
      │
Submit
      │
Wait for Review
      │
Approved / Rejected
```

---

## Admin Flow

```
Dashboard
      │
Pending Reviews
      │
Open Submission
      │
Review Evidence
      │
Approve / Reject
      │
Leave Feedback
```

---

# UI Components

## Submission Form

Contains

- Screenshot Upload
- Description
- Submit Button
- Cancel Button

---

## Submission Card

Displays

- Mission Title
- Student Name
- Submitted Date
- Review Status

---

## Review Panel

Displays

- Screenshot Preview
- Student Description
- Feedback Box
- Approve Button
- Reject Button

---

## Submission History

Displays

- Submission Date
- Status
- Feedback
- Last Updated

---

# Functional Requirements

## FR-SUB-001

Students shall submit work for assigned missions.

Priority

Critical

---

## FR-SUB-002

Students shall upload one screenshot.

Priority

Critical

---

## FR-SUB-003

Students shall provide a description.

Priority

Critical

---

## FR-SUB-004

Administrators shall review submissions.

Priority

Critical

---

## FR-SUB-005

Administrators shall approve or reject submissions.

Priority

Critical

---

## FR-SUB-006

Rejected submissions shall allow resubmission.

Priority

Critical

---

## FR-SUB-007

Students shall view submission history.

Priority

High

---

# Business Rules

BR-SUB-001

Only assigned students may submit work.

---

BR-SUB-002

One active submission is allowed per assignment.

---

BR-SUB-003

A screenshot is mandatory.

---

BR-SUB-004

A description is mandatory.

---

BR-SUB-005

Approved submissions cannot be edited.

---

BR-SUB-006

Rejected submissions may be resubmitted.

---

BR-SUB-007

Every review should contain a decision.

---

# Validation Rules

Screenshot

- Required
- Image only
- Maximum 5 MB

Description

- Required
- Maximum 2000 characters

Submission

- Mission must be assigned.
- Deadline rules enforced (based on assignment policy).

---

# Review Workflow

Administrator reviews

- Screenshot
- Description

Administrator then chooses

- Approve
- Reject

Optional

- Feedback

If rejected

Student receives updated status and can submit a revised version.

---

# Database Collections

```
submissions
```

Relationships

```
missionAssignments
        │
        ▼
submissions
```

Suggested document

```json
{
  "assignmentId": "assignment_001",
  "studentId": "student_001",
  "status": "Submitted",
  "description": "Completed authentication module.",
  "screenshotUrl": "...",
  "feedback": "",
  "submittedAt": "...",
  "reviewedAt": null,
  "reviewedBy": null
}
```

---

# File Storage

Submission screenshots should be stored in Firebase Storage.

Suggested path

```
submissions/

studentId/

assignmentId/

screenshot.png
```

Store only the download URL in Firestore.

---

# State Management

Submission module maintains

- Current Submission
- Upload Progress
- Review Status
- Loading State
- Error State

---

# Security

Students

- Can create their own submissions.
- Can read their own submissions.
- Cannot review submissions.

Administrators

- Can read every submission.
- Can review every submission.
- Can update review status.

All permissions must be enforced using Firestore Security Rules.

---

# Performance

The system should

- Compress images before upload (optional).
- Upload files asynchronously.
- Display upload progress.
- Avoid duplicate submissions.
- Lazy-load submission history.

---

# Error Handling

Examples

Upload failed.

Image too large.

Unsupported file type.

Submission already exists.

Network unavailable.

Permission denied.

Submission not found.

Provide user-friendly messages and recovery actions where possible.

---

# Edge Cases

Student closes browser during upload.

Mission archived after submission.

Administrator reviews deleted submission.

Duplicate submit button clicks.

Slow internet connection.

Student refreshes page during upload.

The system should recover without data loss whenever possible.

---

# Future Enhancements

Phase 2

- GitHub Repository Submission
- Multiple Attachments
- Drag-and-Drop Uploads
- Rich Text Description
- Submission Deadlines Dashboard

Phase 3

- AI Code Review
- AI Screenshot Analysis
- AI Feedback Suggestions
- Automatic Skill Detection
- AI Quality Score

---

# Acceptance Criteria

Submission System is complete when

- Students can submit assigned work.
- Screenshot upload succeeds.
- Description is saved.
- Submission status updates correctly.
- Administrators can review submissions.
- Approval and rejection workflows function correctly.
- Feedback is visible to students.
- Resubmission works after rejection.
- Security rules prevent unauthorized access.
- Responsive UI is verified.

---

# Testing Checklist

## Functional

- Create Submission
- Upload Screenshot
- Save Description
- Review Submission
- Approve Submission
- Reject Submission
- Resubmit Work
- View Submission History

---

## Security

- Student cannot review submissions.
- Student cannot view other students' submissions.
- Admin can review all submissions.
- Storage rules verified.

---

## Performance

- Upload progress displayed.
- Large image handling verified.
- Upload retry tested.
- Firestore reads optimized.

---

# AI Agent Context

The Submission System is tightly coupled with the Mission System but should remain an independent module.

Implementation guidelines

- Never embed submission data inside mission documents.
- Link submissions through assignment IDs.
- Keep review logic separate from upload logic.
- Store files in Firebase Storage and metadata in Firestore.
- Design the data model to support future GitHub submissions and AI review without schema redesign.

Before implementation, AI coding agents should review:

1. Product Vision
2. Phase 1 PRD
3. Authentication Specification
4. Dashboard Specification
5. Mission System Specification
6. Submission System Specification

---

# Definition of Done

The Submission System is considered complete when:

- Students can submit evidence for assigned missions.
- Administrators can review, approve, or reject submissions.
- Feedback and status updates are visible.
- Resubmission workflow functions correctly.
- Firestore and Storage security rules are enforced.
- Upload and review workflows are tested.
- Documentation matches implementation.