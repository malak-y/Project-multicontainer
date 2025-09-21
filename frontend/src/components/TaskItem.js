import React, { useState } from 'react';
import './TaskItem.css';

const TaskItem = ({ task, onUpdate, onDelete, onToggle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSave = async () => {
    if (!editTitle.trim()) return;
    
    setIsUpdating(true);
    const success = await onUpdate(task.id, {
      title: editTitle.trim(),
      description: editDescription.trim()
    });
    
    if (success) {
      setIsEditing(false);
    }
    setIsUpdating(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(task.id);
  };

  const handleToggle = async () => {
    await onToggle(task.id);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${isDeleting ? 'deleting' : ''} fade-in`}>
      <div className="task-header">
        <button
          className={`toggle-btn ${task.completed ? 'checked' : ''}`}
          onClick={handleToggle}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.completed ? '✓' : ''}
        </button>
        
        <div className="task-meta">
          <span className="task-date">
            {formatDate(task.createdAt)}
          </span>
          {task.updatedAt && task.updatedAt !== task.createdAt && (
            <span className="task-updated">
              ✏️ Updated {formatDate(task.updatedAt)}
            </span>
          )}
        </div>
      </div>

      <div className="task-content">
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="edit-title"
              placeholder="Task title"
              maxLength={100}
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="edit-description"
              placeholder="Task description"
              rows={3}
              maxLength={500}
            />
          </div>
        ) : (
          <div className="task-details">
            <h4 className="task-title">{task.title}</h4>
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}
          </div>
        )}
      </div>

      <div className="task-actions">
        {isEditing ? (
          <div className="edit-actions">
            <button
              className="save-btn"
              onClick={handleSave}
              disabled={!editTitle.trim() || isUpdating}
            >
              {isUpdating ? (
                <span className="spinner"></span>
              ) : (
                <>
                  <span>✓</span>
                  Save
                </>
              )}
            </button>
            <button
              className="cancel-btn"
              onClick={handleCancel}
              disabled={isUpdating}
            >
              <span>×</span>
              Cancel
            </button>
          </div>
        ) : (
          <div className="view-actions">
            <button
              className="edit-btn"
              onClick={() => setIsEditing(true)}
              aria-label="Edit task"
            >
              <span>✏️</span>
            </button>
            <button
              className="delete-btn"
              onClick={handleDelete}
              disabled={isDeleting}
              aria-label="Delete task"
            >
              {isDeleting ? (
                <span className="spinner"></span>
              ) : (
                <span>🗑️</span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;