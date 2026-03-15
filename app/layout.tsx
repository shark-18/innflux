import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = { title: 'Innflux', description: 'Credit Without Borders' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>
}
