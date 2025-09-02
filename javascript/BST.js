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
        console.log(array);
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

}


