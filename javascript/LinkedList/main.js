import linkedList from "./LinkedList.js";


let newList = new linkedList();


newList.append("dog");
newList.append("cat");
newList.append("parrot");
newList.append("hamster");
newList.append("snake");
newList.append("turtle");

console.log(newList);
console.log(newList.toString());

newList.pop();
console.log(newList.toString());

newList.insertAt("giraf", 2);
console.log(newList.toString());
