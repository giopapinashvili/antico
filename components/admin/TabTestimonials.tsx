'use client'

import { useState } from 'react'
import { Plus, Trash2, Star } from 'lucide-react'
import SaveBar from './SaveBar'

type Testimonial = { id: string; name: string; text: string; rating: number }
type Props = { data: Testimonial[]; onSave: (d: Testimonial[]) => Promise<void> }

export default function TabTestimonials({ data, onSave }: Props) {
  const [items, setItems] = useState<Testimonial[]>(data)
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  const update = (id: string, key: keyof Testimonial, val: string | number) =>
    setItems((p) => p.map((t) => t.id === id ? { ...t, [key]: val } : t))

  const remove = (id: string) => setItems((p) => p.filter((t) => t.id !== id))

  const addNew = () =>
    setItems((p) => [...p, { id: Date.now().toString(), name: '', text: '', rating: 5 }])

  const save = async () => {
    setStatus('saving')
    try { await onSave(items); setStatus('saved'); setTimeout(() => setStatus('idle'), 3000) }
    catch { setStatus('error') }
  }

  return (
    <div className="space-y-4">
      {items.map((t) => (
        <div key={t.id} className="card-dark p-4 space-y-3">
          <div className="flex gap-3 items-start">
            <div className="flex-1 space-y-2">
              <input
                value={t.name}
                onChange={(e) => update(t.id, 'name', e.target.value)}
                placeholder="სახელი (მაგ. ნინო გ.)"
                className="input-field text-sm py-2"
              />
              <textarea
                value={t.text}
                onChange={(e) => update(t.id, 'text', e.target.value)}
                placeholder="შეფასების ტექსტი..."
                rows={2}
                className="input-field text-sm py-2 resize-none"
              />
            </div>
            <button onClick={() => remove(t.id)} className="text-cream/30 hover:text-red-400 p-1 transition-colors">
              <Trash2 size={15} />
            </button>
          </div>

          {/* Star rating */}
          <div className="flex items-center gap-2">
            <span className="text-cream/40 text-xs">შეფასება:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => update(t.id, 'rating', star)}>
                  <Star
                    size={18}
                    className={`transition-colors ${star <= t.rating ? 'text-gold fill-gold' : 'text-cream/20'}`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}

      <button onClick={addNew} className="btn-outline text-xs py-2 px-4 flex items-center gap-2 w-full justify-center">
        <Plus size={14} /> შეფასების დამატება
      </button>

      <SaveBar onSave={save} status={status} />
    </div>
  )
}
