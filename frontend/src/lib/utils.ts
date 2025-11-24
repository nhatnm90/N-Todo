import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function handleKeyPress(e, callback) {
  if (e.key === 'Enter') {
    callback()
  }
}
