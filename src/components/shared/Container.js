import { cn } from '@/lib/utils'

export function Container({ className, children }) {
  return (
    <div
      className={cn('mx-auto max-w-screen-xl px-5 sm:px-6 lg:px-8', className)}
    >
      {children}
    </div>
  )
}
