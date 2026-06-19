'use client'

import { useState } from 'react'
import SaveBar from './SaveBar'
import FieldGroup from './FieldGroup'

type ContactData = {
  address: string
  phone1: string
  phone2: string
  email1: string
  email2: string
  weekdays: string
  weekends: string
  mapUrl: string
  footerAddress: string
}
type Props = { data: ContactData; onSave: (d: ContactData) => Promise<void> }

export default function TabContact({ data, onSave }: Props) {
  const [form, setForm] = useState(data)
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  const set = (k: keyof ContactData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }))

  const save = async () => {
    setStatus('saving')
    try { await onSave(form); setStatus('saved'); setTimeout(() => setStatus('idle'), 3000) }
    catch { setStatus('error') }
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FieldGroup label="მისამართი (სრული)">
          <input value={form.address} onChange={set('address')} className="input-field" />
        </FieldGroup>
        <FieldGroup label="მისამართი (Footer)">
          <input value={form.footerAddress} onChange={set('footerAddress')} className="input-field" />
        </FieldGroup>
        <FieldGroup label="ტელეფონი 1">
          <input value={form.phone1} onChange={set('phone1')} className="input-field" />
        </FieldGroup>
        <FieldGroup label="ტელეფონი 2">
          <input value={form.phone2} onChange={set('phone2')} className="input-field" />
        </FieldGroup>
        <FieldGroup label="ელ. ფოსტა 1">
          <input value={form.email1} onChange={set('email1')} className="input-field" />
        </FieldGroup>
        <FieldGroup label="ელ. ფოსტა 2">
          <input value={form.email2} onChange={set('email2')} className="input-field" />
        </FieldGroup>
        <FieldGroup label="სამუშაო საათები (ორ–პარ)">
          <input value={form.weekdays} onChange={set('weekdays')} className="input-field" placeholder="ორშ–პარ: 12:00–23:00" />
        </FieldGroup>
        <FieldGroup label="სამუშაო საათები (შაბ–კვი)">
          <input value={form.weekends} onChange={set('weekends')} className="input-field" placeholder="შაბ–კვი: 12:00–00:00" />
        </FieldGroup>
      </div>
      <FieldGroup label="Google Maps URL">
        <input value={form.mapUrl} onChange={set('mapUrl')} className="input-field" />
      </FieldGroup>
      <SaveBar onSave={save} status={status} />
    </div>
  )
}
