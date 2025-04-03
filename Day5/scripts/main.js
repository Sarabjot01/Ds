import { getUsers, saveUsers, hashPassword } from './userStorage.js';
import { getTodos, saveTodos } from './todoStorage.js';
import { generateJWT, setCookie, getCookie, verifyJWT } from './auth.js';

// Global variables
let currentPage = 1;
const todosPerPage = 5;
let searchQuery = '';
let tokenCheckInterval = null;


function delay(ms = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Expose functions to global scope
window.toggleForm = toggleForm;
window.handleSignup = handleSignup;
window.handleLogin = handleLogin;
window.handleLogout = handleLogout;
window.addTodo = addTodo;
window.editTodo = editTodo;
window.deleteTodo = deleteTodo;
window.toggleTodoStatus = toggleTodoStatus;
window.debouncedSearchTodos = debounce(() => {
    searchQuery = document.getElementById('todoSearch').value.toLowerCase();
    loadTodos();
}, 300);
window.loadTodos = loadTodos;
window.prevPage = prevPage;
window.nextPage = nextPage;

function toggleForm(type) {
    document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.form-box').forEach(box => box.classList.remove('active'));
    document.querySelector('.form-box.todo').style.display = 'none';

    if (type === 'login') {
        document.querySelector('.toggle-btn:nth-child(1)').classList.add('active');
        document.querySelector('.form-box.login').classList.add('active');
    } else if (type === 'signup') {
        document.querySelector('.toggle-btn:nth-child(2)').classList.add('active');
        document.querySelector('.form-box.signup').classList.add('active');
    } else if (type === 'todo') {
        document.querySelector('.form-box.todo').style.display = 'block';
        document.querySelector('.form-box.todo').classList.add('active');
    }
}

async function handleSignup() {
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const messageDiv = document.getElementById('signupMessage');

    if (!email.includes('@') || password.length < 6) {
        messageDiv.textContent = 'Invalid email or password (min 6 chars)';
        return;
    }

    await delay();
    const users = getUsers();
    if (users.some(user => user.email === email)) {
        messageDiv.textContent = 'Email already exists!';
        return;
    }

    const newUser = { username, email, password: hashPassword(password) };
    users.push(newUser);
    saveUsers(users);

    const token = generateJWT(newUser);
    setCookie('jwt', token, 60); // 60 seconds
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    startTokenCheck();
    toggleForm('todo');
    loadTodos();
}

async function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const messageDiv = document.getElementById('loginMessage');

    await delay();
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === hashPassword(password));

    if (user) {
        const token = generateJWT(user);
        setCookie('jwt', token, 60); // 60 seconds
        localStorage.setItem('currentUser', JSON.stringify(user));
        startTokenCheck();
        toggleForm('todo');
        loadTodos();
    } else {
        messageDiv.textContent = 'Invalid credentials!';
    }
}

function handleLogout() {
    stopTokenCheck();
    localStorage.removeItem('currentUser');
    document.cookie = "jwt=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    toggleForm('login');
    document.getElementById('todoList').innerHTML = '';
}

async function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const priority = document.getElementById('todoPriority').value;
    const text = todoInput.value.trim();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser || text.length < 2) return;

    await delay();
    const todos = getTodos();
    todos.push({
        id: Date.now(),
        text,
        priority,
        completed: false,
        userEmail: currentUser.email,
        createdAt: new Date().toISOString()
    });
    saveTodos(todos);
    todoInput.value = '';
    loadTodos();
}

function editTodo(id) {
    const todos = getTodos();
    const todo = todos.find(t => t.id === id);
    const newText = prompt('Edit todo:', todo.text);
    if (newText) {
        todo.text = newText;
        saveTodos(todos);
        loadTodos();
    }
}

function deleteTodo(id) {
    const todos = getTodos();
    saveTodos(todos.filter(t => t.id !== id));
    loadTodos();
}

function toggleTodoStatus(id) {
    const todos = getTodos();
    const todo = todos.find(t => t.id === id);
    todo.completed = !todo.completed;
    saveTodos(todos);
    loadTodos();
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

async function loadTodos() {
    await delay();
    const todoList = document.getElementById('todoList');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        todoList.innerHTML = '';
        return;
    }
    let todos = getTodos().filter(t => t.userEmail === currentUser.email);

    if (searchQuery) {
        todos = todos.filter(t => t.text.toLowerCase().includes(searchQuery));
    }

    const sortBy = document.getElementById('todoSort').value;
    todos.sort((a, b) => {
        if (sortBy === 'date') return new Date(b.createdAt) - new Date(a.createdAt);
        if (sortBy === 'name') return a.text.localeCompare(b.text);
        if (sortBy === 'priority') {
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
    });

    const start = (currentPage - 1) * todosPerPage;
    const paginatedTodos = todos.slice(start, start + todosPerPage);
    todoList.innerHTML = '';

    paginatedTodos.forEach(todo => {
        const div = document.createElement('div');
        div.className = `todo-item ${todo.priority} ${todo.completed ? 'completed' : ''}`;
        div.innerHTML = `
            <span>${todo.text}</span>
            <div class="todo-actions">
                <button onclick="toggleTodoStatus(${todo.id})">${todo.completed ? 'Undo' : 'Done'}</button>
                <button onclick="editTodo(${todo.id})">Edit</button>
                <button onclick="deleteTodo(${todo.id})">Delete</button>
            </div>
        `;
        todoList.appendChild(div);
    });

    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${Math.ceil(todos.length / todosPerPage) || 1}`;
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        loadTodos();
    }
}

function nextPage() {
    const todos = getTodos().filter(t => t.userEmail === JSON.parse(localStorage.getItem('currentUser')).email);
    if (currentPage < Math.ceil(todos.length / todosPerPage)) {
        currentPage++;
        loadTodos();
    }
}

function startTokenCheck() {
    stopTokenCheck();
    tokenCheckInterval = setInterval(() => {
        const token = getCookie('jwt');
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser && (!token || !verifyJWT(token))) {
            handleLogout();
        }
    }, 10000); // Check every 10 seconds
}

function stopTokenCheck() {
    if (tokenCheckInterval) {
        clearInterval(tokenCheckInterval);
        tokenCheckInterval = null;
    }
}

// Initialize
window.onload = function() {
    stopTokenCheck();
    const token = getCookie('jwt');
    const currentUser = localStorage.getItem('currentUser');

    if (currentUser && token && verifyJWT(token)) {
        toggleForm('todo');
        loadTodos();
        startTokenCheck();
    } else {
        toggleForm('login');
    }
};