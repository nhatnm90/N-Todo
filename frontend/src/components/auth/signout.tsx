import { Button } from '@/components/ui/button.tsx'
import api from '@/lib/axios.ts'
import { useAuthStore } from '@/stores/useAuthStore.ts'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'

const SignOut = () => {
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

  const handleTest = async () => {
    try {
      const res = await api.get('/user/test', { withCredentials: true })
      if (res.status === 204) {
        toast.success('OK')
      }
    } catch (error) {
      toast.error('Fail')
    }
  }

  return (
    <>
      <Button variant='gradientSecondary' onClick={handleSignOut}>
        Sign out
      </Button>
      <Link to='/ntodo'>N Todo</Link>
      <Button onClick={handleTest}>Test</Button>
    </>
  )
}

export default SignOut
