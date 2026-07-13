# DESIGN_PATTERNS.md

> Version: 1.0
> Purpose: A comprehensive guide to software design patterns, design principles, and architectural thinking for professional software engineering and AI coding agents.

---

# Table of Contents

## Chapter 1 – Foundations

- What are Design Patterns?
- Why Design Patterns Exist
- History of Design Patterns
- Categories of Design Patterns
- When NOT to Use Design Patterns
- Design Principles
- SOLID Principles
- DRY
- KISS
- YAGNI
- Composition over Inheritance
- Law of Demeter
- Principle of Least Astonishment
- Coupling vs Cohesion
- Recognizing Design Problems
- Design Thinking Process
- AI Decision Framework

---

# Chapter 1 — Foundations

---

# What are Design Patterns?

A **Design Pattern** is a reusable solution to a commonly occurring software design problem.

A design pattern is **NOT**:

- A programming language
- A framework
- A library
- A finished implementation
- Copy-paste code

Instead, it is a proven blueprint that explains **how to organize code** to solve recurring problems.

Think of it as an architectural blueprint for software.

Just as architects reuse proven building designs, software engineers reuse proven software designs.

---

# Real-World Analogy

Imagine you are building houses.

Without patterns:

Every architect designs doors, windows, staircases, and roofs differently.

With patterns:

Architects reuse proven designs because they are:

- Safe
- Reliable
- Easy to understand
- Easy to maintain

Software works the same way.

---

# Why Design Patterns Exist

Software projects grow.

Small scripts become applications.

Applications become products.

Products become platforms.

Without proper structure, software becomes difficult to:

- Understand
- Extend
- Debug
- Test
- Scale

Design patterns solve these recurring problems.

---

# Problems That Design Patterns Solve

Without design patterns, developers often encounter:

- Duplicate code
- Tight coupling
- God classes
- Massive functions
- Complex dependencies
- Difficult testing
- Poor scalability
- Fragile architecture

Patterns provide structured solutions.

---

# History of Design Patterns

In 1994, four software engineers published one of the most influential books in software engineering:

**Design Patterns: Elements of Reusable Object-Oriented Software**

These authors became known as the **Gang of Four (GoF)**.

They documented **23 design patterns** that solved common software design problems.

These patterns remain the foundation of modern software engineering.

---

# Why Learn Design Patterns?

Many beginners ask:

> "Can't I just write code without learning patterns?"

Yes.

But you'll eventually reinvent these patterns yourself.

Experienced engineers recognize recurring problems and apply proven solutions instead of inventing new ones every time.

---

# Benefits of Design Patterns

Using design patterns makes software:

✓ More maintainable

✓ Easier to extend

✓ Easier to debug

✓ Easier to test

✓ Easier to understand

✓ More reusable

✓ More scalable

✓ Easier for teams to collaborate on

---

# Are Design Patterns Mandatory?

No.

A design pattern should solve a real problem.

Never force a pattern into code.

The simplest solution is often the best solution.

---

# Categories of Design Patterns

The Gang of Four grouped patterns into three categories.

---

## 1. Creational Patterns

Purpose:

Control object creation.

Question they answer:

> "How should objects be created?"

Examples:

- Singleton
- Factory Method
- Abstract Factory
- Builder
- Prototype

---

## 2. Structural Patterns

Purpose:

Organize relationships between objects.

Question they answer:

> "How should objects be connected?"

Examples:

- Adapter
- Bridge
- Composite
- Decorator
- Facade
- Flyweight
- Proxy

---

## 3. Behavioral Patterns

Purpose:

Manage communication and responsibilities.

Question they answer:

> "How should objects interact?"

Examples:

- Observer
- Strategy
- Command
- State
- Mediator
- Visitor
- Iterator

---

# Visual Overview

```
                Design Patterns
                      │
      ┌───────────────┼───────────────┐
      │               │               │
 Creational      Structural      Behavioral
      │               │               │
 Object         Object          Object
 Creation      Relationships   Communication
```

---

# When NOT to Use Design Patterns

One of the biggest mistakes beginners make is using patterns everywhere.

Bad mindset:

> "I learned Factory Pattern today, so I'll use Factory Pattern in every project."

Professional mindset:

> "Does this problem actually require a design pattern?"

Always remember:

A bad pattern is worse than no pattern.

---

# Common Beginner Mistakes

❌ Using Singleton for everything

❌ Creating unnecessary interfaces

❌ Overusing inheritance

❌ Building factories for two objects

❌ Creating dozens of tiny classes

❌ Overengineering small projects

---

# Design Principles

Design patterns are built upon design principles.

If you understand these principles, you'll naturally understand design patterns.

---

# SOLID Principles

SOLID is a collection of five principles for writing maintainable object-oriented software.

---

## S — Single Responsibility Principle (SRP)

A class should have one reason to change.

Bad:

```
StudentService

↓

Login

Payments

Attendance

Certificates

Email
```

Good:

```
AuthenticationService

AttendanceService

CertificateService

PaymentService
```

Each class has one responsibility.

---

## O — Open/Closed Principle (OCP)

Software entities should be:

Open for extension.

Closed for modification.

Instead of changing existing code,

extend it.

---

## L — Liskov Substitution Principle (LSP)

A child class should be replaceable by its parent without breaking the program.

If replacing one class with another changes behavior unexpectedly,

the design is wrong.

---

## I — Interface Segregation Principle (ISP)

Clients should not depend on methods they don't use.

Prefer multiple small interfaces over one huge interface.

---

## D — Dependency Inversion Principle (DIP)

Depend on abstractions,

not implementations.

Instead of:

```
UserService

↓

MongoDB
```

Prefer:

```
UserService

↓

Repository Interface

↓

MongoDB Repository
```

Now databases can be replaced easily.

---

# DRY

Don't Repeat Yourself.

Every piece of knowledge should have one authoritative representation.

Bad:

The same validation logic copied into five files.

Good:

One reusable validation function.

---

# KISS

Keep It Simple, Stupid.

Simple software is:

- Easier to debug
- Easier to extend
- Easier to test

Always ask:

Can this be simpler?

---

# YAGNI

You Aren't Gonna Need It.

Don't build future features that nobody requested.

Bad:

Adding:

Analytics

Notifications

AI Chat

Reports

Role Management

before users even sign in.

Build today's requirements.

---

# Composition over Inheritance

Prefer assembling objects from smaller reusable components instead of building deep inheritance trees.

Bad:

```
Animal

↓

Bird

↓

FlyingBird

↓

FastFlyingBird

↓

Eagle
```

Better:

```
Bird

↓

CanFly

↓

CanHunt

↓

CanNest
```

Composition is usually more flexible.

---

# Law of Demeter

Also called:

The Principle of Least Knowledge.

A class should know as little as possible about other classes.

Avoid long chains like:

```
student
.classroom
.school
.city
.country
```

Instead,

ask the appropriate object to perform the action.

---

# Principle of Least Astonishment

Code should behave exactly as another developer expects.

Avoid surprising behavior.

Predictable software is easier to maintain.

---

# Coupling vs Cohesion

## Coupling

Measures dependency between modules.

Goal:

Low Coupling

Changing one module should not require changing many others.

---

## Cohesion

