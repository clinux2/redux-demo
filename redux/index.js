// index.js
const input = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const filterButtons = document.querySelectorAll('[data-filter]');

addBtn.addEventListener('click', () => {
  const text = input.value.trim();
  if (text) {
    store.dispatch(addTodo(text));
    input.value = '';
  }
});

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    store.dispatch(setFilter(btn.getAttribute('data-filter')));
  });
});

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

store.subscribe(render);
render();
