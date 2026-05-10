import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'sonner'
import { QueryProvider } from '@/components/common/QueryProvider'

export const metadata: Metadata = {
  title: 'AI Research | Multi-Agent System',
  description: 'Enterprise-grade AI research platform powered by multi-agent orchestration',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="gradient-mesh min-h-screen">
        <QueryProvider>
          {children}
          <Toaster
            theme="dark"
            toastOptions={{
              style: {
                background: 'rgba(20, 20, 35, 0.95)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                color: '#e2e8f0',
              },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  )
}
