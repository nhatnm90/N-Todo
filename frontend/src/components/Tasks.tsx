import TaskCard from '@/components/TaskCard.tsx'
import TaskEmpty from '@/components/TaskEmpty.tsx'

type TasksProps = {
  filter: string
  taskBuffer: any
  setActiveTask: React.Dispatch<React.SetStateAction<number>>
}

const Tasks = ({ filter, taskBuffer, setActiveTask }: TasksProps) => {
  const items = taskBuffer //.filter((x) => filter === FilterType.all || x.status === filter)
  // const items = taskBuffer.filter((x) => filter === FilterType.all || x.status === filter)
  return (
    <>
      {items.length === 0 && <TaskEmpty filter={filter} />}
      <div className='space-y-3'>
        {items &&
          items.map((task: any, index: number) => (
            <TaskCard setActiveTask={setActiveTask} index={index} key={task?._id ?? index} task={task} />
          ))}
      </div>
    </>
  )
}

export default Tasks
