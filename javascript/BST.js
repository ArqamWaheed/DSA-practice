function Node(data) {
    this.left = null;
    this.right = null;
    this.data = data;
}

function Tree(array = []) {
    this.buildTree = function (Randomarray) {
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
    }

    this.rootNode = this.buildTree(array); 

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

    this.insert = function(value, traverseNode = this.rootNode) {
        if (this.rootNode === null) { // BAse case if tree does not exist!
            const nodeToAdd = new Node(value);
            this.rootNode = nodeToAdd;
            return;
        }
        if (value > traverseNode.data && traverseNode.right !== null) {
            this.insert(value, traverseNode.right);
        } else if (value < traverseNode.data && traverseNode.left !== null) {
            this.insert(value, traverseNode.left);
        } else if (value > traverseNode.data && traverseNode.right === null) {
            const nodeToAdd = new Node(value);
            traverseNode.right = nodeToAdd;
            return;
        } else if (value < traverseNode.data && traverseNode.left === null) {
            const nodeToAdd = new Node(value);
            traverseNode.left = nodeToAdd;
            return;
        }
    }

    this.deleteItem = function(value, traverseNode = this.rootNode) {
        if (this.rootNode === null) { // BAse case if tree does not exist!
            throw Error("Tree does not even exist..!");
        } else if (traverseNode.data === value) { // Found the node with the value we need to delete
            if (traverseNode.right !== null) {
                const tempVal = traverseNode.right.data;
                traverseNode.right.data = value;
                traverseNode.data = tempVal;
                if (traverseNode.right.left === null && traverseNode.right.right === null){
                    traverseNode.right = null;// WE gotta end here gango
                    return;
                } 
                this.deleteItem(value, traverseNode.right);
                return;
            } else if (traverseNode.left !== null) {
                const tempVal = traverseNode.left.data;
                traverseNode.left.data = value;
                traverseNode.data = tempVal;
                if (traverseNode.left.left === null && traverseNode.left.right === null){
                    traverseNode.left = null;// WE gotta end here gango
                    return;
                } 
                this.deleteItem(value, traverseNode.left); // Dont gotta end!
                return;
            }
        }
        if (value > traverseNode.data && traverseNode.right !== null) { // Recursive traversals.
            this.deleteItem(value, traverseNode.right);
        } else if (value < traverseNode.data && traverseNode.left !== null) {
            this.deleteItem(value, traverseNode.left);
        } else if (value > traverseNode.data && traverseNode.right === null) { // ERror handling for a node that does not even exist
            throw Error("Node not found");
        } else if (value < traverseNode.data && traverseNode.left === null) {
            throw Error("Node not found");
        }
    }

    this.find = function(value, traverseNode = this.rootNode) {
        if (this.rootNode === null) { // BAse case if tree does not exist!
            throw Error("Tree does not even exist..!");
        } else if (traverseNode.data === value) { // Found the node we gotta return!;
            return traverseNode;
        }
        if (value > traverseNode.data && traverseNode.right !== null) { // Recursive traversals.
            return this.find(value, traverseNode.right);
        } else if (value < traverseNode.data && traverseNode.left !== null) {
            return this.find(value, traverseNode.left);
        } else if (value > traverseNode.data && traverseNode.right === null) { // ERror handling for a node that does not even exist
            throw Error("Node not found");
        } else if (value < traverseNode.data && traverseNode.left === null) {
            throw Error("Node not found");
        }
    }

    this.levelOrderForEach = function(callback = function(element) {console.log(element.data);})  { //  use an array acting as a queue to keep track of all the child nodes that you have yet to traverse and to add new ones to the list
        (function recurseThrough(queue) {
            if (queue.length === 0) {
                return;
            }
            const tempArr = [...queue];
            tempArr.forEach((element) => {
                if (element.left !== null) queue.push(element.left);
                if (element.right !== null) queue.push(element.right);
                callback(element);
                queue.splice(0, 1);
            })
            return recurseThrough(queue);
        })([this.rootNode]);
    }
    this.inOrderForEach = function(callback = function(element) {console.log(element.data);}) {
        (function recurseThrough(stack) {
            if (stack.length === 0) {
                return;
            }
            if (stack[stack.length - 1].left !== null) {
                stack.push(stack[stack.length - 1].left);
                recurseThrough(stack);
            };
            callback(stack[stack.length - 1]);
            if (stack[stack.length - 1].right !== null) {
                stack.push(stack[stack.length - 1].right);
                recurseThrough(stack);
            };
            stack.pop();
        })([this.rootNode]);
    }
    this.preOrderForEach = function(callback = function(element) {console.log(element.data);}) {
        (function recurseThrough(stack) {
            if (stack.length === 0) {
                return;
            }
            callback(stack[stack.length - 1]);
            if (stack[stack.length - 1].left !== null) {
                stack.push(stack[stack.length - 1].left);
                recurseThrough(stack);
            };
            if (stack[stack.length - 1].right !== null) {
                stack.push(stack[stack.length - 1].right);
                recurseThrough(stack);
            };
            stack.pop();
        })([this.rootNode]);
    }
    this.postOrderForEach = function(callback = function(element) {console.log(element.data);}) {
        (function recurseThrough(stack) {
            if (stack.length === 0) {
                return;
            }
            if (stack[stack.length - 1].left !== null) {
                stack.push(stack[stack.length - 1].left);
                recurseThrough(stack);
            };
            if (stack[stack.length - 1].right !== null) {
                stack.push(stack[stack.length - 1].right);
                recurseThrough(stack);
            };
            callback(stack[stack.length - 1]);
            stack.pop();
        })([this.rootNode]);
    }
    this.height = function(value) {
        try {
            const rootNode = this.find(value);
            let leftCount = heightOfSubtree([rootNode.left]);
            let rightCount = heightOfSubtree([rootNode.right]);
            function heightOfSubtree(queue, count = 0) { // Starting element node plz!
                if (queue.length === 0) {
                    return count;
                }
                const tempArr = [...queue];
                tempArr.forEach((element) => {
                    if (element.left !== null) queue.push(element.left);
                    if (element.right !== null) queue.push(element.right);
                    queue.splice(0, 1);
                })
                count += 1;
                return heightOfSubtree(queue, count);
            }
            return leftCount > rightCount ? leftCount : rightCount;
        } catch {
            return null;
        }
    }
    this.depth = function(value) {
        
    }
    this.isBalanced = function() {
        
    }
}


const newTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
newTree.insert(3433);
newTree.deleteItem(7);
newTree.prettyPrint();
newTree.inOrderForEach();
console.log(newTree.height(67));