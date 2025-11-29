import TaskCard from '@/components/tasks/TaskCard.tsx'
import TaskEmpty from '@/components/tasks/TaskEmpty.tsx'

type TasksProps = {
  filter: string
  taskBuffer: any
  fetchTask: () => void
}

const Tasks = ({ filter, taskBuffer, fetchTask }: TasksProps) => {
  return (
    <>
      {!taskBuffer && <TaskEmpty filter={filter} />}
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
