---
title: "Everyday Types"
description: "Primitives, strings, structural collections, and algebraic error types in Prady."
category: "The Handbook"
order: 2
prev:
  title: "The Basics"
  slug: "/docs/handbook/the-basics"
next:
  title: "Control Flow & Loops"
  slug: "/docs/handbook/control-flow"
---

Prady features a rich, static type system designed to eliminate null pointer exceptions and catch type mismatches at compile time.

## Primitive Types

### Numbers

Prady provides explicit signed and unsigned integer bit-widths as well as standard floating point types:

- **Signed Integers**: `Int8`, `Int16`, `Int32`, `Int64`, and `Int` (default pointer-width signed integer).
- **Unsigned Integers**: `UInt8`, `UInt16`, `UInt32`, `UInt64`, and `UInt`.
- **Floating Point**: `Float32` and `Float64` (`Float` defaults to `Float64`).

```prady
let count: Int = 100;
let microTime: UInt64 = 1718290349;
let pi: Float = 3.14159265;
```

### Booleans

Booleans in Prady are represented by the `Bool` type, which can be either `true` or `false`:

```prady
let isReady: Bool = true;
let isFailed: Bool = false;
```

### Characters & Strings

`Char` represents an individual Unicode code point, while `String` represents a UTF-8 encoded sequence of characters:

```prady
let ch: Char = 'P';
let greeting: String = "Hello from Prady";
```

Strings support length checking, slicing, casing, splitting, and concatenation:

```prady
let msg = "Prady Language";
print(msg.length());             // 14
print(msg.toUpperCase());        // "PRADY LANGUAGE"
print(msg.startsWith("Prady"));  // true
```

## Structural Collections

### Arrays & Lists

Lists are dynamically-sized, contiguous buffers of elements:

```prady
let fruits = ["Apple", "Banana", "Cherry"];
fruits.push("Date");
print(fruits[0]); // "Apple"
```

### Maps (Dictionaries)

Maps store key-value pairs with $O(1)$ average lookup time:

```prady
let userRoles = Map<String, String>();
userRoles.set("alice", "Admin");
userRoles.set("bob", "Developer");

print("Alice role: " + userRoles.get("alice"));
```

## Option & Result Types

Prady does not have unconstrained `null` or `nil` values. Instead, optional values and operations that might fail use `Option<T>` and `Result<T, E>`.

### Option Types

`Option<T>` represents a value that may or may not be present:

```prady
fn findUser(id: Int) -> Option<User> {
    if id > 0 {
        return Some(fetchUserById(id));
    }
    return None;
}
```

You can safely unwrap or provide a default using the nullish coalescing operator `??`:

```prady
let user = findUser(-1) ?? defaultGuestUser();
```

## Next Step: Control Flow

Move on to [Control Flow & Loops](/docs/handbook/control-flow) to see how conditional branching, iterations, and exhaustive switches work in Prady.
