import Task from '../models/Tasks.js'
import mongoose from 'mongoose'

const getAllTasks = async (req, res) => {
  try {
    const { filter = 'all' } = req.query
    const now = new Date()
    let startDate

    switch (filter) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        break
      case 'week':
        const mondayDate = now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0)
        startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate)
        break
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1)
        break
      case 'all':
      default:
    }

    const userId = new mongoose.Types.ObjectId(req.params.userId)
    const query = startDate ? { userId, createdAt: { $gte: startDate } } : { userId }

    const result = await Task.aggregate([
      {
        $match: query
      },
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          activeTask: [{ $match: { status: 'active' } }, { $count: 'count' }],
          completedTask: [{ $match: { status: 'completed' } }, { $count: 'count' }]
        }
      }
    ])

    const tasks = result[0].tasks
    const activeTask = result[0].activeTask[0]?.count || 0
    const completedTask = result[0].completedTask[0]?.count || 0

    //const activeTask = await Task.countDocuments({status: "active"})
    res.status(200).json({ tasks, activeTask, completedTask })
  } catch (error) {
    console.error('Error when getting all tasks', error)
    res.status(500).json({ message: 'System error' })
  }
}

const createTask = async (req, res) => {
  try {
    const payload = req.body
    const task = new Task({ ...payload })
    const newTask = await task.save()
    res.status(201).json(newTask)
  } catch (error) {
    console.error('Error when creating new task', error)
    res.status(500).json({ message: 'System error' })
  }
}

const updateTask = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        status,
        completedAt
      },
      { new: true }
    )

    if (!updatedTask) {
      res.status(404).json({ message: `The taskId ${req.params.id} is not existed` })
    }

    res.status(201).json(updatedTask)
  } catch (error) {
    console.error('Error when updating the task', error)
    res.status(500).json({ message: 'System error' })
  }
}

const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id)
    if (!deletedTask) {
      res.status(404).json({ message: `The taskId ${req.params.id} is not existed` })
    }
    res.status(200).json({ message: 'Task deleted' })
  } catch (error) {
    console.error('Error when deleting the task', error)
    res.status(500).json({ message: 'System error' })
  }
}

export { getAllTasks, createTask, updateTask, deleteTask }
