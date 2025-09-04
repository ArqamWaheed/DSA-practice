class HashTableChaining:
    def __init__(self, size=5):
        self.size = size
        self.table = [[] for _ in range(size)]  # list of buckets

    def __str__(self):
        return f"Size: {self.size}\nTable: {self.table}"

    def hash_function(self, key):
        return hash(key) % self.size  # built-in hash, mod table size

    def insert(self, key, value):
        index = self.hash_function(key)
        self.table[index].append((key, value))

    def get(self, key):
        index = self.hash_function(key)
        for k, v in self.table[index]:
            if k == key:
                return v
        return None
    
class HashTableOpenAddressing:
    def __init__(self, size=7):  # keep small to force collisions
        self.size = size
        self.table = [None] * size
        self.deleted = object()  # placeholder for deleted slots

    def _hash(self, key):
        return hash(key) % self.size

    def insert(self, key, value):
        index = self._hash(key)
        start_index = index

        while self.table[index] not in (None, self.deleted):
            k, v = self.table[index]
            if k == key:  # update if key exists
                self.table[index] = (key, value)
                return
            index = (index + 1) % self.size
            if index == start_index:  # full cycle → table is full
                raise Exception("HashTable is full")

        self.table[index] = (key, value)

    def get(self, key):
        index = self._hash(key)
        start_index = index

        while self.table[index] is not None:
            if self.table[index] != self.deleted:
                k, v = self.table[index]
                if k == key:
                    return v
            index = (index + 1) % self.size
            if index == start_index:  # looped all around
                break
        return None

    def remove(self, key):
        index = self._hash(key)
        start_index = index

        while self.table[index] is not None:
            if self.table[index] != self.deleted:
                k, v = self.table[index]
                if k == key:
                    self.table[index] = self.deleted
                    return True
            index = (index + 1) % self.size
            if index == start_index:
                break
        return False