Measures how closely related the responsibilities inside a module are.

Goal:

High Cohesion

A module should perform one focused task.

---

# Recognizing Design Problems

Ask yourself:

Is this class becoming too large?

Is this function doing multiple things?

Am I repeating code?

Is testing becoming difficult?

Is adding new features becoming harder?

Do multiple modules depend on each other?

If yes,

a design pattern may help.

---

# Design Thinking Process

Professional engineers rarely start coding immediately.

Instead they ask:

Step 1

What problem am I solving?

↓

Step 2

What responsibilities exist?

↓

Step 3

Which modules should own those responsibilities?

↓

Step 4

What pattern best fits?

↓

Step 5

Implement

↓

Step 6

Review

↓

Step 7

Refactor

---

# AI Decision Framework

Before using any design pattern, an AI coding agent should ask:

✓ Is there a real design problem?

✓ Is the current code difficult to maintain?

✓ Will this pattern reduce complexity?

✓ Will another developer understand it?

✓ Is this introducing unnecessary abstraction?

✓ Is there a simpler solution?

✓ Does the project actually need this pattern?

Only apply a design pattern when it solves a real problem—not because it exists.

---

# Chapter Summary

In this chapter you learned:

- What design patterns are
- Why they exist
- The history of design patterns
- The three categories of patterns
- When NOT to use patterns
- SOLID principles
- DRY
- KISS
- YAGNI
- Composition over Inheritance
- Law of Demeter
- Coupling vs Cohesion
- Design thinking
- AI decision-making before applying patterns

---

> **Golden Rule**

> "Design patterns are tools—not goals. Use them to simplify software, not to impress other developers."

---

# Chapter 2 — Creational Design Patterns

> "How should objects be created?"

---

# 2.1 Introduction to Creational Design Patterns

## What are Creational Design Patterns?

Creational Design Patterns are a family of design patterns that deal with **object creation**.

Instead of creating objects directly throughout the application using `new`, creational patterns provide structured and reusable ways to create objects.

Their primary goal is to make object creation:

- Flexible
- Reusable
- Scalable
- Maintainable
- Decoupled

---

# Why Object Creation Matters

In small programs, creating objects is simple.

Example

```javascript
const student = new Student();
```

Nothing is wrong with this.

However, as applications grow, object creation becomes more complicated.

For example, creating a `User` object might require:

- Database connection
- Configuration
- Environment variables
- Logger
- Email service
- Cache
- Authentication provider
- Feature flags

Now object creation is no longer "just calling `new`."

---

# The Problem with Direct Object Creation

Imagine an e-commerce application.

```javascript
const payment = new PayPalPayment();
```

Later, the company decides to support:

- Stripe
- JazzCash
- EasyPaisa
- Apple Pay
- Google Pay

Now every place using

```javascript
new PayPalPayment()
```

must change.

The application becomes tightly coupled to one implementation.

---

# Real-World Analogy

Imagine buying a car.

You don't manufacture:

- Engine
- Tires
- Seats
- Dashboard
- Steering Wheel

You simply order a car from the manufacturer.

The manufacturer handles the complex creation process.

Creational patterns work exactly the same way.

Instead of creating complex objects everywhere,

you ask a specialized component to build them.

---

# Why Not Just Use "new"?

Using `new` directly is perfectly fine when:

- Objects are simple
- Few dependencies exist
- The application is small

Problems appear when:

- Object creation becomes complex
- Multiple object types exist
- Configuration changes
- Dependencies increase
- Testing becomes difficult

---

# Goals of Creational Patterns

Creational patterns help developers:

✓ Hide creation logic

✓ Reduce coupling

✓ Increase flexibility

✓ Improve maintainability

✓ Simplify testing

✓ Support dependency injection

✓ Improve scalability

---

# Common Problems They Solve

Without creational patterns:

```
Controller

↓

new Database()

↓

new Logger()

↓

new EmailService()

↓

new PaymentService()

↓

new Cache()

↓

Business Logic
```

Every class becomes responsible for creating its own dependencies.

This creates **tight coupling**.

---

With creational patterns:

```
Controller

↓

Factory

↓

Business Objects
```

The controller no longer worries about *how* objects are created.

---

# Direct Creation vs Managed Creation

### Direct Creation

```
Application

↓

new User()

↓

new EmailService()

↓

new Logger()

↓

new Database()
```

Characteristics:

- Easy initially
- Hard to scale
- Hard to test
- High coupling

---

### Managed Creation

```
Application

↓

Factory / Builder / Container

↓

Objects
```

Characteristics:

- Centralized creation
- Flexible
- Easy to replace implementations
- Easier testing

---

# Benefits of Centralized Object Creation

Instead of changing code everywhere:

```
new MySQLDatabase()
```

Change only one place.

```
DatabaseFactory
```

Every other component automatically receives the new implementation.

---

# Relationship with SOLID Principles

Creational patterns naturally support SOLID.

---

## Single Responsibility

Classes focus on their own work.

Creation logic is moved elsewhere.

---

## Open/Closed

Add new object types without modifying existing code.

---

## Dependency Inversion

Depend on abstractions instead of concrete implementations.

Instead of

```
PaymentService

↓

Stripe
```

Prefer

```
PaymentService

↓

Payment Interface

↓

Stripe

↓

PayPal

↓

EasyPaisa
```

---

# Object Lifecycle

Every object goes through a lifecycle.

```
Create

↓

Configure

↓

Use

↓

Destroy
```

Creational patterns focus on the **Create** phase.

---

# Questions Creational Patterns Answer

Whenever you create an object, ask:

- Who should create this object?
- When should it be created?
- Should there be one instance or many?
- Should creation be hidden?
- Does creation require configuration?
- Should object creation depend on runtime information?

If these questions become difficult,

a creational pattern may help.

---

# Types of Creational Patterns

There are five classic GoF Creational Patterns.

---

## 1. Singleton

Purpose

Ensure only one instance exists.

Examples

- Logger
- Configuration
- Cache Manager
- Database Connection Pool

---

## 2. Factory Method

Purpose

Delegate object creation to subclasses or factories.

Examples

- Payment Gateway
- Notification Service
- Authentication Provider

---

## 3. Abstract Factory

Purpose

Create families of related objects.

Examples

Dark Theme

↓

Dark Button

Dark Input

Dark Checkbox

---

## 4. Builder

Purpose

Construct large or complex objects step by step.

Examples

- House Builder
- SQL Query Builder
- HTTP Request Builder
- Pizza Builder

---

## 5. Prototype

Purpose

Create objects by cloning existing ones.

Examples

- Game characters
- Templates
- Graphics editors
- Document duplication

---

# Pattern Comparison

| Pattern | Main Purpose | Best Used For |
|----------|--------------|---------------|
| Singleton | One instance | Configuration, Logger |
| Factory Method | Choose implementation | Payments, Notifications |
| Abstract Factory | Families of objects | Themes, UI Components |
| Builder | Complex object construction | Reports, Queries, APIs |
| Prototype | Clone existing objects | Templates, Games |

---

# Choosing the Wrong Pattern

One of the biggest beginner mistakes:

```
Everything is Singleton.
```

This creates:

- Hidden dependencies
- Difficult testing
- Global state
- Tight coupling

Likewise,

