import { cn } from '@/lib/utils.ts'
import { SquarePen, Trash2 } from 'lucide-react'
import React, { useRef, useState, useCallback } from 'react'

const ACTION_WIDTH = 80 // Chiều rộng tối đa của nút Xóa

type SwipeItemProps = {
  children: React.ReactNode
  onDelete: any
  taskId: any
  onEdit: any
  taskCompletedAt: any
}

function SwipeItem({ children, onDelete, taskId, onEdit, taskCompletedAt }: SwipeItemProps) {
  const itemRef = useRef<HTMLDivElement | null>(null)
  const [dragX, setDragX] = useState(0)
  const [startX, setStartX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  // Lấy vị trí transform hiện tại (đảm bảo nó là số)
  const getTranslateX = () => {
    if (itemRef.current) {
      const style = itemRef.current.style.transform
      const match = style.match(/translateX\(([^)]+)\)/)
      if (match && match[1] !== undefined) {
        return parseFloat(match[1])
      }
    }
    return 0
  }

  const applyTransform = useCallback((x: number, animate = false) => {
    // Capped giữa -ACTION_WIDTH và 0
    const translateX = Math.max(Math.min(0, x), -ACTION_WIDTH)
    if (itemRef.current) {
      // Khi kéo (animate=false), transition là 'none'.
      // Khi snap (animate=true), transition là 'transform 0.2s ease-out'.
      itemRef.current.style.transition = animate ? 'transform 0.2s ease-out' : 'none'
      itemRef.current.style.transform = `translateX(${translateX}px)`
    }
    setDragX(translateX)
  }, [])

  const handleTouchStart = (e: any) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
    setDragX(getTranslateX())
  }

  const handleTouchMove = (e: any) => {
    if (!isDragging) return
    const currentX = e.touches[0].clientX
    const deltaX = currentX - startX

    if (deltaX < 0) {
      const initialTranslateX = getTranslateX()
      const newX = initialTranslateX + deltaX

      applyTransform(newX, false) // Không animate khi đang kéo
    } else {
      closeItem()
    }
  }

  const handleTouchEnd = () => {
    // Logic snap:
    const targetX = dragX < -ACTION_WIDTH / 2 ? -ACTION_WIDTH : 0

    applyTransform(targetX, true)

    setIsDragging(false)
  }

  const closeItem = () => {
    applyTransform(0, true)
    setIsDragging(false)
  }

  return (
    <div
      className='relative overflow-hidden rounded-lg'
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      {/* CONTAINER CỦA CẢ HAI NÚT (Background) */}
      <div
        className='absolute inset-y-0 right-0 flex items-center w-20'
        style={{ transform: `translateX(${ACTION_WIDTH + dragX}px)` }}
      >
        {/* Nút Edit (Xanh) */}
        <button
          onClick={() => {
            if (!taskCompletedAt) {
              onEdit(true)
              closeItem()
            }
          }}
          className={cn(
            'flex-1 flex items-center justify-center h-full',
            taskCompletedAt ? 'text-muted-foreground bg-muted' : ' text-white bg-blue-500'
          )}
        >
          <SquarePen className='size-4' />
        </button>

        {/* Nút Xóa (Đỏ) */}
        {/* <ConfirmPopup
          title='Are you absolutely sure?'
          message='This action cannot be undone. This will permanently delete your task and remove your data from our servers.'
          handleConfirm={() => onDelete(taskId)}
          confirmText='OK'
        > */}
        <button
          className='flex-1 flex items-center justify-center h-full text-white bg-red-600'
          onClick={() => closeItem()}
        >
          <Trash2 className='size-4' onClick={() => onDelete(taskId)} />
        </button>
        {/* </ConfirmPopup> */}
      </div>

      {/* Nội dung item (Foreground) */}
      <div
        ref={itemRef}
        className='bg-white shadow-sm transition-all duration-200 ease-out'
        style={{ touchAction: 'none' }}
      >
        {children}
      </div>
    </div>
  )
}

export default SwipeItem
