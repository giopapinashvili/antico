'use client'

import { useState } from 'react'
import SaveBar from './SaveBar'
import FieldGroup from './FieldGroup'

type SiteData = { name: string; tagline: string; footerText: string }
type Props = { data: SiteData; onSave: (d: SiteData) => Promise<void> }

export default function TabSite({ data, onSave }: Props) {
  const [form, setForm] = useState(data)
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  const set = (k: keyof SiteData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }))

  const save = async () => {
    setStatus('saving')
    try { await onSave(form); setStatus('saved'); setTimeout(() => setStatus('idle'), 3000) }
    catch { setStatus('error') }
  }

  return (
    <div className="space-y-5">
      <FieldGroup label="რესტორნის სახელი">
        <input value={form.name} onChange={set('name')} className="input-field" />
      </FieldGroup>
      <FieldGroup label="ქვესათაური (footer-ში)">
        <textarea value={form.tagline} onChange={set('tagline')} rows={2} className="input-field resize-none" />
      </FieldGroup>
      <FieldGroup label="Footer-ის ტექსტი (copyright)">
        <input value={form.footerText} onChange={set('footerText')} className="input-field" />
      </FieldGroup>
      <SaveBar onSave={save} status={status} />
    </div>
  )
}
