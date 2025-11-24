import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: any) {
  return twMerge(clsx(inputs))
}

export function handleKeyPress(e: any, callback: any) {
  if (e.key === 'Enter') {
    callback()
  }
}
