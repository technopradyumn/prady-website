---
title: "Built-In Primitive Types"
description: "Reference specifications for numeric types, strings, booleans, and bottom types."
category: "Language Reference"
order: 2
prev:
  title: "Keywords & Syntax"
  slug: "/docs/reference/keywords-and-syntax"
next:
  title: "28 Built-In Data Structures"
  slug: "/docs/reference/data-structures"
---

Prady features a statically verified type system with strict width bounds and zero runtime undefined behaviors.

## Numeric Types

| Type | Bit Width | Signed? | Value Range |
| :--- | :--- | :--- | :--- |
| `Int8` | 8 bits | Yes | -128 to 127 |
| `Int16` | 16 bits | Yes | -32,768 to 32,767 |
| `Int32` | 32 bits | Yes | -2,147,483,648 to 2,147,483,647 |
| `Int64` | 64 bits | Yes | -9.22 × 10¹⁸ to 9.22 × 10¹⁸ |
| `Int` | Architecture-native (64 bits on x86_64/ARM64) | Yes | Same as `Int64` on 64-bit systems |
| `UInt8` | 8 bits | No | 0 to 255 (Byte) |
| `UInt16` | 16 bits | No | 0 to 65,535 |
| `UInt32` | 32 bits | No | 0 to 4,294,967,295 |
| `UInt64` | 64 bits | No | 0 to 1.84 × 10¹⁹ |
| `UInt` | Architecture-native | No | Same as `UInt64` on 64-bit systems |
| `Float32` | 32 bits | Yes | Single-precision IEEE 754 float |
| `Float64` / `Float` | 64 bits | Yes | Double-precision IEEE 754 float |

## Textual Types

### `Char`
A 32-bit scalar value representing a single Unicode code point. Literal characters are surrounded by single quotes (`'A'`).

```prady
let letter: Char = 'P';
let emoji: Char = '⚡';
```

### `String`
An immutable, heap-allocated sequence of UTF-8 encoded bytes. Literal strings use double quotes (`"text"`).

```prady
let text: String = "High Performance Computing";
print(text.length()); // 26
```

## Special Types

### `Bool`
Represents standard binary truth values: `true` or `false`.

### `Void` / `Unit`
Represents the absence of a meaningful return value. Functions that perform side effects and return nothing return `Void`.

```prady
fn logMessage(msg: String) -> Void {
    print(msg);
}
```

### `Never`
The bottom type representing an execution path that never returns (such as an infinite process loop or a panic/fatal exit function).

```prady
fn panic(reason: String) -> Never {
    print("FATAL ERROR: " + reason);
    exit(1);
}
```
