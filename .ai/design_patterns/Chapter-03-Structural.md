# Chapter 3 — Structural Design Patterns

---

# 3.1 Introduction to Structural Design Patterns

> **"Structural Patterns focus on how classes and objects are organized to build flexible, maintainable, and scalable software systems."**

---

# Learning Objectives

After completing this chapter, you should be able to:

- Understand the purpose of Structural Design Patterns.
- Identify problems solved by each structural pattern.
- Choose the correct structural pattern for a given architecture.
- Recognize structural patterns in modern frameworks.
- Refactor tightly coupled code into loosely coupled systems.
- Guide AI coding agents to generate better architectures.

---

# What are Structural Design Patterns?

After objects have been **created** (Creational Patterns),

the next question becomes:

> **"How should these objects work together?"**

That is exactly what Structural Patterns answer.

Instead of focusing on object creation,

Structural Patterns focus on:

- Relationships
- Composition
- Wrappers
- Interfaces
- Object organization
- Communication boundaries

They define **how different parts of a system are connected.**

---

# Simple Analogy

Imagine constructing a city.

### Creational Patterns

Build:

- Houses
- Schools
- Hospitals
- Offices

Now everything exists.

---

### Structural Patterns

Now connect everything.

Build:

- Roads
- Bridges
- Highways
- Metro Lines
- Internet Cables

Without these connections,

the city cannot function.

Structural Patterns are those **connections**.

---

# Another Analogy

Think about LEGO.

Creational Patterns manufacture LEGO bricks.

Structural Patterns determine **how the bricks fit together**.

The bricks remain the same,

but different structures produce:

- Houses
- Cars
- Castles
- Robots

---

# Core Philosophy

Structural Patterns answer questions like:

- How can two incompatible systems communicate?
- How can we simplify a huge subsystem?
- How can we add new behavior without modifying existing code?
- How can we control access to an object?
- How can we treat individual and grouped objects uniformly?
- How can we reduce memory usage?
- How can we separate abstraction from implementation?

---

# Why Structural Patterns Matter

As software grows,

applications become collections of:

- APIs
- Databases
- Services
- UI Components
- Authentication Systems
- Payment Providers
- External SDKs

Without proper structure,

everything becomes tightly coupled.

Example:

```
UserService

↓

PaymentService

↓

EmailService

↓

Database

↓

Logging

↓

Authentication

↓

Analytics
```

Every component depends on every other component.

Changing one module breaks many others.

---

Structural Patterns organize these relationships.

Instead of

```
Everything

↓

Connected to Everything
```

Prefer

```
Application

↓

Simple Interfaces

↓

Independent Components
```

This dramatically improves maintainability.

---

# Characteristics of Structural Patterns

Structural Patterns typically:

✔ Reduce coupling

✔ Improve flexibility

✔ Increase maintainability

✔ Encourage composition

✔ Simplify integrations

✔ Hide complexity

✔ Promote reusable architectures

---

# Composition over Inheritance

One of the biggest ideas behind Structural Patterns is:

> **Favor Composition over Inheritance.**

Instead of inheriting behavior,

combine objects.

Bad

```
Animal

↓

Dog

↓

PoliceDog

↓

MilitaryDog

↓

SpecialMilitaryPoliceDog
```

Hierarchy becomes enormous.

Better

```
Dog

+

CanRun

+

CanTrack

+

CanAttack
```

Small reusable components.

Modern frameworks strongly prefer composition.

---

# Where Structural Patterns Are Used

You already use them—even if you don't recognize their names.

Examples include:

### Web Applications

- React
- Angular
- Vue
- Next.js

---

### Backend

- Express
- NestJS
- Spring Boot
- ASP.NET Core
- Django

---

### Cloud

- AWS SDK
- Azure SDK
- Google Cloud SDK

---

### Mobile

- Flutter
- Android
- SwiftUI

---

### Desktop

- Electron
- Qt
- .NET WPF

---

# The Seven GoF Structural Patterns

This chapter covers:

---

## 1. Facade ⭐⭐⭐⭐⭐

Hide complexity behind one simple interface.

Example:

```
PaymentSDK.pay()
```

internally performs:

- Validation
- Fraud Detection
- Payment
- Receipt
- Logging

The client sees only one method.

---

## 2. Adapter ⭐⭐⭐⭐⭐

Allows incompatible systems to communicate.

Example:

Old Payment API

↓

Adapter

↓

New Payment API

---

## 3. Decorator ⭐⭐⭐⭐⭐

Adds behavior without modifying existing classes.

Examples:

- Logging
- Compression
- Authentication
- Middleware

---

## 4. Proxy ⭐⭐⭐⭐⭐

Controls access to another object.

Examples:

- Authentication
- Lazy Loading
- Rate Limiting
- Caching

---

## 5. Composite

Treat individual objects and groups uniformly.

Examples:

- Folder Structures
- DOM Trees
- Organization Charts

---

## 6. Bridge

Separate abstraction from implementation.

Examples:

- Shape ↔ Color
- Notification ↔ Channel

---

## 7. Flyweight

Share common objects to reduce memory usage.

Examples:

- Game Engines
- Fonts
- Maps
- Character Rendering

---

# Pattern Relationships

```
Structural Patterns

│

├── Simplify Systems
│      └── Facade

│

├── Connect Incompatible Systems
│      └── Adapter

│

├── Add Functionality
│      └── Decorator

│

├── Control Access
│      └── Proxy

│

├── Organize Hierarchies
│      └── Composite

│

├── Separate Responsibilities
│      └── Bridge

│

└── Save Memory
       └── Flyweight
```

---

# Real-World Example

Imagine an online shopping application.

It contains:

- Payment
- Shipping
- Authentication
- Notifications
- Inventory
- Database
- Analytics

Each Structural Pattern solves a different problem.

```
Facade

↓

Checkout()

↓

Payment

↓

Shipping

↓

Email

↓

Database
```

```
Adapter

↓

Old Shipping API

↓

New Shipping Interface
```

```
Decorator

↓

Logging

↓

Caching

↓

Authentication
```

```
Proxy

↓

Permission Check

↓

Real Service
```

---

# Structural Patterns vs Creational Patterns

| Creational | Structural |
|------------|------------|
| Focus on object creation | Focus on object organization |
| Answer "How do we create objects?" | Answer "How do objects work together?" |
| Object lifecycle | Object relationships |
| Construction | Composition |

---

# AI Decision Rules

Before choosing a Structural Pattern, ask:

✓ Is the problem about **object relationships** rather than object creation?

✓ Is there too much coupling?

✓ Is an interface mismatch causing problems?

✓ Does behavior need to be added dynamically?

✓ Should complexity be hidden?

✓ Does access require control?

✓ Are there many repeated objects consuming memory?

If the answer is **Yes**, a Structural Pattern is likely appropriate.

---

# Common Beginner Mistakes

❌ Using inheritance everywhere.

❌ Ignoring composition.

❌ Mixing multiple structural patterns unnecessarily.

❌ Using Facade as a "God Object."

❌ Confusing Adapter with Facade.

❌ Using Proxy only for security while ignoring caching and lazy loading.

---

# Summary

Structural Design Patterns organize relationships between classes and objects.

They help software remain:

- Flexible
- Scalable
- Maintainable
- Reusable

Rather than focusing on object creation, they focus on how objects collaborate to solve complex problems while minimizing coupling and hiding unnecessary complexity.

---

> **Golden Rule**

> **"Create objects with Creational Patterns. Connect them intelligently with Structural Patterns."**

---

# 3.2 Facade Pattern

> **"Provide a unified, simplified interface to a complex subsystem."**

---

# Intent

The **Facade Pattern** hides the complexity of a subsystem behind a single, easy-to-use interface.

Instead of exposing dozens of classes and operations to the client, a Facade offers one entry point that coordinates the underlying workflow.

The client interacts with **one simple API**, while the Facade manages all internal complexity.

---

# Why Does Facade Exist?

As applications grow, users of a module often need to interact with many different services.

Consider an e-commerce checkout process.

Without a Facade, the client may need to call:

- Inventory Service
- Payment Service
- Tax Service
- Shipping Service
- Email Service
- Notification Service
- Analytics Service
- Audit Logger

The client now contains business workflow logic that should not belong there.

---

# The Problem

Without Facade:

