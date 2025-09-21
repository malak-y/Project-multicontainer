import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask, onToggleTask }) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state slide-up">
        <div className="empty-icon">🎆</div>
        <h3>No tasks yet!</h3>
        <p>Create your first task above to get started on your productivity journey.</p>
      </div>
    );
  }

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="task-list-container">
      {pendingTasks.length > 0 && (
        <div className="task-section">
          <div className="section-header">
            <h3>
              <span className="section-icon">🔥</span>
              Active Tasks
              <span className="task-count">{pendingTasks.length}</span>
            </h3>
          </div>
          <div className="task-grid">
            {pendingTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdate={onUpdateTask}
                onDelete={onDeleteTask}
                onToggle={onToggleTask}
              />
            ))}
          </div>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div className="task-section completed-section">
          <div className="section-header">
            <h3>
              <span className="section-icon">✅</span>
              Completed Tasks
              <span className="task-count">{completedTasks.length}</span>
            </h3>
          </div>
          <div className="task-grid">
            {completedTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdate={onUpdateTask}
                onDelete={onDeleteTask}
                onToggle={onToggleTask}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;