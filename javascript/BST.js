function Node(data) {
    this.left = null;
    this.right = null;
    this.data = data;
}

function Tree(array = []) {
    this.rootNode = (function buildTree(Randomarray) {
        let array = [...new Set(Randomarray)];
        array.sort((a, b) => a - b);
        let rootIndex = Math.floor(array.length / 2);    
        let rootNode = new Node(array[rootIndex]);
        (function recurseAfter(array, rootNode, rootIndex) {
            if (rootNode.left === null && rootIndex !== 0) {
                const newArray = [...array];
                newArray.splice(rootIndex, Math.floor((newArray.length + 1) / 2));
                let newRootIndex = Math.floor(newArray.length / 2);
                let newRootNode = new Node(newArray[newRootIndex]);
                rootNode.left = newRootNode;
                recurseAfter(newArray, newRootNode, newRootIndex);
            } 
            if (rootNode.right === null && rootIndex !== array.length - 1) {
                const newArray = [...array];
                newArray.splice(0, Math.floor((newArray.length) / 2) + 1);
                let newRootIndex = Math.floor(newArray.length / 2)
                let newRootNode = new Node(newArray[newRootIndex]);
                rootNode.right = newRootNode;
                recurseAfter(newArray, newRootNode, newRootIndex);          
            }
        })(array, rootNode, rootIndex);

        return rootNode;
    })(array);

    this.prettyPrint = function(node = this.rootNode, prefix = '', isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }
    this.insert = function(traverseNode = this.rootNode, value) {
        if (this.rootNode === null) { // BAse case if tree does not exist!
            const nodeToAdd = new Node(value);
            this.rootNode = nodeToAdd;
            return;
        }

        if (value > traverseNode.data && traverseNode.right !== null) {
            this.insert(traverseNode.right, value);
        } else if (value < traverseNode.data && traverseNode.left !== null) {
            this.insert(traverseNode.left, value);
        } else if (value > traverseNode.data && traverseNode.right === null) {
            const nodeToAdd = new Node(value);
            traverseNode.right = nodeToAdd;
            return;
        }
        else if (value < traverseNode.data && traverseNode.left === null) {
            const nodeToAdd = new Node(value);
            traverseNode.left = nodeToAdd;
            return;
        }
        
    }
    this.deleteItem = function(traverseNode = this.rootNode, value) {
        if (traverseNode === null) {
            throw Error("Tree doesn't even exist!");
        }
        if (traverseNode.data !== null) {
            if (value > this.rootNode.data) {
                this.deleteItem(traverseNode.right, value);
            } else if (value < this.rootNode.data) {
                this.deleteItem(traverseNode.left, value);
            } else if (value === this.rootNode.data) {
                traverseNode.data = null;
                return;
            }
        } else {
            throw Error("Value does not exist gang!");
        }
    }

    this.find = function(value) {

    }

    this.levelOrderForEach = function(callback) { //  use an array acting as a queue to keep track of all the child nodes that you have yet to traverse and to add new ones to the list

    }
    this.inOrderForEach = function(callback) {

    }
    this.preOrderForEach = function(callback) {

    }
    this.postOrderForEach = function(callback) {

    }
    this.height = function(value) {

    }
    this.depth = function(value) {
        
    }
    this.isBalanced = function() {
        
    }
}

const newTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(newTree.prettyPrint());
newTree.insert(undefined, 3433);
console.log(newTree.prettyPrint());

