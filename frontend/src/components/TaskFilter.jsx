import React, { useCallback } from 'react'
import '../styles/TaskFilter.css'

const FILTERS = ['all', 'completed', 'pending']

const TaskFilter = ({ activeFilter, onFilterChange }) => {
  const handleClick = useCallback((filter) => () => onFilterChange(filter), [onFilterChange])

  return (
    <div className="task-filter">
      {FILTERS.map(filter => (
        <button
          key={filter}
          className={`btn filter-btn ${activeFilter === filter ? 'filter-active' : ''}`}
          onClick={handleClick(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}

export default TaskFilter
