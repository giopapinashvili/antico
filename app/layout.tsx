import type { Metadata } from 'next'
import './globals.css'
import ConditionalLayout from '@/components/ConditionalLayout'

export const metadata: Metadata = {
  title: 'Antico — იტალიური რესტორანი',
  description: 'გემრიელი იტალიური სამზარეულო, ხვდება ქართულ სტუმართმოყვარეობას. ჯავშნები, მენიუ, ფოტოები.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ka">
      <body>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  )
}
