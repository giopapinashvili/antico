import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lounge Antico — Restaurant',
  description: 'Lounge Antico — Italian cuisine with Georgian hospitality.',
  icons: { icon: '/logo.png', apple: '/logo.png' },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return children
}
