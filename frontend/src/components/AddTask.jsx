import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { handleKeyPress } from '@/lib/utils'
import axios from 'axios'
import { Plus } from 'lucide-react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

const AddTask = ({ setActiveTask }) => {
  const inputTitleRef = useRef(null)
  const [inputTitle, setInputTitle] = useState('')

  const addTask = async () => {
    try {
      const res = await axios.post('http://localhost:2101/api/tasks', {
        title: inputTitle
      })
      if (res && res.status === 201) {
        toast.success('Task added')
        setActiveTask((prev) => prev + 1)
      }
    } catch (err) {
      console.error('Error when fetching tasks: ', err)
      toast.error('Error when fetching tasks')
    } finally {
      setInputTitle('')
    }
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
          onChange={(e) => setInputTitle(e.target.value)}
          ref={inputTitleRef}
          onKeyPress={(e) => {
            handleKeyPress(e, handleAddTask)
          }}
          type='text'
          placeholder='Somthing that you wanna do?'
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
