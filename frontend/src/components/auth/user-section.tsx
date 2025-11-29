import React from 'react'
import { LogOut, OutdentIcon, Plus } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from '@/components/ui/item.tsx'
import { useAuthStore } from '@/stores/useAuthStore.ts'
import { useNavigate } from 'react-router'

const UserSection = () => {
  const { user } = useAuthStore.getState()

  const { signOut } = useAuthStore()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/signin')
    } catch (error) {
      console.error('Error when signout: ', error)
    }
  }
  const secureUrl = user?.avatarUrl?.replace('http://', 'https://') || 'https://github.com/evilrabbit.png'
  return (
    <div className='flex justify-end'>
      <Item variant='outline'>
        <ItemMedia>
          <Avatar className='size-8'>
            <AvatarImage src={secureUrl} />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent className='hidden md:block'>
          <ItemTitle>{`${user?.username}`}</ItemTitle>
        </ItemContent>
        <ItemActions>
          <Button onClick={handleSignOut} size='icon-sm' variant='outline' className='rounded-full' aria-label='Invite'>
            <LogOut />
          </Button>
        </ItemActions>
      </Item>
    </div>
  )
}

export default UserSection
