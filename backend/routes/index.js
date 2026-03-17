const { Router } = require('express');
const router = Router();

let tasks = [];
let lastId = 0;

router.get('/', (req, res) => {
  res.json(tasks);
});

router.post('/', (req, res) => {
  const { title, description = '', priority } = req.body;

  if (!title || !priority) {
    return res.status(400).json({ error: 'Title and priority are required' });
  }

  if (!['low', 'medium', 'high'].includes(priority)) {
    return res.status(400).json({ error: 'Priority must be low, medium, or high' });
  }

  const task = {
    id: lastId++,
    title,
    description,
    completed: false,
    createdAt: new Date(),
    priority,
  };

  tasks.push(task);
  res.status(201).json(task);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const task = tasks.find(t => t.id === parseInt(id));
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const allowedFields = ['title', 'description', 'priority'];
  const updates = Object.fromEntries(
    Object.entries(req.body).filter(([key]) => allowedFields.includes(key))
  );

  if (updates.priority && !['low', 'medium', 'high'].includes(updates.priority)) {
    return res.status(400).json({ error: 'Priority must be low, medium, or high' });
  }

  Object.assign(task, updates);
  res.json(task);
});

router.patch('/:id/toggle', (req, res) => {
    const { id } = req.params;
    const task = tasks.find(t => t.id === parseInt(id)); 
    if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  task.completed = !task.completed;
  res.json(task);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(t => t.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(index, 1);
  res.status(204).send();
});


module.exports = router;
