import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import AddTask from '@/components/AddTask'
import Footer from '@/components/Footer'
import DatetimeFilter from '@/components/DatetimeFilter'
import Paging from '@/components/Paging'
import StatisticFilter from '@/components/StatisticAndFilter'
import Tasks from '@/components/Tasks'
import { toast } from 'sonner'
import api from '@/lib/axios'
import { PAGE_SIZE } from '@/lib/const'
import ConfirmPopup from '@/components/ConfirmPopup'

const HomePage = () => {
  const [filter, setFilter] = useState('all')
  const [taskBuffer, setTaskBuffer] = useState([])
  const [activeTask, setActiveTask] = useState(0)
  const [completedTask, setCompletedTask] = useState(0)
  const [dateQuery, setDateQuery] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get(dateQuery === 'all' ? '/tasks' : `/tasks?filter=${dateQuery}`)
        console.log(res.data)
        setTaskBuffer(res.data.tasks)
        setActiveTask(res.data.activeTask)
        setCompletedTask(res.data.completedTask)
      } catch (err) {
        console.error('Error when fetching tasks: ', err)
        toast.error('Error when fetching tasks')
      }
    }
    fetchTasks()
  }, [activeTask, dateQuery, currentPage])

  const filterTasks = taskBuffer.filter((task) => {
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

  const visibleTasks = filterTasks.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const totalPages = Math.ceil(filterTasks.length / PAGE_SIZE)

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

  const handlePageChange = (nextPage) => {
    setCurrentPage(nextPage)
  }

  return (
    <div className='min-h-screen w-full relative'>
      {/* Cotton Candy Sky Gradient - Opposite Direction */}
      <div
        className='absolute inset-0 z-0'
        style={{
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
          <AddTask setActiveTask={setActiveTask} />

          {/* Statistic and filter */}
          <StatisticFilter
            activeTask={activeTask}
            completedTask={completedTask}
            filter={filter}
            setFilter={setFilter}
          />

          {/* List task */}
          <Tasks filter={filter} taskBuffer={visibleTasks} setActiveTask={setActiveTask} />

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

            <DatetimeFilter dateQuery={dateQuery} setDateQuery={() => setDateQuery} />
          </div>
          {/* Footer */}
          <Footer activeTask={activeTask} completedTask={completedTask} />
        </div>
      </div>
    </div>
  )
}

export default HomePage
