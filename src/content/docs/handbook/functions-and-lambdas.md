---
title: "Functions & Lambdas"
description: "Named functions, parameters, return types, first-class closures, and collection pipelines."
category: "The Handbook"
order: 4
prev:
  title: "Control Flow & Loops"
  slug: "/docs/handbook/control-flow"
next:
  title: "Architecture Contracts"
  slug: "/docs/handbook/architecture-contracts"
---

Functions are first-class citizens in Prady. They can be stored in variables, passed as arguments, returned from other functions, and chained in functional pipelines.

## Declaring Functions

Functions are declared using the `fn` keyword. Parameters require type annotations, and the return type is specified with `->`:

```prady
fn add(a: Int, b: Int) -> Int {
    return a + b;
}

fn greet(name: String) -> Void {
    print("Hello, " + name + "!");
}
```

If a function returns nothing, the return type can be written as `Void` or omitted entirely.

## Anonymous Functions (Lambdas)

Anonymous functions can be defined inline using the `fn` syntax. Lambdas automatically capture variables from their enclosing lexical scope:

```prady
let multiplier = 3;
let triple = fn(x: Int) -> Int {
    return x * multiplier;
};

print(triple(10)); // 30
```

## Higher-Order Collection Methods

Prady's standard collections (`List`, `Array`, `Set`) feature built-in higher-order methods that take lambdas:

### `filter`

Returns a new collection containing only elements for which the predicate lambda returns `true`:

```prady
let numbers = [1, 2, 3, 4, 5, 6, 7, 8];

let evens = numbers.filter(fn(x: Int, i: Int) -> Bool {
    return x % 2 == 0;
});

print("Evens: " + evens.join(", ")); // "2, 4, 6, 8"
```

### `map`

Transforms each element in the collection into a new representation:

```prady
let squared = evens.map(fn(x: Int, i: Int) -> Int {
    return x * x;
});

print("Squared: " + squared.join(", ")); // "4, 16, 36, 64"
```

### `reduce`

Accumulates all elements into a single aggregated result:

```prady
let sum = numbers.reduce(fn(acc: Int, curr: Int, i: Int) -> Int {
    return acc + curr;
}, 0);

print("Total sum: " + sum); // 36
```

### `find` and `some`

```prady
let hasLarge = numbers.some(fn(x: Int, i: Int) -> Bool {
    return x > 5;
}); // true
```

## Next Step: Architecture Contracts

Continue to the hallmark feature of Prady: [Architecture-as-Code Contracts](/docs/handbook/architecture-contracts) to see how the compiler guarantees modular software boundaries.
