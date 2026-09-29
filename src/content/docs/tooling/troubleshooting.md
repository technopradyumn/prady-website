---
title: "Errors & Troubleshooting"
description: "Search common Prady compiler and runtime errors and learn how to inspect diagnostics."
category: "Tooling & IDE"
order: 4
prev:
  title: "VS Code & Language Server"
  slug: "/docs/tooling/editor-extensions"
---

## Find a targeted fix

Use the [Prady Error Guide](/errors) to search a compiler or runtime message. Include the relevant `.pr` source when possible: the guide checks the message against names declared in that code and points to the related reference page. Source code entered on the guide page stays in your browser.

The website guide is a local troubleshooting helper, not an AI service or a substitute for the compiler. It covers known message patterns and says when it has only general advice.

## Where diagnostics appear

- **VS Code:** syntax and parser diagnostics appear while editing. Save the file or run **Prady: Check File** to refresh compiler diagnostics for the saved source and any loaded project modules. Use **Prady: Run File** to see runtime errors.
- **Playground:** diagnostics update while typing for syntax errors. Choose **Run** to execute the code and see runtime errors. The playground is a single-file browser interpreter; it cannot load files from your local project.
- **CLI:** `prady check path/to/main.pr` checks source and reports compiler diagnostics; `prady run path/to/main.pr` executes the program and reports runtime errors.

The current compiler does not implement complete static type checking. A clean `prady check` means the checks implemented by this compiler pass; it should not be interpreted as a proof that every type or identifier is valid.

## Common fixes

| Message pattern | First checks |
|---|---|
| `Expected ...` / `Unexpected token` | Inspect the reported line and the preceding expression. Match braces, parentheses, brackets, quotes, and statement terminators. |
| `Undefined variable ...` | Check spelling and scope. Declare the value before use, or import the file that defines it. |
| `Undefined function ...` | Check the function name and call signature, then confirm its source module is imported. |
| `Method ... is not supported` | Check the receiver's type and use a member implemented for that type. |
| `Cannot resolve imported module ...` | Confirm the module path maps to a `.pr` file relative to the importing file and that each path segment is spelled correctly. |
| `Maximum loop iteration exceeded` | Ensure the loop condition can become false and that the loop updates the values in its condition. |

For syntax details, use the [keyword and grammar reference](/docs/reference/keywords-and-syntax), [built-in types](/docs/reference/built-in-types), or [installation guide](/docs/getting-started/installation).
