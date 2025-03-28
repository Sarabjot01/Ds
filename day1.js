// theory:
// Types of errors
// ternary operator



// check weather the number is prime or not
function isPrime(num){
    let i=2;
    while(i < num){
        if(num % i == 0){
            return false;
        }
        i++;
    }
    return true;
}

console.log(isPrime(5));
console.log(isPrime(8));
// Print Reverse array
let arr1 = [3,1,8,80,55,6]
let newarr1 = arr1.sort((a,b) => b-a)
console.log(newarr1);

// print first N prime numbers, N is dynamic
// solution one 
// let arr = [1,2,3,4];
// if (arr[1] == 2){
// console.log("The number is prime number")
// }
// else{
// console.log("This number is not a prime number");
// }
// solution two
//print n prime numbers
function isPrime(num){
    let i=2;
    while(i < num){
        if(num % i == 0){
            return false
        }
        i++;
    }
    return true;
}


function printNPrime(num){
    let x = 2
    while(x <=num){
        if(isPrime(x)){
            console.log(x);
        }
        x++;
    }
}
printNPrime(29);


// Print odd numbers from the array with if else
let arr4 = [2,3,4,5,6];
let n1 = arr4.length;

for (let i = 0; i<n1 ; i++){
    if ( arr4[i] % 2 !== 0){
        console.log("this is odd number")
    }
    else{
        console.log("this is even number")
    }
};

// now I have to only print the odd numbers from the array
let arr5 = [2,3,4,5,6];
let n2 = arr5.length;
for (let i = 0; i<n2 ; i+= 1){
    if ( arr5[i] % 2 !== 0){
        console.log(arr5[i])
    }
};

// // print  numbers at even index from the array without if else
// - Print odd numbers from the array with if else
// - print  numbers at even index from the array without if else
// - Given an array of strings, print the strings with length 3, e.g [a, b, cat, f, dog] output = [cat, dog]
// - Given an array of strings, print the strings with even length, e.g [a, b, cat, ff, dog] output = [ff]
// - Given an object in which values are integer only, print the even values only
// - Given an object in which values are integer only, print the value if it is prime only
// - Given an object in which values are integer only, print the double for each value only. eg. { a: 1, b: 2} ⇒ 2, 4
// - Given an object in which values are integer only, print the half for each value (whole numbers). eg. { a: 1, b: 2} ⇒ 0,  


function evenNumbers(arr){
    for(let i = 0; i<arr.length ; i+=2){
        console.log(arr[i])
    }
};
const arr11 = [12,3, 4 ,6 , 8];
evenNumbers(arr11);

function lengthofThree(arr12){
    for (let i = 0; i<arr12.length; i++){
        if (arr12[i].length == 3){
            console.log(arr12[i]);
        }
    }
}

const arr12 = ['a', 'b', 'cat', 'f', 'dog'];
lengthofThree(arr12);


function lengthofThree(arr13){
    for (let i = 0; i<arr13.length; i++){
        if (arr13[i].length %2 == 0){
            console.log(arr13[i]);
        }
    }
}

const arr13 = ['a', 'b', 'cat', 'ff', 'dog'];
lengthofThree(arr13);

//  Given an array of strings, print the strings with even length, e.g [a, b, cat, ff, dog] output = [ff]



function intergersOnly(arr14){
    for(let i in arr14){
       if(arr14[i] %2 == 0){
           console.log(arr14[i])
       }
   }
}
// creating a object
const arr14 = {
   a:10,
   b:-5,   
   c:2,
   d:4
};
intergersOnly(arr14);



// Given an object in which values are integer only, print the value if it is prime only
const arr15 = {
    a:10,
    b:-5,   
    c:2,
    d:4
 };
 PrimeOnly(arr15);
 
 function PrimeOnly(arr15){
     for(let i in arr15){
         for(let k = 2 ; k<arr15[i] ; i++){
             if(arr15[i] % k ==0){
                 console.log("These are not prime numbers")
         }
         console.log(arr15[i]);
    }
 }
 };
 
// Given an object in which values are integer only, print the double for each value only. eg. { a: 1, b: 2} ⇒ 2, 4
const obj = {
    a:1,
    b:2
}
DoubleNumber(obj);
function DoubleNumber(obj){
    for(let i in obj){
        console.log(obj[i] * 2)
    }
}

const obj1 = {
    a:1,
    b:2
}
DoubleNumber(obj1);
function DoubleNumber(obj1){
    for(let i in obj1){
        console.log(Math.floor(obj1[i] / 2))
    }
}