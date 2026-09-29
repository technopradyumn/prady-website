---
title: "LLVM Native Codegen & Linking"
description: "Architecture of Prady's native compiler backend, PradyIR, LLVM IR emission, and multi-platform linking."
category: "Language Reference"
order: 5
prev:
  title: "Standard Library Overview"
  slug: "/docs/reference/standard-library"
next:
  title: "DSA Complexity Guarantees"
  slug: "/docs/reference/dsa-complexity-guarantees"
---

Prady features a full native compiler backend utilizing **LLVM (Low-Level Virtual Machine)** infrastructure to generate standalone, highly optimized machine code.

## Compilation Pipeline

The Prady compiler transforms source files through sequential lowering phases:

```text
Source Code (.pr)
      │
      ▼
Lexer & AST Parser
      │
      ▼
Semantic Analysis & Type Checking
      │
      ▼
Architecture & Policy Validation
      │
      ▼
Prady Intermediate Representation (PradyIR)
      │
      ▼
LLVM IR Text Emission
      │
      ▼
LLVM Optimization Pipeline (-O1, -O2, -O3, -Oz)
      │
      ▼
System Linker (MSVC link.exe / LLD / Clang / GCC)
      │
      ▼
Native Executable (.exe / ELF / Mach-O)
```

## Inspecting LLVM IR

You can view the exact LLVM IR emitted for any Prady source file using `prady emit-llvm`:

```bash
prady emit-llvm src/main.pr
```

Example output:

```llvm
; Prady compiler - Module: main
target triple = "x86_64-pc-windows-msvc"

declare i32 @printf(i8* nocapture readonly, ...)
declare i8* @malloc(i64)
declare void @free(i8*)

define i64 @add(i64 %a, i64 %b) {
entry:
  %t0 = add i64 %a, %b
  ret i64 %t0
}

define void @main() {
entry:
  %t1 = call i64 @add(i64 10, i64 20)
  %t2 = call i64 @print(i64 %t1)
  ret void
}
```

## Cross-Compilation & Target Triples

Prady supports targeting multiple host and embedded environments:

| Target Platform | Target Triple | Executable Output |
| :--- | :--- | :--- |
| **Windows x64** | `x86_64-pc-windows-msvc` | `.exe` |
| **macOS Apple Silicon** | `aarch64-apple-darwin` | Mach-O executable |
| **macOS Intel** | `x86_64-apple-darwin` | Mach-O executable |
| **Linux x64** | `x86_64-unknown-linux-gnu` | ELF binary |
| **WebAssembly** | `wasm32-unknown-wasi` | `.wasm` |
