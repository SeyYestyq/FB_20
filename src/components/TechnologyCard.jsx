import React from 'react';
import './TechnologyCard.css';
  
function TechnologyCard({ title, description, status, onStatusChange }) {
  
  return (

    <div 
      className={`technology-card ${status}`} 
      onClick={onStatusChange}
      style={{ cursor: 'pointer' }} 
    >
      <div className="card-header">
        <h3>{title}</h3>

        <span className="status-icon">
          {status === 'completed' ? '  выполнено' : status === 'in-progress' ? '  в процессе' : '  не начато'}
        </span>
      </div>
      
      <p className="card-description">{description}</p>
      
      <div className="card-footer">
        <span className="status-text">Статус: {status}</span>
      </div>
    </div>
  );
}

export default TechnologyCard;