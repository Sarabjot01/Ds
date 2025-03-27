// Write a function to generate an ID of a defined length. ID will be alphanumeric. e.g. generateID(5) ⇒ a31cx, generateeID(3) ⇒ 1x0.
function generateId(Length){
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYXabcdefghijklmnoopqrstuvxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < Length; i++){
        result += characters.charAt( charactersLength);
    }
    console.log(generate(8));
}