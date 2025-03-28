// Write a function to generate an ID of a defined length. ID will be alphanumeric. e.g. generateID(5) ⇒ a31cx, generateeID(3) ⇒ 1x0.
function generateId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  
  console.log(generateId(5));
  console.log(generateId(3));
  console.log(generateId(10));
  console.log(generateId(15));
