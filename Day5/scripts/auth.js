export function generateJWT(user) {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const payload = btoa(JSON.stringify({ email: user.email, exp: Date.now() + 60000 })); // 60 seconds
    const signature = btoa("fake-signature"); // Simplified for frontend
    return `${header}.${payload}.${signature}`;
}

export function setCookie(name, value, seconds) {
    const date = new Date();
    date.setTime(date.getTime() + (seconds * 1000));
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

export function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let c of ca) {
        c = c.trim();
        if (c.indexOf(cname) === 0) return c.substring(cname.length);
    }
    return "";
}

export function verifyJWT(token) {
    try {
        const [_, payload] = token.split('.');
        const decoded = JSON.parse(atob(payload));
        return Date.now() < decoded.exp;
    } catch {
        return false;
    }
}