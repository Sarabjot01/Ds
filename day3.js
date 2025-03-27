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
}