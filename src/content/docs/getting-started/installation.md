---
title: "Installation & Setup"
description: "How to install and build the official Prady compiler directly from GitHub."
category: "Getting Started"
order: 2
prev:
  title: "Overview & Philosophy"
  slug: "/docs/getting-started/overview"
next:
  title: "Hello World & Scaffolding"
  slug: "/docs/getting-started/hello-world"
---

The Prady toolchain includes:
- **`prady`**: The native compiler, interpreter runner, and package manager.
- **`prady-lsp`**: The Language Server Protocol (LSP) daemon providing autocomplete, hover information, diagnostics, and go-to-definition in editors like VS Code.

---

## 📦 Installing from GitHub

Prady is built using Rust (workspace edition 2021+). You can install and build the toolchain directly from GitHub:

### Step 1: Clone the Repository

```bash
git clone https://github.com/technopradyumn/prady.git
cd prady
```

### Step 2: Build the Compiler & LSP

Compile the native release binaries using Cargo:

```bash
cargo build --release
```

The compiled native binaries are generated at:
- `target/release/prady` (or `prady.exe` on Windows)
- `target/release/prady-lsp` (or `prady-lsp.exe` on Windows)

### Step 3: Install Globally on Your System (Recommended)

To make `prady` accessible anywhere across your system from any terminal window:

```bash
cargo install --path compiler/prady-cli
cargo install --path compiler/prady-lsp
```

Ensure Cargo's bin directory (`~/.cargo/bin` or `%USERPROFILE%\.cargo\bin`) is in your system's `PATH`.

---

## ✅ Verifying the Installation

To verify that the compiler is correctly installed and accessible, open a terminal window and run:

```bash
prady version
```

You should see output similar to:

```text
Prady Compiler v1.0.0 (x86_64-pc-windows-msvc)
LLVM Backend Version 18.1.0
Build Date: 2026-09-28
```

Run your first program directly:

```bash
prady run examples/hello.pr
```

Or evaluate a quick snippet inline:

```bash
prady eval 'print("Hello from Prady!");'
```

---

## 💻 Configuring the VS Code Extension

For first-class editor support with syntax highlighting, live diagnostics, autocomplete, and architecture rule enforcement:

1. Open Visual Studio Code.
2. Press `Ctrl+Shift+X` (or `Cmd+Shift+X` on macOS) to open the **Extensions** panel.
3. Search for **Prady Language**.
4. Click **Install**.

The extension automatically discovers `prady-lsp` on your `PATH` and starts providing instant IDE intelligence for all `.pr` files.
