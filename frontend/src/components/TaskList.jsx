import React, { useState, useRef, useCallback } from 'react'
import TaskItem from './TaskItem'
import '../styles/TaskList.css'

const TaskList = ({ tasks, onEdit, onToggle, onDelete }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const trackRef = useRef(null)

  const totalTasks = tasks.length

  const displayIndex = totalTasks > 0
    ? Math.max(0, Math.min(currentIndex, totalTasks - 1))
    : 0

  const extendedTasks = totalTasks > 0
    ? [tasks[totalTasks - 1], ...tasks, tasks[0]]
    : []

  const goTo = useCallback((index) => {
    if (isTransitioning || totalTasks === 0) return
    setIsTransitioning(true)
    setCurrentIndex(index)
  }, [isTransitioning, totalTasks])

  const next = useCallback(() => goTo(displayIndex + 1), [displayIndex, goTo])
  const prev = useCallback(() => goTo(displayIndex - 1), [displayIndex, goTo])

  const snapTo = useCallback((index) => {
    const track = trackRef.current
    track.style.transition = 'none'
    setCurrentIndex(index)
    setTimeout(() => {
      if (trackRef.current) {
        trackRef.current.style.transition = ''
      }
      setIsTransitioning(false)
    }, 50)
  }, [])

  const handleTransitionEnd = useCallback((e) => {
    if (e.target !== trackRef.current) return
    if (currentIndex >= totalTasks) {
      snapTo(0)
    } else if (currentIndex < 0) {
      snapTo(totalTasks - 1)
    } else {
      setIsTransitioning(false)
    }
  }, [currentIndex, totalTasks, snapTo])

  if (totalTasks === 0) {
    return <div className="carousel-empty">No tasks to display</div>
  }

  const offset = (currentIndex + 1) * -100

  return (
    <div className="carousel">
      <button className="carousel-btn carousel-btn-prev" onClick={prev}>{'<'}</button>
      <div className="carousel-viewport">
        <div
          ref={trackRef}
          className="carousel-track"
          style={{ transform: `translateX(${offset}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedTasks.map((task, i) => (
            <div className="carousel-slide" key={`${task.id}-${i}`}>
              <TaskItem task={task} onEdit={onEdit} onToggle={onToggle} onDelete={onDelete} />
            </div>
          ))}
        </div>
      </div>

      <button className="carousel-btn carousel-btn-next" onClick={next}>{'>'}</button>
    </div>
  )
}

export default TaskList
