import { create } from 'zustand'
import { toast } from 'sonner'
import { authService } from '@/services/authService.ts'
import type { AuthState } from '@/types/store.ts'

// TẤT CẢ STATE TRONG STORE CHỈ TỒN TẠI TRONG TRÌNH DUYỆT
// NẾU RELOAD SANG PAGE KHÁC THÌ SẼ BỊ ĐÁ VỀ SIGNIN PAGE
export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,
  isLoading: false,
  setAccessToken: (accessToken) => {
    set({ accessToken })
  },
  signUp: async (username, password, email, firstName, lastName) => {
    try {
      set({ isLoading: true })
      await authService.signUp(username, password, email, firstName, lastName)
      toast.success('Sign up successfully')
    } catch (error) {
      console.error('Error when sign up new user: ', error)
      toast.error('Sign up unsuccessfully')
    } finally {
      set({ isLoading: false })
    }
  },
  signIn: async (username, password) => {
    set({ isLoading: true })
    const res = await authService.signIn(username, password)
    if (!res.success || !res.data?.accessToken) {
      toast.error('Sign in unsuccessfully. Please check the credential and try again')
    } else {
      const accessToken = res.data?.accessToken
      accessToken && get().setAccessToken(accessToken)
      await get().fetchMe()
      toast.success('Sign in successfully')
      set({ isLoading: false })
    }
  },
  signOut: async () => {
    const res = await authService.signOut()
    if (res.success) {
      toast.success('Sign out successfully')
      get().clearState()
    }
  },
  clearState() {
    set({ accessToken: null, user: null, isLoading: false })
  },
  fetchMe: async () => {
    set({ isLoading: true })
    const res = await authService.fetchMe()
    if (res.success) {
      set({ user: res.data })
    }
    set({ isLoading: false })
  },
  refresh: async () => {
    set({ isLoading: true })
    const { user, setAccessToken, fetchMe } = get()
    const res = await authService.refresh()
    if (!res.success || !res.data?.accessToken) {
      console.error('Fail to refresh token')
      return
    }
    console.info('SET ACCESS WHEN REFRESH')
    setAccessToken(res.data.accessToken)
    !user && (await fetchMe())

    set({ isLoading: false })
  }
}))
