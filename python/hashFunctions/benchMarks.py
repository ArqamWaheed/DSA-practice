import time
import random
import string
from hashTable import HashTableChaining, HashTableOpenAddressing

# Utility: generate random strings
def random_strings(n, length=8):
    return [
        ''.join(random.choices(string.ascii_lowercase, k=length))
        for _ in range(n)
    ]

def benchmark(ht_class, n_items=1000, size=2000):
    ht = ht_class(size=size)
    data = random_strings(n_items)

    # Measure insert time
    start = time.time()
    for i, key in enumerate(data):
        ht.insert(key, i)
    insert_time = time.time() - start

    # Measure lookup time
    start = time.time()
    for key in data:
        _ = ht.get(key)
    lookup_time = time.time() - start

    return insert_time, lookup_time

def main():
    tests = [
        ("Chaining", HashTableChaining),
        ("Open Addressing", HashTableOpenAddressing),
    ]

    for name, cls in tests:
        insert_time, lookup_time = benchmark(cls)
        print(f"{name:15} | Insert: {insert_time:.5f}s | Lookup: {lookup_time:.5f}s")

if __name__ == "__main__":
    main()