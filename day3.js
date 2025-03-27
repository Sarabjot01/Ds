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
  