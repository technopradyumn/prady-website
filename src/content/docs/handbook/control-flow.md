---
title: "Control Flow & Loops"
description: "Master conditional logic, loops (while, for, foreach..in), and exhaustive switch statements."
category: "The Handbook"
order: 3
prev:
  title: "Everyday Types"
  slug: "/docs/handbook/everyday-types"
next:
  title: "Functions & Lambdas"
  slug: "/docs/handbook/functions-and-lambdas"
---

Prady provides expressive control structures for branching, looping, and pattern matching.

## Conditional Branching: `if` and `else`

Conditionals in Prady require boolean expressions. The parentheses around conditions are optional, but braces `{}` around blocks are mandatory:

```prady
let status = 200;

if status >= 200 && status < 300 {
    print("Request successful!");
} else if status == 404 {
    print("Resource not found.");
} else {
    print("Unexpected error code: " + status);
}
```

## Loops

Prady supports three loop constructs: `while`, traditional `for`, and collection iteration with `foreach`.

### `while` Loops

The `while` loop runs as long as a condition evaluates to `true`:

```prady
let mut count = 3;
while count > 0 {
    print("Countdown: " + count);
    count = count - 1;
}
print("Liftoff!");
```

### `for` Loops

Traditional three-clause `for` loops are ideal for indexed counter iterations:

```prady
for let mut i = 0; i < 5; i = i + 1 {
    print("Iteration index: " + i);
}
```

### `foreach` Loops

To iterate over elements in arrays, lists, or sets, use `foreach`:

```prady
let items = ["Engine", "Parser", "AST", "Emitter"];

foreach item in items {
    print("Processing compiler phase: " + item);
}
```

## Break & Continue

You can control loop iteration using `break` to exit early or `continue` to jump to the next cycle:

```prady
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

foreach n in numbers {
    if n % 2 != 0 {
        continue; // Skip odd numbers
    }
    if n > 6 {
        break; // Stop iteration when exceeding 6
    }
    print("Even number: " + n);
}
```

## `switch` Statements

The `switch` statement in Prady provides clean, multi-way branch dispatching. In Prady, cases do not silently fall through, eliminating common C-style bugs:

```prady
let command = "build";

switch command {
    case "run":
        print("Compiling and executing immediately...");

    case "build":
        print("Emitting optimized standalone LLVM binary...");

    case "check":
        print("Verifying types and architecture contracts...");

    default:
        print("Unknown command: " + command);
}
```

## Next Step: Functions & Lambdas

Proceed to [Functions & Lambdas](/docs/handbook/functions-and-lambdas) to learn how functions, closures, and higher-order collection pipelines work.
