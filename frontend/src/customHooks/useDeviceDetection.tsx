import { useState, useEffect } from 'react'

// Định nghĩa breakpoint cho Mobile (ví dụ: 768px - kích thước của tablet)
const MOBILE_BREAKPOINT = 768

function useDeviceDetection() {
  const [isMobile, setIsMobile] = useState(false)
  // const [isTouchDevice, setIsTouchDevice] = useState(false)

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  // 2. Kiểm tra kích thước màn hình
  useEffect(() => {
    const handleResize = () => {
      // Thiết bị là mobile nếu độ rộng nhỏ hơn breakpoint
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Chạy lần đầu tiên và đính kèm listener
    handleResize()
    window.addEventListener('resize', handleResize)

    // Cleanup: Loại bỏ listener khi component unmount
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Trả về kết quả
  return {
    isMobile,
    isPC: !isMobile,
    isTouchDevice,
    isMobileMode: isMobile && isTouchDevice // Kết hợp cả 2 điều kiện
  }
}

export default useDeviceDetection
