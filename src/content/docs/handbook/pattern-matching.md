---
title: "Enums & Pattern Matching"
description: "Algebraic Data Types, exhaustive match expressions, variant payloads, and guard clauses."
category: "The Handbook"
order: 6
prev:
  title: "Architecture Contracts"
  slug: "/docs/handbook/architecture-contracts"
next:
  title: "Async & HTTP Services"
  slug: "/docs/handbook/async-networking"
---

Prady provides expressive algebraic data types (ADTs) and structural pattern matching with compile-time exhaustiveness verification.

## Declaring Enums with Payloads

Enums in Prady can define simple discriminants as well as variants carrying typed data payloads:

```prady
enum WebEvent {
    PageLoad,
    KeyPress(String),
    Click(Int, Int),
    Submit(Map<String, String>)
}
```

## The `match` Expression

Use `match` to branch based on enum variants or literal values. The Prady compiler verifies that all possible variants are handled:

```prady
fn handle_event(event: WebEvent) {
    match event {
        WebEvent::PageLoad => {
            print("Page loaded successfully");
        }
        WebEvent::KeyPress(key) => {
            print("Key pressed: " + key);
        }
        WebEvent::Click(x, y) => {
            print("User clicked at (" + x + ", " + y + ")");
        }
        WebEvent::Submit(payload) => {
            print("Form submitted with fields");
        }
    }
}
```

## Exhaustiveness & Wildcards

If any variant is omitted, the compiler reports a compile-time error. Use the wildcard pattern `_` to provide a fallback:

```prady
let status_code: Int = 404;

match status_code {
    200 => print("Success (OK)"),
    301 => print("Moved Permanently"),
    404 => print("Not Found"),
    500 => print("Internal Server Error"),
    _ => print("Unhandled HTTP Status Code")
}
```

## Pattern Matching with Option and Result

Pattern matching integrates seamlessly with Prady's built-in `Option` and `Result` monads:

```prady
fn display_user_email(user_email: Option<String>) {
    match user_email {
        Some(email) => print("User email: " + email),
        None => print("No email provided")
    }
}
```