creating a Factory for only two simple objects may be unnecessary.

Patterns should solve problems,

not create them.

---

# Decision Tree

```
Need exactly one instance?

↓

YES

↓

Singleton

----------------------------

Need different implementations?

↓

YES

↓

Factory Method

----------------------------

Need related object families?

↓

YES

↓

Abstract Factory

----------------------------

Need step-by-step construction?

↓

YES

↓

Builder

----------------------------

Need to duplicate existing objects?

↓

YES

↓

Prototype
```

---

# Real-World Software Examples

### Web Browser

Builder

↓

Build HTTP Requests

---

### Spring Framework

Factory

↓

Bean Creation

---

### React

Factory-like functions create components.

---

### Angular

Dependency Injection Container

↓

Creates services automatically.

---

### ASP.NET

Uses dependency injection extensively.

---

### Game Engines

Prototype Pattern

↓

Clone enemies

Clone weapons

Clone levels

---

# AI Decision Framework

Before selecting a creational pattern, an AI coding agent should ask:

✓ Is object creation becoming complicated?

✓ Are multiple implementations required?

✓ Will dependencies grow over time?

✓ Will object creation change frequently?

✓ Is centralized creation beneficial?

✓ Does the application require loose coupling?

✓ Is testing easier if creation is abstracted?

If the answer is mostly **Yes**,

consider a creational pattern.

---

# Common Beginner Mistakes

❌ Using Singleton for every service

❌ Building factories for trivial objects

❌ Creating patterns before a problem exists

❌ Confusing Factory with Builder

❌ Ignoring dependency injection

❌ Copying patterns without understanding them

---

# Key Takeaways

Creational patterns are **not about creating more objects**.

They are about **creating objects more intelligently**.

Good object creation leads to:

✓ Better architecture

✓ Easier maintenance

✓ Better testing

✓ Lower coupling

✓ Higher flexibility

---

> **Golden Rule**

> "When object creation becomes a responsibility of many classes, it's time to make object creation its own responsibility."

---

# 2.2 Singleton Pattern

> "Ensure a class has only one instance and provide a global point of access to it."

---

# Intent

The Singleton Pattern guarantees that only **one instance** of a class exists throughout the lifetime of an application.

Instead of allowing multiple objects to be created, every request returns the same shared instance.

---

# Why Does Singleton Exist?

Imagine every part of your application creates its own logger.

```
User Service
↓

Logger #1

-----------------

Payment Service
↓

Logger #2

-----------------

Order Service
↓

Logger #3

-----------------

Email Service
↓

Logger #4
```

Problems:

- Multiple log files
- Inconsistent logging
- More memory usage
- Harder debugging

Instead, all services should use the same logger.

```
               Logger
                  ▲
      ┌───────────┼───────────┐
      │           │           │
 User      Payment      Email
 Service     Service     Service
```

Now every component writes to one centralized logger.

---

# Real-World Analogy

Think about the **Principal's Office** in a school.

There is only **one principal**.

Every teacher, student, and administrator goes to the same office.

You don't create a new principal whenever someone needs permission.

A Singleton works exactly the same way.

---

# Another Analogy

Consider your home's Wi-Fi router.

Every device connects to the same router.

You don't buy a new router every time a phone joins the network.

The router is a shared resource.

---

# Problem Statement

Without Singleton

```javascript
const logger1 = new Logger();

const logger2 = new Logger();

const logger3 = new Logger();
```

Now you have

```
Logger A

Logger B

Logger C
```

Each maintains its own internal state.

This is often unnecessary.

---

# Desired Solution

```
Application

↓

getLogger()

↓

Same Logger Instance
```

Every request receives the exact same object.

---

# Structure

```
           Singleton Class
          ------------------
          | private instance |
          |------------------|
          | getInstance()    |
          | log()            |
          -------------------
                   ▲
                   │
        Every caller shares it
```

---

# Lifecycle

```
Application Starts

↓

First request

↓

Object Created

↓

Instance Stored

↓

Future requests

↓

Existing object returned
```

---

# JavaScript Implementation

```javascript
class Logger {

    constructor() {

        if (Logger.instance) {
            return Logger.instance;
        }

        this.logs = [];

        Logger.instance = this;
    }

    log(message) {

        this.logs.push(message);

        console.log(message);

    }

}

const loggerA = new Logger();

const loggerB = new Logger();

console.log(loggerA === loggerB);

// true
```

---

# Better JavaScript Version

```javascript
class Logger {

    constructor() {

        this.logs = [];

    }

    static getInstance() {

        if (!Logger.instance) {

            Logger.instance = new Logger();

        }

        return Logger.instance;

    }

}
```

Usage

```javascript
const logger = Logger.getInstance();
```

This clearly communicates the intent.

---

# TypeScript Example

```typescript
class Logger {

    private static instance: Logger;

    private constructor() {}

    static getInstance(): Logger {

        if (!Logger.instance) {

            Logger.instance = new Logger();

        }

        return Logger.instance;

    }

    log(message: string) {

        console.log(message);

    }

}
```

Advantages:

- Type safety
- Private constructor
- Controlled creation

---

# Python Example

```python
class Logger:

    _instance = None

    def __new__(cls):

        if cls._instance is None:

            cls._instance = super().__new__(cls)

        return cls._instance
```

Usage

```python
logger1 = Logger()

logger2 = Logger()

print(logger1 is logger2)

# True
```

---

# Java Example

```java
public class Logger {

    private static Logger instance;

    private Logger() {}

    public static Logger getInstance() {

        if(instance == null){

            instance = new Logger();

        }

        return instance;

    }

}
```

---

# UML Diagram

```
          +--------------------+
          |     Singleton      |
          +--------------------+
          | - instance         |
          +--------------------+
          | + getInstance()    |
          | + operation()      |
          +--------------------+
```

---

# Real-World Use Cases

Singleton is commonly used for:

✅ Logger

✅ Configuration Manager

✅ Cache Manager

✅ Application Settings

✅ Connection Pool Manager

✅ Theme Manager

✅ Event Bus

✅ Printer Queue

---

# Example

Configuration

Instead of

```javascript
new Config();
```

everywhere,

use

```javascript
Config.getInstance();
```

Every component now shares the same configuration.

---

# Benefits

✔ Only one object exists

✔ Lower memory usage

✔ Shared state

✔ Centralized management

✔ Easy global access

✔ Lazy initialization

---

# Disadvantages

Singleton is one of the most controversial design patterns.

Problems include:

❌ Hidden dependencies

❌ Global state

❌ Difficult unit testing

❌ Difficult mocking

❌ Tight coupling

❌ Can violate Single Responsibility Principle

❌ Can make parallel testing difficult

---

# Why Senior Engineers Sometimes Avoid Singleton

Many enterprise applications prefer:

Dependency Injection

instead of

Singleton.

Why?

Dependency Injection makes testing much easier.

Instead of

```
Service

↓

Singleton
```

Prefer

```
Service

↓

Interface

↓

Injected Implementation
```

Now fake implementations can be injected during testing.

---

# Singleton vs Global Variable

Many beginners think they are identical.

They are not.

Global Variable

```
Accessible directly

No control

Can be modified easily
```

Singleton

