import React, { useState, useCallback } from 'react'
import '../styles/TaskForm.css'

const PRIORITY_OPTIONS = ['low', 'medium', 'high']
const INITIAL_FORM = { title: '', description: '', priority: 'medium' }

const TaskForm = ({ onSubmit, onCancel, initialData }) => {
  const [form, setForm] = useState(initialData || INITIAL_FORM)

  const isEditing = Boolean(initialData)

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    onSubmit({ ...form, title: form.title.trim(), description: form.description.trim() })
    setForm(INITIAL_FORM)
  }, [form, onSubmit])

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          placeholder="Task title"
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Task description (optional)"
          rows={3}
        />
      </div>

      <div className="form-field">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          name="priority"
          value={form.priority}
          onChange={handleChange}
        >
          {PRIORITY_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn submit-btn">
          {isEditing ? 'Save' : 'Add Task'}
        </button>
        <button type="button" className="btn cancel-btn" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}

export default TaskForm
