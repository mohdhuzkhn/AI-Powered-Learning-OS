# CODING_STANDARDS.md

> Version: 1.0
> Purpose: Universal coding standards for all software projects.
> Applies to: JavaScript, TypeScript, Python, Java, C#, Go, C++, and other modern programming languages.

---

# Philosophy

Code is read far more often than it is written.

Optimize for readability, maintainability, correctness, and simplicity—not for cleverness.

The best code is easy to understand, easy to test, easy to debug, and easy to modify.

---

# Core Principles

Always prioritize:

1. Readability
2. Simplicity
3. Maintainability
4. Reusability
5. Testability
6. Security
7. Performance (when necessary)

Follow these principles:

- KISS (Keep It Simple, Stupid)
- DRY (Don't Repeat Yourself)
- SOLID
- YAGNI (You Aren't Gonna Need It)
- Principle of Least Surprise

---

# File Organization

Each file should have one clear purpose.

Good

```
auth.service.ts
user.controller.ts
invoice.repository.ts
```

Bad

```
everything.js
utils2.js
newfile.js
temp.js
```

Avoid files larger than approximately 300–500 lines unless justified.

---

# Folder Organization

Prefer feature-based organization.

Good

```
src/

auth/

controllers/

services/

repositories/

middlewares/

routes/

tests/

config/

utils/
```

Avoid dumping unrelated files into one folder.

---

# Naming Conventions

## Variables

Use descriptive names.

Good

```javascript
studentCount
averageScore
isAuthenticated
```

Bad

```javascript
a
abc
temp
x
data1
```

---

## Constants

Use uppercase for true constants.

```javascript
MAX_RETRY_COUNT
API_TIMEOUT
DEFAULT_PAGE_SIZE
```

---

## Boolean Variables

Always start with:

```
is
has
can
should
was
```

Examples

```
isLoggedIn

hasPermission

canEdit

shouldRetry
```

---

## Functions

Function names should describe actions.

Good

```
calculateTotal()

fetchStudents()

generateInvoice()

validateEmail()
```

Bad

```
doStuff()

handle()

run()

abc()
```

---

## Classes

Use nouns.

```
UserService

StudentRepository

EmailSender

InvoiceGenerator
```

---

# Function Design

Each function should:

- Perform one responsibility
- Have one clear purpose
- Be easy to test
- Avoid unnecessary side effects

Preferred length

20–40 lines.

If a function exceeds ~50 lines, consider refactoring.

---

# Function Parameters

Prefer fewer parameters.

Bad

```javascript
createUser(
name,
age,
phone,
address,
email,
city,
country,
zip
)
```

Better

```javascript
createUser(user)
```

Use configuration objects where appropriate.

---

# Return Values

Functions should return meaningful values.

Avoid returning unrelated data.

Good

```javascript
return updatedUser;
```

Bad

```javascript
return true;
```

unless success/failure is the only concern.

---

# Single Responsibility Principle

Every function should answer one question:

"What is my only responsibility?"

If there are multiple answers, split the function.

---

# Avoid Deep Nesting

Bad

```javascript
if(a){
    if(b){
        if(c){
            if(d){
            }
        }
    }
}
```

Prefer early returns.

```javascript
if(!user)
    return;

if(!user.isActive)
    return;

processUser(user);
```

---

# Avoid Magic Numbers

Bad

```javascript
if(age > 18)
```

Good

```javascript
const MINIMUM_AGE = 18;

if(age > MINIMUM_AGE)
```

---

# Comments

Comments should explain WHY.

Not WHAT.

Bad

```javascript
// increment i

i++;
```

Good

```javascript
// Retry after temporary network failure.

retryCount++;
```

---

# Documentation Comments

Public functions should include documentation when helpful.

Example

```javascript
/**
 * Calculates student GPA.
 *
 * @param grades
 * @returns GPA
 */
```

---

# Error Handling

Never silently ignore errors.

Bad

```javascript
catch {}
```

Good

```javascript
catch(error){

logger.error(error);

throw new Error("Unable to save user.");

}
```

---

# Exception Messages

Provide meaningful messages.

Bad

```
Error

Something went wrong
```

Good

```
User not found.

Database connection timed out.

Email already exists.
```

---

# Input Validation

Never trust incoming data.

Validate

- Required fields
- Types
- Length
- Range
- Format

Reject invalid input immediately.

---

# Defensive Programming

Always assume:

- APIs may fail.
- Users enter invalid input.
- Files may not exist.
- Networks disconnect.
- Databases timeout.

Code accordingly.

---

# Immutability

Avoid modifying shared objects.

Prefer creating new objects.

Good

```javascript
return {
...user,
isActive: true
};
```

---

# Code Duplication

If logic appears more than twice,

consider extracting it.

Do not create abstractions too early.

---

# Configuration

Never hardcode

- URLs
- API Keys
- Secrets
- Passwords

Use

```
.env
```

or secure secret managers.

---

# Logging

Log

- Errors
- Warnings
- Startup events
- Important actions

Never log

Passwords

JWTs

Secrets

Credit cards

Personal information

---

# Async Code

Prefer

```
async/await
```

Avoid deeply nested Promise chains.

Always handle rejection.

---

# API Calls

Always

Handle

- Timeout
- Retry
- Invalid JSON
- Rate limits
- Server errors

Never assume success.

---

# Database Queries

Prefer

Parameterized queries.

Avoid

```
SELECT *
```

Retrieve only required columns.

Use indexes where appropriate.

Avoid N+1 queries.

---

# Performance

Optimize only after identifying bottlenecks.

Avoid

Repeated calculations

Repeated database queries

Nested loops

Repeated API calls

Prefer

Caching

Pagination

Memoization

Batch processing

Lazy loading

---

# Security

Validate all input.

Escape output.

Hash passwords.

Use HTTPS.

Implement authorization.

Implement authentication.

Never trust the client.

---

# Testing

Every important function should be testable.

Test

✓ Happy path

✓ Invalid input

✓ Empty input

✓ Edge cases

✓ Failure scenarios

---

# Code Review Checklist

Before committing ask:

✓ Is naming descriptive?

✓ Is duplication minimized?

✓ Is logic simple?

✓ Are edge cases handled?

✓ Are errors handled?

✓ Is code secure?

✓ Is code readable?

✓ Is the code testable?

✓ Is documentation updated?

---

# Language-Specific Formatting

Use automatic formatters.

JavaScript / TypeScript

- ESLint
- Prettier

Python

- Black
- Ruff
- Flake8

Go

- gofmt

Java

- Google Java Format

C#

- dotnet format

Never manually fight your formatter.

---

# Code Smells

Watch for:

- Long methods
- Large classes
- Duplicate logic
- Deep nesting
- Long parameter lists
- Feature envy
- Shotgun surgery
- God objects
- Circular dependencies

If you notice one, consider refactoring.

---

# Refactoring Rules

Refactor to improve:

- Readability
- Naming
- Simplicity
- Performance
- Testability
- Modularity

Never change behavior unless required.

---

# Pull Request Standards

Every PR should:

- Solve one problem
- Be easy to review
- Include tests when applicable
- Update documentation
- Avoid unrelated changes

Small PRs are preferred.

---

# Definition of Done

Code is complete only when:

✓ Requirements met

✓ Build succeeds

✓ Tests pass

✓ Error handling included

✓ Documentation updated

✓ No obvious code smells

✓ No unnecessary duplication

✓ Security considered

✓ Performance considered

✓ Readability verified

---

# Golden Standard

Every line of code should answer:

- Is this necessary?
- Is this readable?
- Is this maintainable?
- Is this secure?
- Is this testable?
- Would another engineer understand this immediately?

If the answer to any question is "No", improve the code before considering it complete.