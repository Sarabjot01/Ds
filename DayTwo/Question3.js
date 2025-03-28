// Given an 2D array, print the sum of it
function sum2DArray(arr) {
    let totalSum = 0;
  
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        totalSum += arr[i][j];
      }
    }
  
    console.log(totalSum); 
  }
  
  const myArray = [[1, 2], [4, 5], [7, 8]];
  sum2DArray(myArray); 
  