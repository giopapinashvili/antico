'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Plus, Trash2, GripVertical } from 'lucide-react'
import SaveBar from './SaveBar'

type Photo = { id: string; src: string; alt: string }
type Props = { data: Photo[]; onSave: (d: Photo[]) => Promise<void> }

export default function TabGallery({ data, onSave }: Props) {
  const [photos, setPhotos] = useState<Photo[]>(data)
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  const update = (id: string, key: keyof Photo, val: string) =>
    setPhotos((p) => p.map((ph) => ph.id === id ? { ...ph, [key]: val } : ph))

  const remove = (id: string) => setPhotos((p) => p.filter((ph) => ph.id !== id))

  const addNew = () => setPhotos((p) => [...p, { id: Date.now().toString(), src: '', alt: '' }])

  const handleFileChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => update(id, 'src', ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  const save = async () => {
    setStatus('saving')
    try {
      await onSave(photos.filter((p) => p.src))
      setStatus('saved')
      setTimeout(() => setStatus('idle'), 3000)
    } catch { setStatus('error') }
  }

  return (
    <div className="space-y-4">
      <p className="text-cream/40 text-xs">სურათების დამატება URL-ით ან ატვირთვით. ცარიელი სურათები შენახვისას იგნორირდება.</p>

      <div className="space-y-3">
        {photos.map((photo) => (
          <div key={photo.id} className="card-dark p-3 flex gap-3 items-start">
            <GripVertical size={16} className="text-cream/20 mt-3 shrink-0" />

            {/* Thumbnail */}
            <div className="w-20 h-16 shrink-0 bg-dark border border-dark-border relative overflow-hidden">
              {photo.src ? (
                <Image src={photo.src} alt={photo.alt} fill className="object-cover" unoptimized={photo.src.startsWith('data:')} />
              ) : (
                <div className="flex items-center justify-center h-full text-cream/20 text-xs">ცარიელი</div>
              )}
            </div>

            {/* Fields */}
            <div className="flex-1 space-y-2">
              <div className="flex gap-2">
                <input
                  value={photo.src.startsWith('data:') ? '' : photo.src}
                  onChange={(e) => update(photo.id, 'src', e.target.value)}
                  placeholder="URL..."
                  className="input-field text-xs py-1.5 flex-1"
                />
                <label className="btn-outline text-xs py-1.5 px-3 cursor-pointer whitespace-nowrap">
                  ატვირთვა
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(photo.id, e)} />
                </label>
              </div>
              <input
                value={photo.alt}
                onChange={(e) => update(photo.id, 'alt', e.target.value)}
                placeholder="სურათის აღწერა (alt text)..."
                className="input-field text-xs py-1.5"
              />
            </div>

            <button onClick={() => remove(photo.id)} className="text-cream/30 hover:text-red-400 p-1 transition-colors shrink-0">
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>

      <button onClick={addNew} className="btn-outline text-xs py-2 px-4 flex items-center gap-2 w-full justify-center">
        <Plus size={14} /> სურათის დამატება
      </button>

      <SaveBar onSave={save} status={status} />
    </div>
  )
}
