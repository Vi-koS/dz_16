import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: number;
  text: string;
  completed: boolean; 
}

interface TodoState {
  todos: Todo[];
  filter: 'all' | 'completed' | 'incomplete';
}

const initialState: TodoState = {
  todos: [],
  filter: 'all'
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Omit<Todo, 'completed'>>) => {
      state.todos.push({ ...action.payload, completed: false });
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    setFilter: (state, action: PayloadAction<'all' | 'completed' | 'incomplete'>) => {
      state.filter = action.payload;
    }
  },
});

export const { addTodo, removeTodo, toggleTodo, setFilter } = todoSlice.actions;

export const selectFilteredTodos = (state: { todos: TodoState }) => {
  switch (state.todos.filter) {
    case 'completed':
      return state.todos.todos.filter(todo => todo.completed);
    case 'incomplete':
      return state.todos.todos.filter(todo => !todo.completed);
    default:
      return state.todos.todos;
  }
};

export default todoSlice.reducer;