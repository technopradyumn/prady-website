---
title: "All 28 Built-In Data Structures"
description: "Comprehensive guide to all 28 production-grade data structures native to Prady standard library."
category: "Language Reference"
badge: "28 Data Structures"
order: 3
prev:
  title: "Built-in Types"
  slug: "/docs/reference/built-in-types"
next:
  title: "Standard Library"
  slug: "/docs/reference/standard-library"
---

Unlike most modern languages that ship with only a basic dynamic array and hash table, Prady provides **28 production-grade data structures** directly in the standard language runtime.

All structures are strongly typed with generic parameters, memory-safe, and optimized for cache locality and minimal heap fragmentation.

## Complete Data Structure Catalog

### 1. Sequential & Linear Structures

| Structure | Syntax | Access | Insert | Delete | Primary Use Case |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Vector (`Vec`)** | `Vec<T>()` | $O(1)$ | $O(1)$ amortized | $O(1)$ at end | General-purpose contiguous buffer |
| **LinkedList** | `LinkedList<T>()` | $O(N)$ | $O(1)$ at head | $O(1)$ at head | Singly-linked list for sequential streaming |
| **DoublyLinkedList** | `DoublyLinkedList<T>()` | $O(N)$ | $O(1)$ at ends | $O(1)$ at ends | Bi-directional list with $O(1)$ splicing |
| **Stack** | `Stack<T>()` | $O(1)$ top | $O(1)$ push | $O(1)$ pop | LIFO call-stack and expression evaluation |
| **Queue** | `Queue<T>()` | $O(1)$ front | $O(1)$ enqueue | $O(1)$ dequeue | FIFO task scheduling and event processing |
| **Deque** | `Deque<T>()` | $O(1)$ ends | $O(1)$ ends | $O(1)$ ends | Double-ended queue for sliding window problems |
| **CircularBuffer** | `CircularBuffer<T>(cap)` | $O(1)$ | $O(1)$ | $O(1)$ | Fixed-capacity ring buffer for streaming I/O |

### 2. Associative & Hashing Structures

| Structure | Syntax | Lookup | Insert | Space | Primary Use Case |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Map** | `Map<K, V>()` | $O(1)$ avg | $O(1)$ avg | $O(N)$ | Fast key-value association |
| **Set** | `Set<T>()` | $O(1)$ avg | $O(1)$ avg | $O(N)$ | Unique value set membership |
| **LRUCache** | `LRUCache<K, V>(cap)` | $O(1)$ | $O(1)$ | $O(\text{cap})$ | Least-Recently-Used in-memory caching |
| **LFUCache** | `LFUCache<K, V>(cap)` | $O(1)$ | $O(1)$ | $O(\text{cap})$ | Least-Frequently-Used caching with frequency heaps |
| **BloomFilter** | `BloomFilter(size, hashes)` | $O(K)$ | $O(K)$ | $O(M)$ bits | Probabilistic set membership with zero false negatives |

### 3. Tree Structures

| Structure | Syntax | Search | Insert | Delete | Primary Use Case |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **BST** | `BST<K, V>()` | $O(H)$ | $O(H)$ | $O(H)$ | Binary Search Tree baseline |
| **AVLTree** | `AVLTree<K, V>()` | $O(\log N)$ | $O(\log N)$ | $O(\log N)$ | Strictly height-balanced tree for lookup-heavy workloads |
| **RedBlackTree** | `RedBlackTree<K, V>()` | $O(\log N)$ | $O(\log N)$ | $O(\log N)$ | Standard self-balancing ordered tree |
| **TreeMap** | `TreeMap<K, V>()` | $O(\log N)$ | $O(\log N)$ | $O(\log N)$ | Sorted key-value dictionary |
| **TreeSet** | `TreeSet<T>()` | $O(\log N)$ | $O(\log N)$ | $O(\log N)$ | Sorted unique element set |
| **Trie** | `Trie()` | $O(L)$ | $O(L)$ | $O(\Sigma \cdot L)$ | Prefix tree for auto-completion and dictionary lookup |

### 4. Priority Queues & Heaps

| Structure | Syntax | Peek Top | Push | Pop Top | Primary Use Case |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **MinHeap** | `MinHeap<T>()` | $O(1)$ | $O(\log N)$ | $O(\log N)$ | Priority queue with smallest element on top |
| **MaxHeap** | `MaxHeap<T>()` | $O(1)$ | $O(\log N)$ | $O(\log N)$ | Priority queue with largest element on top |

### 5. Advanced Range & Query Structures

| Structure | Syntax | Point Update | Range Query | Primary Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **SegmentTree** | `SegmentTree(array)` | $O(\log N)$ | $O(\log N)$ | Arbitrary associative range queries (min, max, sum) |
| **FenwickTree** | `FenwickTree(size)` | $O(\log N)$ | $O(\log N)$ | Binary Indexed Tree for prefix sums |
| **DisjointSet** | `DisjointSet(elements)` | $O(\alpha(N))$ | $O(\alpha(N))$ | Union-Find with path compression |
| **BitSet** | `BitSet(size)` | $O(1)$ bitwise | $O(1)$ | Space-efficient compact bit array |
| **SkipList** | `SkipList<T>()` | $O(\log N)$ avg | $O(\log N)$ avg | Probabilistic alternative to balanced search trees |

### 6. Graph & Matrix Structures

| Structure | Syntax | Primary Operation | Primary Use Case |
| :--- | :--- | :--- | :--- |
| **Graph** | `Graph<V>()` | Add edge $O(1)$, BFS/DFS $O(V + E)$ | General directed/undirected graph representation |
| **Matrix** | `Matrix(rows, cols)` | Index $O(1)$, Matrix multiply | Dense 2D linear algebra matrix |
| **SparseMatrix** | `SparseMatrix(rows, cols)` | Index $O(\text{non-zero entries})$ | Memory-efficient matrix for large sparse systems |

## Example: Red-Black Tree in Action

```prady
fn main() {
    let tree = RedBlackTree<Int, String>();
    tree.insert(50, "Root");
    tree.insert(25, "Left Child");
    tree.insert(75, "Right Child");

    print("Tree contains 25: " + tree.contains(25)); // true
    print("Value at 50: " + tree.get(50));            // "Root"
}
```

## Example: LRU Cache with Eviction

```prady
fn main() {
    let cache = LRUCache<String, Int>(2); // Max capacity 2
    cache.put("cpu_load", 35);
    cache.put("ram_used", 78);

    print(cache.get("cpu_load")); // 35 (marks cpu_load as recently used)

    // Exceed capacity: ram_used is least recently used and gets evicted
    cache.put("disk_io", 120);

    print(cache.get("ram_used")); // None / null
    print(cache.get("disk_io"));  // 120
}
```
