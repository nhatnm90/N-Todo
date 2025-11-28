import { Toaster } from 'sonner'
import { BrowserRouter, Routes, Route } from 'react-router'
import NotFound from '@/pages/NotFound.tsx'
import SignInPage from '@/pages/SignInPage.tsx'
import TaskPage from '@/pages/TaskPage.tsx'
import SignUpPage from '@/pages/SignUpPage.tsx'
import ChatAppPage from '@/pages/ChatAppPage.tsx'
import ProtectedRoute from '@/components/protectedRoute.tsx'

function App() {
  return (
    <>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/signin' element={<SignInPage />} />

          {/* protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<ChatAppPage />} />
            <Route path='/ntodo' element={<TaskPage />} />
          </Route>
          <Route path='*' element={<NotFound />} />

          {/* private routes */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
