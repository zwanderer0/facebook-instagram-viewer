import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Facebook/Instagram API Dashboard',
  description: 'View comments and messages from Facebook and Instagram',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  )
}