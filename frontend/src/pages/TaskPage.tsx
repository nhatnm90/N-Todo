import { use, useEffect, useState } from 'react'
import Header from '@/components/tasks/Header.tsx'
import AddTask from '@/components/tasks/AddTask.tsx'
import Footer from '@/components/tasks/Footer.tsx'
import DatetimeFilter from '@/components/tasks/DatetimeFilter.tsx'
import Paging from '@/components/tasks/Paging.tsx'
import StatisticFilter from '@/components/tasks/StatisticAndFilter.tsx'
import Tasks from '@/components/tasks/Tasks.tsx'
import { toast } from 'sonner'
import { PAGE_SIZE } from '@/lib/const.ts'
import { taskService } from '@/services/taskService.ts'
import SignOut from '@/components/auth/signout.tsx'
import { useAuthStore } from '@/stores/useAuthStore.ts'
import UserSection from '@/components/auth/user-section.tsx'

const TaskPage = () => {
  const { user } = useAuthStore.getState()
  const [filter, setFilter] = useState('all')
  const [taskBuffer, setTaskBuffer] = useState([])
  const [activeTask, setActiveTask] = useState(0)
  const [completedTask, setCompletedTask] = useState(0)
  const [dateQuery, setDateQuery] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const fetchTasks = async () => {
    try {
      if (!user) return
      const res = await taskService.getTasks(dateQuery, user._id)
      setTaskBuffer(res.tasks)
      setActiveTask(res.activeTask)
      setCompletedTask(res.completedTask)
    } catch (err) {
      console.error('Error when fetching tasks: ', err)
      toast.error('Error when fetching tasks')
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [activeTask, dateQuery, currentPage])

  const filterTasks =
    taskBuffer.length > 0 &&
    taskBuffer.filter((task: any) => {
      switch (filter) {
        case 'completed':
          return task.status === 'completed'
        case 'active':
          return task.status === 'active'
        case 'all':
        default:
          return true
      }
    })

  const visibleTasks =
    filterTasks && filter.length > 0 && filterTasks.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const totalPages = filterTasks && filter.length > 0 ? Math.ceil(filterTasks.length / PAGE_SIZE) : 0

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    handlePageChange(1)
  }, [filter, dateQuery])

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const handlePageChange = (nextPage: number) => {
    setCurrentPage(nextPage)
  }

  return (
    <div className='min-h-screen w-full relative'>
      {/* Cotton Candy Sky Gradient - Opposite Direction */}
      <div
        className='absolute inset-0 z-0'
        style={{
          // backgroundImage: `radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #10b981 100%)`
          // backgroundSize: '100% 100%'
          background: `linear-gradient(225deg, #FFB3D9 0%, #FFD1DC 20%, #FFF0F5 40%, #E6F3FF 60%, #D1E7FF 80%, #C7E9F1 100%)`
        }}
      />
      {/* Your Content/Components */}
      {/* mx-auto: margin trái phải auto để canh giữa màn hình */}
      <div className='container pt-8 mx-auto relative z-10'>
        <div className='w-full max-w-2xl p-6 mx-auto space-y-6'>
          {/* Header */}
          <Header />

          {/* Add new task */}
          <AddTask fetchTask={fetchTasks} />

          {/* Statistic and filter */}
          <StatisticFilter
            activeTask={activeTask}
            completedTask={completedTask}
            filter={filter}
            setFilter={setFilter}
          />

          {/* List task */}
          <Tasks filter={filter} taskBuffer={visibleTasks} fetchTask={fetchTasks} />

          {/* Paging + Datetime filter
            justify-between: canh giữa và dàn đều 2 bên
            sm:flex-row: màn hình nhỏ xếp theo hàng dọc
            */}
          <div className='flex flex-col items-center justify-between gap-6 sm:flex-row'>
            <Paging
              currentPage={currentPage}
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage}
              handlePageChange={handlePageChange}
              totalPages={totalPages}
            />

            <DatetimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
          </div>
          {/* Footer */}
          <Footer activeTask={activeTask} completedTask={completedTask} />
        </div>
      </div>
    </div>
  )
}

export default TaskPage
