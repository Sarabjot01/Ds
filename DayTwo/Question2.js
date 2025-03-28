// Write a function that will accept an array of objects (values as numbers) as a parameter, and will return a new array of Object with values as index*value. eg [{a:1}, {b:2}] ⇒ [{a:0}, {b:2}]

// Write a function that will accept an array of objects (values as numbers) as a parameter, and will return a new array of sum of all values of Object

function multiplyObjectValuesByIndex(arr) {
    return arr.map((obj, index) => {
      const newObj = {};
      for (const key in obj) {
        newObj[key] = obj[key] * index;
      }
      return newObj;
    });
  }

  function sumObjectValues(arr) {
    return arr.map(obj => {
      let sum = 0;
      for (const key in obj) {
        sum += obj[key];
      }
      return sum;
    });
  }
  const inputArray = [{ a: 1, b: 2 }, { c: 3, d: 4 }, { e: 5 }];
  
  const multiplied = multiplyObjectValuesByIndex(inputArray);
  console.log("Multiplied by index:", multiplied);