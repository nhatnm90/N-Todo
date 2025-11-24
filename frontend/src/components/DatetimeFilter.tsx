import React from 'react'

import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { DateFilterType } from '@/lib/const'

type DatetimeFilterProps = {
  dateQuery: String
  setDateQuery: (prev: String) => void
}

const DatetimeFilter = ({ dateQuery, setDateQuery }: DatetimeFilterProps) => {
  const [open, setOpen] = React.useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' size='lg' role='combobox' aria-expanded={open} className='w-[200px] justify-between'>
          {dateQuery ? DateFilterType.find((x) => x.value === dateQuery)?.label : DateFilterType[0].label}
          <ChevronsUpDown className='opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandList>
            <CommandGroup>
              {DateFilterType.map((type) => (
                <CommandItem
                  key={type.value}
                  value={type.value}
                  onSelect={(currentValue) => {
                    setOpen(false)
                    setDateQuery(currentValue)
                  }}
                >
                  {type.label}
                  <Check className={cn('ml-auto', dateQuery === type.value ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default DatetimeFilter
