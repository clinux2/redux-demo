// actions.js
const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const SET_FILTER = 'SET_FILTER';

function addTodo(text) {
  return { type: ADD_TODO, payload: text };
}

function deleteTodo(index) {
  return { type: DELETE_TODO, payload: index };
}

function toggleTodo(index) {
  return { type: TOGGLE_TODO, payload: index };
}

function setFilter(filter) {
  return { type: SET_FILTER, payload: filter };
}
