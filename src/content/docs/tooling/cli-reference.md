---
title: "Prady CLI Commands"
description: "Reference guide for all compiler CLI commands: run, build, check, test, and version."
category: "Tooling & IDE"
order: 1
prev:
  title: "Standard Library"
  slug: "/docs/reference/standard-library"
next:
  title: "Package Manager"
  slug: "/docs/tooling/package-manager"
---

The `prady` command-line executable manages compilation, verification, optimization, and package dependencies.

## Command Overview

```text
USAGE:
    prady <SUBCOMMAND> [OPTIONS] [FILE]

SUBCOMMANDS:
    run          Compile and immediately execute a source file
    emit-llvm    Lower source to PradyIR and emit textual LLVM IR
    fmt          Format source file to standard styling standards
    lint         Run static analysis linter and code smells check
    check        Perform lexical, semantic, and architecture verification without executing
    test         Discover and run automated unit and contract tests
    add          Add a package dependency to prady.toml
    pkg-search   Search packages in the official Prady registry
    conformance  Run language specification conformance test suite
    bench        Run DSA and runtime microbenchmarks
    init         Scaffold a new Prady project structure
    doctor       Diagnose local compiler and toolchain environment
    version      Display version, target triple, and compiler metadata
```

## `prady run`

Compiles and immediately executes a `.pr` file in memory.

```bash
prady run main.pr
```

## `prady emit-llvm`

Lowers the typed AST into PradyIR and generates clean, optimized LLVM IR (Intermediate Representation) ready for compilation or inspection.

```bash
prady emit-llvm src/main.pr
```

## `prady fmt`

Deterministically formats your source files using official Prady indentation and syntax rules (4 spaces, aligned block brackets, normalized operators).

```bash
prady fmt src/main.pr
```

## `prady lint`

Runs comprehensive static analysis rules to flag dead code, naming convention violations (e.g. enforcing `snake_case` functions), empty blocks, and architectural boundary violations.

```bash
prady lint src/main.pr
```

## `prady pkg-search`

Queries the central Prady package registry to discover community and official packages.

```bash
prady pkg-search http
```

## `prady conformance`

Executes the official language specification compliance test suite to verify interpreter and runtime accuracy across core features, recursion, and architecture blocks.

```bash
prady conformance
```

## `prady bench`

Runs built-in high-resolution microbenchmarks measuring allocator throughput and DSA collection operations.

```bash
prady bench
```

## `prady check`

Runs lexer, parser, type inference, semantic checks, and architecture contract verification without generating machine code.

```bash
prady check src/main.pr
```

This is ideal for fast git pre-commit hooks and CI sanity checks.

## `prady version`

Outputs version information, target triple, and compiler commit hash:

```bash
prady version
```

