import React, { useState, useEffect } from 'react';
import './ToDoList.css';

const ToDoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [filter, setFilter] = useState('all');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(storedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, { text: newTask.trim(), completed: false }]);
            setNewTask('');
        }
    };

    const removeTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const toggleCompletion = (index) => {
        const updatedTasks = tasks.map((task, i) => (
            i === index ? { ...task, completed: !task.completed } : task
        ));
        setTasks(updatedTasks);
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleSortOrderChange = (e) => {
        setSortOrder(e.target.value);
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });

    const sortedTasks = filteredTasks.sort((a, b) => {
        if (sortOrder === 'asc') return a.text.localeCompare(b.text);
        if (sortOrder === 'desc') return b.text.localeCompare(a.text);
        return 0;
    });

    return (
        <div className="todo-list">
            <h1>To-Do List</h1>
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Enter a new task"
            />
            <button onClick={addTask}>Add Task</button>
            <div className="filters">
                <label>
                    <input
                        type="radio"
                        value="all"
                        checked={filter === 'all'}
                        onChange={handleFilterChange}
                    />
                    All
                </label>
                <label>
                    <input
                        type="radio"
                        value="active"
                        checked={filter === 'active'}
                        onChange={handleFilterChange}
                    />
                    Active
                </label>
                <label>
                    <input
                        type="radio"
                        value="completed"
                        checked={filter === 'completed'}
                        onChange={handleFilterChange}
                    />
                    Completed
                </label>
                <label>
                    Sort by:
                    <select value={sortOrder} onChange={handleSortOrderChange}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </label>
            </div>
            <ul>
                {sortedTasks.map((task, index) => (
                    <li key={index} className={task.completed ? 'completed' : ''}>
                        <span onClick={() => toggleCompletion(index)}>
                            {task.text}
                        </span>
                        <button onClick={() => removeTask(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToDoList;
