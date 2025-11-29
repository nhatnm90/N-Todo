import { useAuthStore } from '@/stores/useAuthStore.ts'
import React, { use, useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router'

// const ProtectedRoute = () => {
//   const { accessToken, refresh } = useAuthStore()
//   const [isStarting, setIsStarting] = useState(true)

//   const init = async () => {
//     if (!accessToken) {
//       console.log('Chuẩn bị lấy accessToken mới')
//       await refresh()
//       console.log('Đã lấy accessToken mới')
//     }
//   }

//   useEffect(() => {
//     init()
//     setIsStarting(false)
//   }, [accessToken])

//   if (isStarting) {
//     return <div>Đợi xíu</div>
//   }

//   console.log(`Protected Route: ${accessToken}`)
//   if (!accessToken) {
//     return <Navigate to='/signin' replace />
//   }
//   return <Outlet></Outlet>
// }

const ProtectedRoute = () => {
  const { isLoading, accessToken, user, refresh, fetchMe } = useAuthStore()
  const [isStarting, setIsStarting] = useState(true)

  const init = async () => {
    if (!accessToken) {
      console.log('Chuẩn bị lấy accessToken mới')
      await refresh()
      console.log('Đã lấy accessToken mới')
    }

    if (accessToken && !user) {
      await fetchMe()
    }
  }

  useEffect(() => {
    init()
    setIsStarting(false)
  }, [accessToken])

  if (isStarting || isLoading) {
    return <div>Đợi xíu</div>
  }

  console.log(`Protected Route: ${accessToken}`)
  if (!accessToken) {
    return <Navigate to='/signin' replace />
  }
  return <Outlet></Outlet>
}

export default ProtectedRoute
