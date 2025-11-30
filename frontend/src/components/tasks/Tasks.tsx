import TaskCard from '@/components/tasks/TaskCard.tsx'
import TaskEmpty from '@/components/tasks/TaskEmpty.tsx'
import type { Task } from '@/types/task.ts'

type TasksProps = {
  filter: string
  taskBuffer?: Task[]
  fetchTask: () => void
}

const Tasks = ({ filter, taskBuffer, fetchTask }: TasksProps) => {
  return (
    <>
      {(!taskBuffer || taskBuffer.length === 0) && <TaskEmpty filter={filter} />}
      <div className='space-y-3'>
        {taskBuffer &&
          taskBuffer.map((task: any, index: number) => (
            <TaskCard fetchTask={fetchTask} index={index} key={task?._id ?? index} task={task} />
          ))}
      </div>
    </>
  )
}

export default Tasks