```
Controlled access

Encapsulated

Creation managed

Methods available
```

Singleton is far safer than a raw global variable.

---

# Lazy vs Eager Initialization

## Lazy Initialization

Object created only when first needed.

```
Application Starts

↓

Nothing Created

↓

First Request

↓

Create Instance
```

Advantages

✔ Faster startup

✔ Lower memory

---

## Eager Initialization

```
Application Starts

↓

Create Object Immediately
```

Advantages

✔ Simpler

✔ Thread-safe in some languages

Disadvantages

May create unused objects.

---

# Thread Safety

Languages like Java and C# may have multiple threads.

Imagine:

Thread A

↓

Creates Singleton

At the same moment

Thread B

↓

Also creates Singleton

Now two objects exist.

Solutions include:

- Synchronization
- Double-Checked Locking
- Enum Singleton (Java)
- Dependency Injection Container

JavaScript generally avoids this issue because of its single-threaded event loop (though workers and clustered processes introduce separate contexts).

---

# Common Beginner Mistakes

❌ Making everything Singleton

❌ Database models

❌ User objects

❌ Shopping carts

❌ Orders

❌ Student records

These should NOT be Singleton.

Only shared application-wide resources should be.

---

# When to Use Singleton

Use Singleton when:

✔ Exactly one instance should exist

✔ Shared state is required

✔ Configuration is centralized

✔ Logging is centralized

✔ Object creation is expensive

✔ Resource sharing is required

---

# When NOT to Use Singleton

Avoid Singleton when:

✘ Multiple instances are expected

✘ Unit testing is important

✘ Different configurations are needed

✘ State should remain isolated

✘ Dependency Injection is available

---

# Refactoring Example

Before

```
UserService

↓

new Logger()

----------------

OrderService

↓

new Logger()

----------------

PaymentService

↓

new Logger()
```

After

```
Logger Singleton

↓

Shared by all services
```

Much cleaner.

---

# AI Decision Rules

Before generating a Singleton, ask:

✓ Should exactly one instance exist?

✓ Will multiple instances cause problems?

✓ Is shared state intentional?

✓ Will testing become difficult?

✓ Would Dependency Injection be better?

If most answers are **No**, do not use Singleton.

---

# Interview Questions

### Q1

What problem does Singleton solve?

**Answer**

It ensures that only one instance of a class exists while providing global access to it.

---

### Q2

What are common Singleton use cases?

- Logger
- Configuration
- Cache
- Connection Pool
- Theme Manager

---

### Q3

Why is Singleton controversial?

Because it introduces global state and hidden dependencies, making testing and maintenance harder.

---

### Q4

Singleton or Dependency Injection?

Modern enterprise applications generally prefer **Dependency Injection** because it provides better flexibility, testability, and loose coupling. Singleton is still useful for certain shared resources but should be applied deliberately.

---

# Summary

The Singleton Pattern is simple but powerful.

Used correctly, it provides:

- Centralized resources
- Shared state
- Lower memory usage
- Consistent behavior

Used incorrectly, it creates:

- Hidden dependencies
- Global state
- Testing difficulties
- Tight coupling

---

> **Golden Rule**

> "Use Singleton only when your application truly needs one shared instance. If you're using it for convenience rather than necessity, reconsider the design."
---

# 2.3 Factory Method Pattern

> "Define an interface for creating an object, but let subclasses or dedicated factories decide which concrete object to create."

---

# Intent

The Factory Method Pattern delegates object creation to a dedicated creator instead of creating objects directly throughout the application.

Instead of writing:

```javascript
const payment = new StripePayment();
```

you write:

```javascript
const payment = PaymentFactory.create("stripe");
```

The application asks for **a payment service**, not **a specific implementation**.

---

# The Problem

Imagine an e-commerce application.

Initially it only supports Stripe.

```javascript
const payment = new StripePayment();

payment.pay();
```

Everything works.

Later management asks you to add:

- PayPal
- EasyPaisa
- JazzCash
- Google Pay
- Apple Pay

Now every file containing

```javascript
new StripePayment()
```

must be changed.

The code becomes difficult to maintain.

---

# Without Factory

```
Checkout Controller

↓

new StripePayment()

↓

Payment
```

Another module

```
Subscription Service

↓

new StripePayment()

↓

Payment
```

Another module

```
Refund Service

↓

new StripePayment()
```

Stripe is now hardcoded everywhere.

---

# Desired Solution

```
Checkout

↓

Payment Factory

↓

Stripe

PayPal

EasyPaisa

JazzCash

Apple Pay
```

Only the factory knows which implementation should be created.

---

# Real-World Analogy

Imagine ordering coffee at a café.

You don't walk into the kitchen and make it yourself.

Instead:

```
Customer

↓

Cashier

↓

Kitchen

↓

Coffee
```

The cashier acts as a factory.

The customer only requests:

"I want a Latte."

The customer does not care:

- Which machine is used
- Which employee makes it
- Which beans are selected

Object creation is hidden.

---

# Another Analogy

Consider buying a SIM card.

You ask the shopkeeper:

"I need a prepaid SIM."

The shopkeeper decides whether to provide:

- Jazz
- Zong
- Ufone
- Telenor

You requested a service.

The factory selected the implementation.

---

# Core Idea

Instead of

```
Application

↓

new Object()
```

Prefer

```
Application

↓

Factory

↓

Object
```

This small change dramatically improves flexibility.

---

# Structure

```
              Client
                 │
                 ▼
        Payment Factory
                 │
      ┌──────────┼──────────┐
      ▼          ▼          ▼
 Stripe     PayPal     EasyPaisa
```

The client never creates payment objects directly.

---

# Workflow

```
Client

↓

Requests Payment Method

↓

Factory receives request

↓

Factory decides implementation

↓

Returns object

↓

Client uses object
```

---

# JavaScript Example

### Step 1 — Create Implementations

```javascript
class StripePayment {

    pay() {

        console.log("Processing Stripe Payment");

    }

}

class PayPalPayment {

    pay() {

        console.log("Processing PayPal Payment");

    }

}
```

---

### Step 2 — Create Factory

```javascript
class PaymentFactory {

    static create(type) {

        switch(type){

            case "stripe":

                return new StripePayment();

            case "paypal":

                return new PayPalPayment();

            default:

                throw new Error("Unsupported payment method");

        }

    }

}
```

---

### Step 3 — Usage

```javascript
const payment = PaymentFactory.create("paypal");

payment.pay();
```

Output

```
Processing PayPal Payment
```

Notice:

The client never calls

```javascript
new PayPalPayment();
```

---

# TypeScript Example

```typescript
interface Payment {

    pay(): void;

}

class StripePayment implements Payment {

    pay(){

        console.log("Stripe");

    }

}

class PayPalPayment implements Payment {

    pay(){

        console.log("PayPal");

    }

}

class PaymentFactory {

    static create(type: string): Payment {

        switch(type){

            case "stripe":

                return new StripePayment();

            case "paypal":

                return new PayPalPayment();

            default:

                throw new Error("Unsupported Payment");

        }

    }

}
```

Notice how the factory returns the interface instead of a concrete class.

---

# Python Example

