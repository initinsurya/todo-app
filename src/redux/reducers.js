 import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, EDIT_TODO, SET_FILTER } from './actions';

const initialState = {
  todos: [],
  filter: 'all',
};

const todoApp = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: state.todos.length + 1,
            text: action.payload.text,
            status: action.payload.status,
          },
        ],
      };

    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, status: todo.status === 'Complete' ? 'Incomplete' : 'Complete' }
            : todo
        ),
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };

    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.newText }
            : todo
        ),
      };

    case SET_FILTER:
      return {
        ...state,
        filter: action.payload.filter,
      };

    default:
      return state;
  }
};

export default todoApp;
