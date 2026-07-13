# Chapter 4 — Behavioral Design Patterns

## 4.1 Introduction
- What are Behavioral Patterns?
- Why are they important?
- Communication vs Structure
- GoF Overview

---

## 4.2 Strategy ⭐⭐⭐⭐⭐

### Intent
### Problem
### Solution
### Diagram
### JavaScript Example
### Enterprise Examples
### AI Decision Rules
### Interview Notes
### Summary

---

## 4.3 Observer ⭐⭐⭐⭐⭐

(Intent → Problem → Solution → Example → Frameworks → AI Rules → Summary)

---

## 4.4 Command ⭐⭐⭐⭐⭐

(Intent → Problem → Solution → Example → Frameworks → AI Rules → Summary)

---

## 4.5 Chain of Responsibility ⭐⭐⭐⭐⭐

(Intent → Problem → Solution → Example → Frameworks → AI Rules → Summary)

---

## 4.6 State ⭐⭐⭐⭐⭐

(Intent → Problem → Solution → Example → Frameworks → AI Rules → Summary)

---

## 4.7 Template Method ⭐⭐⭐⭐

(Condensed)

---

## 4.8 Mediator ⭐⭐⭐⭐

(Condensed)

---

## 4.9 Iterator ⭐⭐⭐⭐

(Condensed)

---

## 4.10 Visitor ⭐⭐⭐

(Condensed)

---

## 4.11 Memento ⭐⭐⭐

(Condensed)

---

## 4.12 Interpreter ⭐⭐⭐

(Condensed)

---

## 4.13 Behavioral Pattern Comparison Matrix

| Pattern | Solves | Use When | Examples |
|----------|---------|-----------|----------|

---

## 4.14 AI Decision Tree

Need to swap algorithms?
        ↓
    Strategy

Need event notifications?
        ↓
    Observer

Need requests processed in sequence?
        ↓
Chain of Responsibility

Need object behavior based on state?
        ↓
State

Need encapsulated actions?
        ↓
Command

Need workflow with fixed steps?
        ↓
Template Method

Need central communication?
        ↓
Mediator

Need collection traversal?
        ↓
Iterator

Need operations on object structures?
        ↓
Visitor

Need object snapshots?
        ↓
Memento

Need to evaluate a language or grammar?
        ↓
Interpreter

---

## 4.15 Chapter Summary

### Memory Trick

Behavioral Patterns answer:

"How do objects communicate?"

| Pattern | Remember As |
|----------|-------------|
| Strategy | Swap Algorithm |
| Observer | Event Notification |
| Command | Wrap Request |
| Chain | Pass Request |
| State | Change Behavior |
| Template | Fixed Workflow |
| Mediator | Central Hub |
| Iterator | Traverse Collection |
| Visitor | Add Operation |
| Memento | Save State |
| Interpreter | Parse Language |

---

## Golden Rules

✔ Strategy → interchangeable algorithms.

✔ Observer → publish/subscribe communication.

✔ Command → encapsulate requests.

✔ Chain → pipeline processing.

✔ State → behavior changes with internal state.

✔ Template → fixed algorithm with customizable steps.

✔ Mediator → reduce object coupling.

✔ Iterator → sequential traversal.

✔ Visitor → add operations without modifying classes.

✔ Memento → snapshots and undo.

✔ Interpreter → evaluate domain-specific languages.