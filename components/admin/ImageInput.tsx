'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ImageIcon, X } from 'lucide-react'

type Props = {
  label: string
  value: string
  onChange: (url: string) => void
}

export default function ImageInput({ label, value, onChange }: Props) {
  const [preview, setPreview] = useState(value)
  const [error, setError] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    onChange(url)
    setPreview(url)
    setError(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string
      onChange(dataUrl)
      setPreview(dataUrl)
      setError(false)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div>
      <label className="text-xs tracking-[0.2em] uppercase text-gold/80 mb-2 block">{label}</label>
      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={value.startsWith('data:') ? '' : value}
            onChange={handleChange}
            placeholder="https://... (სურათის URL)"
            className="input-field text-sm py-2 flex-1"
          />
          <label className="btn-outline text-xs py-2 px-3 cursor-pointer whitespace-nowrap flex items-center gap-1.5">
            <ImageIcon size={14} />
            ატვირთვა
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
        </div>

        {preview && (
          <div className="relative w-full h-40 bg-dark border border-dark-border overflow-hidden group">
            {error ? (
              <div className="flex items-center justify-center h-full text-cream/30 text-sm">
                სურათი ვერ ჩაიტვირთა
              </div>
            ) : (
              <Image
                src={preview}
                alt="preview"
                fill
                className="object-cover"
                onError={() => setError(true)}
                unoptimized={preview.startsWith('data:')}
              />
            )}
            <button
              onClick={() => { onChange(''); setPreview('') }}
              className="absolute top-2 right-2 bg-dark/80 text-cream/60 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