```
Checkout Controller

↓

Validate Cart

↓

Reserve Inventory

↓

Calculate Tax

↓

Process Payment

↓

Generate Invoice

↓

Create Shipment

↓

Send Email

↓

Log Transaction

↓

Update Analytics
```

Every caller must understand the entire workflow.

This creates:

- Tight coupling
- Duplicate logic
- Hard maintenance
- Increased bugs

---

# Desired Solution

Introduce a Facade.

```
Checkout Controller

↓

CheckoutFacade

↓

Inventory

Payment

Shipping

Email

Invoice

Analytics

Logging
```

The controller now performs only:

```javascript
checkoutFacade.checkout(order);
```

The complexity is hidden.

---

# Real-World Analogy

Imagine traveling internationally.

Instead of separately arranging:

- Flights
- Hotels
- Airport Transfers
- Insurance
- Visa
- Tours

you contact a travel agency.

```
Customer

↓

Travel Agency (Facade)

↓

Airline

Hotel

Embassy

Insurance

Transport
```

The customer interacts with one organization instead of many.

---

# Another Analogy

Think about starting a computer.

You press one button.

Internally the computer performs hundreds of operations:

- Power checks
- Hardware initialization
- BIOS/UEFI
- Memory tests
- Bootloader
- Operating System startup

You don't manually invoke each step.

The power button is a Facade.

---

# Structure

```
               Client

                  │

                  ▼

             CheckoutFacade

        ┌─────────┼─────────┐

        ▼         ▼         ▼

   Payment   Inventory   Shipping

                  │

               Email

                  │

             Analytics
```

The client depends only on the Facade.

---

# Workflow

```
Client

↓

Facade

↓

Subsystem A

↓

Subsystem B

↓

Subsystem C

↓

Return Result
```

The client never manages subsystem coordination.

---

# JavaScript Example

```javascript
class PaymentService {
    pay(order) {
        console.log("Payment processed");
    }
}

class InventoryService {
    reserve(order) {
        console.log("Inventory reserved");
    }
}

class EmailService {
    send(order) {
        console.log("Confirmation email sent");
    }
}

class CheckoutFacade {

    constructor() {
        this.payment = new PaymentService();
        this.inventory = new InventoryService();
        this.email = new EmailService();
    }

    checkout(order) {

        this.inventory.reserve(order);

        this.payment.pay(order);

        this.email.send(order);

        console.log("Order completed");

    }

}
```

Usage:

```javascript
const checkout = new CheckoutFacade();

checkout.checkout(order);
```

The client knows nothing about the internal services.

---

# Key Characteristics

✔ Simplifies complex APIs

✔ Hides subsystem implementation

✔ Reduces client coupling

✔ Centralizes workflows

✔ Improves readability

✔ Easier onboarding for developers

---

# Common Use Cases

- Payment SDKs
- Database clients
- Cloud SDKs
- Authentication libraries
- File upload systems
- Video processing pipelines
- Build systems
- AI orchestration workflows

---

# Facade vs Adapter

| Facade | Adapter |
|---------|----------|
| Simplifies a subsystem | Converts one interface into another |
| Same functionality | Compatibility layer |
| Hides complexity | Resolves interface mismatch |

---

# Facade vs Proxy

| Facade | Proxy |
|---------|-------|
| Simplifies usage | Controls access |
| Focuses on convenience | Focuses on permissions, caching, lazy loading |

---

# AI Decision Rules

Generate a Facade when:

✓ Multiple services are always called together.

✓ Client code is becoming repetitive.

✓ A subsystem is too complex for consumers.

✓ Workflow coordination should exist in one place.

Avoid a Facade when:

✘ The subsystem is already simple.

✘ It becomes a massive "God Object" containing unrelated responsibilities.

---

# Common Beginner Mistakes

❌ Putting business logic unrelated to orchestration inside the Facade.

❌ Making the Facade the only way to access every subsystem.

❌ Turning the Facade into a monolithic class with hundreds of methods.

---

# Best Practices

✔ Keep Facades thin—they should orchestrate, not own business logic.

✔ Group related subsystem operations.

✔ Let subsystem classes remain independently usable when appropriate.

✔ Name Facades after the workflow they simplify (`CheckoutFacade`, `MediaFacade`, `PaymentFacade`).

---

# Summary

The Facade Pattern provides a simple, unified interface to a complex subsystem.

It reduces coupling, improves readability, centralizes workflows, and hides implementation details, allowing client code to remain clean while complex coordination occurs behind the scenes.

---

> **Golden Rule**

> **"If every client repeats the same sequence of subsystem calls, hide that sequence behind a Facade."**

---

# 3.3 Adapter Pattern

> **"Convert the interface of one class into another interface that clients expect."**

---

# Intent

The **Adapter Pattern** allows **two incompatible interfaces** to work together without modifying their existing code.

Instead of rewriting an old system or forcing a new system to change its interface, an Adapter acts as a **translator** between them.

The Adapter receives requests in one format, converts them, and forwards them to another system.

---

# Why Does Adapter Exist?

Software evolves over time.

Organizations often have:

- Legacy systems
- Third-party SDKs
- External APIs
- Old libraries
- Different versions of the same service

These systems rarely expose identical interfaces.

Rather than rewriting everything, we create an Adapter.

---

# The Problem

Imagine your application expects this interface:

```javascript
payment.process(amount);
```

But a third-party payment provider offers:

```javascript
payment.makePayment(total);
```

Your application cannot directly use the provider because the interfaces don't match.

---

# Desired Solution

```
Application

↓

Payment Adapter

↓

Third-Party SDK
```

The application continues using

```javascript
process()
```

while the Adapter internally calls

```javascript
makePayment()
```

No changes are required in the application.

---

# Real-World Analogy

Think about a **travel adapter**.

You travel from Pakistan to Europe.

Your charger has:

```
Type C Plug
```

The hotel provides:

```
Type G Socket
```

They are incompatible.

Instead of replacing your charger,

you use an adapter.

```
Phone Charger

↓

Travel Adapter

↓

Wall Socket
```

The adapter changes the interface—not the charger or the wall.

---

# Another Analogy

Imagine translating between two people.

```
English Speaker

↓

Translator

↓

Japanese Speaker
```

Neither person changes their language.

The translator adapts communication.

The Adapter Pattern does exactly this for software.

---

# Core Idea

Instead of modifying either system,

insert an Adapter.

```
Old System

↓

Adapter

↓

New Application
```

Both systems remain unchanged.

---

# Structure

```
               Client

                  │

                  ▼

              Adapter

                  │

                  ▼

          Third-Party Service
```

The client communicates only with the Adapter.

---

# Workflow

```
Client

↓

Calls Adapter

↓

Adapter Converts Request

↓

Legacy Service

↓

Response Returned

↓

Adapter Converts Response

↓

Client
```

The conversion happens transparently.

---

# JavaScript Example

## Existing Third-Party SDK

```javascript
class LegacyPayment {

    makePayment(amount){

        console.log(`Paid $${amount}`);

    }

}
```

Your application expects:

```javascript
payment.process(amount);
```

---

## Adapter

```javascript
class PaymentAdapter {

    constructor(){

        this.legacy = new LegacyPayment();

    }

    process(amount){

        this.legacy.makePayment(amount);

    }

}
```

---

## Usage

```javascript
const payment = new PaymentAdapter();

payment.process(500);
```

Output

```
Paid $500
```

The application never knows a legacy API exists.

---

# TypeScript Example

```typescript
interface Payment {

    process(amount:number):void;

}

class LegacyPayment {

    makePayment(amount:number){

        console.log(amount);

    }

}

class PaymentAdapter implements Payment{

    constructor(private legacy: LegacyPayment){}

    process(amount:number){

        this.legacy.makePayment(amount);

    }

}
```

The Adapter satisfies the application's expected interface.

---

# Python Example

```python
class LegacyPrinter:

    def old_print(self, text):

        print(text)


class PrinterAdapter:

    def __init__(self):

        self.printer = LegacyPrinter()

    def print(self, text):

        self.printer.old_print(text)
```

Usage

```python
printer = PrinterAdapter()

printer.print("Hello")
```

---

# UML Diagram

```
           Client

              │

              ▼

      Target Interface

              ▲

              │

          Adapter

              │

              ▼

          Adaptee
```

---

