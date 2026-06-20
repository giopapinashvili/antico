export const metadata = {
  title: 'Admin — Antico',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[200] bg-dark overflow-auto">
      {children}
    </div>
  )
}
