import api from '@/lib/axios.ts'
import { useAuthStore } from '@/stores/useAuthStore.ts'
import type { TokenResponse } from '@react-oauth/google'
import axios from 'axios'
import { toast } from 'sonner'

const googleSignIn = async (tokenResponse: TokenResponse) => {
  try {
    const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
    })

    const { data: credentialResponse } = userInfo

    const res = await api.post('/auth/signinwithexternal', {
      credentialResponse,
      type: 'GOOGLE'
    })

    const {
      data: { accessToken }
    } = res

    if (accessToken) {
      useAuthStore.getState().setAccessToken(accessToken)
    }
  } catch (error) {
    toast.error('Authentication error')
  }
}

export const externalAuthService = { googleSignIn }
