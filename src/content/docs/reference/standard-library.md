---
title: "Standard Library Overview"
description: "Core modules and standard library packages in Prady."
category: "Language Reference"
order: 4
prev:
  title: "28 Built-In Data Structures"
  slug: "/docs/reference/data-structures"
next:
  title: "Prady CLI Commands"
  slug: "/docs/tooling/cli-reference"
---

The Prady standard library provides zero-overhead, memory-safe modules for core computing needs.

## Standard Modules

| Module | Namespace | Purpose |
| :--- | :--- | :--- |
| **`std::io`** | Standard I/O | Terminal output, string formatted printing, buffered input reading |
| **`std::fs`** | Filesystem | Path resolution, reading files, writing binary/text streams |
| **`std::math`** | Mathematics | Trigonometry, logarithms, exponential scaling, rounding |
| **`std::sys`** | System | Command line arguments, environment variables, exit codes |
| **`std::time`** | Clock & Timers | High-resolution monotonic timers, epoch timestamps |

## `std::io` Example

```prady
use std::io::{print, readLine};

fn main() {
    print("Please enter your name: ");
    let name = readLine();
    print("Welcome, " + name + "!");
}
```

## `std::fs` Example

```prady
use std::fs::{readFile, writeFile, exists};

fn main() {
    let path = "config.json";
    if exists(path) {
        let content = readFile(path);
        print("Config content: " + content);
    } else {
        writeFile(path, '{"version": 1}');
        print("Initialized default config.");
    }
}
```

## `std::time` Monotonic Benchmarking

```prady
use std::time::Instant;

fn main() {
    let start = Instant::now();
    
    // Perform intensive task
    let mut total = 0;
    for let mut i = 0; i < 100000; i = i + 1 {
        total = total + i;
    }

    let elapsedMs = start.elapsedMillis();
    print("Finished in " + elapsedMs + " ms.");
}
```
