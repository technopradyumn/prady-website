---
title: "Installation & Setup"
description: "How to install and set up the official Prady compiler on your system."
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

## ⚡ Installation Steps

Run the following commands in your terminal to install and activate Prady across your entire system:

```bash
cd "c:\Users\techn\Desktop\Acciojob\Programming Language\prady"
git tag -a v1.0.0 -m "Release v1.0.0 GA"
git push origin v1.0.0
```

---

## ✅ Verifying the Installation

To verify that the compiler is correctly installed and accessible across your entire system, open a new terminal window and run:

```bash
prady version
```

You should see output similar to:

```text
Prady Compiler v1.0.0 (x86_64-pc-windows-msvc)
LLVM Backend Version 18.1.0
Build Date: 2026-09-28
```

You can now run Prady code from anywhere on your system:

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
