'use client'

import { CheckCircle, Loader2 } from 'lucide-react'

type Props = {
  onSave: () => void
  status: 'idle' | 'saving' | 'saved' | 'error'
}

export default function SaveBar({ onSave, status }: Props) {
  return (
    <div className="flex items-center gap-4 pt-4 border-t border-dark-border mt-6">
      <button
        onClick={onSave}
        disabled={status === 'saving'}
        className="btn-primary text-xs py-2.5 px-8 flex items-center gap-2 disabled:opacity-50"
      >
        {status === 'saving' ? (
          <><Loader2 size={14} className="animate-spin" /> ინახება...</>
        ) : 'შენახვა'}
      </button>

      {status === 'saved' && (
        <span className="flex items-center gap-1.5 text-green-400 text-sm">
          <CheckCircle size={15} /> შენახულია!
        </span>
      )}
      {status === 'error' && (
        <span className="text-red-400 text-sm">შეცდომა. სცადეთ ხელახლა.</span>
      )}
    </div>
  )
}
