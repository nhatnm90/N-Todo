import { Button } from '@/components/ui/button.tsx'
import { Card } from '@/components/ui/card.tsx'
import { Input } from '@/components/ui/input.tsx'
import api from '@/lib/axios.ts'
import { handleKeyPress } from '@/lib/utils.ts'
import { Plus } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { toast } from 'sonner'
import { taskService } from '@/services/taskService.ts'
import { useAuthStore } from '@/stores/useAuthStore.ts'
import type { TaskPayload } from '@/types/task.ts'

interface AddTaskProps {
  fetchTask: () => void
}

const AddTask = ({ fetchTask }: AddTaskProps) => {
  const { user } = useAuthStore.getState()
  const inputTitleRef = useRef<HTMLInputElement>(null)
  const [inputTitle, setInputTitle] = useState('')

  const addTask = async () => {
    if (!user) return
    const taskPayload: TaskPayload = { title: inputTitle, userId: user._id }
    const res = await taskService.addTask(taskPayload)
    if (!res.success) {
      toast.error('Add task error. Please contact admin')
    } else {
      toast.success('Task added')
      fetchTask()
    }
    setInputTitle('')
  }

  const handleAddTask = () => {
    if (inputTitle && inputTitle.length > 0) {
      addTask()
    } else {
      toast.warning('You should input task detail')
      if (inputTitleRef.current) {
        inputTitleRef.current.focus()
      }
    }
  }

  return (
    <Card className='p-6 border-0 bg-gradient-card shadow-custom-lg'>
      {/* flex flex-col: canh đều theo cột
    sm:flex-row: nếu màn hình nhỏ thì chuyển thành dòng */}
      <div className='flex flex-col gap-3 sm:flex-row'>
        <Input
          value={inputTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputTitle(e.target.value)}
          ref={inputTitleRef}
          onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
            handleKeyPress(e, handleAddTask)
          }}
          type='text'
          placeholder='Something that you wanna do?'
          className='h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 forcus:ring-primary/20'
        />
        <Button variant='gradient' size='xl' className='px-6' onClick={handleAddTask}>
          <Plus size='5'></Plus> Add
        </Button>
      </div>
    </Card>
  )
}

export default AddTask
