---
title: "Installation & Setup"
description: "Install the Prady CLI and language server on Windows, macOS, or Linux, then configure editor support."
category: "Getting Started"
order: 2
prev:
  title: "Overview & Philosophy"
  slug: "/docs/getting-started/overview"
next:
  title: "Hello World & Scaffolding"
  slug: "/docs/getting-started/hello-world"
---

## Install Prady

The one-line installer downloads the latest release, installs both `prady` and `prady-lsp` into your user profile, and adds the install directory to your user `PATH`. A Rust toolchain and administrator privileges are not required.

### Windows PowerShell

Run this in **PowerShell** (not directly in Command Prompt):

```powershell
irm https://raw.githubusercontent.com/technopradyumn/prady/main/install.ps1 | iex
```

From **Command Prompt (`cmd.exe`)**, launch PowerShell explicitly:

```cmd
powershell -NoProfile -ExecutionPolicy Bypass -Command "irm https://raw.githubusercontent.com/technopradyumn/prady/main/install.ps1 | iex"
```

`irm` and `iex` are PowerShell aliases; CMD does not recognize them as commands. After installation, open a new terminal so it receives the updated `PATH`.

### macOS and Linux

Run this in Bash or Zsh:

```sh
curl -fsSL https://raw.githubusercontent.com/technopradyumn/prady/main/install.sh | sh
```

The installer detects the operating system and CPU architecture, downloads the corresponding release, and updates the current user's shell profile.

### Verify and run

After installation, open a new terminal so it loads the updated `PATH`, then verify Prady and run a source file:

```sh
prady version
prady run .\hello.pr
```

In Command Prompt, use `prady run hello.pr`. These commands also work in a newly opened terminal on macOS and Linux. If `prady` is still not found, confirm that `%USERPROFILE%\.prady\bin` (Windows) or `$HOME/.prady/bin` (macOS/Linux) appears in your user `PATH`, then open another terminal.

## Download an archive manually

The [downloads page](/download) provides the current release archives and checksums for Windows x64, macOS Intel/Apple Silicon, and Linux x64/ARM64. Extract the archive and run `prady`/`prady.exe` from that directory, or add the directory containing the executable to your user `PATH`. For example, in PowerShell:

```powershell
.\prady.exe run .\hello.pr
```

If Windows SmartScreen blocks a newly downloaded unsigned binary, choose **More info → Run anyway** after verifying that you downloaded it from the official Prady release.

## Build from source

If you want to contribute to Prady or build it yourself, install Rust and run:

```powershell
git clone https://github.com/technopradyumn/prady.git
cd prady
cargo build --release
```

`cargo build --release` creates binaries under `target/release`; it does **not** add `prady` to `PATH`. To install the CLI and language server globally through Cargo:

```powershell
cargo install --path compiler/prady-cli
cargo install --path compiler/prady-lsp
```

You can also run the built binary directly from the repository without installing it:

```powershell
.\target\release\prady.exe run .\examples\hello.pr
```

On macOS/Linux, run `./target/release/prady run ./examples/hello.pr`.

## VS Code support

Install **Prady Language** from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=technopradyumn.prady-lang), or use **Extensions → Install from VSIX...** with a package from the [extension releases](https://github.com/technopradyumn/vscode-prady/releases/latest). The extension provides `.pr` syntax highlighting, parser/import diagnostics, project symbol completions and run/check commands.

For current editor limitations and troubleshooting, see [VS Code & Language Server](/docs/tooling/editor-extensions) and [Errors & Troubleshooting](/docs/tooling/troubleshooting).