```python
class StripePayment:

    def pay(self):

        print("Stripe")


class PayPalPayment:

    def pay(self):

        print("PayPal")


class PaymentFactory:

    @staticmethod
    def create(payment_type):

        if payment_type == "stripe":

            return StripePayment()

        elif payment_type == "paypal":

            return PayPalPayment()

        raise Exception("Unsupported payment")
```

Usage

```python
payment = PaymentFactory.create("paypal")

payment.pay()
```

---

# UML Diagram

```
                  Client
                     │
                     ▼
             PaymentFactory
                     │
         ┌───────────┼───────────┐
         ▼           ▼           ▼
     Stripe      PayPal     EasyPaisa
```

---

# Before Refactoring

```
Checkout

↓

new Stripe()

----------------

Subscription

↓

new Stripe()

----------------

Refund

↓

new Stripe()
```

Changing Stripe requires changing many files.

---

# After Refactoring

```
Checkout

↓

PaymentFactory

↓

Stripe

----------------

Subscription

↓

PaymentFactory

↓

Stripe

----------------

Refund

↓

PaymentFactory

↓

Stripe
```

Only one place controls object creation.

---

# Advantages

✔ Centralized object creation

✔ Easier maintenance

✔ Easier testing

✔ Loose coupling

✔ Supports Open/Closed Principle

✔ Easy to add new implementations

✔ Cleaner business logic

---

# Disadvantages

✘ Adds additional classes

✘ Slightly more complex

✘ Overkill for very small applications

✘ Poorly designed factories can become large switch statements

---

# Improving the Factory

Instead of a large switch statement:

```javascript
switch(type){

case "a":

case "b":

case "c":

case "d":

...
}
```

Use registration or dependency injection.

Example concept:

```
Factory

↓

Dictionary / Map

↓

Implementation
```

This makes factories easier to extend.

---

# Factory vs Constructor

Constructor

```javascript
new StripePayment()
```

Factory

```javascript
PaymentFactory.create("stripe")
```

Constructor creates a specific object.

Factory decides which object to create.

---

# Factory vs Singleton

Singleton answers:

> "How many objects should exist?"

Factory answers:

> "Which object should be created?"

They solve completely different problems.

---

# Factory vs Builder

Factory

Creates one object.

Builder

Constructs one complex object step by step.

Example

Factory

↓

Car

Builder

↓

Car with

- Engine
- Wheels
- Color
- Interior
- Navigation

---

# Real-World Examples

Factory Method is used in:

### Payment Systems

```
Stripe

PayPal

Square

Apple Pay
```

---

### Authentication

```
Google Login

GitHub Login

Microsoft Login

Facebook Login
```

---

### Notifications

```
Email

SMS

Push Notification

WhatsApp
```

---

### Database Drivers

```
MySQL

PostgreSQL

MongoDB

SQLite
```

---

### Cloud Providers

```
AWS

Azure

Google Cloud
```

---

# AI Decision Rules

Before generating a Factory, ask:

✓ Are there multiple implementations?

✓ Will new implementations be added later?

✓ Is object creation repeated?

✓ Does the client need to remain independent?

✓ Will dependencies change over time?

If the answer is mostly **Yes**, Factory Method is likely appropriate.

---

# Common Beginner Mistakes

❌ Creating a factory for one simple class

❌ Putting business logic inside the factory

❌ Creating giant switch statements with dozens of cases

❌ Returning different object types that do not share a common interface

❌ Confusing Factory Method with Abstract Factory

---

# Interview Questions

### Q1

What problem does Factory Method solve?

**Answer**

It centralizes object creation and allows clients to work with abstractions instead of concrete classes.

---

### Q2

How does Factory Method support the Open/Closed Principle?

**Answer**

New implementations can be added by extending the factory rather than modifying client code.

---

### Q3

When should Factory Method be used?

- Multiple implementations exist
- Object creation is complex
- Implementations may change
- Loose coupling is desired

---

### Q4

What is the biggest benefit?

Client code becomes independent of concrete implementations.

---

# Best Practices

✔ Return interfaces instead of concrete classes.

✔ Keep factories focused on creation only.

✔ Do not place business logic inside factories.

✔ Prefer dependency injection for very large systems.

✔ Keep client code unaware of implementation details.

---

# Summary

The Factory Method Pattern separates **what the application needs** from **how the object is created**.

Instead of scattering object creation throughout the codebase, creation is centralized, making software easier to extend, test, and maintain.

It is one of the most widely used patterns in enterprise software and forms the foundation of many modern frameworks.

---

> **Golden Rule**

> "When object creation starts appearing in many places, move it to a factory. Let the application ask for a capability, not a concrete class."
---

# 2.4 Abstract Factory Pattern

> "Provide an interface for creating families of related or dependent objects without specifying their concrete classes."

---

# Intent

The Abstract Factory Pattern creates **families of related objects**.

Instead of creating a single object like Factory Method, an Abstract Factory creates multiple objects that are designed to work together.

Think of it as a **Factory of Factories**.

---

# Why Do We Need Abstract Factory?

Imagine you're developing a desktop application.

Your application supports:

- Windows
- macOS
- Linux

Each operating system requires different UI components.

For Windows:

- Windows Button
- Windows Checkbox
- Windows Textbox

For macOS:

- Mac Button
- Mac Checkbox
- Mac Textbox

Without Abstract Factory:

```javascript
new WindowsButton()

new MacCheckbox()

new LinuxTextbox()
```

You accidentally mix components from different operating systems.

The UI becomes inconsistent.

---

# Desired Solution

Instead of manually creating every object,

ask the correct factory.

```
Windows Factory

↓

Windows Button

Windows Checkbox

Windows Textbox
```

or

```
Mac Factory

↓

Mac Button

Mac Checkbox

Mac Textbox
```

Every component now belongs to the same family.

---

# Real-World Analogy

Imagine buying furniture.

You choose:

"I want the Modern Collection."

You automatically receive:

- Modern Sofa
- Modern Table
- Modern Chair
- Modern Bed

Everything matches.

You don't receive:

Modern Sofa

Classic Table

Victorian Chair

Abstract Factory ensures consistency.

---

# Another Analogy

Think of ordering a meal.

You choose:

Pakistani Meal

You receive:

- Biryani
- Raita
- Salad
- Soft Drink

Choose:

Italian Meal

You receive:

- Pizza
- Garlic Bread
- Pasta
- Juice

Each meal is a family.

---

# Factory Method vs Abstract Factory

Factory Method

```
Creates

↓

One Product
```

Abstract Factory

```
Creates

↓

Many Related Products
```

---

# Structure

```
                 Client
                    │
                    ▼
          GUI Factory Interface
          ┌─────────┴─────────┐
          ▼                   ▼
   Windows Factory      Mac Factory
          │                   │
     ┌────┴────┐         ┌────┴────┐
     ▼         ▼         ▼         ▼
 Button   Checkbox    Button   Checkbox
```

The client only communicates with the abstract factory.

---

# Workflow

```
Client

↓

Chooses Factory

↓

Factory Creates

↓

Related Components

↓

Client Uses Components
```

The client never knows which concrete classes were created.

---

# JavaScript Example

## Step 1 — Products

