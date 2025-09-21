const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for tasks (in production, use a database)
let tasks = [
  {
    id: uuidv4(),
    title: "Welcome to TaskMaster! 🎉",
    description: "This is your first task. Try editing or completing it!",
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: "Explore the Features ✨",
    description: "Add new tasks, mark them as complete, or delete them",
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: "Build Something Amazing 🚀",
    description: "Use this app as a starting point for your next project",
    completed: true,
    createdAt: new Date().toISOString()
  }
];

// Routes

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Welcome to TaskMaster API!',
    version: '1.0.0',
    endpoints: {
      'GET /api/tasks': 'Get all tasks',
      'POST /api/tasks': 'Create a new task',
      'PUT /api/tasks/:id': 'Update a task',
      'DELETE /api/tasks/:id': 'Delete a task'
    }
  });
});

// Get all tasks
app.get('/api/tasks', (req, res) => {
  res.json({
    success: true,
    count: tasks.length,
    data: tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  });
});

// Create a new task
app.post('/api/tasks', (req, res) => {
  const { title, description } = req.body;
  
  if (!title || title.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Task title is required'
    });
  }

  const newTask = {
    id: uuidv4(),
    title: title.trim(),
    description: description ? description.trim() : '',
    completed: false,
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  
  res.status(201).json({
    success: true,
    message: 'Task created successfully! 🎉',
    data: newTask
  });
});

// Update a task
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  
  const taskIndex = tasks.findIndex(task => task.id === id);
  
  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Task not found'
    });
  }

  // Update task properties
  if (title !== undefined) tasks[taskIndex].title = title.trim();
  if (description !== undefined) tasks[taskIndex].description = description.trim();
  if (completed !== undefined) tasks[taskIndex].completed = completed;
  tasks[taskIndex].updatedAt = new Date().toISOString();

  res.json({
    success: true,
    message: 'Task updated successfully! ✨',
    data: tasks[taskIndex]
  });
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  
  const taskIndex = tasks.findIndex(task => task.id === id);
  
  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Task not found'
    });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];
  
  res.json({
    success: true,
    message: 'Task deleted successfully! 🗑️',
    data: deletedTask
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found. Check the API documentation.'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong! Please try again.'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 TaskMaster Backend Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}`);
  console.log(`📚 Documentation: http://localhost:${PORT}`);
});

module.exports = app;