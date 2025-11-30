import { Skeleton } from '@/components/ui/skeleton.tsx'
import { useAuthStore } from '@/stores/useAuthStore.ts'
import React, { use, useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router'

const ProtectedRoute = () => {
  const { accessToken, refresh, isLoading, fetchMe, user } = useAuthStore()
  const [isStarting, setIsStarting] = useState(true)

  const init = async () => {
    if (!accessToken) {
      // console.log('Chuẩn bị lấy accessToken mới')
      await refresh()
      // console.log('Đã lấy accessToken mới')
    }

    if (accessToken && !user) {
      await fetchMe()
    }
  }

  useEffect(() => {
    init()
    setIsStarting(false)
  }, [])

  if (isStarting || useAuthStore.getState().isLoading) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen text-center bg-slate-50'>
        <div className='flex h-full flex-col justify-center items-center space-y-5'>
          <Skeleton className='bg-violet-400 h-[50px] w-[250px] rounded-xl' />
          <div className='space-y-2'>
            <Skeleton className='bg-violet-400 h-4 w-[250px]' />
            <Skeleton className='bg-violet-300 h-4 w-[250px]' />
            <Skeleton className='bg-violet-200 h-4 w-[200px]' />
          </div>
        </div>
      </div>
    )
  }

  console.log(`Protected Route: ${accessToken}`)
  if (!accessToken) {
    return <Navigate to='/signin' replace />
  }
  return <Outlet></Outlet>
}

export default ProtectedRoute
