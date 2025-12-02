import { AxiosError } from 'axios'
import type { ServiceResponse } from '@/types/serviceResponse.ts'

// HandleAPI là 1 wrapper để trả về 1 promise luôn có type là ServiceResponse { success: boolean, data: <T>, ...props }
// trong ServiceResponse sẽ có data là type generate của service tương ứng
export const handleApi = async <T>(apiCall: () => Promise<T>): Promise<ServiceResponse<T>> => {
  try {
    const data = await apiCall()
    return {
      success: true,
      data
    }
  } catch (error) {
    // Xử lý lỗi tập trung tại đây
    // Sau khi Axios Interceptor return Promise.reject(Error) thì ở đây sẽ catch và log hết error
    let errorMessage = 'Something went wrong'

    if (error instanceof AxiosError) {
      // Lấy message từ backend trả về (nếu có)
      errorMessage = error.response?.data?.message || error.message
    } else if (error instanceof Error) {
      errorMessage = error.message
    }
    console.error(errorMessage)

    return {
      success: false,
      message: errorMessage,
      error: error
    }
  }
}
