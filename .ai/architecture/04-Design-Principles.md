# 04 - Design Principles

> "Good software isn't written by accident. It is built by following timeless engineering principles."

---

# Introduction

Design principles are fundamental guidelines that help engineers build software that is readable, maintainable, scalable, and reliable.

Unlike Design Patterns, which solve recurring design problems, Design Principles shape **how engineers think** before writing code.

Think of them as the rules that influence every architectural and coding decision.

---

# Engineering Workflow

Every engineering decision should follow this order:

```
Think

↓

Design

↓

Organize

↓

Build

↓

Protect

↓

Optimize

↓

Review
```

---

# 1. THINK

Before writing code, understand the problem.

## KISS (Keep It Simple)

**Idea**

Always choose the simplest solution that solves the problem.

Avoid unnecessary complexity.

### Remember

> Simple code is easier to understand, test, and maintain.

---

## YAGNI (You Aren't Gonna Need It)

**Idea**

Don't build features until they are actually required.

Avoid solving imaginary future problems.

### Remember

> Build for today's requirements, not tomorrow's assumptions.

---

## Readability First

Code is read far more often than it is written.

Always optimize for readability before cleverness.

### Remember

Future developers—including yourself—should understand the code quickly.

---

# 2. DESIGN

Design the solution before implementing it.

## DRY (Don't Repeat Yourself)

Avoid duplicating knowledge.

If the same logic appears multiple times, consider extracting it.

### Remember

Duplicate logic creates duplicate bugs.

---

## Single Source of Truth (SSOT)

Every piece of information should have one authoritative location.

Avoid maintaining multiple copies of the same data.

### Remember

One change should require one update.

---

## Program to Interfaces

Depend on abstractions rather than concrete implementations.

This improves flexibility and testing.

### Remember

Replace implementations without changing business logic.

---

## Composition over Inheritance

Prefer combining objects instead of creating deep inheritance trees.

### Remember

Composition is usually more flexible than inheritance.

---

# 3. ORGANIZE

Structure the system so components remain independent.

## Separation of Concerns (SoC)

Each module should have one clear responsibility.

Example:

- UI
- Business Logic
- Database

should remain separate.

---

## High Cohesion

Keep related functionality together.

A module should focus on one responsibility.

---

## Low Coupling

Reduce dependencies between modules.

Changing one module should have minimal impact on others.

---

## Modularity

Break software into independent, reusable modules.

Benefits:

- Easier testing
- Easier maintenance
- Better scalability

---

# 4. BUILD

Write code that is reliable and maintainable.

## Abstraction

Hide unnecessary implementation details.

Expose only what users need.

---

## Encapsulation

Keep an object's data and behavior together.

Protect internal state from unintended modification.

---

## Information Hiding

Hide implementation details behind clean interfaces.

Clients should not know how something works internally.

---

## Defensive Programming

Never assume input is valid.

Validate:

- User Input
- API Responses
- Configuration
- File Data

---

## Fail Fast

Detect problems as early as possible.

Fail immediately instead of producing incorrect results later.

---

# 5. PROTECT

Build software that behaves safely.

## Immutability

Avoid changing shared data whenever possible.

Immutable data reduces bugs.

---

## Command Query Separation (CQS)

A function should either:

- Return data

or

- Change state

Never both.

---

## Principle of Least Astonishment

Software should behave exactly as users expect.

Avoid surprising behavior.

---

# 6. OPTIMIZE

Improve software only after correctness.

## Avoid Premature Optimization

Don't optimize code that hasn't become a bottleneck.

Measure first.

Optimize second.

---

## Performance vs Readability

Readable code usually wins.

Only sacrifice readability when measurable performance improvements justify it.

---

## Technical Debt

Every shortcut has a future cost.

Sometimes debt is acceptable—but it must be intentional and documented.

---

# 7. REVIEW

Before shipping, evaluate the solution.

Ask yourself:

✓ Is it simple?

✓ Is duplication removed?

✓ Is each module responsible for one thing?

✓ Are dependencies minimized?

✓ Is the code readable?

✓ Is input validated?

✓ Can it be tested easily?

✓ Is it maintainable?

✓ Is it scalable?

---

# AI Engineering Guidelines

When generating code, AI should:

1. Understand the problem before coding.

2. Prefer simple solutions.

3. Avoid unnecessary abstractions.

4. Keep functions small.

5. Separate concerns.

6. Validate all external input.

7. Write readable code.

8. Avoid duplication.

9. Optimize only when necessary.

10. Leave the code easier to understand than before.

---

# Decision Framework

```
Need simplicity?
↓

KISS

Need to remove duplication?
↓

DRY

Need future flexibility?
↓

Interfaces

Need independent modules?
↓

Separation of Concerns

Need reusable components?
↓

Composition

Need safe software?
↓

Defensive Programming

Need better maintainability?
↓

High Cohesion + Low Coupling

Need optimization?
↓

Measure First

Need final validation?
↓

Engineering Checklist
```

---

# Golden Rules

✔ Solve the right problem before writing code.

✔ Prefer simple over clever.

✔ Don't duplicate knowledge.

✔ Separate responsibilities.

✔ Depend on abstractions.

✔ Hide implementation details.

✔ Validate everything.

✔ Optimize after measuring.

✔ Leave the code cleaner than you found it.

---

# Summary

| Phase | Principles |
|---------|-------------------------------|
| Think | KISS, YAGNI, Readability |
| Design | DRY, SSOT, Interfaces, Composition |
| Organize | SoC, Cohesion, Coupling, Modularity |
| Build | Abstraction, Encapsulation, Information Hiding, Defensive Programming, Fail Fast |
| Protect | Immutability, CQS, Least Astonishment |
| Optimize | Measure First, Performance, Technical Debt |
| Review | Engineering Checklist |

---

> **Golden Rule**

> **"Great software is not the result of writing more code—it's the result of making better engineering decisions."**