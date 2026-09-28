---
title: "Installation & Setup"
description: "How to download and install the official Prady compiler on Windows, macOS, and Linux."
category: "Getting Started"
order: 2
prev:
  title: "Overview & Philosophy"
  slug: "/docs/getting-started/overview"
next:
  title: "Hello World & Scaffolding"
  slug: "/docs/getting-started/hello-world"
---

The Prady toolchain includes the compiler (`prady`), the package manager, and the Language Server Protocol executable (`prady-lsp`).

## Automated Installation

The fastest way to install Prady is using the official automated installer scripts.

### macOS & Linux (Bash / Zsh)

Open your terminal and run:

```bash
curl -fsSL https://raw.githubusercontent.com/technopradyumn/prady/main/install.sh | sh
```

This script detects your operating system and CPU architecture, downloads the latest v1.0.0 release, extracts the binary to `~/.prady/bin`, and adds it to your `$PATH`.

### Windows (PowerShell)

Open PowerShell and execute:

```powershell
irm https://raw.githubusercontent.com/technopradyumn/prady/main/install.ps1 | iex
```

This script places the binaries into `%USERPROFILE%\.prady\bin` and configures your User Environment `Path`.

## Manual Binary Download

If you prefer to install binaries manually, standalone archives are available directly from the [Download Portal](/download):

| Operating System | Architecture | Package Format |
| :--- | :--- | :--- |
| **Windows** | x86_64 | `.zip` (MSVC) |
| **macOS** | Apple Silicon (M1/M2/M3/M4) | `.tar.gz` |
| **macOS** | Intel x86_64 | `.tar.gz` |
| **Linux** | x86_64 | `.tar.gz` (GNU) |
| **Linux** | AArch64 (ARM64) | `.tar.gz` (GNU) |

After extracting the archive, place `prady` and `prady-lsp` into any directory on your system's `PATH`.

## Verifying the Installation

To verify that the compiler is correctly installed and accessible, open a new terminal window and run:

```bash
prady version
```

You should see output similar to:

```text
Prady Compiler v1.0.0 (x86_64-pc-windows-msvc)
LLVM Backend Version 18.1.0
Build Date: 2026-09-28
```

## Configuring the VS Code Extension

For the best developer experience, install the official Prady VS Code extension:

1. Open VS Code.
2. Go to the Extensions panel (`Ctrl+Shift+X` or `Cmd+Shift+X`).
3. Search for **Prady Language**.
4. Click **Install**.

The extension will automatically connect to your local `prady-lsp` for diagnostics, syntax highlighting, autocompletion, and hover documentation.
