class linkedList:
    def __init__(self, size):
        self.size = size
        self.myLinkedList = []
        self.myLinkedListPointers = []
        self.heapStartPointer = 0
        self.startPointer = -1  # List is empty | -1 represents a null pointer
        self.nullPointer = -1

        for i in range(self.size):
            self.myLinkedList.append(None)
            self.myLinkedListPointers.append(1)

        for index in range(self.size):
            self.myLinkedListPointers[index] = index + 1
        self.myLinkedListPointers[-1] = -1
    def __str__(self):
        stringToReturn = ""
        if self.startPointer == self.nullPointer:     
            for i in range(self.size - 1):
                stringToReturn = f"{stringToReturn}({self.myLinkedList[i]}) --> "
            return f"{stringToReturn}(None)"
        return self.myLinkedList

    def find(self, itemSearch): 
        found = False
        itemPointer = self.startPointer
        while itemPointer != self.nullPointer and not found:
                if self.myLinkedList[itemPointer] == itemSearch:
                    found = True
                else:
                    itemPointer = self.myLinkedListPointers[itemPointer]
        return itemPointer
    def insert(self, itemAdd):
        if self.heapStartPointer == self.nullPointer:
            print("Linked List full")
        else:
            tempPointer = self.startPointer
            self.startPointer = self.heapStartPointer
            self.heapStartPointer = self.myLinkedListPointers[self.heapStartPointer]
            self.myLinkedList[self.startPointer] = itemAdd
            self.myLinkedListPointers[self.startPointer] = tempPointer
    def delete(self, itemData):
        if self.startPointer == self.nullPointer:
            print("Linked List is empty")
            return
        tempPointer = self.startPointer
        prevPointer = self.nullPointer
        while tempPointer != self.nullPointer and self.myLinkedList[tempPointer] != itemData:
            prevPointer = tempPointer
            tempPointer = self.myLinkedListPointers[tempPointer]
        if tempPointer == self.nullPointer:
            print(f"Item {itemData} not found")
            return
        self.myLinkedList[tempPointer] = None
        if prevPointer == self.nullPointer:
            self.startPointer = self.myLinkedListPointers[tempPointer]
        else:
            self.myLinkedListPointers[prevPointer] = self.myLinkedListPointers[tempPointer]
        self.myLinkedListPointers[tempPointer] = self.heapStartPointer
        self.heapStartPointer = tempPointer

LL = linkedList(3)

print(LL)