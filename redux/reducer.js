// reducer.js
const initialState = {
  todos: [],
  filter: 'ALL'
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, { text: action.payload, completed: false }]
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((_, i) => i !== action.payload)
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo, i) =>
          i === action.payload ? { ...todo, completed: !todo.completed } : todo
        )
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    default:
      return state;
  }
}
