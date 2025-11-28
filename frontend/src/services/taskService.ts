import api from '@/lib/axios.ts'

const getTasks = async (dateQuery: string) => {
  try {
    const res = await api.get(dateQuery === 'all' ? '/tasks' : `/tasks?filter=${dateQuery}`)
    return res.data
  } catch (error) {
    throw error
  }
}

const addTask = async (title: string) => {
  try {
    const res = await api.post('/tasks', {
      title
    })
    return res
  } catch (err) {
    console.error('Error when adding new task: ', err)
  }
}

const updateTask = async (taskId: string, payload: any) => {
  try {
    const res = await api.put(`/tasks/${taskId}`, payload)
    return res
  } catch (error) {
    console.error('Error when updating task: ', error)
  }
}

const deleteTask = async (taskId: number) => {
  try {
    const res = await api.delete(`/tasks/${taskId}`)
    return res
  } catch (error) {
    console.error('Error when deleting task: ', error)
  }
}

export const taskService = { getTasks, addTask, updateTask, deleteTask }
