export type ServiceResponse<T> =
  | {
      success: true
      data: T
      message?: string
    }
  | {
      success: false
      data?: null
      message: string
      error?: any
    }
