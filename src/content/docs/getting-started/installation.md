---
title: "Installation & Setup"
description: "How to download, install, verify, and uninstall the official Prady compiler and language server on Windows, macOS, and Linux."
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

## ⚡ Automated Installation (Recommended)

The fastest and most reliable way to install Prady is using the official automated installer scripts.

### Windows (PowerShell)

Open PowerShell (standard user or administrator) and run:

```powershell
irm https://raw.githubusercontent.com/technopradyumn/prady/main/install.ps1 | iex
```

> **What this does:**
> 1. Creates `%USERPROFILE%\.prady\bin` (`C:\Users\<YourUser>\.prady\bin`).
> 2. Downloads and unpacks the latest `prady.exe` and `prady-lsp.exe` binaries.
> 3. Permanently adds `%USERPROFILE%\.prady\bin` to your User Environment `Path`.
> 4. **Note:** Restart your PowerShell or terminal window after running the script so your shell picks up the updated `Path`.

*Troubleshooting Windows Execution Policy:* If you see a script execution policy error, run:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
irm https://raw.githubusercontent.com/technopradyumn/prady/main/install.ps1 | iex
```

### macOS & Linux (Bash / Zsh)

Open your terminal and run:

```bash
curl -fsSL https://raw.githubusercontent.com/technopradyumn/prady/main/install.sh | sh
```

> **What this does:**
> 1. Detects your CPU architecture (Apple Silicon `aarch64`, Intel `x86_64`, Linux `x86_64`, or Linux `aarch64`).
> 2. Downloads and unpacks `prady` and `prady-lsp` into `~/.prady/bin`.
> 3. Adds `export PATH="$HOME/.prady/bin:$PATH"` to your shell profile (`~/.zshrc`, `~/.bashrc`, or `~/.profile`).
> 4. Run `source ~/.zshrc` (or `source ~/.bashrc`) or open a new terminal window to activate.

---

## 🛠️ Build and Install from Source (Rust Cargo)

If you have [Rust](https://rustup.rs/) installed, you can compile and install the Prady toolchain directly from source:

```bash
# Clone the repository
git clone https://github.com/technopradyumn/prady.git
cd prady

# Build optimized release binaries
cargo build --release

# Install compiler and LSP globally into ~/.cargo/bin
cargo install --path compiler/prady-cli
cargo install --path compiler/prady-lsp
```

Ensure `~/.cargo/bin` (or `%USERPROFILE%\.cargo\bin` on Windows) is in your system `PATH`.

---

## 📦 Manual Binary Download

If you prefer to download standalone release archives without running scripts, standalone packages are available from the [Download Portal](/download):

| Operating System | Architecture | Package Format |
| :--- | :--- | :--- |
| **Windows** | x86_64 (64-bit) | `.zip` (MSVC) |
| **macOS** | Apple Silicon (M1 / M2 / M3 / M4) | `.tar.gz` |
| **macOS** | Intel x86_64 | `.tar.gz` |
| **Linux** | x86_64 (glibc 2.31+) | `.tar.gz` |
| **Linux** | AArch64 (ARM64) | `.tar.gz` |

**Manual Setup Steps:**
1. Extract the downloaded archive.
2. Move the extracted `prady` (or `prady.exe`) and `prady-lsp` (or `prady-lsp.exe`) files into a permanent folder (e.g. `~/.prady/bin` or `C:\Program Files\Prady`).
3. Add that directory to your system's `PATH` environment variable.

---

## ✅ Verifying the Installation

Open a **new terminal window** and run:

```bash
prady version
```

You should see output similar to:

```text
Prady Compiler v1.0.0 (x86_64-pc-windows-msvc)
LLVM Backend Version 18.1.0
Build Date: 2026-09-28
```

You can also run your first Prady test execution:
```bash
prady eval 'print("Hello from Prady!");'
```

---

## 🔄 Updating Prady

To update Prady to the latest release, simply re-run the automated installer command. It will safely overwrite existing binaries in your `.prady/bin` folder with the newest release without affecting any of your projects.

---

## 🗑️ How to Uninstall Prady

To completely remove the Prady compiler, language server, and configuration from your computer:

### On Windows

1. Open **PowerShell** and delete the `.prady` directory:
   ```powershell
   Remove-Item -Recurse -Force "$HOME\.prady"
   ```
2. Remove Prady from your User `PATH`:
   ```powershell
   $oldPath = [Environment]::GetEnvironmentVariable("Path", "User")
   $pradyPath = "$HOME\.prady\bin"
   $newPath = ($oldPath -split ';' | Where-Object { $_ -ne $pradyPath -and $_ -ne "" }) -join ';'
   [Environment]::SetEnvironmentVariable("Path", $newPath, "User")
   ```

### On macOS & Linux

1. Delete the installation directory:
   ```bash
   rm -rf ~/.prady
   ```
2. Open your shell profile (`~/.zshrc` or `~/.bashrc`) and delete the line:
   ```bash
   export PATH="$HOME/.prady/bin:$PATH"
   ```
3. Reload your shell config:
   ```bash
   source ~/.zshrc   # or source ~/.bashrc
   ```

### If Installed via Cargo

```bash
cargo uninstall prady-cli prady-lsp
```

---

## 💻 Configuring the VS Code Extension

For first-class editor support with syntax highlighting, live diagnostics, autocomplete, and architecture rule enforcement:

1. Open Visual Studio Code.
2. Press `Ctrl+Shift+X` (or `Cmd+Shift+X` on macOS) to open the **Extensions** panel.
3. Search for **Prady Language**.
4. Click **Install**.

The extension automatically discovers `prady-lsp` on your `PATH` and starts providing instant IDE intelligence for all `.pr` files.
