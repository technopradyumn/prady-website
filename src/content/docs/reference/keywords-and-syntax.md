---
title: "Keywords & Syntax Reference"
description: "Exhaustive table of all 32 reserved keywords, operators, and grammar rules in Prady."
category: "Language Reference"
order: 1
prev:
  title: "Architecture Contracts"
  slug: "/docs/handbook/architecture-contracts"
next:
  title: "Built-in Types"
  slug: "/docs/reference/built-in-types"
---

This section provides the complete reference for reserved keywords, operators, and grammatical rules in Prady v1.0.0.

## Reserved Keywords

Prady reserves 32 keywords across control flow, declarations, architecture, and typing:

| Keyword | Category | Purpose |
| :--- | :--- | :--- |
| `fn` | Declaration | Declares a named function or lambda expression |
| `let` | Declaration | Declares an immutable variable binding |
| `mut` | Modifier | Marks a variable binding as mutable |
| `const` | Declaration | Declares a compile-time evaluated constant |
| `struct` | Declaration | Defines a composite record structure |
| `interface` | Declaration | Defines an interface contract for types |
| `class` | Declaration | Declares an object-oriented class |
| `enum` | Declaration | Declares an algebraic enumeration type |
| `type` | Declaration | Defines a type alias |
| `architecture` | Architecture | Declares an architectural system topology |
| `layer` | Architecture | Defines an isolated architectural layer |
| `spec` | Architecture | Human-readable specification string for a layer |
| `contract` | Architecture | Defines boundary constraints between layers |
| `cannot` | Architecture | Disallows relations (e.g. `cannot import`) |
| `import` | Module | Imports symbols or modules into scope |
| `export` | Module | Exports symbols for consumer modules |
| `if` | Control | Conditional branching |
| `else` | Control | Alternate branch for `if` |
| `while` | Control | Iteration loop with condition |
| `for` | Control | Three-clause counter iteration loop |
| `foreach` | Control | Iteration over collections |
| `in` | Control | Member iteration keyword for `foreach` |
| `switch` | Control | Multi-branch case selector |
| `case` | Control | Branch option inside `switch` |
| `default` | Control | Fallback branch inside `switch` |
| `return` | Control | Returns value from a function |
| `break` | Control | Terminates innermost loop |
| `continue` | Control | Advances to next loop iteration |
| `match` | Control | Structural pattern matching |
| `true` | Literal | Boolean true value |
| `false` | Literal | Boolean false value |
| `null` | Literal | Null literal (limited to interop contexts) |

## Operators & Precedence

Operators in Prady follow standard precedence from highest to lowest:

| Operator | Description | Associativity |
| :--- | :--- | :--- |
| `.`, `()`, `[]` | Member access, call, indexing | Left-to-right |
| `!`, `-` (unary) | Logical NOT, arithmetic negation | Right-to-left |
| `*`, `/`, `%` | Multiplication, division, remainder | Left-to-right |
| `+`, `-` | Addition, subtraction, string concatenation | Left-to-right |
| `<`, `<=`, `>`, `>=` | Relational comparisons | Left-to-right |
| `==`, `!=` | Equality and inequality | Left-to-right |
| `&&` | Logical AND (short-circuiting) | Left-to-right |
| `\|\|` | Logical OR (short-circuiting) | Left-to-right |
| `??` | Nullish coalescing operator | Left-to-right |
| `=` | Assignment (requires `mut`) | Right-to-left |

## Annotations

Prady supports decorators and compiler directives prefixed with `@`:

```prady
@inline
fn fastAdd(a: Int, b: Int) -> Int {
    return a + b;
}

@deprecated("Use fetchSecureUser instead")
fn fetchUser() -> User { ... }
```
