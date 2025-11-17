import ConfirmPopup from '@/components/ConfirmPopup'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import api from '@/lib/axios'
import { cn, handleKeyPress } from '@/lib/utils'
import { Calendar, CheckCircle2, Circle, SquarePen, Trash2 } from 'lucide-react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

const TaskCard = ({ index, task, setActiveTask }) => {
  const inputTaskRef = useRef(null)
  const [inputTitle, setInputTitle] = useState(task.title)
  const [isEditing, setIsEditing] = useState(false)
  // const [isOpenAlert, setIsOpenAlert] = useState(false)

  const updateTask = async (isCompleted = null) => {
    try {
      const payload =
        isCompleted === null || isCompleted === undefined
          ? { title: inputTitle }
          : { status: isCompleted ? 'completed' : 'active', completedAt: isCompleted ? new Date().toISOString() : null }
      const res = await api.put(`/tasks/${task._id}`, payload)
      if (res && res.status === 201) {
        setIsEditing(false)
        toast.success('This task was updated successfully')
        setActiveTask()
      }
    } catch (error) {
      console.error('Error when updating task: ', error)
      toast.error('System error')
    }
  }

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`)
      toast.success('Task deleted')
      setActiveTask()
    } catch (error) {
      console.error('Error when deleting task: ', error)
      toast.error('System error')
    }
  }

  // const handleKeyPress = (e) => {
  //   if (e.key === 'Enter') {
  //     updateTask()
  //   }
  // }
  return (
    <Card
      className={cn(
        'p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group',
        task.status === 'complete' && 'opacity-75'
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* flex:  sắp xếp phần tử con theo chiều ngang
      items-center: hiển thị theo chiều dọc và khoản cách mỗi phần tử là gap-4 */}
      <div className='flex items-center gap-4'>
        {/* Nút tròn
        flex=shrink-0: chắc chắn là button không bị co lại trên màn hình nhỏ*/}
        <Button
          onClick={() => updateTask(task.status !== 'completed')}
          variant='ghost'
          size='icon'
          className={cn(
            'flex-shrink-0 size-8 rounded-full transition-all duration-200',
            task.status === 'completed'
              ? 'text-success hover:text-success/80'
              : 'text-muted-foreground hover:text-primary'
          )}
        >
          {task.status === 'completed' ? <CheckCircle2 size='5' /> : <Circle size='5' />}
        </Button>
        {/* hiển thị và chỉnh sửa */}
        <div className='flex-1 min-w-0'>
          {isEditing ? (
            <Input
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
              placeholder='Wanna update something?'
              className='flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/50'
              type='text'
              ref={inputTaskRef}
              onBlur={() => {
                setInputTitle(task.title)
                setIsEditing(false)
              }}
              onKeyPress={(e) => handleKeyPress(e, updateTask)}
            />
          ) : (
            <p
              className={cn(
                'text-base transition-all duration-200',
                task.status === 'completed' ? 'line-through text-muted-foreground' : 'text-foreground'
              )}
            >
              {task.title}
            </p>
          )}
          {/* ngày tạo và ngày hoàn tất */}
          <div className='flex items-center gap-2 mt-1'>
            <Calendar className='size-3 text-muted-foreground' />
            <span className='text-xs text-muted-foreground'>{new Date(task.createdAt).toLocaleString()}</span>
            {task.completedAt && (
              <>
                <span className='text-xs text-muted-foreground'> - </span>{' '}
                <Calendar className='size-3 text-muted-foreground' />
                <span className='text-xs text-muted-foreground'>{new Date(task.completedAt).toLocaleString()}</span>
              </>
            )}
          </div>
        </div>
        {/* Nút edit và delete */}
        <div className='hidden gap-2 group-hover:inline-flex animate-slide-up'>
          <Button
            onClick={() => setIsEditing(true)}
            variant='ghost'
            size='icon'
            className={cn(
              'flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info',
              isEditing ? 'text-info' : ''
            )}
            disabled={task.status === 'completed'}
          >
            <SquarePen className='size-4' />
          </Button>
          <ConfirmPopup
            title='Are you absolutely sure?'
            message='This action cannot be undone. This will permanently delete your task and remove your data from our servers.'
            handleConfirm={() => deleteTask(task._id)}
            confirmText='OK'
          >
            <Button
              variant='ghost'
              size='icon'
              className='flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive'
              // onClick={() => deleteTask(task._id)}
            >
              <Trash2 className='size-4' />
            </Button>
          </ConfirmPopup>
        </div>
      </div>
    </Card>
  )
}

export default TaskCard
