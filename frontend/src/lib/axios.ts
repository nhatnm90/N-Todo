import { authService } from '@/services/authService.ts'
import { useAuthStore } from '@/stores/useAuthStore.ts'
import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { toast } from 'sonner'

const IGNORE_REFRESH_URL = ['/auth/signin', '/auth/signup', '/auth/refreshtoken']
interface RetryConfig extends InternalAxiosRequestConfig {
  _retryCount?: number
}

const BASE_URL = import.meta.env.MODE === 'development' ? 'http://localhost:2101/api' : '/api'

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true // dùng để gửi cookie lên server
})

/* 
Include accessToken to request header
Interceptors là 1 middleware trước khi request chạy, tất cả các request sẽ đều chạy qua step này
*/
api.interceptors.request.use((config) => {
  // getState(): chỉ lấy giá trị của accessToken khi dòng code này chạy
  // nếu accessToken có thay đổi thì cũng bỏ qua
  const { accessToken } = useAuthStore.getState()
  console.info('Interceptors 1 running')
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

const resolvePromise = (res: AxiosResponse<any>) => {
  console.info('Response ok nha: ', res)
  return Promise.resolve(res)
}

/*Tạo biến để lưu lại retryCount
C1: dùng 1 interface để extend từ Error config của Axios
  interface RetryConfig extends InternalAxiosRequestConfig {
    _retryCount?: number
  }
  Tạo biến để giới hạn số lần retry
  originalRequest._retryCount = originalRequest._retryCount || 0

C2: dùng WeakMap
  const retryMap = new WeakMap<object, number>()
  const currentCount = retryMap.get(originalRequest) ?? 0
  retryMap.delete(originalRequest)
  retryMap.set(originalRequest, currentCount + 1)
*/
const retryMap = new WeakMap<object, number>()
const rejectPromise = async (error: AxiosError) => {
  const originalRequest = error.config as RetryConfig
  if (!originalRequest || (originalRequest?.url && IGNORE_REFRESH_URL.includes(originalRequest.url))) {
    return Promise.reject(error)
  }

  const currentCount = retryMap.get(originalRequest) ?? 0

  if (currentCount > 5) {
    retryMap.delete(originalRequest)
    return Promise.reject(error)
  }

  const errorCode = error.response?.status

  switch (errorCode) {
    case 401:
      toast.warning('Session is expired, please help to sign in.')
      break
    case 403:
      retryMap.set(originalRequest, currentCount + 1)
      try {
        const newAccessToken = await authService.refresh()
        if (originalRequest?.headers && newAccessToken) {
          const { setAccessToken } = useAuthStore.getState()
          setAccessToken(newAccessToken)
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
          return api(originalRequest)
        }
      } catch (refreshError) {
        console.error('Error when auto refresh token: ', refreshError)
        return Promise.reject(error)
      }
      break
    case 404:
      toast.error('Resource does not existed')
      console.error('Resource does not existed: ', error.response?.data)
      break
    case 500: {
      console.log('Internal server error: ', error.response?.data)
      toast.error('Internal server error. Please help to try again')
      break
    }
    default:
      console.error('Default error: ', error)
      break
  }

  return Promise.reject(error)
}

api.interceptors.response.use(resolvePromise, rejectPromise)

export default api