# Object Adapter vs Class Adapter

There are two common implementations.

---

## Object Adapter (Recommended)

Uses **composition**.

```
Adapter

↓

Contains

↓

Legacy Object
```

Advantages

✔ Flexible

✔ Preferred in modern languages

✔ Follows Composition over Inheritance

---

## Class Adapter

Uses inheritance.

```
Adapter

↓

Extends

↓

Legacy Class
```

Advantages

✔ Slightly simpler

Disadvantages

✘ Tight coupling

✘ Multiple inheritance limitations

Modern software generally prefers **Object Adapter**.

---

# Real-World Use Cases

Adapter is everywhere.

---

## Payment Gateways

```
Stripe

↓

Adapter

↓

Application
```

```
PayPal

↓

Adapter

↓

Application
```

Now the application always calls

```
processPayment()
```

regardless of provider.

---

## Database Drivers

Application

↓

Database Adapter

↓

MySQL

↓

PostgreSQL

↓

SQLite

---

## Cloud Providers

```
AWS

Azure

Google Cloud
```

Different SDKs

↓

Cloud Adapter

↓

Unified Interface

---

## Legacy Systems

Enterprise companies often keep software running for decades.

Instead of rewriting millions of lines,

Adapters allow new systems to communicate with old ones.

---

## External APIs

Version 1

↓

Adapter

↓

Version 2

Allows gradual migration.

---

# Advantages

✔ Reuses existing code

✔ Supports legacy systems

✔ Reduces modification

✔ Improves interoperability

✔ Promotes loose coupling

✔ Easier migration

✔ Simplifies third-party integrations

---

# Disadvantages

✘ Adds another layer

✘ Too many adapters can increase complexity

✘ Poorly designed adapters may hide important differences

---

# Adapter vs Facade

Many beginners confuse these.

---

Facade

```
Simplifies

One Complex System
```

Example

```
Checkout()

↓

Payment

Shipping

Invoice

Email
```

---

Adapter

```
Converts

One Interface

↓

Another Interface
```

Example

```
process()

↓

makePayment()
```

Facade hides complexity.

Adapter fixes incompatibility.

---

# Adapter vs Proxy

Adapter

Changes interface.

Proxy

Keeps the same interface but controls access.

---

# AI Decision Rules

Generate an Adapter when:

✓ A third-party API doesn't match the application's interface.

✓ Legacy systems must remain unchanged.

✓ External SDKs expose incompatible methods.

✓ Multiple providers need a common interface.

Avoid Adapter when:

✘ You own both systems and can simply redesign the interface.

✘ The interfaces are already compatible.

---

# Common Beginner Mistakes

❌ Modifying third-party libraries directly.

❌ Placing business logic inside adapters.

❌ Confusing Adapter with Facade.

❌ Creating adapters when simple wrappers would suffice.

❌ Using inheritance instead of composition unnecessarily.

---

# Best Practices

✔ Keep adapters lightweight.

✔ Focus only on interface conversion.

✔ Avoid embedding business rules.

✔ Prefer composition over inheritance.

✔ Clearly document any data transformation.

---

# Interview Questions

### Q1

What problem does Adapter solve?

**Answer**

It allows incompatible interfaces to work together without changing their existing implementations.

---

### Q2

What is the difference between Adapter and Facade?

**Answer**

Adapter converts one interface into another.

Facade simplifies a complex subsystem.

---

### Q3

When should Adapter be used?

- Legacy systems
- Third-party APIs
- SDK integrations
- Version migrations

---

### Q4

Why is composition preferred?

**Answer**

Composition creates looser coupling, greater flexibility, and avoids inheritance limitations.

---

# Summary

The Adapter Pattern acts as a translator between incompatible systems.

Rather than rewriting existing code, it introduces a small conversion layer that allows old and new components to communicate seamlessly.

It is one of the most common patterns in enterprise software because integrations with external APIs, SDKs, and legacy systems are unavoidable.

---

> **Golden Rule**

> **"If two systems solve the same problem but speak different languages, introduce an Adapter instead of rewriting either system."**

---

# 3.4 Decorator Pattern

> **"Attach additional responsibilities to an object dynamically without modifying its original code."**

---

# Intent

The **Decorator Pattern** allows behavior to be added to an object **at runtime** by wrapping it inside another object.

Instead of modifying the original class or creating dozens of subclasses, Decorators extend functionality by **composing small reusable wrappers** around an object.

Decorator follows one of the most important software engineering principles:

> **Favor Composition over Inheritance.**

---

# Learning Objectives

After this section you should be able to:

- Understand why inheritance does not scale.
- Dynamically add functionality to objects.
- Build reusable middleware pipelines.
- Recognize decorators in modern frameworks.
- Decide when Decorator is better than inheritance.
- Guide AI coding agents to generate extensible architectures.

---

# Why Does Decorator Exist?

Suppose you're building a notification system.

Initially:

```
Notification

↓

Send Email
```

Later requirements arrive:

- Logging
- Authentication
- Encryption
- Retry
- Analytics
- Rate Limiting

One approach is inheritance.

```
EmailNotification

↓

LoggedEmailNotification

↓

AuthenticatedLoggedEmailNotification

↓

EncryptedAuthenticatedLoggedEmailNotification

↓

CachedEncryptedAuthenticatedLoggedEmailNotification
```

The number of classes grows rapidly.

This is called **Class Explosion**.

Decorator solves this problem.

---

# The Problem

Without Decorator:

```
Notification

↓

EmailNotification

↓

SecureEmailNotification

↓

LoggedSecureEmailNotification

↓

LoggedSecureCachedEmailNotification

↓

LoggedSecureCachedEncryptedEmailNotification
```

Each new feature creates another subclass.

Maintenance becomes difficult.

---

# Desired Solution

Instead of inheritance,

wrap the object.

```
Email Notification

↓

Logging Decorator

↓

Authentication Decorator

↓

Encryption Decorator

↓

Caching Decorator

↓

Client
```

Each decorator contributes one responsibility.

---

# Real-World Analogy

Imagine ordering a burger.

Base Order

```
Burger
```

Add:

```
+ Cheese

+ Lettuce

+ Sauce

+ Bacon

+ Egg
```

You don't create classes like:

```
CheeseBurger

CheeseEggBurger

CheeseEggSauceBurger

CheeseEggSauceBaconBurger
```

Instead,

you add ingredients dynamically.

Each ingredient is a Decorator.

---

# Another Analogy

Think about wearing clothes.

```
Person

↓

Shirt

↓

Jacket

↓

Raincoat

↓

Scarf
```

Each layer adds functionality.

The person remains the same.

Decorator works exactly this way.

---

# Core Philosophy

Instead of

```
One Huge Class

↓

Many Subclasses
```

Prefer

```
Object

↓

Decorator

↓

Decorator

↓

Decorator
```

Behavior becomes modular.

---

# Structure

```
              Client

                 │

                 ▼

        LoggingDecorator

                 │

                 ▼

    AuthenticationDecorator

                 │

                 ▼

     EncryptionDecorator

                 │

                 ▼

           Notification
```

Each decorator wraps another object.

---

# Workflow

```
Client

↓

Decorator A

↓

Decorator B

↓

Decorator C

↓

Original Object

↓

Return Result
```

Every decorator performs work before and/or after delegating to the wrapped object.

---

# JavaScript Example

## Component Interface

```javascript
class Notification {

    send(message){

        console.log(message);

    }

}
```

---

## Base Decorator

```javascript
class NotificationDecorator {

    constructor(notification){

        this.notification = notification;

    }

    send(message){

        this.notification.send(message);

    }

}
```

---

## Logging Decorator

```javascript
class LoggingDecorator extends NotificationDecorator {

    send(message){

        console.log("Logging notification...");

        super.send(message);

    }

}
```

---

## Encryption Decorator

```javascript
class EncryptionDecorator extends NotificationDecorator {

    send(message){

        const encrypted = "[Encrypted] " + message;

        super.send(encrypted);

    }

}
```

---

## Usage

```javascript
let notification = new Notification();

notification = new LoggingDecorator(notification);

notification = new EncryptionDecorator(notification);

notification.send("Hello");
```

Output

```
Logging notification...

[Encrypted] Hello
```

Notice:

The Notification class was never modified.

---

# TypeScript Example

