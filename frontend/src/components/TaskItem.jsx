import React, { useCallback } from 'react'
import '../styles/TaskItem.css'

const TaskItem = ({ task, onEdit, onToggle }) => {
    
  const handleToggle = useCallback(() => onToggle(task.id), [task.id, onToggle])
  const handleEdit = useCallback(() => onEdit(task), [task, onEdit])

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <span className={`task-priority priority-${task.priority}`}>
          {task.priority}
        </span>
      </div>

      {task.description && <p className="task-description">{task.description}</p>}

      <p className="task-date">
        {new Date(task.createdAt).toLocaleDateString()}
      </p>

      <div className="task-actions">
        <button className="btn toggle-btn" onClick={handleToggle}>
          {task.completed ? 'Undo' : 'Complete'}
        </button>
        <button className="btn edit-btn" onClick={handleEdit}>
          Edit
        </button>
      </div>
    </div>
  )
}

export default TaskItem
