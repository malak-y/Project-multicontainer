import React from 'react';
import './Header.css';

const Header = ({ totalTasks, completedTasks }) => {
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo-section">
            <h1 className="logo">
              <span className="logo-icon">📝</span>
              TaskMaster
            </h1>
            <p className="tagline">Organize your life, one task at a time</p>
          </div>
          
          <div className="stats-section">
            <div className="stats-card">
              <div className="stat-item">
                <span className="stat-number">{totalTasks}</span>
                <span className="stat-label">Total Tasks</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{completedTasks}</span>
                <span className="stat-label">Completed</span>
              </div>
            </div>
            
            <div className="progress-section">
              <div className="progress-label">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;