```typescript
interface MessageService{

    send(message:string):void;

}

class EmailService implements MessageService{

    send(message:string){

        console.log(message);

    }

}

class LoggingDecorator implements MessageService{

    constructor(private service:MessageService){}

    send(message:string){

        console.log("Logging...");

        this.service.send(message);

    }

}
```

---

# Python Example

```python
class Notification:

    def send(self, message):

        print(message)


class LoggingDecorator:

    def __init__(self, notification):

        self.notification = notification

    def send(self, message):

        print("Logging")

        self.notification.send(message)
```

Usage

```python
service = LoggingDecorator(Notification())

service.send("Hello")
```

---

# UML Diagram

```
          Component

          + send()

              ▲

              │

       Notification

              ▲

              │

         Decorator

              ▲

     ┌────────┴────────┐

     ▼                 ▼

LoggingDecorator   EncryptionDecorator
```

---

# Real-World Use Cases

Decorator is everywhere.

---

## Express.js Middleware

```
Request

↓

Logger

↓

Authentication

↓

Authorization

↓

Validation

↓

Compression

↓

Route Handler
```

Each middleware decorates the request.

---

## ASP.NET Core Middleware

```
HTTP Request

↓

Authentication

↓

Authorization

↓

Exception Handler

↓

Caching

↓

Controller
```

Every middleware behaves like a Decorator.

---

## NestJS

Interceptors

↓

Guards

↓

Filters

↓

Pipes

Each wraps the execution pipeline.

---

## Python

```python
@login_required

@cache

@retry
```

Each decorator adds behavior.

---

## Java Spring

```
@Transactional

@Cacheable

@Async

@Secured
```

Annotations internally use Decorator-like concepts.

---

## Logging

```
Business Service

↓

Logging Decorator

↓

Execute
```

No changes to business code.

---

## Authentication

```
Controller

↓

Authentication Decorator

↓

Business Logic
```

---

## Caching

```
Service

↓

Cache Decorator

↓

Database
```

---

## Retry

```
API Client

↓

Retry Decorator

↓

External API
```

---

## Monitoring

```
Service

↓

Metrics Decorator

↓

Logger

↓

Service
```

---

# Advantages

✔ Open/Closed Principle

✔ Composition over inheritance

✔ Reusable behaviors

✔ Flexible runtime configuration

✔ Small focused classes

✔ Easy testing

✔ Prevents subclass explosion

---

# Disadvantages

✘ Many small objects

✘ Debugging chains can be harder

✘ Order of decorators matters

✘ Configuration may become complex

---

# Decorator vs Inheritance

Inheritance

```
Notification

↓

LoggedNotification

↓

EncryptedLoggedNotification

↓

CachedEncryptedLoggedNotification
```

Rigid.

Decorator

```
Notification

↓

Logging

↓

Encryption

↓

Caching
```

Flexible.

---

# Decorator vs Adapter

Decorator

Adds behavior.

Adapter

Changes interface.

---

# Decorator vs Proxy

Many developers confuse them.

Decorator

```
Purpose

↓

Extend functionality
```

Proxy

```
Purpose

↓

Control access
```

Decorator changes behavior.

Proxy controls interaction.

---

# AI Decision Rules

Generate a Decorator when:

✓ New behavior should be optional.

✓ Existing code should remain unchanged.

✓ Multiple features can be combined.

✓ Runtime flexibility is required.

✓ Inheritance would create many subclasses.

Avoid Decorator when:

✘ The behavior is permanent.

✘ Only one implementation will ever exist.

✘ Simpler composition is sufficient.

---

# Common Beginner Mistakes

❌ Putting business logic inside decorators.

❌ Creating giant decorators.

❌ Using inheritance instead.

❌ Depending on decorator order accidentally.

❌ Forgetting to delegate to the wrapped object.

---

# Best Practices

✔ Each decorator should have one responsibility.

✔ Delegate to the wrapped object.

✔ Keep decorators independent.

✔ Stack decorators in a predictable order.

✔ Document execution order when multiple decorators are combined.

---

# Interview Questions

### Q1

What problem does Decorator solve?

**Answer**

It allows responsibilities to be added dynamically without modifying the original class.

---

### Q2

Why is Decorator preferred over inheritance?

**Answer**

Because it avoids subclass explosion and provides greater runtime flexibility.

---

### Q3

Give real-world examples.

- Express middleware
- ASP.NET middleware
- Python decorators
- Spring annotations
- Logging
- Authentication
- Caching
- Monitoring

---

### Q4

What principle does Decorator demonstrate?

**Answer**

Composition over Inheritance and the Open/Closed Principle.

---

# Summary

The Decorator Pattern allows software to grow by **wrapping objects with additional responsibilities** instead of modifying their source code.

It is one of the most practical patterns in enterprise development because it enables features such as logging, authentication, caching, monitoring, compression, and retry mechanisms to be composed dynamically.

Modern backend frameworks, middleware pipelines, and annotation systems rely heavily on this idea.

---

> **Golden Rule**

> **"If you need to add behavior without changing existing code, wrap the object with a Decorator instead of creating another subclass."**
---

# 3.5 Proxy Pattern

> **"Provide a surrogate or placeholder for another object to control access to it."**

---

# Intent

The **Proxy Pattern** provides a substitute (proxy) for another object.

Instead of allowing clients to interact directly with the real object, they communicate with the Proxy.

The Proxy decides:

- Whether access is allowed
- Whether the object should be created
- Whether data should come from cache
- Whether requests should be logged
- Whether a remote call should be performed

The client usually cannot distinguish between the Proxy and the real object because both expose the same interface.

---

# Learning Objectives

After this section you should be able to:

- Understand why Proxy exists.
- Differentiate Proxy from Decorator.
- Implement lazy loading.
- Build authentication proxies.
- Build caching proxies.
- Recognize proxies in enterprise software.
- Guide AI agents to select Proxy appropriately.

---

# Why Does Proxy Exist?

Sometimes accessing an object is expensive.

Examples:

- Loading a 2GB video
- Reading millions of database records
- Calling an external API
- Connecting to another server
- Downloading images
- Accessing cloud storage

Instead of immediately performing expensive work,

a Proxy decides **when** and **how** the real object should be accessed.

---

# The Problem

Without Proxy

```
Client

↓

Database

↓

Heavy Query

↓

Result
```

Every request immediately reaches the database.

Problems:

- Slow performance
- High cost
- Duplicate requests
- Security issues

---

# Desired Solution

```
Client

↓

Proxy

↓

Permission Check

↓

Cache

↓

Lazy Loading

↓

Database
```

The Proxy becomes the gatekeeper.

---

# Real-World Analogy

Think about a receptionist.

Instead of everyone entering the CEO's office directly,

visitors first meet:

```
Visitor

↓

Receptionist

↓

CEO
```

The receptionist decides:

- Is the meeting scheduled?
- Is the CEO available?
- Should someone else handle it?

The receptionist is a Proxy.

---

# Another Analogy

Consider a hotel key card.

You don't directly unlock every room.

Instead:

```
Guest

↓

Key Card

↓

Door Lock

↓

Room
```

The key card determines whether access is permitted.

The room itself remains unchanged.

---

# Core Philosophy

Instead of

```
Client

↓

Real Object
```

Prefer

```
Client

↓

Proxy

↓

Real Object
```

The Proxy manages access while exposing the same interface.

---

# Structure

```
              Client

                 │

                 ▼

             Proxy

                 │

                 ▼

           Real Service
```

The client communicates only with the Proxy.

---

# Workflow

```
Client

↓

Proxy

↓

Validation

↓

Authentication

↓

Caching

↓

Lazy Initialization

↓

Real Object

↓

Return Response
```

---

# JavaScript Example

## Real Service

```javascript
class Database {

    query(sql){

        console.log("Executing:", sql);

    }

}
```

---

## Proxy

```javascript
class DatabaseProxy {

    constructor(){

        this.database = new Database();

    }

    query(sql){

        console.log("Checking permissions...");

        this.database.query(sql);

    }

}
```

---

## Usage

```javascript
const db = new DatabaseProxy();

db.query("SELECT * FROM users");
```

Output

```
Checking permissions...

Executing: SELECT * FROM users
```

The client never interacts directly with the Database.

---

# Lazy Loading Proxy

Suppose loading a large image is expensive.

