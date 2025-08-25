function fibs (n) {
  if (n === 0) {
    return [0];
  }
  if (n === 1) {
    return [0, 1];
  }

  const Arr = [0, 1];
  for (let i = 2; n > i; i++) {
    Arr.push(Arr[i - 2] + Arr[i - 1]);
  }
  return Arr;
}

// Iterative ^^

function fibsRec(n) {
    if (n === 0) {
        return [0];
    } else if (n === 1) {
        return [0,1];
    }

    const prevSequence = fibsRec(n-1);
    const len = prevSequence.length;
    const newOne = prevSequence[len-1] + prevSequence[len - 2];
    
    return [...prevSequence, newOne];
}

// Recursive ^^