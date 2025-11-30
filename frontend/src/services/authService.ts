import api from '@/lib/axios.ts'
import { handleApi } from '@/lib/handleApi.ts'
import type { SignInResponse } from '@/types/auth.ts'
import type { User } from '@/types/user.ts'

const signUp = (username: string, password: string, email: string, firstName: string, lastName: string) =>
  handleApi<SignInResponse>(async () => {
    const res = await api.post(
      '/auth/signup',
      { username, password, email, firstName, lastName },
      { withCredentials: true }
    )
    return res.data
  })

const signIn = (username: string, password: string) =>
  handleApi<SignInResponse>(async () => {
    const res = await api.post('/auth/signin', { username, password }, { withCredentials: true })
    return res.data
  })

const signOut = () =>
  handleApi<SignInResponse>(async () => {
    const res = await api.post('/auth/signout', null, { withCredentials: true })
    return res.data
  })

const fetchMe = () =>
  handleApi<User>(async () => {
    const res = await api.get('/user/me', { withCredentials: true })
    return res?.data.user
  })

const refresh = () =>
  handleApi<SignInResponse>(async () => {
    const res = await api.post('/auth/refreshtoken', { withCredentials: true })
    return res?.data as unknown as SignInResponse
  })

export const authService = { signUp, signIn, signOut, fetchMe, refresh }