```javascript
class Image {

    constructor(file){

        console.log("Loading image...");

        this.file = file;

    }

    display(){

        console.log("Displaying", this.file);

    }

}
```

Proxy

```javascript
class ImageProxy {

    constructor(file){

        this.file = file;

        this.image = null;

    }

    display(){

        if(this.image === null){

            this.image = new Image(this.file);

        }

        this.image.display();

    }

}
```

Now the image loads only when needed.

---

# TypeScript Example

```typescript
interface Service{

    request():void;

}

class RealService implements Service{

    request(){

        console.log("Real Service");

    }

}

class ProxyService implements Service{

    constructor(private real:RealService){}

    request(){

        console.log("Authorization");

        this.real.request();

    }

}
```

---

# Python Example

```python
class Database:

    def query(self):

        print("Database Query")


class DatabaseProxy:

    def __init__(self):

        self.database = Database()

    def query(self):

        print("Checking access")

        self.database.query()
```

Usage

```python
db = DatabaseProxy()

db.query()
```

---

# UML Diagram

```
          Subject

        + request()

            ▲

            │

      ┌─────┴─────┐

      ▼           ▼

 RealService    Proxy
```

Both implement the same interface.

---

# Types of Proxy

There are several kinds of proxies.

---

## Virtual Proxy

Delays object creation until necessary.

Example:

```
Image

↓

Load only when viewed
```

Used for:

- Images
- Videos
- Documents
- PDFs

---

## Protection Proxy

Controls permissions.

```
Client

↓

Authorization

↓

Service
```

Examples:

- Admin panels
- Authentication
- Role-based access

---

## Remote Proxy

Represents an object located on another machine.

```
Application

↓

RPC Proxy

↓

Remote Server
```

Examples:

- gRPC
- Java RMI
- SOAP
- REST SDKs

---

## Caching Proxy

Stores previous responses.

```
Client

↓

Cache

↓

Database
```

If cached,

return immediately.

Otherwise,

call the database.

Examples:

- Redis
- Browser Cache
- CDN

---

## Smart Proxy

Performs additional tasks.

Examples:

- Logging
- Reference Counting
- Performance Monitoring
- Resource Cleanup

---

# Real-World Use Cases

Proxy is everywhere.

---

## API Gateway

```
Client

↓

Gateway

↓

Authentication

↓

Rate Limiting

↓

Microservices
```

The gateway acts as a Proxy.

---

## Reverse Proxy

Examples:

- Nginx
- HAProxy
- Traefik

```
Client

↓

Reverse Proxy

↓

Application
```

---

## Content Delivery Networks

```
Browser

↓

Cloudflare

↓

Origin Server
```

Cloudflare is effectively a Proxy.

---

## ORM Lazy Loading

Hibernate

↓

Entity Proxy

↓

Database

Objects load only when accessed.

---

## Redis Cache

```
Application

↓

Redis

↓

Database
```

Redis behaves like a caching Proxy.

---

## Browser Proxy

Corporate networks often require:

```
Computer

↓

Proxy Server

↓

Internet
```

---

# Advantages

✔ Controls access

✔ Supports lazy loading

✔ Improves security

✔ Enables caching

✔ Reduces expensive operations

✔ Supports remote communication

✔ Improves scalability

---

# Disadvantages

✘ Additional complexity

✘ More objects

✘ Debugging becomes harder

✘ Poor proxies may introduce latency

---

# Proxy vs Decorator

One of the most common interview questions.

Decorator

```
Purpose

↓

Add functionality
```

Examples:

- Logging
- Compression
- Encryption

---

Proxy

```
Purpose

↓

Control access
```

Examples:

- Authentication
- Cache
- Lazy Loading
- Authorization

Both wrap another object,

but their intentions differ.

---

# Proxy vs Facade

Facade

```
Simplifies

↓

Complex subsystem
```

Proxy

```
Controls

↓

Single object
```

---

# Proxy vs Adapter

Adapter

Changes interface.

Proxy

Keeps the same interface.

---

# AI Decision Rules

Generate a Proxy when:

✓ Access should be controlled.

✓ Object creation is expensive.

✓ Lazy loading is required.

✓ Authentication is needed.

✓ Responses should be cached.

✓ Remote communication should be hidden.

Avoid Proxy when:

✘ There is no access control.

✘ The object is lightweight.

✘ A simple wrapper is sufficient.

---

# Common Beginner Mistakes

❌ Confusing Proxy with Decorator.

❌ Placing business logic inside the Proxy.

❌ Using Proxy when lazy loading is unnecessary.

❌ Forgetting that Proxy should preserve the original interface.

❌ Creating unnecessary Proxy layers.

---

# Best Practices

✔ Keep the same interface as the real object.

✔ Keep proxies lightweight.

✔ Delegate business logic to the real service.

✔ Clearly document Proxy behavior.

✔ Use lazy initialization only when beneficial.

---

# Interview Questions

### Q1

What problem does Proxy solve?

**Answer**

It controls access to another object while preserving the same interface.

---

### Q2

Give common Proxy types.

- Virtual Proxy
- Protection Proxy
- Remote Proxy
- Caching Proxy
- Smart Proxy

---

### Q3

How is Proxy different from Decorator?

**Answer**

Decorator extends behavior.

Proxy controls access.

---

### Q4

Where is Proxy commonly used?

- API Gateways
- Reverse Proxies
- Authentication
- Lazy Loading
- Redis
- Cloudflare
- ORM Frameworks

---

# Summary

The Proxy Pattern introduces an intermediary object that manages access to another object.

Rather than changing the object's behavior, the Proxy decides **when**, **whether**, and **how** the real object should be accessed.

This makes Proxy indispensable for authentication, authorization, caching, lazy loading, remote communication, and performance optimization.

It is one of the most widely used structural patterns in enterprise software and cloud architectures.

---

> **Golden Rule**

> **"If an object needs a gatekeeper instead of new functionality, use a Proxy."**

---

# 3.6 Composite Pattern

> **"Compose objects into tree structures so that individual objects and groups of objects can be treated uniformly."**

---

# Intent

The **Composite Pattern** allows you to represent **part-whole hierarchies** (tree structures) by treating **individual objects (Leaf nodes)** and **collections of objects (Composite nodes)** using the **same interface**.

Instead of writing separate code for a single object and a group of objects, the client interacts with both in exactly the same way.

The Composite Pattern is built around one powerful idea:

> **"Treat a single object and a collection of objects as the same type."**

---

# Learning Objectives

After completing this section you should be able to:

- Understand hierarchical object structures.
- Build recursive tree-based systems.
- Treat individual and grouped objects uniformly.
- Recognize Composite in modern frameworks.
- Design scalable hierarchical architectures.
- Guide AI coding agents when tree structures are required.

---

# Why Does Composite Exist?

Many real-world systems are naturally organized as trees.

Examples include:

- File systems
- HTML DOM
- Organization charts
- Menu systems
- Scene graphs
- Comment threads
- Categories
- Family trees

Without Composite, developers usually write two completely different implementations:

One for

```
Single Item
```

Another for

```
Collection of Items
```

This creates duplicated logic.

---

# The Problem

Imagine a file explorer.

Without Composite:

```
File

↓

Display()

Folder

↓

DisplayChildren()

↓

Loop

↓

Display()
```

The client must determine whether an object is a file or a folder before interacting with it.

Example

```javascript
if(item instanceof File){

    item.display();

}
else{

    item.displayChildren();

}
```

As the hierarchy grows,

this code becomes messy.

---

# Desired Solution

Instead,

both Files and Folders implement

```
display()
```

Now the client simply writes

```javascript
item.display();
```

No condition required.

---

# Real-World Analogy

Imagine a company.

```
CEO

↓

Department

↓

Team

↓

Employee
```

An Employee is one object.

A Department is a collection of employees.

Yet both can answer questions like

```
showInformation()
```

The client doesn't care whether it's talking to one employee or an entire department.

---

# Another Analogy

Think about your computer.

```
Computer

↓

Drive

↓

Folder

↓

Folder

↓

File
```

A folder may contain:

- Files
- Other folders

Every node behaves similarly.

---

# Core Philosophy

Instead of writing separate logic for

```
Leaf Objects
```

and

```
Groups
```

use one interface for both.

```
Component

↓

Leaf

↓

Composite
```

