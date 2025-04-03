export function generateJWT(user) {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const payload = btoa(JSON.stringify({ email: user.email, exp: Date.now() + 60000 })); // 60 seconds
    const signature = btoa("fake-signature"); // In a real scenario,
    //  this would be generated using a secret key and the header + payload.
    return `${header}.${payload}.${signature}`;
}

export function setCookie(name, value, seconds) {
    const date = new Date(); 
    // this is the current date and time
    date.setTime(date.getTime() + (seconds * 1000));
    // this sets the date to the current date and time 
    // plus the number of seconds
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
    // this sets the cookie with the name, value, and expiration date
    // this toUTCString() method converts the date to a string in UTC format
}

export function getCookie(name) {
    const cname = name + "=";
    // this is the name of the cookie we want to get
    // and this = is the value of the cookie we want to get
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    // this splits the cookie string into an array of cookies
    for (let c of ca) {
        c = c.trim();
        if (c.indexOf(cname) === 0) return c.substring(cname.length);
    }
    // this loops through the array of cookies and 
    // checks if the cookie name matches the name we want
    return "";
    // 
}

export function verifyJWT(token) {
    try {
        const [_, payload] = token.split('.');
        const decoded = JSON.parse(atob(payload));
        // atob decodes the base64 encoded string
        return Date.now() < decoded.exp;
        // this checks if the current time is less than the expiration time
    } catch {
        return false;
    }
}