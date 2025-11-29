export interface Task {
  _id: string
  title: string
  status: 'active' | 'completed'
  createdAt: string
  completedAt?: string | null
  userId: string
}

// Dùng Partial để cho phép gửi lên các trường thiếu (optional)
export interface TaskPayload extends Partial<Omit<Task, '_id' | 'createdAt'>> {}

export interface TaskResponse {
  tasks: Task[]
  activeTask: number
  completedTask: number
}
