// Write a function that accepts one parameter, Obj, and will work like an object. keys.
function customKeys(obj) {
    if (typeof obj !== 'object' || obj === null) {
      return []; 
    }
  
    const keys = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
    return keys;
  }
  
  const myObject = { a: 1, b: 2, c: 3 };
  const objectKeys = customKeys(myObject);
  console.log(objectKeys); 
