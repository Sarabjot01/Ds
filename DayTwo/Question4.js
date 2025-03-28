// 5. Write a function that accepts two parameters,arr and callback, and will work like reduce.
// 6. Write a function that accepts two parameters,arr and callback, and will work like a map.
// 7. Write a function that accepts two parameters,arr and callback, and will work like  arr.lastIndex.

function customReduce(arr, callback, initialValue) {
    let accumulator = initialValue === undefined ? arr[0] : initialValue;
    let start = initialValue === undefined ? 1 : 0;
    for (let i = start; i < arr.length; i++) {
      accumulator = callback(accumulator, arr[i]);
    }
    return accumulator;
  }
  
  function customMap(arr, callback) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      result.push(callback(arr[i]));
    }
    return result;
  }
  
  function customLastIndex(arr) {
    return arr.length - 1;
  }
  

  const numbers = [1, 2, 3];
  const sum = customReduce(numbers, (acc, curr) => acc + curr, 0);
  console.log("Reduce:", sum); 
  
  const doubled = customMap(numbers, (num) => num * 2);
  console.log("Map:", doubled); 
  
  const lastIndex = customLastIndex(numbers);
  console.log("Last Index:", lastIndex); 