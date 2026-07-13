# 07 - Security Engineering

> "Security is not a feature that can be added later. It must be built into every layer of the system."

---

# Introduction

Security Engineering is the practice of designing, developing, deploying, and maintaining software that protects:

- Users
- Data
- Systems
- Infrastructure
- Business Operations

A secure application assumes that every external input is potentially malicious until proven otherwise.

Good security minimizes risks while maintaining usability and performance.

---

# Security Engineering Mindset

Every security decision should follow this order:

```
Identify Assets

↓

Identify Threats

↓

Protect

↓

Validate

↓

Monitor

↓

Respond

↓

Improve
```

Security is a continuous process, not a one-time task.

---

# 1. IDENTIFY

Before protecting a system, understand what needs protection.

## Identify Valuable Assets

Examples:

- User Accounts
- Passwords
- Payment Information
- Personal Data
- API Keys
- Databases
- Source Code
- Business Logic

### Remember

Protect what is valuable first.

---

## Identify Threats

Common threats include:

- Unauthorized Access
- Data Theft
- Malware
- SQL Injection
- Cross-Site Scripting (XSS)
- Cross-Site Request Forgery (CSRF)
- Brute Force Attacks
- Denial of Service (DoS)

---

# 2. PROTECT

Build multiple layers of protection.

---

## Authentication

Authentication answers:

> "Who are you?"

Examples:

- Username & Password
- JWT
- OAuth
- Google Login
- Multi-Factor Authentication (MFA)

---

## Authorization

Authorization answers:

> "What are you allowed to do?"

Examples:

- User Roles
- Permissions
- Access Control Lists (ACL)
- Role-Based Access Control (RBAC)

---

## Principle of Least Privilege

Every user or service should receive only the permissions it actually needs.

Never give administrator access unless required.

---

## Encryption

Protect sensitive information.

Encrypt:

- Passwords
- Tokens
- Sensitive Files
- Database Backups
- Network Traffic

Never store confidential information as plain text.

---

## Secure Communication

Always use HTTPS.

Never transmit:

- Passwords
- Tokens
- Personal Information

over insecure connections.

---

# 3. VALIDATE

Never trust external input.

---

## Input Validation

Validate:

- User Forms
- API Requests
- URL Parameters
- File Uploads
- JSON Data

Reject invalid input early.

---

## SQL Injection Prevention

Never build SQL queries using string concatenation.

Use:

- Prepared Statements
- Parameterized Queries
- ORM Frameworks

---

## Cross-Site Scripting (XSS)

Prevent malicious JavaScript execution.

Protect by:

- Escaping Output
- Sanitizing Input
- Content Security Policy (CSP)

---

## Cross-Site Request Forgery (CSRF)

Protect sensitive actions using:

- CSRF Tokens
- SameSite Cookies
- Origin Validation

---

## File Upload Validation

Always verify:

- File Type
- File Size
- MIME Type
- Virus Scan

Never trust the file extension alone.

---

# 4. STORE SECRETS SAFELY

Secrets should never appear inside source code.

Examples:

- API Keys
- Database Passwords
- JWT Secrets
- Cloud Credentials

Use:

- Environment Variables (.env)
- Secret Managers
- Cloud Vault Services

Never commit secrets to Git.

---

# 5. HANDLE PASSWORDS

Passwords require special care.

---

## Hash Passwords

Never store passwords directly.

Use strong hashing algorithms such as:

- bcrypt
- Argon2
- scrypt

---

## Password Policy

Encourage:

- Strong passwords
- Long passwords
- Unique passwords

Avoid unnecessary complexity rules that reduce usability.

---

## Multi-Factor Authentication

Whenever possible,

enable MFA for sensitive accounts.

---

# 6. DEFEND THE APPLICATION

Security continues after authentication.

---

## Rate Limiting

Limit repeated requests.

Protect against:

- Brute Force
- Spam
- API Abuse

---

## Session Management

Sessions should:

- Expire Automatically
- Be Invalidated on Logout
- Use Secure Cookies

---

## Error Handling

Never expose:

- Database Errors
- Stack Traces
- Server Configuration
- Internal Paths

Return safe error messages.

---

## Logging

Log security events:

- Login Attempts
- Permission Changes
- Failed Authentication
- Suspicious Activity

Avoid logging sensitive information.

---

# 7. MONITOR

Security requires continuous observation.

Monitor:

- Failed Logins
- API Abuse
- Traffic Spikes
- Unauthorized Access
- Permission Changes
- Suspicious Requests

Early detection reduces damage.

---

# 8. RESPOND

Prepare for incidents before they happen.

Have a plan for:

- Data Breaches
- Credential Leaks
- Server Compromise
- Ransomware
- DDoS Attacks

A fast response minimizes impact.

---

# Common Security Mistakes

❌ Hardcoding passwords.

❌ Trusting user input.

❌ Using HTTP instead of HTTPS.

❌ Storing plain-text passwords.

❌ Exposing internal errors.

❌ Giving excessive permissions.

❌ Ignoring dependency updates.

❌ Committing secrets to Git.

❌ No rate limiting.

❌ No authentication on sensitive APIs.

---

# Best Practices

✔ Validate every input.

✔ Escape every output.

✔ Hash every password.

✔ Encrypt sensitive data.

✔ Use HTTPS everywhere.

✔ Apply least privilege.

✔ Store secrets securely.

✔ Keep dependencies updated.

✔ Log security events.

✔ Review permissions regularly.

---

# AI Engineering Guidelines

When generating code:

1. Validate all external input.

2. Never hardcode secrets.

3. Use environment variables.

4. Hash passwords using modern algorithms.

5. Implement authentication before authorization.

6. Check permissions on every protected resource.

7. Sanitize user-generated content.

8. Use prepared database queries.

9. Return safe error messages.

10. Follow secure defaults.

---

# Security Decision Framework

```
External Input?

↓

Validate

↓

Sensitive Data?

↓

Encrypt / Hash

↓

Authentication Required?

↓

Authenticate

↓

Permission Needed?

↓

Authorize

↓

External Secret?

↓

Environment Variable

↓

Attack Detected?

↓

Log + Rate Limit + Respond
```

---

# Security Cheat Sheet

| Problem | Solution |
|----------|----------|
| SQL Injection | Parameterized Queries |
| XSS | Escape Output |
| CSRF | CSRF Token |
| Weak Password Storage | bcrypt / Argon2 |
| Hardcoded Secrets | Environment Variables |
| Brute Force | Rate Limiting |
| Unauthorized Access | Authentication