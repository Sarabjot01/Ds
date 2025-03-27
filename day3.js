// Convert this Promise-based code to use async/await:
// function fetchData() {
//     return fetch('https://dummyjson.com/products/search?q=phone')
//       .then(response => response.json())
//       .then(data => {
//         console.log(data);
//         return data;
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });
//   }


// this is the code for the above question and we used the async/await funtion 
// we used try and catch block to handle the error an dreplaced the then and catch block with async and await
const prompt = require('prompt-sync')();
async function fetchdata(){
    try{
        const response = await fetch('https://dummyjson.com/products/search?q=phone');
        const data = await response.json();
        return data;
    }catch (error){
        console.log('Error fetching Data:', error);
        throw error;
    }
}

// this is to return the data from the function
async function processData() {
    try {
      const result = await fetch('https://dummyjson.com/products/search?q=phone');
      console.log('Data fetched successfully:', result);
    } catch (error) {
      console.error('Error processing data:', error);
    }
  }
  
  processData();

//   Recursive Factorial

function factorial(x) {

    if (x == 0) {
        return 1;
    }

    else {
        return x * factorial(x - 1);
    }
}

const num = prompt('Enter a positive number: ');

if (num >= 0) {
    const result = factorial(num);
    console.log(`The factorial of ${num} is ${result}`);
}
else {
    console.log('Enter a positive number.');
};




// This code had an error of the return statement in the function and the function was not called so I called the function and also added the return statement in the function
// getData()
//   .then(data => {
//    return processData(data);
//   })
//   .then(result => {
//     displayResult(result);
//   });

// Learn what is debouncing, and create your own debouncing function
  const debounce = (mainFunction, delay) => {
    // Declare a variable called 'timer' to store the timer ID
    let timer;
  
    // Return an anonymous function that takes in any number of arguments
    return function (...args) {
      // Clear the previous timer to prevent the execution of 'mainFunction'
      clearTimeout(timer);
  
      // Set a new timer that will execute 'mainFunction' after the specified delay
      timer = setTimeout(() => {
        mainFunction(...args);
      }, delay);
    };
  };
  
// Define a function called 'searchData' that logs a message to the console
function searchData() {
    console.log("searchData executed");
  }
  
  // Create a new debounced version of the 'searchData' function with a delay of 3000 milliseconds (3 seconds)
  const debouncedSearchData = debounce(searchData, 3000);
  
  // Call the debounced version of 'searchData'
  debouncedSearchData();
  


//   What potential issues exist in this code? How would you restructure it? Make this faster
// async function fetchUserData(userId) {
//   const user = await fetchUser(userId);
//   const posts = await fetchPosts(userId);
//   const comments = await fetchComments(userId);

//   return { user, posts, comments };
// }


  async function fetchUserData(userId) {
    const [user, posts, comments] = await Promise.allSettled([
      fetchUser(userId),
      fetchPosts(userId),
      fetchComments(userId)
    ]);
  
    return { user, posts, comments };
  }



//   Flatten this with and without using flat() & flatMap()
// const complexData = [
//   [1, 2],
//   [3, [4, 5]],
//   [[6], [[7, 8], 9]],
//   10
// ];
// both the flatmap and flat function retuen the sub array into a single array.
const complexData = [
    [1, 2],
    [3, [4, 5]],
    [[6], [[7, 8], 9]],
    10
  ];
  console.log(complexData.flat(Infinity));
//   this Infinity shows the depth of the array to be flattened

  const complexData1 = [
    [1, 2],
    [3, [4, 5]],
    [[6], [[7, 8], 9]],
    10
  ];
  console.log(complexData1.flatMap((element) => element));
//   console.log(complexData1.flatMap((element) => element.flat(2)));
//   this element => elememt is the call back function used in that.
// which loops through the array and then concatenates the arrays into a single array.


//   7. ****IMPORTANT** Write a function that will accept an array of objects (values can be any type, arr, obj, str,num) as a parameter, and will return a new array of sum of all numeric values of Object, and if value is an Object or arr calculate the sum of it. 
    
//     UPDATE: Do it just for single nesting (no need of recursion)

// const data = [
//     { a: 10, b: [5, 10], e: "hello" },
//     { x: 2, y: { z: [1, 2, 3], w: 4 }, q: "test" },
//     { p: { q: 8 }, s: [2, 3, 4] }
//     ]; // Output: [15, 6, 17]




const data = [
  { a: 10, b: [5, 10], e: "hello" },
  { x: 2, y: { z: [1, 2, 3], w: 4 }, q: "test" },
  { p: { q: 8 }, s: [2, 3, 4] }
  ]; // Output: [15, 6, 17]
  
  const sumOfValues = (arr) => {
      return arr.map((obj) => {
          return Object.values(obj).reduce((acc, val) => {
              if (Array.isArray(val)) {
                  return acc + val.reduce((a, v) => a + v, 0);
              } else if (typeof val === 'object') {
                  return acc + sumOfValues([val])[0];
              } else if (typeof val === 'number') {
                  return acc + val;
              }
              return acc;
          }, 0);
      });
  };
  
  console.log(sumOfValues(data));