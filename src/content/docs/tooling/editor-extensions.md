---
title: "VS Code & Language Server (LSP)"
description: "Setting up IDE integration, real-time diagnostics, autocompletion, hover documentation, and prady-lsp."
category: "Tooling & IDE"
order: 3
prev:
  title: "Package Manager"
  slug: "/docs/tooling/package-manager"
---

The Prady ecosystem provides first-class editor integration powered by the Language Server Protocol (LSP).

## Official VS Code Extension

The official **Prady Language** extension for Visual Studio Code provides:
 
- **Syntax highlighting** for Prady keywords, types, strings, comments, declarations, and operators.
- **Live parser diagnostics** while editing, plus diagnostics for unresolved local imports.
- **Compiler diagnostics** from `Prady: Check File` (or after saving) and runtime diagnostics from `Prady: Run File`.
- **Workspace completions and auto-imports** for declarations found in nearby `.pr` files. Use `.` for known receiver members and select a completion to add a relative import when it can be resolved.
- **Built-in and collection member suggestions** for the members listed by the extension.
- **Hover and go-to-definition** where the language server can resolve the symbol.
- **Run and check commands**, including an interactive terminal for program input.
- **Organize Imports** to sort import lines alphabetically.

The compiler does not yet implement complete static type checking. The extension reports parser/compiler diagnostics actually emitted by the current toolchain; it cannot mark every undefined name or type mismatch before execution. Standard-library modules without corresponding shipped `.pr` files are not fabricated as auto-imports.

### Install

Use the Marketplace entry **Prady Language** by `technopradyumn`, or download a `.vsix` from the [extension release page](https://github.com/technopradyumn/vscode-prady/releases/latest) and choose **Extensions → Install from VSIX...**. For a local source checkout, run `npm ci`, `npm test`, and `npm run package` in `editors/vscode-prady`, then install the resulting `prady-lang-<version>.vsix`.

The extension discovers the configured `prady-lsp`, a bundled platform binary (when present), or a binary installed under the user's Prady/Cargo directories or on `PATH`. Configure `prady.lspServerPath` and `prady.executablePath` if your binaries are elsewhere.

### Diagnostics workflow

1. Syntax/parser squiggles update as you edit.
2. Save a file to refresh CLI checks for open Prady documents, or run **Prady: Check File** to check the active file and its loaded modules.
3. Run **Prady: Run File** to execute the active file and send runtime output/errors to the editor terminal and Problems list.
4. Click an error in **Problems** to navigate to its reported file and position.

The browser playground is a separate single-file interpreter. It cannot read local files or validate a multi-file project's imports. See [Errors & Troubleshooting](/docs/tooling/troubleshooting) for diagnostic scope and common fixes.

## The `prady-lsp` Executable

The Language Server Protocol server is implemented as a standalone binary named `prady-lsp` (`prady-lsp.exe` on Windows).

### How VS Code Connects to `prady-lsp`

The VS Code extension discovers `prady-lsp` using the following search priority:

1. **User Configuration**: `prady.lspServerPath` in VS Code `settings.json`.
2. **Bundled Binary**: Shipped inside the extension package directory.
3. **System PATH**: Any `prady-lsp` binary found on the system's `$PATH`.

### Manual Configuration Example

If you installed `prady-lsp` in a custom location, configure your VS Code `settings.json`:

```json
{
  "prady.lspServerPath": "/usr/local/bin/prady-lsp",
  "prady.trace.server": "verbose",
  "[prady]": {
    "editor.formatOnSave": true
  }
}
```

Formatting uses the installed `prady fmt` command. If it is not on `PATH`, set `prady.executablePath` to the CLI binary.

## Using with Other Editors (Neovim, Emacs, Helix)

Because `prady-lsp` uses the standard Language Server Protocol over standard input/output (`stdio`), it can be integrated with any LSP-compliant editor:

### Neovim (nvim-lspconfig)

```lua
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

configs.prady = {
  default_config = {
    cmd = { 'prady-lsp' },
    filetypes = { 'prady' },
    root_dir = lspconfig.util.root_pattern('prady.toml', '.git'),
    settings = {},
  },
}
lspconfig.prady.setup{}
```
