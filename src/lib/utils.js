import { twMerge } from 'tailwind-merge'
import { clsx } from 'clsx'

export function cn(...args) {
  return twMerge(clsx(args))
}

export function getOffsetTop(element) {
  let offsetTop = 0
  while (element) {
    offsetTop += element.offsetTop
    element = element.offsetParent
  }
  return offsetTop
}
