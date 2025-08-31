// if (index < 0 || index >= buckets.length) {
//   throw new Error("Trying to access index out of bounds");
// }

function Hashmap(loadFactor, capacity) {
    const buckets = []
    for (let i = 0; i < capacity; i++) {
        buckets.push([]);
    }
    function hash(key) { // Strings only for this hashing algo
        let hashCode = 0;
            
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        hashCode = hashCode % capacity;
        return hashCode;
    }

    function set(key, value) {
        if (Math.ceil(loadFactor * capacity) <= length()) {
            for (let i = 0; i < capacity; i++) {
                buckets.push([]);
            }
            capacity = capacity*2;
        }
        const hashCode = hash(key);
        for (let i = 0; i < buckets[hashCode].length; i++) {
            if (i < 0 || i >= buckets.length) {
                throw new Error("Trying to access index out of bounds");
            }
            if (i[0] === key) {
                i[1] = value;
                return; // Updated the value here because it already existed!
            }
        } // Reaching here means the value does not exist yet so we push it
        buckets[hashCode].push([key, value]);
    }

    function get(key) {
        const hashCode = hash(key);
        for (let i = 0; i < buckets[hashCode].length; i++) {
            if (i < 0 || i >= buckets.length) {
                throw new Error("Trying to access index out of bounds");
            }
            if (buckets[hashCode][i][0] === key) return buckets[hashCode][i][1]; // i[1] is the value of the key
        }
        return null;
    }

    function has(key) {
        const hashCode = hash(key);
        for (let i = 0; i < buckets[hashCode].length; i++) {
            if (i < 0 || i >= buckets.length) {
                throw new Error("Trying to access index out of bounds");
            }
            if (buckets[hashCode][i][0]  === key) return true;
        }
        return false
    }
    function remove(key) {
        const hashCode = hash(key);
        for (let i = 0; i < buckets[hashCode].length; i++) {
            if (i < 0 || i >= buckets.length) {
                throw new Error("Trying to access index out of bounds");
            }
            if (buckets[hashCode][i][0] === key) {
                buckets[hashCode].splice(i, 1);
                return true;
            };
        }
        return false;
    }    
    function length() {
        let totalLength = 0;
        buckets.forEach(function(i) {
            totalLength += i.length; 
        })
        return totalLength;
    }
    function clear() {
        buckets.forEach(function(i) {
            i.length = 0;
        });
    }
    function keys() {
        const tempArray = [];
        buckets.forEach(function(i) {
            i.forEach(function(j) {
                tempArray.push(j[0]);
            });
        });
        return tempArray;
    }
    function values() {
        const tempArray = [];
        buckets.forEach(function(i) {
            i.forEach(function(j) {
                tempArray.push(j[1]);
            });
        });
        return tempArray;
    }
    function entries() {
        const tempArray = [];
        buckets.forEach(function(i) {
            i.forEach(function(j) {
                tempArray.push(j);
            });
        });
        return tempArray;
    }    

    return {
        hash, set, get, has, remove, length, clear, keys, values, entries
    }
}

const test = Hashmap(0.75, 16); 
 test.set('apple', 'red')
 test.set('banana', 'yellow')
 test.set('carrot', 'orange')
 test.set('dog', 'brown')
 test.set('elephant', 'gray')
 test.set('frog', 'green')
 test.set('grape', 'purple')
 test.set('hat', 'black')
 test.set('ice cream', 'white')
 test.set('jacket', 'blue')
 test.set('kite', 'pink')
 test.set('lion', 'golden')
  test.set('moon', 'silver')

