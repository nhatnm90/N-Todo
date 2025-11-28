import TaskCard from '@/components/tasks/TaskCard.tsx'
import TaskEmpty from '@/components/tasks/TaskEmpty.tsx'

type TasksProps = {
  filter: string
  taskBuffer: any
  fetchTask: () => void
}

const Tasks = ({ filter, taskBuffer, fetchTask }: TasksProps) => {
  const items = taskBuffer //.filter((x) => filter === FilterType.all || x.status === filter)
  // const items = taskBuffer.filter((x) => filter === FilterType.all || x.status === filter)
  return (
    <>
      {items.length === 0 && <TaskEmpty filter={filter} />}
      <div className='space-y-3'>
        {items &&
          items.map((task: any, index: number) => (
            <TaskCard fetchTask={fetchTask} index={index} key={task?._id ?? index} task={task} />
          ))}
      </div>
    </>
  )
}

export default Tasks
