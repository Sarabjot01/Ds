export function getTodos() {
    return JSON.parse(localStorage.getItem('todos') || '[]');
}

export function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}
// localStorage.setItem takes a key value pair and stores it in local storage.
// localStorage.getItem takes a key and returns the corresponding Value.
