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
            if (this.size() === 0) this.startPointer = 0; // Intiailizing list if there was none
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

    this.at = function(index) { // Returns actual index at a given index in order of linkedlist 
        let tempPointer = this.startPointer;
        for (let i = 0; i < index; i++) {
            if (tempPointer === null) {
                return "There is no element this far!";
            }
            tempPointer = this.list[tempPointer].nextNodePointer;
        }

        return tempPointer;
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

    this.insertAt = function(value, index) { // we talkin abt the linkedlist gng
        let node = newNode();
        node.value = value;
        if (this.size() >= index) {
            if (this.startPointer === null) { // List is empty
                if (this.heapPointer === null) {
                    this.list.push(node);
                    this.startPointer = 0;
                    return;
                } else { // List is empty but there are holes!
                    let tempVar = this.heapPointer;
                    this.startPointer = this.heapPointer;
                    this.heapPointer = this.list[this.heapPointer].nextNodePointer;
                    this.list[tempVar] = node;
                    return;
                }
            }
            if (this.heapPointer === null) { // The list is full!
                if (index === 0) { // prepending basically..!
                    this.prepend(value);
                    return;
                }
                this.list.push(node);
                let tempPointer = this.at(index - 1);
                this.list[this.list.length - 1].nextNodePointer = this.list[tempPointer].nextNodePointer;
                this.list[tempPointer].nextNodePointer = this.list.length - 1;
                return;
            } else { // The list has elements with holes
                if (index === 0) { // prepending basically..!
                    this.prepend(value);
                    return;
                }
                let tempPointer = this.at(index - 1); // Get the acutal index of the element that is pointing towards where u added the new node
                let tempStorage = this.heapPointer;
                this.heapPointer = this.list[heapPointer].nextNodePointer;
                this.list[tempStorage] = node;
                this.list[tempStorage].nextNodePointer = this.list[tempPointer].nextNodePointer;
                this.list[tempPointer].nextNodePointer = tempStorage;
                return;
            }
        }
        throw new Error('Not a valid index to add at.');
    },

    this.removeAt = function(index) {
        if (this.size() <= index || index < 0) {
            return new Error('Not a valid index to remove at.');
        }
        
        if (this.size() === 1) { // Only one element
            let tempStorage = this.startPointer;
            this.list[this.startPointer].value = null;
            if (this.heapPointer === null) {
                this.heapPointer = this.startPointer;
            } else {
                this.list[tempStorage].nextNodePointer = this.heapPointer;
                this.heapPointer = tempStorage;
            }
            this.startPointer = null;
            return;
        }
        
        if (index === 0) { // Removing first element
            let tempStorage = this.startPointer;
            this.startPointer = this.list[this.startPointer].nextNodePointer;
            this.list[tempStorage].value = null;
            if (this.heapPointer === null) {
                this.heapPointer = tempStorage;
            } else {
                this.list[tempStorage].nextNodePointer = this.heapPointer;
                this.heapPointer = tempStorage;
            }
            return;
        }
        
        // Removing from middle or end
        let previousPointer = this.startPointer;
        for (let i = 0; i < index - 1; i++) {
            previousPointer = this.list[previousPointer].nextNodePointer;
        }
        
        let nodeToRemove = this.list[previousPointer].nextNodePointer;
        this.list[previousPointer].nextNodePointer = this.list[nodeToRemove].nextNodePointer;
        
        // Add removed node to heap
        this.list[nodeToRemove].value = null;
        if (this.heapPointer === null) {
            this.heapPointer = nodeToRemove;
        } else {
            this.list[nodeToRemove].nextNodePointer = this.heapPointer;
            this.heapPointer = nodeToRemove;
        }
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