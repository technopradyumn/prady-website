---
title: "Async & HTTP Services"
description: "Cooperative task scheduler, non-blocking I/O, HTTP routing, and REST API development."
category: "The Handbook"
order: 7
prev:
  title: "Enums & Pattern Matching"
  slug: "/docs/handbook/pattern-matching"
next:
  title: "Keywords & Syntax"
  slug: "/docs/reference/keywords-and-syntax"
---

Prady features a native cooperative asynchronous runtime designed for microservices, REST APIs, and event-driven architectures.

## Cooperative Task Scheduler

Spawn non-blocking tasks onto the Prady event loop using `spawn`:

```prady
import std.async::{spawn, sleep};

fn main() {
    spawn(fn() {
        print("Worker task starting...");
        sleep(100);
        print("Worker task completed!");
    });

    print("Main thread running concurrently");
}
```

## Built-In HTTP Router

The `std.net` and `std.http` modules provide a lightweight, high-performance HTTP server:

```prady
import std.net::{HttpRouter, Request, Response};

fn create_api() -> HttpRouter {
    let mut router = HttpRouter::new();

    // GET endpoint
    router.get("/health", fn(req: Request) -> Response {
        return Response::json("{\"status\": \"healthy\", \"version\": \"1.0.0\"}");
    });

    // POST endpoint
    router.post("/api/v1/orders", fn(req: Request) -> Response {
        let body = req.text();
        print("Received order payload: " + body);
        return Response::json("{\"success\": true, \"order_id\": 101}");
    });

    return router;
}

fn main() {
    let app = create_api();
    print("🚀 HTTP server listening on http://127.0.0.1:8080");
}
```

## Clean Architecture REST Server Template

Prady provides first-class scaffolding for REST services that enforce Clean Architecture layer separation:

```bash
prady new api my-service --arch clean
```

This enforces compile-time boundary checks between `domain`, `application`, `infrastructure`, and `presentation` layers.
