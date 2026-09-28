---
title: "Architecture-as-Code Contracts"
description: "Enforcing software system boundaries, layer decoupling, and compile-time contract verification."
category: "The Handbook"
badge: "Core Feature"
order: 5
prev:
  title: "Functions & Lambdas"
  slug: "/docs/handbook/functions-and-lambdas"
next:
  title: "Keywords & Syntax Reference"
  slug: "/docs/reference/keywords-and-syntax"
---

In large engineering organizations, software architecture rules almost inevitably decay. Developers create shortcuts, importing database models directly into presentation components or coupling core business domains to third-party delivery mechanisms.

Prady solves this fundamentally by making **Architecture-as-Code** a first-class language feature verified by the compiler during every build.

## Defining Architecture Declarations

An `architecture` block defines the system topology, its logical layers, and their specifications:

```prady
architecture EnterpriseSystem {
    layer Domain {
        spec: "Pure entities, business invariants, and domain logic"
    }

    layer Application {
        spec: "Use-case orchestration and service interfaces"
    }

    layer Infrastructure {
        spec: "Database adapters, external APIs, and persistence"
    }

    layer Presentation {
        spec: "REST controllers, GraphQL resolvers, and CLI entry points"
    }
}
```

## Enforcing Invariant Contracts

Inside an architecture definition, you define `contract` blocks with boundary enforcement rules:

```prady
architecture EnterpriseSystem {
    layer Domain { ... }
    layer Application { ... }
    layer Infrastructure { ... }
    layer Presentation { ... }

    contract CleanArchitecture {
        // Domain must never depend on outer layers
        Domain cannot import Infrastructure;
        Domain cannot import Presentation;

        // Presentation must not bypass application logic
        Presentation cannot import Infrastructure;
    }
}
```

## How the Compiler Enforces Contracts

When you execute `prady check` or `prady build`, the compiler performs a full dependency graph resolution across all modules.

If a developer attempts an illegal import:

```prady
// Inside domain/models.pr:
import infrastructure.database.PostgresConnection; // ❌ VIOLATION
```

The Prady compiler halts immediately with a diagnostic error:

```text
[Architecture Violation] in domain/models.pr:1:1
Layer 'Domain' cannot import layer 'Infrastructure'.
Violates contract 'CleanArchitecture' defined in architecture.pr:14.
```

## Benefits of Compile-Time Architecture

1. **Zero Documentation Drift**: The architecture diagram *is* the code.
2. **Automated CI Enforcement**: Pull requests that break modular boundaries fail compilation before human code review.
3. **Refactoring Safety**: Restructure layers with total confidence that contracts prevent unwanted coupling.

## Next Step: Language Reference

Explore the complete technical specification in [Keywords & Syntax](/docs/reference/keywords-and-syntax).
