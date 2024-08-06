// components/TodoList.js
"use client";

import { useState } from 'react';
import styles from '../src/styles/TodoList.module.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() === '') return;
    const timestamp = new Date().toLocaleString();
    setTasks([...tasks, { text: newTask, completed: false, createdAt: timestamp, completedAt: null }]);
    setNewTask('');
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) => 
      i === index 
        ? { ...task, completed: !task.completed, completedAt: task.completed ? null : new Date().toLocaleString() }
        : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className={styles.container}>
      <h1>Todo List</h1>
      <input
        className={styles.input}
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Add a new task"
      />
      <button className={styles.button} onClick={addTask}>Add Task</button>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <div></div>
          <strong>Task</strong>
          <strong>Added</strong>
          <strong>Completed</strong>
          <div></div>
        </li>
        {tasks.map((task, index) => (
          <li key={index} className={styles.listItem}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={task.completed}
              onChange={() => toggleTaskCompletion(index)}
            />
            <span
              className={styles.listItemText}
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            >
              {task.text}
            </span>
            <span className={styles.smallText}>{task.createdAt}</span>
            <span className={styles.smallText}>{task.completedAt || '---'}</span>
            <button className={`${styles.button} ${styles.deleteButton}`} onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
