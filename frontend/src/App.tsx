import { Toaster } from 'sonner'
import { BrowserRouter, Routes, Route } from 'react-router'
import NotFound from '@/pages/NotFound.tsx'
import SignInPage from '@/pages/SignInPage.tsx'
import HomePage from '@/pages/HomePage.tsx'

function App() {
  return (
    <>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route path='/signin' element={<SignInPage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='*' element={<NotFound />} />

          {/* private routes */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
