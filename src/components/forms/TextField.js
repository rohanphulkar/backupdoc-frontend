import { Label } from './Label'

const inputClasses =
  'px-3 py-2.5 transition-colors duration-200 ease-in-out text-sm text-violet-50 placeholder:text-zinc-400/80 focus:outline-none rounded-md ring-1 ring-inset ring-violet-200/[0.06] focus:ring-2 focus:ring-inset focus:ring-violet-300/15 w-full bg-transparent border-0'

export function TextField({
  label,
  name,
  link,
  elementType = 'input',
  rows = 5,
  className,
  ...attrs
}) {
  return (
    <div className={className}>
      {label && (
        <Label name={name} link={link}>
          {label}
        </Label>
      )}

      <div className='group relative mt-2 flex w-full rounded-md bg-zinc-950/[.01] shadow-inner-blur duration-200 ease-in-out hover:bg-zinc-950/10 has-[:focus]:bg-zinc-950/15'>
        {elementType === 'textarea' ? (
          <textarea
            id={name}
            name={name}
            rows={rows}
            className={inputClasses}
            {...attrs}
          />
        ) : (
          <input id={name} name={name} className={inputClasses} {...attrs} />
        )}
      </div>
    </div>
  )
}
