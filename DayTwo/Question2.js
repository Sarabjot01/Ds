// Write a function that will accept an array of objects (values as numbers) as a parameter, and will return a new array of Object with values as index*value. eg [{a:1}, {b:2}] ⇒ [{a:0}, {b:2}]

// Write a function that will accept an array of objects (values as numbers) as a parameter, and will return a new array of sum of all values of Object

let arr = [{a:1},{b:2}]

function ArrofObj(arr) {
    return arr.map(obj => 
        Object.values(obj).reduce((sum, num) => sum + num, 0)
        
    );
}


const output = ArrofObj(arr);
console.log(output);