```javascript
class WindowsButton {

    render(){

        console.log("Windows Button");

    }

}

class MacButton {

    render(){

        console.log("Mac Button");

    }

}

class WindowsCheckbox {

    render(){

        console.log("Windows Checkbox");

    }

}

class MacCheckbox {

    render(){

        console.log("Mac Checkbox");

    }

}
```

---

## Step 2 — Factories

```javascript
class WindowsFactory {

    createButton(){

        return new WindowsButton();

    }

    createCheckbox(){

        return new WindowsCheckbox();

    }

}

class MacFactory {

    createButton(){

        return new MacButton();

    }

    createCheckbox(){

        return new MacCheckbox();

    }

}
```

---

## Step 3 — Client

```javascript
const factory = new WindowsFactory();

const button = factory.createButton();

const checkbox = factory.createCheckbox();

button.render();

checkbox.render();
```

Output

```
Windows Button

Windows Checkbox
```

Notice:

Both components belong to the same family.

---

# TypeScript Example

```typescript
interface Button {

    render(): void;

}

interface Checkbox {

    render(): void;

}

class WindowsButton implements Button {

    render(){

        console.log("Windows Button");

    }

}

class WindowsCheckbox implements Checkbox {

    render(){

        console.log("Windows Checkbox");

    }

}

interface UIFactory {

    createButton(): Button;

    createCheckbox(): Checkbox;

}
```

Concrete factories implement the interface.

This keeps the client independent.

---

# Python Example

```python
class WindowsButton:

    def render(self):

        print("Windows Button")


class WindowsCheckbox:

    def render(self):

        print("Windows Checkbox")


class WindowsFactory:

    def create_button(self):

        return WindowsButton()

    def create_checkbox(self):

        return WindowsCheckbox()
```

Usage

```python
factory = WindowsFactory()

button = factory.create_button()

checkbox = factory.create_checkbox()
```

---

# UML Diagram

```
                    Client
                       │
                       ▼
            Abstract Factory
             ▲             ▲
             │             │
     WindowsFactory   MacFactory
         │     │         │     │
         ▼     ▼         ▼     ▼
     Button Checkbox  Button Checkbox
```

---

# Real-World Use Cases

Abstract Factory is commonly used for:

---

## Cross-Platform UI

Windows

↓

Windows Button

Windows Menu

Windows Dialog

---

macOS

↓

Mac Button

Mac Menu

Mac Dialog

---

## Themes

Light Theme

↓

Light Button

Light Card

Light Input

---

Dark Theme

↓

Dark Button

Dark Card

Dark Input

---

## Database Providers

MySQL Factory

↓

Connection

Query Builder

Transaction

---

PostgreSQL Factory

↓

Connection

Query Builder

Transaction

---

## Cloud Providers

AWS Factory

↓

Storage

Database

Queue

---

Azure Factory

↓

Storage

Database

Queue

---

# Advantages

✔ Families stay consistent

✔ Supports Open/Closed Principle

✔ Client code remains independent

✔ Easy to swap entire implementations

✔ Reduces coupling

✔ Improves scalability

---

# Disadvantages

✘ More classes

✘ More interfaces

✘ Increased complexity

✘ Can be excessive for small projects

---

# Factory Method vs Abstract Factory

| Factory Method | Abstract Factory |
|----------------|------------------|
| Creates one object | Creates multiple related objects |
| Simpler | More complex |
| One factory | Multiple product families |
| One responsibility | Coordinates entire families |
| Good for plugins | Good for ecosystems |

---

# Before Refactoring

```
new WindowsButton()

new WindowsCheckbox()

new WindowsTextbox()
```

Later

```
new MacButton()

new WindowsCheckbox()

new LinuxTextbox()
```

The UI becomes inconsistent.

---

# After Refactoring

```
WindowsFactory

↓

Button

Checkbox

Textbox
```

or

```
MacFactory

↓

Button

Checkbox

Textbox
```

Everything belongs together.

---

# AI Decision Rules

Before generating an Abstract Factory, ask:

✓ Are there multiple product families?

✓ Should related objects always be used together?

✓ Will new product families be added?

✓ Does the client need to stay independent of implementations?

✓ Would using multiple Factory Methods lead to duplication?

If the answer is mostly **Yes**, Abstract Factory is likely appropriate.

---

# Common Beginner Mistakes

❌ Using Abstract Factory when only one object is needed.

❌ Creating dozens of unnecessary factories.

❌ Mixing products from different families.

❌ Confusing Factory Method with Abstract Factory.

❌ Adding business logic inside factories.

---

# Interview Questions

### Q1

What is the main difference between Factory Method and Abstract Factory?

**Answer**

Factory Method creates one object.

Abstract Factory creates an entire family of related objects.

---

### Q2

Give a real-world use case.

**Answer**

Cross-platform UI development.

Windows Factory creates Windows components.

Mac Factory creates Mac components.

---

### Q3

Why is consistency important?

**Answer**

Because related objects are designed to work together.

Mixing implementations may produce inconsistent behavior or appearance.

---

### Q4

Can Abstract Factory use Factory Methods internally?

**Answer**

Yes.

In many enterprise applications, an Abstract Factory coordinates several Factory Methods to create complete product families.

---

# Best Practices

✔ Keep factories focused on object creation.

✔ Return interfaces instead of concrete classes.

✔ Group only related products.

✔ Do not mix unrelated responsibilities.

✔ Prefer dependency injection where appropriate.

✔ Use this pattern only when product families actually exist.

---

# Summary

The Abstract Factory Pattern is ideal when an application must create **families of related objects** that should always work together.

It provides a clean, scalable way to swap entire implementations without changing client code.

Modern UI frameworks, cross-platform applications, and enterprise systems frequently rely on this pattern to keep related components consistent.

---

> **Golden Rule**

> "Use Factory Method when you need one product. Use Abstract Factory when you need an entire ecosystem of products that belong together."


---

# 2.5 Builder Pattern

> "Separate the construction of a complex object from its representation so the same construction process can create different representations."

---

# Intent

The Builder Pattern constructs **complex objects step by step**.

Instead of passing many parameters to a constructor, the object is built gradually through a series of method calls before being finalized.

---

# Why Do We Need Builder?

Imagine you're creating a `Computer` object.

```javascript
const computer = new Computer(
    "Intel i9",
    "RTX 5090",
    "64GB RAM",
    "2TB SSD",
    "Windows 11",
    "WiFi",
    "Bluetooth",
    "Liquid Cooling",
    "RGB",
    "4K Monitor"
);
```

Questions arise:

- What does parameter #6 represent?
- What if only the GPU changes?
- What if a value is optional?
- What if the order is wrong?

Large constructors quickly become difficult to read and maintain.

---

# The Problem

As objects gain more properties:

- Constructors become huge.
- Optional parameters multiply.
- Readability decreases.
- Bugs become more common.

---

# Desired Solution

Instead of one enormous constructor:

```javascript
const computer = new ComputerBuilder()
    .setCPU("Intel i9")
    .setGPU("RTX 5090")
    .setRAM("64GB")
    .setStorage("2TB SSD")
    .enableBluetooth()
    .enableWiFi()
    .build();
```

Each step clearly expresses intent.

---

# Real-World Analogy

Imagine ordering a custom pizza.

You don't tell the chef everything in one sentence.

Instead:

Choose size

↓

Choose crust

↓

Choose cheese

