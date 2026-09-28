---
title: "Overview & Philosophy"
description: "An introduction to the Prady programming language, key design goals, and LLVM compilation."
category: "Getting Started"
order: 1
next:
  title: "Installation & Setup"
  slug: "/docs/getting-started/installation"
---

Prady is a statically-typed, high-performance systems and application programming language designed for scalable software development. It bridges the gap between machine-level performance and human developer ergonomics.

## Why Another Programming Language?

Modern software engineering often forces a compromise:
- **Low-level languages** like C and C++ offer raw execution speed, but suffer from memory management traps, lack of module boundaries, and decades of legacy baggage.
- **Modern high-level languages** like TypeScript, Python, or Go provide high developer productivity, but introduce garbage collection pauses, heavy runtimes, or weak architectural governance.

Prady was designed from day one to eliminate this compromise by introducing **Architecture-as-Code** directly into the language syntax, complemented by zero-cost compilation via an **LLVM backend**.

## Core Design Principles

### 1. Architecture-as-Code
In traditional codebases, architecture diagrams and boundary rules live in wikis or diagrams that drift away from the actual code. Prady introduces first-class keywords:

```prady
architecture CorePlatform {
    layer Domain {
        spec: "Pure entities & business logic"
    }
    layer Persistence {
        spec: "Database queries & schemas"
    }

    contract Boundaries {
        Domain cannot import Persistence;
    }
}
```

If an engineer accidentally introduces an unauthorized import, the Prady compiler halts the build instantly with a precise architectural violation error.

### 2. 28 Built-In Data Structures
Advanced software requires specialized data structures. Rather than forcing developers to reinvent trees, heaps, or search caches—or trust unvetted third-party libraries—Prady ships with **28 production-grade data structures** built directly into the standard library.

### 3. Developer Ergonomics
With structural typing, modern lambdas, higher-order collection methods (`filter`, `map`, `reduce`), and exhaustive pattern matching, Prady feels familiar and productive from your very first line of code.

### 4. Zero-Cost LLVM Native Compilation
Prady compiles down to standalone machine binaries for Windows (x64), macOS (Intel & Apple Silicon), and Linux (x64 & ARM64). There are no runtimes to install and no VM overhead.

## Next Steps

Ready to test Prady? Proceed to the [Installation Guide](/docs/getting-started/installation) to install the CLI compiler on your system, or experiment immediately in the [Interactive Web Playground](/play).
