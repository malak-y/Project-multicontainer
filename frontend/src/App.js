import React, { useState, useEffect } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch tasks from API
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/tasks`);
      const data = await response.json();
      
      if (data.success) {
        setTasks(data.data);
        setError('');
      } else {
        setError('Failed to fetch tasks');
      }
    } catch (err) {
      setError('Unable to connect to server. Please try again later.');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add new task
  const addTask = async (taskData) => {
    try {
      const response = await fetch(`${API_URL}/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setTasks(prev => [data.data, ...prev]);
        setError('');
        return true;
      } else {
        setError(data.message || 'Failed to add task');
        return false;
      }
    } catch (err) {
      setError('Unable to add task. Please try again.');
      console.error('Error adding task:', err);
      return false;
    }
  };

  // Update task
  const updateTask = async (id, updates) => {
    try {
      const response = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setTasks(prev => prev.map(task => 
          task.id === id ? data.data : task
        ));
        setError('');
        return true;
      } else {
        setError(data.message || 'Failed to update task');
        return false;
      }
    } catch (err) {
      setError('Unable to update task. Please try again.');
      console.error('Error updating task:', err);
      return false;
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setTasks(prev => prev.filter(task => task.id !== id));
        setError('');
        return true;
      } else {
        setError(data.message || 'Failed to delete task');
        return false;
      }
    } catch (err) {
      setError('Unable to delete task. Please try again.');
      console.error('Error deleting task:', err);
      return false;
    }
  };

  // Toggle task completion
  const toggleTask = async (id) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      await updateTask(id, { completed: !task.completed });
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="App">
      <Header 
        totalTasks={totalTasks} 
        completedTasks={completedTasks}
      />
      
      <main className="main-content">
        <div className="container">
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
              <button 
                onClick={() => setError('')}
                className="error-close"
              >
                ×
              </button>
            </div>
          )}
          
          <TaskForm onAddTask={addTask} />
          
          {loading ? (
            <LoadingSpinner />
          ) : (
            <TaskList 
              tasks={tasks}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
              onToggleTask={toggleTask}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;