↓

Choose toppings

↓

Bake

↓

Serve

The pizza is assembled one step at a time.

That is exactly how Builder works.

---

# Another Analogy

Building a house.

You don't construct everything at once.

```
Foundation

↓

Walls

↓

Roof

↓

Doors

↓

Windows

↓

Paint

↓

Furniture

↓

House Ready
```

Each stage contributes to the final product.

---

# Core Idea

Instead of

```
Huge Constructor
```

Prefer

```
Builder

↓

Step 1

↓

Step 2

↓

Step 3

↓

Build
```

---

# Structure

```
Client

↓

Builder

↓

Step-by-Step Configuration

↓

Build()

↓

Final Object
```

---

# Workflow

```
Create Builder

↓

Configure Properties

↓

Configure Optional Features

↓

Validate

↓

Build Object

↓

Return Finished Object
```

---

# JavaScript Example

## Product

```javascript
class Computer {

    constructor(cpu, ram, storage, gpu) {

        this.cpu = cpu;
        this.ram = ram;
        this.storage = storage;
        this.gpu = gpu;

    }

}
```

---

## Builder

```javascript
class ComputerBuilder {

    constructor() {

        this.cpu = "";
        this.ram = "";
        this.storage = "";
        this.gpu = "";

    }

    setCPU(cpu){

        this.cpu = cpu;

        return this;

    }

    setRAM(ram){

        this.ram = ram;

        return this;

    }

    setStorage(storage){

        this.storage = storage;

        return this;

    }

    setGPU(gpu){

        this.gpu = gpu;

        return this;

    }

    build(){

        return new Computer(

            this.cpu,

            this.ram,

            this.storage,

            this.gpu

        );

    }

}
```

---

## Usage

```javascript
const pc = new ComputerBuilder()

    .setCPU("Intel i9")

    .setRAM("64GB")

    .setStorage("2TB SSD")

    .setGPU("RTX 5090")

    .build();
```

Notice how the code reads almost like English.

---

# TypeScript Example

```typescript
class UserBuilder {

    private name = "";

    private email = "";

    setName(name: string): UserBuilder {

        this.name = name;

        return this;

    }

    setEmail(email: string): UserBuilder {

        this.email = email;

        return this;

    }

    build(): User {

        return new User(this.name, this.email);

    }

}
```

Method chaining is achieved by returning `this`.

---

# Python Example

```python
class CarBuilder:

    def __init__(self):

        self.engine = ""

        self.color = ""

    def set_engine(self, engine):

        self.engine = engine

        return self

    def set_color(self, color):

        self.color = color

        return self

    def build(self):

        return {

            "engine": self.engine,

            "color": self.color

        }
```

Usage

```python
car = (
    CarBuilder()
    .set_engine("V8")
    .set_color("Black")
    .build()
)
```

---

# UML Diagram

```
           Client
              │
              ▼
      ComputerBuilder
              │
      ┌───────┼────────┐
      ▼       ▼        ▼
   setCPU  setRAM   setGPU
              │
              ▼
           build()
              │
              ▼
          Computer
```

---

# Fluent Interface

Builder usually uses a **Fluent Interface**.

Each method returns the builder itself.

```javascript
builder

.setCPU()

.setRAM()

.setGPU()

.build();
```

This is called **method chaining**.

---

# Real-World Examples

Builder Pattern appears in:

---

## SQL Query Builders

```javascript
query

.select()

.where()

.orderBy()

.limit()

.build();
```

---

## Axios Configuration

```javascript
axios.create({

baseURL,

timeout,

headers

});
```

Conceptually similar to Builder.

---

## Fetch Request

```javascript
new Request(url, {

method,

headers,

body

});
```

---

## AWS SDK

Many cloud SDKs build requests step by step before sending them.

---

## Docker Images

```
FROM

↓

COPY

↓

RUN

↓

CMD
```

Each instruction contributes to the final image.

---

# Advantages

✔ Easy to read

✔ Supports optional parameters

✔ Avoids giant constructors

✔ Supports immutable objects

✔ Easier validation

✔ Easier maintenance

✔ More expressive APIs

---

# Disadvantages

✘ More classes

✘ Slightly more boilerplate

✘ Unnecessary for simple objects

---

# Builder vs Factory

Factory

```
Creates one object immediately.
```

Builder

```
Creates one complex object gradually.
```

---

# Builder vs Abstract Factory

Builder

```
One object

↓

Step by step
```

Abstract Factory

```
Many related objects

↓

Immediately
```

---

# Builder vs Constructor

Constructor

```javascript
new User(

"a",

"b",

"c",

"d",

"e"

)
```

Builder

```javascript
new UserBuilder()

.setName()

.setEmail()

.setPhone()

.build()
```

Builder is much more readable.

---

# Validation Inside Builder

Builders are excellent places for validation.

Example

```javascript
build(){

    if(!this.email){

        throw new Error("Email required");

    }

    return new User(...);

}
```

This guarantees only valid objects are created.

---

# Immutable Objects

Builders work well with immutable objects.

Instead of modifying an object later,

create it correctly once.

After `build()`,

the object should ideally not change.

---

# AI Decision Rules

Before generating a Builder, ask:

✓ Does the constructor have many parameters?

✓ Are several parameters optional?

✓ Is readability decreasing?

✓ Will more fields be added later?

✓ Does the object require validation?

✓ Should construction happen step by step?

If the answer is mostly **Yes**, Builder is an excellent choice.

---

# Common Beginner Mistakes

❌ Using Builder for tiny objects.

❌ Forgetting to validate before `build()`.

❌ Returning partially built objects.

❌ Mixing business logic with construction.

❌ Creating builders when a constructor is sufficient.

---

# Interview Questions

### Q1

What problem does Builder solve?

**Answer**

It simplifies the creation of complex objects by constructing them step by step.

---

### Q2

When should Builder be preferred over a constructor?

**Answer**

When constructors become large, unreadable, or contain many optional parameters.

---

### Q3

Why does Builder often use method chaining?

**Answer**

It improves readability and creates a fluent, expressive API.

---

### Q4

Can Builder enforce validation?

**Answer**

Yes.

Validation is commonly performed inside `build()` before the final object is returned.

---

# Best Practices

✔ Keep builders responsible only for construction.

✔ Validate before building.

✔ Return immutable objects when possible.

✔ Use fluent interfaces.

✔ Do not place business logic inside builders.

✔ Prefer descriptive method names.

---

# Summary

The Builder Pattern is designed for creating complex objects in a clear, readable, and maintainable way.

It avoids massive constructors, supports optional configuration, enables validation, and produces expressive APIs that are easy to understand.

Many modern frameworks and libraries rely heavily on Builder-style APIs because they scale well as complexity grows.

---

> **Golden Rule**

> "If constructing an object requires many decisions, build it step by step instead of squeezing everything into one constructor."

---

# 2.6 Prototype Pattern

> "Create new objects by copying an existing object instead of creating them from scratch."

---

# Intent

The Prototype Pattern creates new objects by **cloning an existing object**, called the prototype.

Instead of constructing a brand-new object every time, an existing object is copied and then modified if necessary.

The focus is on **duplication**, not **construction**.

---

# Why Do We Need Prototype?

Imagine you're building a game.