Everything becomes recursive.

---

# Structure

```
              Component

                  ▲

          ┌───────┴────────┐

          ▼                ▼

       Leaf           Composite

                           │

             ┌─────────────┴─────────────┐

             ▼                           ▼

           Leaf                     Composite

                                        │

                                   More Children
```

Notice that a Composite can contain both Leaves and other Composites.

---

# Workflow

```
Client

↓

Component

↓

Leaf

or

↓

Composite

↓

Children

↓

Recursive Processing
```

The client never needs to know what type of object it is processing.

---

# JavaScript Example

## Component

```javascript
class FileSystemItem{

    display(){

        throw new Error("Not implemented");

    }

}
```

---

## Leaf

```javascript
class File extends FileSystemItem{

    constructor(name){

        super();

        this.name = name;

    }

    display(){

        console.log(this.name);

    }

}
```

---

## Composite

```javascript
class Folder extends FileSystemItem{

    constructor(name){

        super();

        this.name = name;

        this.children = [];

    }

    add(item){

        this.children.push(item);

    }

    display(){

        console.log(this.name);

        this.children.forEach(child=>child.display());

    }

}
```

---

## Usage

```javascript
const root = new Folder("Root");

const docs = new Folder("Documents");

docs.add(new File("Resume.pdf"));

docs.add(new File("Notes.txt"));

root.add(docs);

root.add(new File("Photo.png"));

root.display();
```

Output

```
Root

Documents

Resume.pdf

Notes.txt

Photo.png
```

Notice

The client only calls

```javascript
display()
```

regardless of whether the object is a File or Folder.

---

# TypeScript Example

```typescript
interface Component{

    display():void;

}

class File implements Component{

    constructor(private name:string){}

    display(){

        console.log(this.name);

    }

}

class Folder implements Component{

    private children:Component[]=[];

    add(child:Component){

        this.children.push(child);

    }

    display(){

        this.children.forEach(c=>c.display());

    }

}
```

---

# Python Example

```python
class Component:

    def display(self):

        pass


class File(Component):

    def __init__(self,name):

        self.name=name

    def display(self):

        print(self.name)


class Folder(Component):

    def __init__(self,name):

        self.name=name

        self.children=[]

    def add(self,item):

        self.children.append(item)

    def display(self):

        print(self.name)

        for child in self.children:

            child.display()
```

---

# UML Diagram

```
                Component

             + display()

                  ▲

        ┌─────────┴─────────┐

        ▼                   ▼

      Leaf             Composite

                           │

                      Children[]
```

---

# Recursive Nature

Composite is inherently recursive.

```
Root

├── Folder A

│     ├── File

│     └── Folder B

│            ├── File

│            └── File

└── Folder C

      └── File
```

Every Folder can contain:

- Files
- Folders

without limitation.

---

# Real-World Use Cases

Composite appears in many systems.

---

## File Explorer

```
Drive

↓

Folders

↓

Subfolders

↓

Files
```

Windows Explorer is a Composite.

---

## HTML DOM

```
<html>

↓

<body>

↓

<div>

↓

<button>
```

Every HTML element is a Component.

A div may contain many elements.

---

## Organization Chart

```
CEO

↓

VP

↓

Manager

↓

Employee
```

Departments contain employees.

Employees may manage teams.

---

## Menu Systems

```
Menu

↓

Submenu

↓

Menu Item
```

Navigation bars commonly use Composite.

---

## Scene Graphs

Game engines organize objects as

```
Scene

↓

Player

↓

Weapon

↓

Effects
```

Moving the player moves all child objects.

Unity and Unreal use this extensively.

---

## Comment Systems

```
Comment

↓

Replies

↓

Replies

↓

Replies
```

Reddit-style discussions are tree structures.

---

## Categories

```
Electronics

↓

Computers

↓

Laptops

↓

Gaming
```

E-commerce websites frequently implement Composite.

---

# Advantages

✔ Treats individual and grouped objects uniformly.

✔ Simplifies client code.

✔ Supports recursion naturally.

✔ Easy to add new node types.

✔ Excellent for hierarchical systems.

✔ Promotes scalability.

---

# Disadvantages

✘ Can make designs overly generic.

✘ Difficult to restrict child types.

✘ Recursive operations may impact performance for very deep trees.

✘ Large hierarchies can consume memory.

---

# Composite vs Decorator

Composite

```
Organizes

Tree Structures
```

Decorator

```
Adds

Behavior
```

Composite answers:

"How are objects organized?"

Decorator answers:

"How do we extend functionality?"

---

# Composite vs Flyweight

Composite

Many connected objects.

Flyweight

Shared objects.

Composite manages hierarchy.

Flyweight optimizes memory.

---

# Composite vs Proxy

Composite

Represents ownership relationships.

Proxy

Controls access.

---

# AI Decision Rules

Generate a Composite when:

✓ Objects naturally form a tree.

✓ Parent and child should share the same interface.

✓ Recursive traversal is required.

✓ Clients should ignore whether an object is individual or grouped.

Avoid Composite when:

✘ There is no hierarchy.

✘ Objects never contain other objects.

✘ A flat list is sufficient.

---

# Common Beginner Mistakes

❌ Using Composite for non-hierarchical data.

❌ Breaking recursion by handling leaves separately.

❌ Allowing circular parent-child references.

❌ Adding business logic unrelated to tree management.

❌ Forgetting that Composites and Leaves should expose the same interface.

---

# Best Practices

✔ Design a common Component interface.

✔ Keep Leaf classes simple.

✔ Let Composite manage child collections.

✔ Avoid exposing internal tree structures unnecessarily.

✔ Validate against circular references when building trees.

✔ Keep recursive operations efficient.

---

# Interview Questions

### Q1

What problem does Composite solve?

**Answer**

It allows individual objects and collections of objects to be treated uniformly through a common interface.

---

### Q2

Give common examples.

- File systems
- HTML DOM
- Organization charts
- Menus
- Scene graphs
- Comment trees

---

### Q3

Why is recursion important in Composite?

**Answer**

Because Composite objects can contain other Composite objects, creating recursive tree structures.

---

### Q4

What is the difference between a Leaf and a Composite?

**Answer**

A Leaf represents a single object with no children.

A Composite represents a group of Components and manages child objects.

---

# Summary

The Composite Pattern organizes objects into **tree structures**, allowing both **individual objects** and **groups of objects** to be manipulated through the same interface.

It simplifies client code, promotes recursive processing, and provides a clean solution for hierarchical systems such as file explorers, DOM trees, menu structures, organization charts, and scene graphs.

Composite is one of the fundamental patterns behind many UI frameworks, game engines, and enterprise applications.

---

> **Golden Rule**

> **"If your objects naturally form a tree, and clients should treat leaves and groups the same way, use the Composite Pattern."**

---

# 3.7 Bridge Pattern

> **"Separate an abstraction from its implementation so that both can evolve independently."**

---

# Intent

The **Bridge Pattern** separates **what an object does (Abstraction)** from **how it does it (Implementation)**.

Instead of tightly coupling an abstraction with one implementation, Bridge connects them using **composition**, allowing both sides to change independently.

It prevents the explosion of subclasses when there are **multiple dimensions of variation**.

---

# Learning Objectives

After completing this section you should be able to:

- Understand why inheritance becomes unmanageable.
- Separate abstraction from implementation.
- Build scalable architectures.
- Apply composition instead of deep inheritance.
- Recognize Bridge in enterprise software.
- Help AI coding agents choose Bridge when multiple independent dimensions exist.

---

# Why Does Bridge Exist?

Imagine you're building a graphics library.

You have:

Shapes

- Circle
- Square
- Triangle

and Colors

- Red
- Blue
- Green

Without Bridge, inheritance creates combinations.

```
CircleRed

CircleBlue

CircleGreen

SquareRed

SquareBlue

SquareGreen

TriangleRed

TriangleBlue

TriangleGreen
```

Every new color multiplies every shape.

Every new shape multiplies every color.

This is called **Class Explosion**.

---

# The Problem

Without Bridge

```
Shape

↓

Circle

↓

RedCircle

↓

BlueCircle

↓

GreenCircle
```

Now add:

```
Rectangle

Triangle

Hexagon
```

Then add:

```
Yellow

Black

Purple
```

The number of classes grows exponentially.

Maintenance becomes impossible.

