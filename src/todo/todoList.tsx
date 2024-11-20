import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeTodo, toggleTodo, setFilter, selectFilteredTodos } from './todoSlice';
import s from "./style.module.css";

const TodoList: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const dispatch = useDispatch();
    const todos = useSelector(selectFilteredTodos);
    const filter = useSelector((state: { todos: { filter: string } }) => state.todos.filter);

    const handleAddTodo = () => {
        if (inputValue.trim()) {
            dispatch(addTodo({ id: Date.now(), text: inputValue }));
            setInputValue('');
        }
    };

    const handleRemoveTodo = (id: number) => {
        dispatch(removeTodo(id));
    };

    const handleToggleTodo = (id: number) => {
        dispatch(toggleTodo(id));
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setFilter(event.target.value as 'all' | 'completed' | 'incomplete'));
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleAddTodo();
        }
    };

    return (
        <div className={s.container_todo}>
            <div className={s.todo}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress} 
                    placeholder="Введите задачу"
                />
                <button onClick={handleAddTodo}>Добавить</button>
            </div>

            <div>
                <select value={filter} onChange={handleFilterChange}>
                    <option value="all">Все</option>
                    <option value="completed">Выполненные</option>
                    <option value="incomplete">Невыполненные</option>
                </select>
            </div>

            <ol>
                {todos.map((todo) => (
                    <li key={todo.id} className={s.li}>
                        {todo.text}
                        <button onClick={() => handleRemoveTodo(todo.id)}>Удалить</button>
                        <input
                            type="checkbox"
                            className={s.checkbox}
                            checked={todo.completed}
                            onChange={() => handleToggleTodo(todo.id)}
                            id={`todo-${todo.id}`} 
                        />
                        <label htmlFor={`todo-${todo.id}`}></label>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default TodoList;