Every enemy has:

- Health
- Armor
- Weapons
- Animations
- AI Behavior
- Sounds
- Textures
- Inventory

Creating every enemy from scratch is expensive.

Instead,

create one enemy...

then clone it hundreds of times.

---

# The Problem

Without Prototype

```
Enemy #1

↓

Create

↓

Load Texture

↓

Load Animation

↓

Load Sounds

↓

Load AI

↓

Initialize Inventory
```

Repeat this process for

Enemy #2

Enemy #3

Enemy #4

Enemy #500

Lots of repeated work.

---

# Desired Solution

```
Prototype Enemy

↓

Clone

↓

Enemy A

↓

Clone

↓

Enemy B

↓

Clone

↓

Enemy C
```

The expensive initialization happens once.

---

# Real-World Analogy

Think about Microsoft Word.

You don't create a company letter from scratch every time.

Instead,

you duplicate an existing template.

Then edit:

- Company Name
- Date
- Recipient
- Signature

The template is the Prototype.

---

# Another Analogy

Imagine Photoshop.

You create one button.

Then press

```
Ctrl + J
```

to duplicate it.

Instead of rebuilding the button,

you clone it.

---

# Core Idea

Instead of

```
Create

↓

Configure

↓

Use
```

Prefer

```
Prototype

↓

Clone

↓

Modify

↓

Use
```

---

# Structure

```
            Prototype
                ▲
                │
           clone()
                │
      ┌─────────┼─────────┐
      ▼         ▼         ▼
   Object A  Object B  Object C
```

Every object begins as a copy.

---

# Workflow

```
Prototype Created

↓

Client Requests Clone

↓

Object Copied

↓

Client Modifies Copy

↓

Use Object
```

---

# JavaScript Example

## Product

```javascript
class Enemy {

    constructor(name, health, weapon) {

        this.name = name;
        this.health = health;
        this.weapon = weapon;

    }

    clone() {

        return new Enemy(

            this.name,

            this.health,

            this.weapon

        );

    }

}
```

---

## Usage

```javascript
const prototype = new Enemy(

"Goblin",

100,

"Sword"

);

const enemy1 = prototype.clone();

enemy1.name = "Goblin Captain";

const enemy2 = prototype.clone();

enemy2.health = 150;
```

Notice:

Only one prototype was created.

Everything else was copied.

---

# TypeScript Example

```typescript
class Document {

    constructor(

        public title: string,

        public author: string

    ) {}

    clone(): Document {

        return new Document(

            this.title,

            this.author

        );

    }

}
```

Usage

```typescript
const template = new Document(

"Invoice",

"Huzaifa"

);

const invoice = template.clone();
```

---

# Python Example

```python
import copy

class Employee:

    def __init__(self, name, salary):

        self.name = name

        self.salary = salary

prototype = Employee("John", 5000)

employee = copy.deepcopy(prototype)

employee.name = "Alice"
```

Python's `copy.deepcopy()` is commonly used to implement Prototype.

---

# Java Example

```java
class Employee implements Cloneable {

    String name;

    public Employee clone() {

        try {

            return (Employee) super.clone();

        }

        catch(CloneNotSupportedException e){

            return null;

        }

    }

}
```

---

# UML Diagram

```
              Prototype
          +-------------+
          | clone()     |
          +-------------+
                 ▲
                 │
      ┌──────────┼──────────┐
      ▼          ▼          ▼
 Employee    Document    Enemy
```

---

# Shallow Copy vs Deep Copy

One of the most important Prototype concepts.

---

## Shallow Copy

Copies only the top-level object.

Nested objects remain shared.

Example

```
Person

↓

Address
```

After cloning,

both objects still share the same Address.

Changing one affects the other.

---

## Deep Copy

Everything is duplicated.

```
Person

↓

Address

↓

City

↓

Country
```

Every nested object becomes independent.

Most Prototype implementations should use **Deep Copy** unless shared references are intentional.

---

# Visualization

Shallow Copy

```
Person A

↓

Address

▲

Person B
```

Shared Address.

---

Deep Copy

```
Person A

↓

Address A

----------------

Person B

↓

Address B
```

Completely independent.

---

# Real-World Use Cases

Prototype is commonly used for:

---

## Game Development

Clone

- Enemies
- NPCs
- Weapons
- Vehicles
- Maps

---

## Graphic Editors

Duplicate:

- Layers
- Shapes
- Artboards
- Components

---

## Document Systems

Templates

↓

Invoices

Reports

Certificates

Contracts

---

## UI Builders

Duplicate:

Buttons

Cards

Forms

Dialogs

---

## AI Agents

Clone existing workflows,

then customize individual steps.

---

# Advantages

✔ Faster than rebuilding

✔ Reduces expensive initialization

✔ Supports template systems

✔ Simplifies object creation

✔ Good for complex objects

---

# Disadvantages

✘ Deep cloning can be difficult

✘ Circular references require care

✘ Shared references may introduce bugs

✘ Cloning large graphs can consume memory

---

# Prototype vs Factory

Factory

Creates new objects.

Prototype

Copies existing objects.

---

# Prototype vs Builder

Builder

Constructs gradually.

Prototype

Duplicates instantly.

---

# Prototype vs Singleton

Singleton

One object.

Prototype

Many copies.

---

# Performance Considerations

Creating objects

```
Database

↓

Configuration

↓

Initialization

↓

Construction
```

can be expensive.

Cloning often avoids repeating this work.

However,

deep copying very large object graphs may also be expensive.

Benchmark before optimizing.

---

# AI Decision Rules

Before generating a Prototype, ask:

✓ Is object creation expensive?

✓ Will many similar objects exist?

✓ Is an existing object already configured?

✓ Can cloning save initialization time?

✓ Does the application use templates?

✓ Is Deep Copy required?

If most answers are **Yes**, Prototype is a good choice.

---

# Common Beginner Mistakes

❌ Using shallow copy when deep copy is needed.

❌ Forgetting to clone nested objects.

❌ Copying shared resources unintentionally.

❌ Confusing copying with referencing.

❌ Cloning immutable objects unnecessarily.

---

# Interview Questions

### Q1

What problem does Prototype solve?

**Answer**

It creates new objects by cloning existing ones instead of constructing them from scratch.

---

### Q2

What is the difference between shallow and deep copy?

**Answer**

Shallow copy duplicates only the top-level object, while deep copy duplicates the entire object graph.

---

### Q3

Where is Prototype commonly used?

- Games
- Graphic editors
- Document templates
- UI builders
- Test data generation

---

### Q4

When should Prototype be avoided?

When object creation is simple and cloning introduces unnecessary complexity.

---

# Best Practices

✔ Clone only when it provides real value.

✔ Prefer deep copy for mutable nested objects.

✔ Clearly document clone behavior.

✔ Keep prototypes fully initialized.

✔ Test cloned objects independently.

---

# Summary

The Prototype Pattern focuses on **copying** rather than **constructing**.

It is especially useful when creating an object is expensive or when many similar objects are required.

By cloning an existing prototype, applications can improve performance, reduce repetitive initialization, and simplify object creation while maintaining flexibility.

---

> **Golden Rule**

> "If creating an object is expensive but copying it is cheap, consider Prototype."