---

# Desired Solution

Separate

```
Shape
```

from

```
Color
```

Then connect them.

```
Shape

↓

Color
```

Any Shape can use any Color.

---

# Real-World Analogy

Think about a TV Remote.

The Remote is one thing.

The TV brand is another.

```
Remote

↓

Samsung TV
```

or

```
Remote

↓

Sony TV
```

or

```
Remote

↓

LG TV
```

The Remote shouldn't care about the TV manufacturer.

Likewise,

TV manufacturers shouldn't create separate TVs for every remote.

The Bridge connects them.

---

# Another Analogy

Imagine a notification system.

Notifications:

- Alert
- Warning
- Reminder

Delivery Channels:

- Email
- SMS
- Push Notification
- Slack

Without Bridge

```
EmailAlert

SMSAlert

PushAlert

SlackAlert

EmailWarning

SMSWarning

...
```

With Bridge

```
Alert

↓

Email
```

or

```
Alert

↓

SMS
```

Each side evolves independently.

---

# Core Philosophy

Instead of

```
Inheritance

↓

Many Classes
```

Prefer

```
Abstraction

↓

Composition

↓

Implementation
```

---

# Structure

```
          Abstraction

               │

               ▼

        Implementation

        ▲     ▲      ▲

        │     │      │

      Impl1 Impl2 Impl3
```

The abstraction delegates work to an implementation.

---

# Workflow

```
Client

↓

Abstraction

↓

Implementation

↓

Result
```

Changing implementations does not affect the abstraction.

Changing abstractions does not affect implementations.

---

# JavaScript Example

## Implementation Interface

```javascript
class Color {

    applyColor() {}

}
```

---

## Concrete Implementations

```javascript
class Red extends Color {

    applyColor(){

        return "Red";

    }

}

class Blue extends Color {

    applyColor(){

        return "Blue";

    }

}
```

---

## Abstraction

```javascript
class Shape {

    constructor(color){

        this.color = color;

    }

}
```

---

## Refined Abstraction

```javascript
class Circle extends Shape{

    draw(){

        console.log(`Drawing ${this.color.applyColor()} Circle`);

    }

}
```

---

## Usage

```javascript
const red = new Red();

const blue = new Blue();

const circle1 = new Circle(red);

const circle2 = new Circle(blue);

circle1.draw();

circle2.draw();
```

Output

```
Drawing Red Circle

Drawing Blue Circle
```

Notice

No subclasses like

```
RedCircle

BlueCircle
```

were created.

---

# TypeScript Example

```typescript
interface Device{

    turnOn():void;

}

class TV implements Device{

    turnOn(){

        console.log("TV ON");

    }

}

class Radio implements Device{

    turnOn(){

        console.log("Radio ON");

    }

}

class Remote{

    constructor(private device:Device){}

    power(){

        this.device.turnOn();

    }

}
```

---

# Python Example

```python
class Color:

    def apply(self):

        pass


class Red(Color):

    def apply(self):

        return "Red"


class Shape:

    def __init__(self,color):

        self.color=color


class Circle(Shape):

    def draw(self):

        print(self.color.apply(),"Circle")
```

---

# UML Diagram

```
          Abstraction

         + operation()

              │

              ▼

      Implementor

      + operation()

          ▲

     ┌────┴────┐

     ▼         ▼

 ConcreteA  ConcreteB
```

---

# Real-World Use Cases

Bridge appears in many enterprise systems.

---

## Notification Systems

```
Notification

↓

Email

SMS

Slack

Push
```

Any notification can use any delivery channel.

---

## Database Drivers

```
Repository

↓

MySQL

↓

PostgreSQL

↓

SQLite

↓

MongoDB
```

The Repository abstraction stays the same.

Only the driver changes.

---

## UI Frameworks

```
Button

↓

Windows

↓

Linux

↓

macOS
```

Widgets remain independent of operating systems.

---

## Graphics Engines

```
Shape

↓

Renderer
```

Different rendering engines

↓

OpenGL

↓

DirectX

↓

Vulkan

---

## Payment Systems

```
Payment

↓

Stripe

↓

PayPal

↓

Square

↓

Authorize.net
```

Business logic remains unchanged.

---

## Cloud Storage

```
Storage

↓

AWS S3

↓

Azure Blob

↓

Google Cloud Storage
```

---

## Device Drivers

```
Printer

↓

HP

↓

Canon

↓

Epson
```

---

# Advantages

✔ Prevents class explosion.

✔ Supports composition over inheritance.

✔ Independent evolution.

✔ Easy to add abstractions.

✔ Easy to add implementations.

✔ Improves maintainability.

✔ Excellent scalability.

---

# Disadvantages

✘ More classes.

✘ Slightly higher complexity.

✘ Can be unnecessary for small systems.

---

# Bridge vs Adapter

Bridge

```
Purpose

↓

Separate abstraction and implementation.
```

Adapter

```
Purpose

↓

Convert incompatible interfaces.
```

Bridge is designed **before** development.

Adapter is often introduced **after** development.

---

# Bridge vs Strategy

Strategy

Changes an algorithm.

Bridge

Changes an implementation.

---

# Bridge vs Composite

Composite

Creates hierarchies.

Bridge

Separates independent dimensions.

---

# AI Decision Rules

Generate a Bridge when:

✓ Two dimensions change independently.

✓ Inheritance would create many subclasses.

✓ Composition is preferable.

✓ Multiple implementations exist.

✓ Future implementations are expected.

Avoid Bridge when:

✘ Only one implementation exists.

✘ There is no independent variation.

✘ Simpler composition solves the problem.

---

# Common Beginner Mistakes

❌ Confusing Bridge with Adapter.

❌ Using inheritance instead of composition.

❌ Creating unnecessary abstractions.

❌ Mixing implementation logic into abstractions.

❌ Ignoring future extensibility.

---

# Best Practices

✔ Identify independent dimensions first.

✔ Keep abstractions focused on business behavior.

✔ Keep implementations focused on execution details.

✔ Favor interfaces over concrete classes.

✔ Use dependency injection when possible.

---

# Interview Questions

### Q1

What problem does Bridge solve?

**Answer**

It separates abstraction from implementation so both can evolve independently.

---

### Q2

Why not use inheritance?

**Answer**

Inheritance causes class explosion when multiple dimensions vary independently.

---

### Q3

Give common examples.

- Remote ↔ TV
- Notification ↔ Channel
- Shape ↔ Color
- Repository ↔ Database
- UI ↔ Platform

---

### Q4

Bridge vs Adapter?

**Answer**

Bridge separates abstraction and implementation during design.

Adapter connects incompatible interfaces after they already exist.

---

# Summary

The Bridge Pattern separates **abstraction** from **implementation**, allowing both sides to evolve independently.

Instead of creating subclasses for every possible combination, Bridge connects two independent hierarchies through composition.

This pattern greatly improves scalability, flexibility, and maintainability, making it ideal for systems with multiple dimensions of change such as notification frameworks, rendering engines, cloud providers, repositories, and cross-platform applications.

---

> **Golden Rule**

> **"If two aspects of your system change independently, don't combine them with inheritance—connect them with a Bridge."**

---

# 3.8 Flyweight Pattern

> **"Use sharing to efficiently support a large number of similar objects."**

---

# Intent

The **Flyweight Pattern** minimizes memory usage by **sharing common data between multiple objects** instead of storing duplicate copies.

Instead of creating thousands or even millions of identical objects, Flyweight creates **one shared object** and allows many clients to use it.

The Flyweight Pattern is one of the most important optimization patterns for:

- Memory usage
- Performance
- Large-scale applications
- Rendering engines
- Game development

It follows a simple philosophy:

> **"Share what is common. Store only what is unique."**

---

# Learning Objectives

After completing this section you should be able to:

- Understand why Flyweight exists.
- Distinguish shared state from unique state.
- Reduce memory consumption.
- Implement object sharing.
- Recognize Flyweight in modern frameworks.
- Guide AI coding agents to optimize memory-intensive systems.

---

# Why Does Flyweight Exist?

Imagine developing a forest simulation game.

The world contains

```
1,000,000 Trees
```

Every tree stores

- Texture
- Leaf Image
- Branch Model
- Bark Model
- Growth Rules
- Physics

If every tree stores identical information,

memory usage becomes enormous.

