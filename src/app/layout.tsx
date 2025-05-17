import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Printmote - Print in Accra without leaving your Desk',
  description: 'Business cards, banners, packaging, brand merch and more printed remotely and delivered across Accra.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-full bg-[#050038] text-white px-4 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <span className="text-base sm:text-lg text-center">Printmote is more than just a business, we are on a mission...</span>
          <Link
            href="/about"
            className="whitespace-nowrap inline-block bg-white text-[#050038] text-sm sm:text-base font-medium px-6 py-2.5 rounded-lg hover:bg-gray-100 transition"
          >
            Learn why we launched Printmote
          </Link>
        </div>

        {/* Page Content */}
        <main>{children}</main>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: '#6150FF',
              color: '#fff',
              borderRadius: '12px',
              padding: '16px',
            },
          }}
        />
      </body>
    </html>
  )
}
