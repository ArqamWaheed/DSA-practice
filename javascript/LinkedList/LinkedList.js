export default function LinkedList() {
    if (!new.target) { 
        return new LinkedList(); 
    }
    this.list = [];
    this.startPointer = null;
    this.heapPointer = null; // Points to the free Node, null indicates filled/empty list

    this.append = function(value) { // Appends to the end of the list.
        let node = newNode();
        node.value = value;

        if (this.heapPointer === null) { // List is full or didnt initialize yet
            this.list.push(node);
            if (this.size() === 0) this.startPointer = this.list.length - 1; // Intiailizing list if there was none
            else {
                this.list[this.tail()].nextNodePointer = this.list.length - 1; 
            }
            return;
        }
        if (this.startPointer === null) { // Theres holes but no element YET.. 
            let storeValue = this.heapPointer;
            this.startPointer = this.heapPointer;
            this.heapPointer = this.list[this.heapPointer].nextNodePointer;
            this.list[storeValue] = node;
            return;
        }
        let tempPointer = this.heapPointer;
        this.list[this.tail()].nextNodePointer = this.heapPointer; // IF there are holes ...!
        this.heapPointer = this.list[this.heapPointer].nextNodePointer;
        this.list[tempPointer] = node;
    },


    this.prepend = function(value) {// Appends to the beginning of the list.
        let node = newNode();
        node.value = value;

        if (this.heapPointer === null) { // List is full or didnt initialize yet
            this.list.push(node);
            if (this.size() === 0) { // Initializing list if there was none 
                this.startPointer = this.list.length - 1;
            } 
            else {
                node.nextNodePointer = this.startPointer;
                this.startPointer = this.list.length - 1; 
            }
            return;
        }
        if (this.startPointer === null) { // Theres holes but no element YET.. 
            let storeValue = this.heapPointer;
            this.startPointer = this.heapPointer;
            this.heapPointer = this.list[this.heapPointer].nextNodePointer;
            this.list[storeValue] = node;
            return;
        }
        let tempPointer = this.heapPointer;
        node.nextNodePointer = this.startPointer;
        this.startPointer = this.heapPointer;
        this.heapPointer = this.list[this.heapPointer].nextNodePointer;
        this.list[tempPointer] = node;
    },

    this.size = function() {
        if (this.startPointer === null) {
            return 0;
        } 
        let count = 1
        let tempPointer = this.startPointer;
        while (this.list[tempPointer].nextNodePointer !== null) {
            tempPointer = this.list[tempPointer].nextNodePointer;
            count += 1; 
        }
        return count
    },

    this.head = function() { // Returns the first node in the list index
        if (this.startPointer !== null) return this.startPointer;
    },

    this.tail = function() { // Returns the last node in the list index
        if (this.size() === 0) {
            return null;
        }

        let tempPointer = this.startPointer;
        while (this.list[tempPointer].nextNodePointer !== null) {
            tempPointer = this.list[tempPointer].nextNodePointer;
        }
        return tempPointer;
    },

    this.at = function(index) { // Returns node at a given index in order of linkedlist 
        let tempPointer = this.startPointer;
        for (let i = 0; i < index; i++) {
            if (tempPointer === null) {
                return "There is no element this far!";
            }
            tempPointer = this.list[tempPointer].nextNodePointer;
        }

        return this.list[tempPointer];
    },

    this.pop = function() {
            if (this.size() === 0) return;
            if (this.size() === 1) {
                this.list[this.startPointer].value = null;
                if (this.heapPointer === null) {
                    this.heapPointer = this.startPointer;
                    this.startPointer = null;
                    return; 
                } else {
                    this.list[this.startPointer].nextNodePointer = this.heapPointer;
                    this.heapPointer = this.startPointer;
                    this.startPointer = null;
                    return; 
                }
            }
            const index = this.tail();
            let tempPointer = this.startPointer;
            while (this.list[tempPointer].nextNodePointer !== index) {
                tempPointer = this.list[tempPointer].nextNodePointer;
            }
            this.list[tempPointer].nextNodePointer = null; // set the element that was pointing towards it to null!

            if (this.heapPointer === null) { // Pop the element!
                this.heapPointer = index;
                this.list[this.heapPointer].value = null; 
            } else {
                let tempHeap = this.heapPointer;
                this.heapPointer = index;
                this.list[this.heapPointer].value = null;
                this.list[this.heapPointer].nextNodePointer = tempHeap;
            }
    },

    this.contains = function(value) { // Returns true
        if (this.startPointer === null) {
            return false;
        } 
        let tempPointer = this.startPointer;
        while (this.list[tempPointer].nextNodePointer !== null) {
            if (this.list[tempPointer].value === value) return true;
            tempPointer = this.list[tempPointer].nextNodePointer;
        }
        if (this.list[tempPointer].value === value) return true;
        return false;
    },

    this.find = function(value) { // Returns index in the array!
        if (this.startPointer === null) {
            return null;
        } 
        let tempPointer = this.startPointer;
        while (this.list[tempPointer].nextNodePointer !== null) {
            if (this.list[tempPointer].value === value) return tempPointer;
            tempPointer = this.list[tempPointer].nextNodePointer;
        }
        if (this.list[tempPointer].value === value) return tempPointer;
        return null;
    },

    this.toString = function() { // Represents the linkedList
        let displayString = "";
        let tempPointer = this.startPointer;
        while (this.list[tempPointer].nextNodePointer !== null) {
            displayString = `${displayString}( ${this.list[tempPointer].value} ) --> `
            tempPointer = this.list[tempPointer].nextNodePointer;
        }
        if (this.startPointer !== null) displayString = `${displayString}( ${this.list[tempPointer].value} ) --> `;
        return `${displayString}null`;
    },

    this.insertAt = function(value, index) {

    },

    this.removeAt = function(index) {

    }
}

console.log("Yo");
function newNode() {
    let value = null;
    let nextNodePointer = null;
    return {
        value, 
        nextNodePointer, 
    }
}