Instead,

only store:

```
Tree Type
```

once.

Each tree only stores

- Position
- Rotation
- Scale

The rest is shared.

---

# The Problem

Without Flyweight

```
Tree 1

Texture

Model

Leaves

Physics

----------------

Tree 2

Texture

Model

Leaves

Physics

----------------

Tree 3

Texture

Model

Leaves

Physics
```

Every object duplicates the same data.

---

# Desired Solution

```
Oak Tree

↓

Shared Model

↓

Shared Texture

↓

Shared Physics

--------------------

Tree Instance

↓

Position

↓

Rotation

↓

Scale
```

Every tree references one shared object.

---

# Real-World Analogy

Imagine a library.

One book may have

```
500 Readers
```

The library does **not** print

500 copies.

Instead,

everyone shares

one copy.

The readers are different.

The book is shared.

That book is the Flyweight.

---

# Another Analogy

Consider emojis on your phone.

Millions of users send

😀

Only one emoji image exists.

Every message references the same image.

The image is shared.

The message position is unique.

---

# Core Philosophy

Instead of

```
Duplicate

Duplicate

Duplicate

Duplicate
```

Prefer

```
One Shared Object

↓

Many References
```

Memory usage decreases dramatically.

---

# Intrinsic State vs Extrinsic State

This is the most important Flyweight concept.

---

## Intrinsic State

Shared data.

Stored once.

Examples

- Texture
- Font
- Icon
- Image
- Animation
- Character Shape
- Vehicle Model

Intrinsic state never changes per object.

---

## Extrinsic State

Unique data.

Stored separately.

Examples

- Position
- Rotation
- Health
- Username
- Score
- Current Speed

Extrinsic state changes for every object.

---

# Visualization

Without Flyweight

```
Character A

Font

Character B

Font

Character C

Font
```

Three font objects.

---

With Flyweight

```
Shared Font

▲

│

Character A

Character B

Character C
```

Only one font object.

---

# Structure

```
             Client

                │

                ▼

        Flyweight Factory

                │

        ┌───────┴────────┐

        ▼                ▼

     Flyweight      Existing Flyweight

                │

                ▼

          Shared Object
```

---

# Workflow

```
Client

↓

Request Object

↓

Factory

↓

Already Exists?

↓

Yes

↓

Return Existing Object

↓

No

↓

Create Object

↓

Store

↓

Return Object
```

The Factory guarantees sharing.

---

# JavaScript Example

## Flyweight

```javascript
class TreeType{

    constructor(name, texture){

        this.name = name;

        this.texture = texture;

    }

}
```

---

## Factory

```javascript
class TreeFactory{

    constructor(){

        this.types = {};

    }

    getTreeType(name, texture){

        const key = name;

        if(!this.types[key]){

            this.types[key] = new TreeType(name, texture);

        }

        return this.types[key];

    }

}
```

---

## Tree Instance

```javascript
class Tree{

    constructor(x, y, treeType){

        this.x = x;

        this.y = y;

        this.type = treeType;

    }

}
```

---

## Usage

```javascript
const factory = new TreeFactory();

const oak = factory.getTreeType("Oak", "oak.png");

const tree1 = new Tree(10,20,oak);

const tree2 = new Tree(50,90,oak);

const tree3 = new Tree(70,80,oak);
```

All three trees share the same

```
TreeType
```

object.

---

# TypeScript Example

```typescript
class Icon{

    constructor(public image:string){}

}

class IconFactory{

    private cache = new Map<string,Icon>();

    get(image:string){

        if(!this.cache.has(image))

            this.cache.set(image,new Icon(image));

        return this.cache.get(image)!;

    }

}
```

---

# Python Example

```python
class Font:

    def __init__(self,name):

        self.name=name


class FontFactory:

    _fonts={}

    @classmethod

    def get_font(cls,name):

        if name not in cls._fonts:

            cls._fonts[name]=Font(name)

        return cls._fonts[name]
```

Usage

```python
arial = FontFactory.get_font("Arial")

arial2 = FontFactory.get_font("Arial")
```

Both variables reference the same object.

---

# UML Diagram

```
             Flyweight

          + operation()

                ▲

                │

        ConcreteFlyweight

                ▲

                │

        FlyweightFactory

                │

         Shared Instances
```

---

# Real-World Use Cases

Flyweight is widely used.

---

## Game Engines

Millions of

- Trees
- Rocks
- Grass
- NPC Models
- Bullets

share common assets.

Examples

- Unity
- Unreal Engine

---

## Text Editors

Every letter

```
A
```

shares

- Font
- Glyph
- Shape

Only its position changes.

Microsoft Word uses similar techniques.

---

## Browser Rendering

Browsers share

- Fonts
- Icons
- CSS Rules
- Images

instead of duplicating them.

---

## Maps

Google Maps

↓

Road Icons

↓

Markers

↓

Buildings

↓

Tree Icons

Many markers share the same icon.

---

## GUI Frameworks

Buttons

↓

Shared Icons

↓

Shared Themes

↓

Shared Fonts

---

## Chess Games

White Pawn

↓

Shared Image

↓

Different Position

All pawns reuse the same sprite.

---

## GIS Systems

Thousands of map symbols

share one graphical resource.

---

# Advantages

✔ Significant memory reduction.

✔ Faster object creation.

✔ Better scalability.

✔ Improved rendering performance.

✔ Reduced duplication.

✔ Excellent for large datasets.

---

# Disadvantages

✘ More complex architecture.

✘ Requires separation of state.

✘ Shared objects must remain immutable.

✘ Not beneficial for small applications.

---

# Flyweight vs Singleton

Singleton

```
One Object

Entire Application
```

Flyweight

```
Many Shared Objects

Each representing common state
```

Singleton controls quantity.

Flyweight optimizes memory.

---

# Flyweight vs Prototype

Prototype

Copies objects.

Flyweight

Shares objects.

Prototype increases object count.

Flyweight decreases object count.

---

# Flyweight vs Composite

Composite

Organizes objects into trees.

Flyweight

Shares common objects.

---

# Performance Considerations

Without Flyweight

```
100,000 Objects

↓

100,000 Textures

↓

Huge Memory Usage
```

With Flyweight

```
100,000 Objects

↓

1 Texture

↓

Shared References
```

Memory savings can be enormous.

---

# AI Decision Rules

Generate a Flyweight when:

✓ Thousands of nearly identical objects exist.

✓ Memory usage is high.

✓ Most object state is shared.

✓ Shared objects are immutable.

✓ Performance optimization is important.

Avoid Flyweight when:

✘ Every object is unique.

✘ Memory is not a concern.

✘ State cannot be separated into intrinsic and extrinsic parts.

---

# Common Beginner Mistakes

❌ Sharing mutable state between objects.

❌ Forgetting to separate intrinsic and extrinsic state.

❌ Using Flyweight for small applications.

❌ Creating duplicate Flyweight instances.

❌ Ignoring thread safety in shared factories.

---

# Best Practices

✔ Keep Flyweight objects immutable.

✔ Store shared objects in a factory or cache.

✔ Clearly distinguish intrinsic and extrinsic state.

✔ Benchmark before optimizing.

✔ Use Flyweight only when memory savings justify the added complexity.

---

# Interview Questions

### Q1

What problem does Flyweight solve?

**Answer**

It reduces memory usage by sharing common state among many similar objects.

---

### Q2

What is intrinsic state?

**Answer**

Shared, immutable information stored inside the Flyweight object.

Examples include fonts, textures, icons, and models.

---

### Q3

What is extrinsic state?

**Answer**

Object-specific information supplied by the client, such as position, health, or rotation.

---

### Q4

Give common Flyweight examples.

- Game engines
- Text editors
- Browser rendering
- Google Maps
- Font rendering
- Chess games
- GUI frameworks

---

# Summary

The Flyweight Pattern improves performance and memory efficiency by **sharing common object state** across many instances.

Rather than storing identical information repeatedly, Flyweight separates **intrinsic (shared)** state from **extrinsic (unique)** state, allowing applications to scale efficiently.

This pattern is heavily used in game engines, graphics rendering, browser engines, GIS systems, and other memory-intensive software where thousands or millions of similar objects exist.

---

> **Golden Rule**

> **"If thousands of objects share the same data, don't duplicate it—store it once and let everyone share it."**