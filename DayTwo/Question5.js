// Write a function that will accept an array of objects 
// (values as numbers) as a parameter, and will return a new 
// array of sum of all values of Object
function sumObjectValues(arr) {
    if (!Array.isArray(arr)) {
      return "Input must be an array.";
    }
  
    return arr.map(obj => {
      if (typeof obj !== 'object' || obj === null) {
        return "Array elements must be objects.";
      }
  
      let sum = 0;
      for (const key in obj) {
        if (typeof obj[key] !== 'number') {
          return "Object values must be numbers.";
        }
        sum += obj[key];
      }
      return sum;
    });
  }

  const inputArray = [{ a: 1, b: 2 }, { c: 3, d: 4 }, { e: 5 }];
  const result = sumObjectValues(inputArray);
  console.log(result); 
  
