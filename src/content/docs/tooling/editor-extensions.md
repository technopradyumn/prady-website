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

- **Syntax Highlighting**: Powered by the official TextMate grammar covering all 32 keywords, annotations, types, and architecture blocks.
- **Real-Time Diagnostics**: Inline error squiggles for syntax errors, type mismatches, and architecture contract violations.
- **Go-to-Definition & References**: Jump directly to function, class, interface, and layer declarations.
- **Hover Documentation**: Hover over any keyword, standard library function, or data structure to view its signature and docstring.
- **Auto-Completion**: Context-aware autocompletion for keywords, variables, types, and method signatures.
- **One-Click Run & Build**: Run or compile files directly from editor commands (`Ctrl+Shift+P` -> `Prady: Run Current File`).

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
