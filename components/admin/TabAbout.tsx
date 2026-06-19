'use client'

import { useState } from 'react'
import SaveBar from './SaveBar'
import FieldGroup from './FieldGroup'
import ImageInput from './ImageInput'

type AboutData = {
  badge: string
  heading: string
  text1: string
  text2: string
  imageUrl: string
  yearsLabel: string
  yearsText: string
  cta: string
}
type CtaData = { backgroundUrl: string; badge: string; heading: string; text: string; cta: string }
type Props = { about: AboutData; cta: CtaData; onSave: (about: AboutData, cta: CtaData) => Promise<void> }

export default function TabAbout({ about, cta, onSave }: Props) {
  const [aboutForm, setAboutForm] = useState(about)
  const [ctaForm, setCtaForm] = useState(cta)
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  const setA = (k: keyof AboutData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setAboutForm((p) => ({ ...p, [k]: e.target.value }))
  const setC = (k: keyof CtaData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setCtaForm((p) => ({ ...p, [k]: e.target.value }))

  const save = async () => {
    setStatus('saving')
    try { await onSave(aboutForm, ctaForm); setStatus('saved'); setTimeout(() => setStatus('idle'), 3000) }
    catch { setStatus('error') }
  }

  return (
    <div className="space-y-6">
      <div className="text-xs tracking-[0.3em] uppercase text-gold border-b border-dark-border pb-2">About სექცია</div>

      <FieldGroup label="Badge-ი">
        <input value={aboutForm.badge} onChange={setA('badge')} className="input-field" />
      </FieldGroup>
      <FieldGroup label="სათაური">
        <input value={aboutForm.heading} onChange={setA('heading')} className="input-field" />
      </FieldGroup>
      <FieldGroup label="პარაგრაფი 1">
        <textarea value={aboutForm.text1} onChange={setA('text1')} rows={3} className="input-field resize-none" />
      </FieldGroup>
      <FieldGroup label="პარაგრაფი 2">
        <textarea value={aboutForm.text2} onChange={setA('text2')} rows={3} className="input-field resize-none" />
      </FieldGroup>
      <ImageInput
        label="სურათი"
        value={aboutForm.imageUrl}
        onChange={(url) => setAboutForm((p) => ({ ...p, imageUrl: url }))}
      />
      <div className="grid grid-cols-2 gap-4">
        <FieldGroup label="გამოცდილება (ციფრი)">
          <input value={aboutForm.yearsLabel} onChange={setA('yearsLabel')} className="input-field" />
        </FieldGroup>
        <FieldGroup label="გამოცდილება (ტექსტი)">
          <input value={aboutForm.yearsText} onChange={setA('yearsText')} className="input-field" />
        </FieldGroup>
      </div>
      <FieldGroup label="ღილაკის ტექსტი">
        <input value={aboutForm.cta} onChange={setA('cta')} className="input-field" />
      </FieldGroup>

      <div className="text-xs tracking-[0.3em] uppercase text-gold border-b border-dark-border pb-2 mt-4">CTA სექცია (ბოლოში)</div>

      <ImageInput
        label="CTA ფონური სურათი"
        value={ctaForm.backgroundUrl}
        onChange={(url) => setCtaForm((p) => ({ ...p, backgroundUrl: url }))}
      />
      <FieldGroup label="Badge-ი">
        <input value={ctaForm.badge} onChange={setC('badge')} className="input-field" />
      </FieldGroup>
      <FieldGroup label="სათაური">
        <input value={ctaForm.heading} onChange={setC('heading')} className="input-field" />
      </FieldGroup>
      <FieldGroup label="ტექსტი">
        <textarea value={ctaForm.text} onChange={setC('text')} rows={2} className="input-field resize-none" />
      </FieldGroup>
      <FieldGroup label="ღილაკი">
        <input value={ctaForm.cta} onChange={setC('cta')} className="input-field" />
      </FieldGroup>

      <SaveBar onSave={save} status={status} />
    </div>
  )
}
