---
title: "DSA Formal Complexity Guarantees"
description: "Mathematical bounds and Big-O complexity contracts for all standard collections."
category: "Language Reference"
order: 6
prev:
  title: "LLVM Native Codegen & Linking"
  slug: "/docs/reference/llvm-codegen"
next:
  title: "Prady CLI Commands"
  slug: "/docs/tooling/cli-reference"
---

Unlike languages where data structure performance varies by implementation, the Prady standard library enforces **formal Big-O asymptotic contracts** for every standard collection.

## Asymptotic Bounds Table

| Collection | Operation | Average Case | Worst Case | Space Complexity |
| :--- | :--- | :--- | :--- | :--- |
| **`Vector<T>`** | `get(index)` | $\mathcal{O}(1)$ | $\mathcal{O}(1)$ | $\mathcal{O}(1)$ |
| | `push(item)` | $\mathcal{O}(1)$ (amortized) | $\mathcal{O}(N)$ | $\mathcal{O}(1)$ |
| | `pop()` | $\mathcal{O}(1)$ | $\mathcal{O}(1)$ | $\mathcal{O}(1)$ |
| **`HashMap<K, V>`** | `get(key)` | $\mathcal{O}(1)$ | $\mathcal{O}(N)$ | $\mathcal{O}(1)$ |
| | `insert(key, val)` | $\mathcal{O}(1)$ | $\mathcal{O}(N)$ | $\mathcal{O}(1)$ |
| | `remove(key)` | $\mathcal{O}(1)$ | $\mathcal{O}(N)$ | $\mathcal{O}(1)$ |
| **`AVLTree<K, V>`** | `search(key)` | $\mathcal{O}(\log N)$ | $\mathcal{O}(\log N)$ | $\mathcal{O}(1)$ |
| | `insert(key, val)` | $\mathcal{O}(\log N)$ | $\mathcal{O}(\log N)$ | $\mathcal{O}(\log N)$ |
| | `delete(key)` | $\mathcal{O}(\log N)$ | $\mathcal{O}(\log N)$ | $\mathcal{O}(\log N)$ |
| **`PriorityQueue<T>`** | `peek()` | $\mathcal{O}(1)$ | $\mathcal{O}(1)$ | $\mathcal{O}(1)$ |
| | `push(item)` | $\mathcal{O}(\log N)$ | $\mathcal{O}(\log N)$ | $\mathcal{O}(1)$ |
| | `pop()` | $\mathcal{O}(\log N)$ | $\mathcal{O}(\log N)$ | $\mathcal{O}(1)$ |
| **`LRUCache<K, V>`** | `get(key)` | $\mathcal{O}(1)$ | $\mathcal{O}(1)$ | $\mathcal{O}(1)$ |
| | `put(key, val)` | $\mathcal{O}(1)$ | $\mathcal{O}(1)$ | $\mathcal{O}(1)$ |
| **`DisjointSetUnion`** | `find(x)` | $\mathcal{O}(\alpha(N))$ | $\mathcal{O}(\alpha(N))$ | $\mathcal{O}(1)$ |
| | `union(x, y)` | $\mathcal{O}(\alpha(N))$ | $\mathcal{O}(\alpha(N))$ | $\mathcal{O}(1)$ |
| **`Trie`** | `search(word)` | $\mathcal{O}(K)$ | $\mathcal{O}(K)$ | $\mathcal{O}(1)$ |
| | `starts_with(pref)`| $\mathcal{O}(K)$ | $\mathcal{O}(K)$ | $\mathcal{O}(1)$ |
| **`Graph`** | `dijkstra(src)` | $\mathcal{O}(E \log V)$ | $\mathcal{O}(E \log V)$ | $\mathcal{O}(V)$ |

*Where $N$ is the number of elements, $K$ is word length, $\alpha(N)$ is the Inverse Ackermann function, and $V, E$ represent graph vertices and edges.*
