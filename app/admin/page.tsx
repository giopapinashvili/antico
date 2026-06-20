'use client'

import { useState, useEffect, useCallback } from 'react'
import { LogOut, ExternalLink, LayoutDashboard } from 'lucide-react'
import TabSite from '@/components/admin/TabSite'
import TabHero from '@/components/admin/TabHero'
import TabAbout from '@/components/admin/TabAbout'
import TabGallery from '@/components/admin/TabGallery'
import TabTestimonials from '@/components/admin/TabTestimonials'
import TabContact from '@/components/admin/TabContact'
import TabMenu from '@/components/admin/TabMenu'

type Content = {
  site: { name: string; tagline: string; footerText: string }
  hero: { backgroundUrl: string; badge: string; heading: string; subheading: string; cta1: string; cta2: string }
  about: { badge: string; heading: string; text1: string; text2: string; imageUrl: string; yearsLabel: string; yearsText: string; cta: string }
  features: { icon: string; title: string; desc: string }[]
  cta: { backgroundUrl: string; badge: string; heading: string; text: string; cta: string }
  testimonials: { id: string; name: string; text: string; rating: number }[]
  gallery: { id: string; src: string; alt: string }[]
  contact: { address: string; phone1: string; phone2: string; email1: string; email2: string; weekdays: string; weekends: string; mapUrl: string; footerAddress: string }
}

type MenuData = {
  categories: { id: string; name: string; nameIt: string; items: { id: string; name: string; nameIt: string; description: string; price: number; badge: string | null }[] }[]
}

const TABS = [
  { id: 'site', label: 'საიტი' },
  { id: 'hero', label: 'Hero' },
  { id: 'about', label: 'About' },
  { id: 'gallery', label: 'გალერეა' },
  { id: 'menu', label: 'მენიუ' },
  { id: 'testimonials', label: 'შეფასებები' },
  { id: 'contact', label: 'კონტაქტი' },
]

function LoginForm({ onLogin }: { onLogin: (pw: string) => void }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    })
    if (res.ok) { sessionStorage.setItem('admin_pw', pw); onLogin(pw) }
    else setError(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="card-dark p-10 w-full max-w-sm">
        <div className="text-center mb-8">
          <Lock size={32} className="text-gold mx-auto mb-4" />
          <h1 className="text-2xl font-serif text-cream">Admin Panel</h1>
          <div className="gold-divider mt-4" />
        </div>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setError(false) }}
            placeholder="პაროლი"
            className="input-field"
            autoFocus
          />
          {error && <p className="text-red-400 text-sm">არასწორი პაროლი</p>}
          <button type="submit" className="btn-primary w-full text-center">შესვლა</button>
        </form>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [pw] = useState<string>('nopw')
  const [content, setContent] = useState<Content | null>(null)
  const [menuData, setMenuData] = useState<MenuData | null>(null)
  const [activeTab, setActiveTab] = useState('site')

  useEffect(() => {
    fetch('/api/content').then((r) => r.json()).then(setContent)
    fetch('/api/menu').then((r) => r.json()).then(setMenuData)
  }, [])

  const saveContent = useCallback(async (patch: Partial<Content>) => {
    const updated = { ...content, ...patch } as Content
    setContent(updated)
    const res = await fetch('/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': pw! },
      body: JSON.stringify(updated),
    })
    if (!res.ok) throw new Error('save failed')
  }, [content, pw])

  const saveMenu = useCallback(async (categories: MenuData['categories']) => {
    const updated = { ...menuData, categories } as MenuData
    setMenuData(updated)
    const res = await fetch('/api/menu', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': pw! },
      body: JSON.stringify(updated),
    })
    if (!res.ok) throw new Error('save failed')
  }, [menuData, pw])

  const logout = () => { sessionStorage.removeItem('admin_pw'); setPw(null) }

  if (!content || !menuData) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-cream/40 text-sm animate-pulse">იტვირთება...</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-dark">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-dark-card border-b border-dark-border h-16 flex items-center px-6 gap-4">
        <LayoutDashboard size={18} className="text-gold" />
        <span className="font-serif text-gold text-lg tracking-wider">Admin Panel</span>
        <div className="flex-1" />
        <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-cream/40 hover:text-cream/70 text-xs transition-colors">
          <ExternalLink size={13} /> საიტი
        </a>
        <button onClick={logout} className="flex items-center gap-1.5 text-cream/40 hover:text-red-400 text-xs transition-colors">
          <LogOut size={13} /> გამოსვლა
        </button>
      </div>

      <div className="flex pt-16 min-h-screen">
        {/* Sidebar */}
        <aside className="w-48 shrink-0 fixed left-0 top-16 bottom-0 bg-dark-card border-r border-dark-border overflow-y-auto">
          <nav className="p-3 space-y-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-2.5 text-sm transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gold/10 text-gold border-l-2 border-gold'
                    : 'text-cream/50 hover:text-cream/80 hover:bg-white/5 border-l-2 border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 ml-48 p-8 max-w-3xl">
          <div className="mb-8">
            <h2 className="text-2xl font-serif text-cream">
              {TABS.find((t) => t.id === activeTab)?.label}
            </h2>
            <div className="w-10 h-px bg-gold mt-2" />
          </div>

          {activeTab === 'site' && (
            <TabSite data={content.site} onSave={(site) => saveContent({ site })} />
          )}
          {activeTab === 'hero' && (
            <TabHero data={content.hero} onSave={(hero) => saveContent({ hero })} />
          )}
          {activeTab === 'about' && (
            <TabAbout
              about={content.about}
              cta={content.cta}
              onSave={(about, cta) => saveContent({ about, cta })}
            />
          )}
          {activeTab === 'gallery' && (
            <TabGallery data={content.gallery} onSave={(gallery) => saveContent({ gallery })} />
          )}
          {activeTab === 'menu' && (
            <TabMenu data={menuData.categories} onSave={saveMenu} />
          )}
          {activeTab === 'testimonials' && (
            <TabTestimonials data={content.testimonials} onSave={(testimonials) => saveContent({ testimonials })} />
          )}
          {activeTab === 'contact' && (
            <TabContact data={content.contact} onSave={(contact) => saveContent({ contact })} />
          )}
        </main>
      </div>
    </div>
  )
}
