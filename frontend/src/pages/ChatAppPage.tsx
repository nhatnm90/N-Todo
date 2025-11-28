import SignOut from '@/components/auth/signout.tsx'
import { useAuthStore } from '@/stores/useAuthStore.ts'

const ChatAppPage = () => {
  // Watching all changes of the store
  //const { user } = useAuthStore()

  // Watching the USER change ONLY
  const user = useAuthStore((x) => x.user)
  return (
    <div>
      <SignOut />
      <p>{user?.username}</p>
    </div>
  )
}

export default ChatAppPage
