function mergeSort(Arr) {

    if (Arr.length <= 1) {
        return Arr; 
    }

    let mid = Math.floor(Arr.length / 2);
    let leftArr = Arr.slice(0, mid);
    let rightArr = Arr.slice(mid);
    let sortedLeft = mergeSort(leftArr);
    let sortedRight = mergeSort(rightArr);
    
    return merge(sortedLeft, sortedRight);
}

function merge(leftArr, rightArr) {
    const resultArr = [];
    let i = 0;
    let j = 0;
    while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] > rightArr[j]) {
            resultArr.push(rightArr[j]);
            j++;
        } else {
            resultArr.push(leftArr[i]);
            i++;
        }
    }
    resultArr.push(...leftArr.slice(i)); 
    resultArr.push(...rightArr.slice(j));
    return resultArr;
}

console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]));
