import React from 'react'
import { Badge } from '@/components/ui/badge'
import { FilterType } from '@/lib/const'
import { Button } from '@/components/ui/button'
import { Filter } from 'lucide-react'

const StatisticFilter = ({ completedTask = 0, activeTask = 0, filter, setFilter }) => {
  return (
    <div className='flex flex-col item-start justify-between gap-4 sm:flex-row sm:items-center'>
      {/* Statistic */}
      <div className='flex gap-3'>
        <Badge variant='secondary' className='bg-white/50 text-accent-foreground border-info/20'>
          {activeTask} {FilterType.active}
        </Badge>
        <Badge variant='secondary' className='bg-white/50 text-success border-success/20'>
          {completedTask} {FilterType.completed}
        </Badge>
      </div>
      {/* Filter */}
      <div className='flex flex-col gap-2 sm:flex-row'>
        {Object.keys(FilterType).map((type) => (
          <Button
            onClick={() => {
              console.log(type)
              setFilter(type)
            }}
            type='button'
            key={type}
            variant={filter === type ? 'gradient' : 'ghost'}
            size='sm'
            className='capitalize'
          >
            <Filter className='size-4' />
            {FilterType[type]}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default StatisticFilter
