---
title: "The Basics"
description: "Variables, constants, mutability, type inference, and block expressions."
category: "The Handbook"
order: 1
prev:
  title: "Hello World"
  slug: "/docs/getting-started/hello-world"
next:
  title: "Everyday Types"
  slug: "/docs/handbook/everyday-types"
---

Welcome to the Prady Handbook. This guide walks you through the fundamental building blocks of the language from start to finish.

## Variables & Immutability

By default in Prady, variables declared with `let` are **immutable**. Once assigned, their values cannot be reassigned. This helps prevent accidental side effects and concurrency bugs.

```prady
let port = 8080;
// port = 3000; // Compile Error: Cannot reassign immutable variable 'port'
```

If you need a variable that can be updated over time, use the `mut` modifier:

```prady
let mut counter = 0;
counter = counter + 1;
print("Counter: " + counter); // 1
```

## Constants

For compile-time fixed constants, use the `const` keyword. Constants must be initialized with literal expressions or pure constant evaluatable values:

```prady
const MAX_BUFFER_SIZE = 4096;
const API_VERSION = "v1.0.0";
```

## Type Inference & Explicit Annotations

Prady features robust structural type inference. In most cases, you do not need to explicitly declare the type of a variable:

```prady
let name = "Prady";          // Inferred as String
let version = 1;             // Inferred as Int
let isOptimized = true;      // Inferred as Bool
```

However, explicit type annotations are fully supported whenever clarity is desired:

```prady
let timeoutMs: Int = 5000;
let ratio: Float = 0.75;
let buffer: List<Int> = [10, 20, 30];
```

## Scoping & Shadowing

Prady uses lexical block scoping defined by curly braces `{}`. Variables declared inside a block are dropped when execution exits the block:

```prady
let x = 10;
{
    let x = 20; // Shadows the outer 'x' within this block
    print("Inner x: " + x); // 20
}
print("Outer x: " + x); // 10
```

## Comments

Prady supports single-line and multi-line comments:

```prady
// This is a single-line comment

/*
 * This is a multi-line
 * block comment.
 */
```

## Next Step: Everyday Types

Continue to [Everyday Types](/docs/handbook/everyday-types) to learn about numbers, characters, strings, structural collections, and algebraic error types.
