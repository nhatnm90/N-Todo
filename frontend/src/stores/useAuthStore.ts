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
    try {
      set({ isLoading: true })
      const { accessToken } = await authService.signIn(username, password)
      get().setAccessToken(accessToken)

      await get().fetchMe()
      toast.success('Sign in successfully')
    } catch (error) {
      console.error('Error when sign in: ', error)
      toast.error('Sign in unsuccessfully. Please check the credential and try again')
    } finally {
      set({ isLoading: false })
    }
  },
  signOut: async () => {
    try {
      await authService.signOut()
      toast.success('Sign out successfully')
    } catch (error) {
      console.error('Error when sign out: ', error)
      toast.error('Sign out unsuccessfully. Please try again')
    } finally {
      get().clearState()
    }
  },
  clearState() {
    set({ accessToken: null, user: null, isLoading: false })
  },
  fetchMe: async () => {
    try {
      set({ isLoading: true })
      const user = await authService.fetchMe()
      set({ user })
    } catch (error) {
      console.error('Error when fetch user: ', error)
    } finally {
      set({ isLoading: false })
    }
  },
  refresh: async () => {
    try {
      set({ isLoading: true })
      const accessToken = await authService.refresh()
      get().setAccessToken(accessToken)
    } catch (error) {
      console.error('Error when refresh token')
    } finally {
      set({ isLoading: false })
    }
  }
}))
