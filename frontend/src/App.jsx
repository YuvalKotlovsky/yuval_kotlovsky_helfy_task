import { useState, useCallback, useMemo, useEffect } from 'react'
import { getTasks, createTask, toggleTask, updateTask, deleteTask } from './services'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import TaskFilter from './components/TaskFilter'

function App() {
  const [tasks, setTasks] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [currentEditedTask, setCurrentEditedTask] = useState(null)
  const [filter, setFilter] = useState('all')


  const handleToggle = useCallback(async (id) => {
    try {
      const updatedTask = await toggleTask(id)
      setTasks(prev => prev.map(t => t.id === id ? updatedTask : t))
    } catch (err) {
      console.error(err)
    }
  }, [])
  const handleDelete = useCallback(async (id) => {
    try {
      await deleteTask(id)
      setTasks(prev => prev.filter(t => t.id !== id))
    } catch (err) {
      console.error(err)
    }
  }, [])

  const handleEdit = useCallback((task) => {
    setCurrentEditedTask(task)
    setShowForm(true)
  }, [])

  const openForm = useCallback(() => {
    setCurrentEditedTask(null)
    setShowForm(true)
  }, [])
  const closeForm = useCallback(() => {
    setCurrentEditedTask(null)
    setShowForm(false)
  }, [])

  const handleSubmitForm = useCallback(async (formData) => {
    try {
      if (currentEditedTask) {
        const updated = await updateTask(currentEditedTask.id, formData)
        setTasks(prev => prev.map(t => t.id === currentEditedTask.id ? updated : t))
      } else {
        const newTask = await createTask(formData)
        setTasks(prev => [...prev, newTask])
      }
    } catch (err) {
      console.error(err)
    }
    setCurrentEditedTask(null)
    setShowForm(false)
  }, [currentEditedTask])

  const filteredTasks = useMemo(() => {
    if (filter === 'completed') return tasks.filter(t => t.completed)
    if (filter === 'pending') return tasks.filter(t => !t.completed)
    return tasks
  }, [filter, tasks])

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks()
        setTasks(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchTasks()
  }, [])

  return (
    <div style={{ padding: '32px' }}>
      {!showForm && (
        <button
          className="btn add-task-btn"
          onClick={openForm}
          style={{ display: 'block', margin: '0 auto 16px' }}
        >
          + Add Task
        </button>
      )}

      <TaskFilter activeFilter={filter} onFilterChange={setFilter} />

      <TaskList
        key={filter}
        tasks={filteredTasks}
        onToggle={handleToggle}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showForm && (
        <TaskForm
          onSubmit={handleSubmitForm}
          onCancel={closeForm}
          initialData={currentEditedTask ? { title: currentEditedTask.title, description: currentEditedTask.description, priority: currentEditedTask.priority } : null}
        />
      )}
    </div>
  )
}

export default App
