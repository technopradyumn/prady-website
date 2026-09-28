---
title: "Hello World & Scaffolding"
description: "Create your first Prady source file, compile it, and run it locally."
category: "Getting Started"
order: 3
prev:
  title: "Installation & Setup"
  slug: "/docs/getting-started/installation"
next:
  title: "The Basics"
  slug: "/docs/handbook/the-basics"
---

Now that you have the Prady compiler installed, let's create and run your first program.

## Creating a Source File

Prady source files use the `.pr` extension. Create a new directory and a file named `main.pr`:

```bash
mkdir my-prady-app
cd my-prady-app
touch main.pr
```

Open `main.pr` in your editor and add the following code:

```prady
// main.pr
fn main() {
    print("Hello, Prady v1.0.0!");

    let languages = ["Prady", "Rust", "TypeScript", "C++"];
    print("Welcome to modern systems development with: " + languages.join(", "));
}
```

## Running the Code

To compile and execute the program immediately in development mode, use `prady run`:

```bash
prady run main.pr
```

Output:

```text
Hello, Prady v1.0.0!
Welcome to modern systems development with: Prady, Rust, TypeScript, C++
```

## Building a Standalone Native Binary

When you are ready to produce an optimized, standalone binary executable, run `prady build`:

```bash
prady build main.pr -o my-app
```

The Prady compiler passes the parsed AST through its optimization pipeline and invokes the LLVM code generator to produce native machine code (`my-app.exe` on Windows, or `my-app` on macOS/Linux).

You can run this binary directly on any matching machine with zero external dependencies:

```bash
./my-app
```

## Checking Code Without Executing

If you want to perform fast type checking, syntax validation, and architecture rule verification without executing or compiling to machine code, use `prady check`:

```bash
prady check main.pr
```

If your code is clean, the command exits with code `0`.

## Next Step: The Handbook

Continue reading [The Basics](/docs/handbook/the-basics) in the Handbook to learn about variable declarations, mutability, primitive types, and scoping rules.
