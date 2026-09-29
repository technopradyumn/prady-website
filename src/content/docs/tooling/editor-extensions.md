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
 
- **Auto-Import Dropdown**:
  - Triggers automatically as you type letters or type dot (`.`) access.
  - Selecting any completion from standard modules (`std.dsa`, `std.io`, `std.net`, `std.async`, etc.) **automatically injects the required `import` statement at the top of your file**.
- **Real-Time Diagnostics & Quick-Fixes**:
  - **Missing Imports**: Highlights unimported types and classes with red error squiggles and provides a **1-click "Auto-import `<Symbol>`" quick-fix** (`Ctrl+.` or `Cmd+.`).
  - **Unused Imports**: Warns about unused imports with dimmed/grayed-out text (`DiagnosticTag.Unnecessary`).
- **Organize Imports Command**:
  - Run `Prady: Organize Imports` from the Command Palette (`Ctrl+Shift+P`) to automatically sort imports alphabetically and remove all unused imports.
- **Syntax Highlighting**: Powered by official TextMate grammar covering all keywords, annotations, types, and architecture blocks.
- **Go-to-Definition & Hover**: Jump directly to symbols and view signatures with docstrings.
- **One-Click Run & Build**: Run or compile files directly from editor title bar buttons or `Ctrl+F5`.

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
  "prady.trace.server": "verbose"
}
```

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
