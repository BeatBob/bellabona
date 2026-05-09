import type { ReactNode } from 'react'
import { Inter, Manrope } from 'next/font/google'

import './globals.css'

import { DEFAULT_LOCALE } from '../lib/i18n'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={DEFAULT_LOCALE} className={`${inter.variable} ${manrope.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-white text-brand-dark antialiased">
        {children}
      </body>
    </html>
  )
}
