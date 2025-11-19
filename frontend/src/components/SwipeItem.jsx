// SwipeItem.jsx (Code đã sửa)
import ConfirmPopup from '@/components/ConfirmPopup'
import { SquarePen, Trash2 } from 'lucide-react'
import React, { useRef, useState, useCallback } from 'react'

const ACTION_WIDTH = 80 // Chiều rộng tối đa của nút Xóa

function SwipeItem({ children, onDelete, taskId, onEdit }) {
  const itemRef = useRef(null)
  const [dragX, setDragX] = useState(0)
  const [startX, setStartX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  // Lấy vị trí transform hiện tại (đảm bảo nó là số)
  const getTranslateX = () => {
    if (itemRef.current) {
      const style = itemRef.current.style.transform // Ví dụ: "translateX(40px)"
      const match = style.match(/translateX\(([^)]+)\)/)
      return match ? parseFloat(match[1]) : 0
    }
    return 0
  }

  const applyTransform = useCallback(
    (x) => {
      const translateX = Math.min(Math.max(0, x), ACTION_WIDTH) // Đảm bảo luôn nằm trong [0, 80]
      if (itemRef.current) {
        // Thêm transition CSS nếu không phải đang kéo
        itemRef.current.style.transition = isDragging ? 'none' : 'transform 0.2s ease-out'
        itemRef.current.style.transform = `translateX(${translateX}px)`
        console.log(itemRef.current)
      }
      setDragX(translateX)
    },
    [isDragging]
  ) // Cần thêm isDragging vào dependency array

  const handleTouchStart = (e) => {
    console.log(`Touch start: ${taskId}`)
    setIsDragging(true)
    setStartX(e.touches[0].clientX)

    // Dùng getTranslateX để lấy vị trí chính xác
    setDragX(getTranslateX())
    console.log(`StartX: ${startX}`)
    console.log(`DragX: ${dragX}`)
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    const currentX = e.touches[0].clientX
    const deltaX = currentX - startX

    if (deltaX > 0) {
      // Tính toán vị trí mới dựa trên vị trí VÀO ĐẦU TOUCH
      const initialTranslateX = getTranslateX()
      const newX = initialTranslateX + deltaX

      applyTransform(newX)
    } else {
      closeItem()
      // Math.abs(deltaX) > 100 && onEdit(true)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)

    // Logic snap: Nếu mở quá nửa, mở hoàn toàn. Ngược lại, đóng lại.
    if (dragX > ACTION_WIDTH / 2) {
      applyTransform(ACTION_WIDTH) // Snap mở
    } else {
      applyTransform(0) // Snap đóng
    }
  }

  const closeItem = () => applyTransform(0)

  // Tối ưu hóa: Dùng style object thay vì template string cho nút xóa
  const deleteButtonStyle = {
    width: ACTION_WIDTH,
    // Nút xóa được đẩy ra ngoài ACTION_WIDTH khi dragX = 0
    transform: `translateX(${dragX - ACTION_WIDTH}px)`
  }

  return (
    <>
      <div
        className='relative overflow-hidden rounded-lg'
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        {/* Nút Xóa (Nằm ở background bên trái)
        <div
          className='absolute inset-y-0 left-0 flex items-center bg-red-600 w-20 justify-center'
          style={deleteButtonStyle}
        >
          <ConfirmPopup
            title='Are you absolutely sure?'
            message='This action cannot be undone. This will permanently delete your task and remove your data from our servers.'
            handleConfirm={() => onDelete(taskId)}
            confirmText='OK'
          >
            <>
              <button
                className='text-white text-sm'
                onClick={() => {
                  closeItem()
                }}
              >
                <Trash2 className='size-4' />
              </button>
            </>
          </ConfirmPopup>
        </div> */}

        {/* 1. CONTAINER CỦA CẢ HAI NÚT (Background) */}
        <div
          // Sử dụng flex để các nút nằm cạnh nhau
          className='absolute inset-y-0 left-0 flex items-center w-20'
          style={{ width: ACTION_WIDTH, transform: `translateX(${dragX - ACTION_WIDTH}px)` }}
        >
          <ConfirmPopup
            title='Are you absolutely sure?'
            message='This action cannot be undone. This will permanently delete your task and remove your data from our servers.'
            handleConfirm={() => onDelete(taskId)}
            confirmText='OK'
          >
            {/* Nút Trigger cho ConfirmPopup */}
            <button
              className='flex-1 flex items-center justify-center h-full text-white bg-red-600'
              onClick={() => closeItem()} // Đóng item sau khi click
            >
              <Trash2 className='size-4' />
            </button>
          </ConfirmPopup>
          <button
            onClick={() => {
              onEdit(true)
              closeItem()
            }}
            className='flex-1 flex items-center justify-center h-full text-white bg-blue-500'
          >
            <SquarePen className='size-4' />
          </button>
        </div>

        {/* Nội dung item (Foreground) */}
        <div
          ref={itemRef}
          className='bg-white shadow-sm transition-all duration-200 ease-out' // Bỏ p-4 ở đây
          style={{ touchAction: 'none' }}
        >
          {children} {/* Dữ liệu TaskCard */}
        </div>
      </div>
    </>
  )
}

export default SwipeItem
