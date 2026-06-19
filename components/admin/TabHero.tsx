'use client'

import { useState } from 'react'
import SaveBar from './SaveBar'
import FieldGroup from './FieldGroup'
import ImageInput from './ImageInput'

type HeroData = {
  backgroundUrl: string
  badge: string
  heading: string
  subheading: string
  cta1: string
  cta2: string
}
type Props = { data: HeroData; onSave: (d: HeroData) => Promise<void> }

export default function TabHero({ data, onSave }: Props) {
  const [form, setForm] = useState(data)
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  const set = (k: keyof HeroData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }))

  const save = async () => {
    setStatus('saving')
    try { await onSave(form); setStatus('saved'); setTimeout(() => setStatus('idle'), 3000) }
    catch { setStatus('error') }
  }

  return (
    <div className="space-y-5">
      <ImageInput
        label="ფონური სურათი (Hero Background)"
        value={form.backgroundUrl}
        onChange={(url) => setForm((p) => ({ ...p, backgroundUrl: url }))}
      />
      <FieldGroup label="Badge-ი (პატარა ტექსტი სათაურზე)">
        <input value={form.badge} onChange={set('badge')} className="input-field" />
      </FieldGroup>
      <FieldGroup label="სათაური">
        <input value={form.heading} onChange={set('heading')} className="input-field" />
      </FieldGroup>
      <FieldGroup label="ქვესათაური">
        <textarea value={form.subheading} onChange={set('subheading')} rows={2} className="input-field resize-none" />
      </FieldGroup>
      <div className="grid grid-cols-2 gap-4">
        <FieldGroup label="ღილაკი 1 (ჯავშანი)">
          <input value={form.cta1} onChange={set('cta1')} className="input-field" />
        </FieldGroup>
        <FieldGroup label="ღილაკი 2 (მენიუ)">
          <input value={form.cta2} onChange={set('cta2')} className="input-field" />
        </FieldGroup>
      </div>
      <SaveBar onSave={save} status={status} />
    </div>
  )
}
