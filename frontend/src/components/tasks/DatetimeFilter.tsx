import React from 'react'

import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils.ts'
import { Button } from '@/components/ui/button.tsx'
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command.tsx'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx'
import { DateFilterType } from '@/lib/const.ts'

type DatetimeFilterProps = {
  dateQuery: String
  setDateQuery: React.Dispatch<React.SetStateAction<string>>
}

const DatetimeFilter = ({ dateQuery, setDateQuery }: DatetimeFilterProps) => {
  const [open, setOpen] = React.useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' size='lg' role='combobox' aria-expanded={open} className='w-[200px] justify-between'>
          {dateQuery ? DateFilterType.find((x) => x.value === dateQuery)?.label : DateFilterType[0]?.label}
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
                  onSelect={(currentValue: string) => {
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
