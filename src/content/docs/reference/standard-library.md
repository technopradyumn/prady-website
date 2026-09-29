---
title: "Built-ins & Project Modules"
description: "Documented built-ins, member APIs, and the current Prady project import model."
category: "Language Reference"
order: 4
prev:
  title: "28 Built-In Data Structures"
  slug: "/docs/reference/data-structures"
next:
  title: "Prady CLI Commands"
  slug: "/docs/tooling/cli-reference"
---

The current Prady CLI provides built-in functions and data structures, and loads project `.pr` files through `import` declarations. It does **not** currently ship the `std::io`, `std::fs`, `std::math`, `std::sys`, or `std::time` source modules shown in older drafts of this page. Importing those names does not make their APIs available.

## Built-in functions and data structures

Common built-ins include `print`, `println`, `input`, `assert`, and `len`. `input()` reads one line from standard input and returns it as a string; pass an optional string prompt to display before waiting. The runtime also provides collection/string operations and the data structures listed in the [data-structure reference](/docs/reference/data-structures). The exact supported functions and methods are those implemented by the current compiler/runtime.

```prady
fn main() {
    let values = [1, 2, 3];
    let name = input("Name: ");
    println("Count: " + len(values));
    println("Hello " + name);
    assert(len(values) == 3, "the list should contain three values");
}
```

## Project imports

```prady
import models.user;

fn main() {
    let user = User("Prady");
    println(user.name);
}
```

The import path `models.user` resolves to `models/user.pr` relative to the importing source file (or the project's `src` directory). The imported file must define the symbols used by the program. The CLI currently discovers local project `.pr` files; it does not download or resolve third-party packages just because an import path is written.

The browser playground cannot access local files, so it reports project imports as warnings. Use the CLI or VS Code extension for multi-file projects. See [Errors & Troubleshooting](/docs/tooling/troubleshooting) if an import cannot be resolved.
