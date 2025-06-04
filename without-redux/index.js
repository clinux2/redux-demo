// index.js

const input = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const filterButtons = document.querySelectorAll('[data-filter]');

// State (no Redux)
let state = {
  todos: [],
  filter: 'ALL'
};

addBtn.addEventListener('click', () => {
  const text = input.value.trim();
  if (text) {
    state.todos.push({ text, completed: false });
    input.value = '';
    render();
  }
});

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    state.filter = btn.getAttribute('data-filter');
    render();
  });
});

function toggleTodo(index) {
  state.todos[index].completed = !state.todos[index].completed;
  render();
}

function deleteTodo(index) {
  state.todos.splice(index, 1);
  render();
}

function render() {
  todoList.innerHTML = '';

  const filtered = state.todos.filter(todo => {
    if (state.filter === 'ALL') return true;
    if (state.filter === 'COMPLETED') return todo.completed;
    if (state.filter === 'ACTIVE') return !todo.completed;
  });

  filtered.forEach((todo, index) => {
    const li = document.createElement('li');
    li.textContent = todo.text;
    li.className = todo.completed ? 'completed' : '';

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Toggle';
    toggleBtn.onclick = () => toggleTodo(index);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteTodo(index);

    li.appendChild(toggleBtn);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
}

render();
