---
title: "Package Manager (prady add)"
description: "Managing dependencies, prady.toml project configuration, and semantic versioning."
category: "Tooling & IDE"
order: 2
prev:
  title: "Prady CLI Commands"
  slug: "/docs/tooling/cli-reference"
next:
  title: "VS Code & Language Server (LSP)"
  slug: "/docs/tooling/editor-extensions"
---

Prady includes a built-in package manager that resolves dependencies without requiring external package management tools.

## Project Manifest: `prady.toml`

Every Prady project is defined by a `prady.toml` file in the project root:

```toml
[package]
name = "api-service"
version = "1.0.0"
authors = ["Engineering Team <eng@example.com>"]
edition = "2026"

[dependencies]
http-server = "^1.2.0"
json-parser = ">=0.8.4"

[build]
opt-level = 3
target = "native"
```

## Adding Dependencies

To add a new dependency, use `prady add`:

```bash
prady add http-server
```

This command:
1. Queries the package registry for the latest compatible semver version.
2. Updates `prady.toml`.
3. Downloads the package archive to your local package cache.
4. Updates `prady.lock` to ensure deterministic, reproducible builds.

## Initializing a New Project

To scaffold a new Prady project:

```bash
prady init my-new-project
cd my-new-project
```

This generates:
- `prady.toml`: Project configuration manifest
- `src/main.pr`: Default application entry point
- `architecture.pr`: Template for architecture layer rules
- `.gitignore`: Configured to ignore build artifacts
