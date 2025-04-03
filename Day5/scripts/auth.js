export function generateJWT(user) {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    
    // Add a unique identifier (e.g., current timestamp + random number) to the payload
    const uniqueId = Date.now() + Math.random().toString(36).substring(2); // Timestamp + random string
    const payload = btoa(JSON.stringify({
        email: user.email,
        exp: Date.now() + 60000, // 60 seconds expiration
        jti: uniqueId // JWT ID (jti) for uniqueness
    }));
    
    // Simulate a dynamic signature by incorporating the uniqueId
    // In a real scenario, this would be generated using a secret key and the header + payload.
    const signature = btoa("fake-signature-" + uniqueId);
    
    const token = `${header}.${payload}.${signature}`;
    console.log('Generated unique JWT:', token); // For debugging
    return token;
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
    console.log(`Cookie set: ${name}=${value}`); // For debugging
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
        if (c.indexOf(cname) === 0) {
            const value = c.substring(cname.length);
            console.log(`Cookie found: ${name}=${value}`); // For debugging
            return value;
        }
    }
    // this loops through the array of cookies and 
    // checks if the cookie name matches the name we want
    console.log(`Cookie not found: ${name}`); // For debugging
    return "";
    // 
}

export function verifyJWT(token) {
    try {
        const [_, payload] = token.split('.');
        const decoded = JSON.parse(atob(payload));
        // atob decodes the base64 encoded string
        const isValid = Date.now() < decoded.exp;
        // this checks if the current time is less than the expiration time
        console.log('JWT verification:', { token, decoded, isValid }); // For debugging
        return isValid;
    } catch (error) {
        console.error('JWT verification error:', error);
        return false;
    }
}