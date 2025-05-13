import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Printmote',
  description: 'Remote-first printing service for busy professionals and SMEs in Ghana',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Nav Bar */}
        <header className="bg-white shadow sticky top-0 z-50">
          <nav className="flex items-center justify-between max-w-6xl mx-auto px-6 py-4">
            <div className="text-xl font-bold text-gray-900">Printmote</div>
            <ul className="flex gap-6 text-sm text-gray-700">
              <li><a href="/" className="hover:text-green-600">Home</a></li>
              <li><a href="#services" className="hover:text-green-600">Services</a></li>
              <li><a href="#contact" className="hover:text-green-600">Contact</a></li>
            </ul>
          </nav>
        </header>

        {/* Page Content */}
        <main>{children}</main>
      </body>
    </html>
  )
}





