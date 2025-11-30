import api from '@/lib/axios.ts'
import { handleApi } from '@/lib/handleApi.ts'
import type { TaskPayload } from '@/types/task.ts'
import type { TaskResponse } from '@/types/task.ts'

const getTasks = (dateQuery: string, userId: string) =>
  handleApi<TaskResponse>(async () => {
    const genDateQuery = dateQuery === 'all' ? '' : `?filter=${dateQuery}`
    const res = await api.get(`/tasks/${userId}${genDateQuery}`)
    return res.data as TaskResponse
  })

const addTask = async (task: TaskPayload) => {
  const res = await api.post('/tasks', task)
  return res
}

const updateTask = async (taskId: string, payload: any) => {
  const res = await api.put(`/tasks/${taskId}`, payload)
  return res
}

const deleteTask = async (taskId: string) => {
  const res = await api.delete(`/tasks/${taskId}`)
  return res
}

export const taskService = { getTasks, addTask, updateTask, deleteTask }
