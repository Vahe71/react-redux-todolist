import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
        const data = await response.json();
        return data
    }
);

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        completedSize: 0,
        unCompletedSize: 0,
        status: null,
        error: null,
        progress: 0,
        removedTodos: [],
        showDeletedTodos: false 
    },
    reducers: {
        addTodo(state, action) {
            state.todos.push({
                id: Date.now(),
                title: action.payload.text,
                completed: false
            })
        },
        removeTodo(state, action) {
            state.todos.forEach((todo) => todo.id == action.payload.id && state.removedTodos.push(todo));
            state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
        },
        toggleTodoComplete(state, action) {
            state.todos = state.todos.map((todo) => {
                if (action.payload.id == todo.id) {
                    todo.completed = action.payload.completed
                }
                return todo
            })
        },
        deleteCompleted(state, action) {
            state.todos.forEach((todo) => todo.completed && state.removedTodos.push(todo));
            state.todos = state.todos.filter((todo) => todo.completed === false)
        },
        setCompletedSize(state, action) {
            let size = 0;
            let unCompSize = 0;
            state.todos.forEach((todo) => {
                todo.completed ? size += 1 : unCompSize += 1
            });
            state.completedSize = size;
            state.unCompletedSize = unCompSize;
        },
        changeProgress(state, action) {
            state.progress = parseInt(((state.completedSize / state.todos.length) * 100));
        },
        setShowDeletedTodos(state, action) {
            state.showDeletedTodos = action.payload
        },
        editMessage(state, action) {
            state.todos.forEach((todo) => {
                if (todo.id == action.payload.id) {
                    todo.title = action.payload.newTitle;
                }
            })
        },
        returnDeletedTodo(state, action) {
            state.removedTodos.forEach((todo) => {
                if (todo.id === action.payload.id) {
                    state.todos.push(todo);
                    state.removedTodos = state.removedTodos.filter((todo) => todo.id !== action.payload.id);
                } 
            })
        }
    },
    extraReducers: {
        [fetchTodos.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchTodos.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.todos = action.payload;
        },
        [fetchTodos.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = 'rejected';
        }
    }
});

export const {
    addTodo,
    removeTodo,
    toggleTodoComplete,
    deleteCompleted,
    setCompletedSize,
    changeProgress,
    setShowDeletedTodos,
    editMessage,
    returnDeletedTodo
} = todoSlice.actions;
export const getTodos = (state) => state.todos.todos;
export const getCompletedSize = (state) => state.todos.completedSize;
export const getUnCompletedSize = (state) => state.todos.unCompletedSize;
export const getProgress = (state) => state.todos.progress;
export const getRemovedTodos = (state) => state.todos.removedTodos;
export const showTodosPanel = (state) => state.todos.showDeletedTodos;

export default todoSlice.reducer;










