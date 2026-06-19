type Props = {
  label: string
  children: React.ReactNode
  hint?: string
}

export default function FieldGroup({ label, children, hint }: Props) {
  return (
    <div>
      <label className="text-xs tracking-[0.2em] uppercase text-gold/80 mb-2 block">
        {label}
        {hint && <span className="text-cream/30 normal-case tracking-normal ml-2 text-xs">{hint}</span>}
      </label>
      {children}
    </div>
  )
}
