import { Card } from '@/components/ui/card.tsx'
import { FilterType } from '@/lib/const.ts'
import { Circle } from 'lucide-react'

type TaskEmptyProps = {
  filter: string
}

const TaskEmpty = ({ filter }: TaskEmptyProps) => {
  return (
    <Card className='p-8 text-center border-0 bg-gradient-card shadow-custom-md'>
      <div className='space-y-3'>
        <Circle className='size-12 mx-auto text-muted-foreground' />
        <div>
          <h3 className='font-medium text-foreground'>
            {filter === FilterType.all
              ? 'Nothing do to. Create new task?'
              : filter === FilterType.active
              ? 'Great! Maybe you completed all tasks'
              : 'You should complete one'}
          </h3>
          <p className='text-sm text-muted-foreground'>Nothing to show</p>
        </div>
      </div>
    </Card>
  )
}

export default TaskEmpty
