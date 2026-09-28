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
    run        Compile and immediately execute a source file
    build      Compile an optimized native standalone binary via LLVM
    check      Perform lexical, semantic, and architecture verification without executing
    test       Discover and run automated unit and contract tests
    add        Add a package dependency to prady.toml
    init       Scaffold a new Prady project structure
    version    Display version and target platform metadata
```

## `prady run`

Compiles and immediately executes a `.pr` file in memory.

```bash
prady run main.pr
```

Options:
- `--debug`: Enable verbose compiler pipeline tracing and timing breakdown.
- `--args <...>`: Pass command-line arguments to the executed program.

## `prady build`

Invokes the LLVM native backend to produce an optimized standalone executable binary.

```bash
# Compile with default output name
prady build main.pr

# Specify custom binary name
prady build main.pr -o my-service

# Compile with high optimization (-O3)
prady build main.pr --release -o my-service
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
