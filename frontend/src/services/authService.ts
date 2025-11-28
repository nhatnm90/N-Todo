import api from '@/lib/axios.ts'

const signUp = async (username: string, password: string, email: string, firstName: string, lastName: string) => {
  try {
    const res = await api.post(
      '/auth/signup',
      { username, password, email, firstName, lastName },
      { withCredentials: true }
    )
    return res.data
  } catch (error) {
    console.error(error)
  }
}

const signIn = async (username: string, password: string) => {
  try {
    const res = await api.post('/auth/signin', { username, password }, { withCredentials: true })
    if (res.status === 200) {
      return res.data
    } else {
      console.error('Error when return data: ', res.data)
    }
  } catch (error) {
    console.error(error)
  }
}

const signOut = async () => {
  try {
    await api.post('/auth/signout', null, { withCredentials: true })
  } catch (error) {
    console.error('Error when signout')
  }
}

const fetchMe = async () => {
  try {
    const res = await api.get('/user/me', { withCredentials: true })
    return res?.data?.user
  } catch (error) {
    console.error('Error when get user: ', error)
  }
}

const refresh = async () => {
  try {
    const res = await api.post('/auth/refreshtoken', { withCredentials: true })
    return res.data?.accessToken
  } catch (error) {
    console.error('Error when generate new token')
  }
}

export const authService = { signUp, signIn, signOut, fetchMe, refresh }
