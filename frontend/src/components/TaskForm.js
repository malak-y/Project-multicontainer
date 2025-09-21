import React, { useState } from 'react';
import './TaskForm.css';

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      return;
    }

    setIsSubmitting(true);
    
    const success = await onAddTask({
      title: title.trim(),
      description: description.trim()
    });

    if (success) {
      setTitle('');
      setDescription('');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="task-form-container slide-up">
      <div className="form-header">
        <h2>
          <span className="form-icon">✨</span>
          Add New Task
        </h2>
        <p>What would you like to accomplish today?</p>
      </div>
      
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">
            <span className="label-icon">🎯</span>
            Task Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Complete project documentation"
            className="form-input"
            maxLength={100}
            required
          />
          <div className="input-border"></div>
        </div>
        
        <div className="form-group">
          <label htmlFor="description">
            <span className="label-icon">📝</span>
            Description (optional)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more details about your task..."
            className="form-textarea"
            rows={3}
            maxLength={500}
          />
          <div className="input-border"></div>
        </div>
        
        <button 
          type="submit" 
          className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
          disabled={!title.trim() || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Adding Task...
            </>
          ) : (
            <>
              <span className="btn-icon">➕</span>
              Add Task
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;