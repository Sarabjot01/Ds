export function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}

export function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

export function hashPassword(password) {
    return btoa(password.split('').reverse().join('')); // Simple hash for demo
}