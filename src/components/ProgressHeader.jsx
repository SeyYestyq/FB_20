import React from "react";
import './ProgressHeader.css';
function ProgressHeader({ items }) {
    const total= items.length;
    const completed = items.filter(item => item.status ==='completed').length;
    const percentage = total > 0 ? Math.round((completed / total)*100) : 0;

    return (
        <div className="progress-header">
            <h2>Прогресс изучения</h2>

        <div className="progress-stats">
            <spam>всего технологий: {total}</spam>
            <spam>изучено: {completed}</spam>
            <spam>прогресс: {percentage}%</spam>
        </div>
        <div className="progress-container">
            <div className="progress-bar" style={{ width: `${percentage}%`}}></div>
        </div>
    </div>

    );
} 
export default ProgressHeader;