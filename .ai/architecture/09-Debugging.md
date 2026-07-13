# 09 - Debugging Engineering

> "Debugging is not guessing. It is the systematic process of finding, understanding, and eliminating the root cause of a problem."

---

# Introduction

Debugging is one of the most valuable skills for a software engineer.

Writing code creates software.

Debugging keeps software reliable.

Professional engineers don't fix symptoms—they identify and eliminate the root cause.

A good debugger thinks like a detective:

- Gather evidence
- Form hypotheses
- Test assumptions
- Verify the solution

---

# Debugging Mindset

Every debugging session should follow this order:

```
Reproduce

↓

Observe

↓

Isolate

↓

Find Root Cause

↓

Fix

↓

Verify

↓

Prevent
```

Never guess.

Always follow evidence.

---

# 1. REPRODUCE

A bug that cannot be reproduced is difficult to fix.

Before changing code:

- What happened?
- When did it happen?
- Can it happen again?
- What steps reproduce it?

Document the exact sequence.

---

## Gather Information

Collect:

- Error Messages
- Logs
- Screenshots
- Stack Traces
- Inputs
- Environment
- Browser / Device
- API Responses

The more information you have, the faster you'll solve the problem.

---

# 2. OBSERVE

Observe the system before changing anything.

Ask:

- What is expected?
- What actually happened?
- What changed?
- Which component failed?

Separate facts from assumptions.

---

## Read Error Messages

Never ignore an error message.

Look for:

- File Name
- Function Name
- Line Number
- Exception Type
- Stack Trace

Most answers are already in the error output.

---

## Read the Stack Trace

A stack trace shows the execution path that led to the error.

Instead of reading from top to bottom,

follow the call chain until you reach the root cause.

---

# 3. ISOLATE

Don't inspect the entire application.

Reduce the problem.

---

## Binary Search Debugging

Split the execution path.

Example:

```
Input

↓

Step A

↓

Step B

↓

Step C

↓

Output
```

If the problem appears after Step B,

the bug is between B and C.

Keep narrowing until the exact line is found.

---

## Disable Components

Temporarily remove unrelated code.

Smaller systems are easier to debug.

---

## Test One Change at a Time

Changing multiple things creates confusion.

Make one change.

Test.

Repeat.

---

# 4. FIND THE ROOT CAUSE

Symptoms are not causes.

Example:

```
Application Crash

↓

Null Object

↓

Missing API Data

↓

Incorrect Validation
```

The crash is only the symptom.

The missing validation is the root cause.

Always ask:

> "Why did this happen?"

Repeat until the actual cause is found.

---

## Common Root Causes

- Invalid Input
- Incorrect Logic
- Wrong Assumptions
- Race Conditions
- Configuration Errors
- Network Failure
- Database Issues
- Dependency Problems

---

# 5. FIX

After understanding the cause,

implement the smallest correct solution.

Avoid:

- Random code changes
- Temporary hacks
- Ignoring the actual problem

Fix the cause—not the symptom.

---

## Keep Fixes Small

Small fixes are:

- Easier to review
- Easier to test
- Less likely to introduce new bugs

---

# 6. VERIFY

A bug is not fixed until it is verified.

Test:

- Original scenario
- Edge cases
- Related functionality
- Regression cases

Ensure the fix did not create new problems.

---

## Add a Test

Every bug should produce a new test.

This prevents the same bug from returning.

---

# 7. PREVENT

Learn from every bug.

Ask:

- Why was this bug introduced?
- Could better testing have prevented it?
- Was validation missing?
- Was documentation unclear?
- Can tooling detect this automatically?

Continuous improvement reduces future bugs.

---

# Debugging Tools

Use the right tool for the problem.

Examples:

- IDE Debugger
- Breakpoints
- Watch Variables
- Logging
- Browser Developer Tools
- Network Inspector
- Database Query Logs
- Profilers

Choose evidence over intuition.

---

# Logging

Logs help explain what happened.

Good logs should include:

- Timestamp
- Request ID
- User ID (when appropriate)
- Error Details
- Context

Avoid logging sensitive information.

---

# Breakpoints

Breakpoints pause execution.

Use them to inspect:

- Variable Values
- Function Calls
- Program Flow
- Object State

Debuggers often provide more information than print statements.

---

# Print Debugging

Simple logging (`console.log`, `print`) is useful for quick investigations.

However,

avoid leaving debug statements in production code.

---

# Common Debugging Mistakes

❌ Guessing the solution.

❌ Ignoring stack traces.

❌ Changing multiple files at once.

❌ Fixing symptoms instead of causes.

❌ Skipping verification.

❌ Not reproducing the bug.

❌ Removing error messages.

❌ Ignoring logs.

❌ Creating permanent "temporary" fixes.

❌ Closing the issue without adding tests.

---

# Best Practices

✔ Reproduce every bug.

✔ Read the entire error message.

✔ Follow the stack trace.

✔ Isolate the problem.

✔ Change one thing at a time.

✔ Fix the root cause.

✔ Verify the solution.

✔ Add regression tests.

✔ Document important discoveries.

✔ Learn from every bug.

---

# AI Engineering Guidelines

When generating code:

1. Read the error before suggesting solutions.

2. Analyze stack traces carefully.

3. Identify the failing component.

4. Avoid making multiple unrelated changes.

5. Explain the likely root cause.

6. Recommend verification steps.

7. Suggest regression tests.

8. Preserve existing functionality.

9. Avoid speculative fixes.

10. Prefer evidence-based debugging.

---

# Debugging Decision Framework

```
Bug Report

↓

Reproduce

↓

Collect Logs & Errors

↓

Read Stack Trace

↓

Isolate Problem

↓

Find Root Cause

↓

Apply Small Fix

↓

Verify

↓

Add Regression Test

↓

Close Issue
```

---

# Debugging Cheat Sheet

| Problem | First Action |
|----------|--------------|
| Application Crash | Read Stack Trace |
| Wrong Output | Verify Inputs |
| Slow Performance | Profile Application |
| API Failure | Inspect Request & Response |
| Database Error | Check Query & Connection |
| Authentication Issue | Verify Tokens & Permissions |
| Memory Leak | Monitor Memory Usage |
| UI Bug | Inspect DOM & Browser Console |
| Random Failure | Try to Reproduce Consistently |
| Unknown Error | Collect More Evidence |

---

# Golden Rules

✔ Never guess.

✔ Reproduce before fixing.

✔ Read the full error message.

✔ Trust evidence, not assumptions.

✔ Fix the root cause.

✔ Make one change at a time.

✔ Verify every fix.

✔ Every bug deserves a regression test.

✔ Document unusual issues.

✔ Great debuggers solve problems systematically.

---

# Summary

Debugging is a structured engineering process—not trial and error.

Professional engineers:

- Reproduce problems consistently.
- Collect evidence before acting.
- Read stack traces carefully.
- Isolate failures systematically.
- Fix the underlying cause.
- Verify the solution thoroughly.
- Prevent the bug from returning.

The goal of debugging is not just to make the error disappear—it is to understand why it happened and ensure it cannot happen again.

---

> **Final Thought**

> **"The best debugger is not the fastest coder—it is the engineer who asks the right questions, follows the evidence, and solves the real problem instead of masking the symptoms."**