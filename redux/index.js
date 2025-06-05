// index.js
// Get DOM elements
const input = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const filterButtons = document.querySelectorAll('[data-filter]');

// Create Redux store
const store = Redux.createStore(rootReducer);

// Add event listeners
addBtn.addEventListener('click', () => {
  const text = input.value.trim();
  if (text) {
    store.dispatch(addTodo(text));
    input.value = '';
  }
});

// Add filter event listeners
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    store.dispatch(setFilter(btn.getAttribute('data-filter')));
  });
});

// Render the UI based on the current state
function render() {
  const { todos, filter } = store.getState();
  todoList.innerHTML = '';

  const filteredTodos = todos.filter(todo => {
    if (filter === 'ALL') return true;
    if (filter === 'COMPLETED') return todo.completed;
    if (filter === 'ACTIVE') return !todo.completed;
  });

  filteredTodos.forEach((todo, i) => {
    const li = document.createElement('li');
    li.textContent = todo.text;
    li.className = todo.completed ? 'completed' : '';

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Toggle';
    toggleBtn.onclick = () => store.dispatch(toggleTodo(i));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => store.dispatch(deleteTodo(i));

    li.appendChild(toggleBtn);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
}

// Any time state change, re-render UI
store.subscribe(render);
// Initial render
render();
