import TaskCard from '@/components/TaskCard'
import TaskEmpty from '@/components/TaskEmpty'

type TasksProps = {
  filter: string
  taskBuffer: any
  setActiveTask: () => void
}

const Tasks = ({ filter, taskBuffer, setActiveTask }) => {
  const items = taskBuffer //.filter((x) => filter === FilterType.all || x.status === filter)
  // const items = taskBuffer.filter((x) => filter === FilterType.all || x.status === filter)
  return (
    <>
      {items.length === 0 && <TaskEmpty filter={filter} />}
      <div className='space-y-3'>
        {items &&
          items.map((task, index) => (
            <TaskCard setActiveTask={setActiveTask} index={index} key={task._id ?? index} task={task} />
          ))}
      </div>
    </>
  )
}

export default Tasks
