// DO NOT add "use client" here

import './globals.css'
import Link from 'next/link'
import type { Metadata, Viewport } from 'next'
import { Toaster } from 'react-hot-toast'
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.printmote.com'),
  title: 'Printmote - Print in Accra without leaving your Desk',
  description: 'Business cards, banners, packaging, brand merch and more printed remotely and delivered across Accra.',
  icons: {
    icon: '/Assets/favicon.svg',
    shortcut: '/Assets/favicon.svg',
    apple: '/Assets/favicon.svg',
    other: {
      rel: 'mask-icon',
      url: '/Assets/favicon.svg',
      color: '#6150FF'
    }
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Printmote - Print in Accra without leaving your Desk',
    description: 'Business cards, banners, packaging, brand merch and more printed remotely and delivered across Accra.',
    siteName: 'Printmote',
    images: [{
      url: 'https://www.printmote.com/Assets/Featured-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Printmote - Print in Accra without leaving your Desk'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Printmote - Print in Accra without leaving your Desk',
    description: 'Business cards, banners, packaging, brand merch and more printed remotely and delivered across Accra.',
    images: ['https://www.printmote.com/Assets/Featured-image.jpg'],
    creator: '@printmote'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/Assets/favicon.svg" />
        <link rel="alternate icon" href="/Assets/favicon.svg" />
        <link rel="mask-icon" href="/Assets/favicon.svg" color="#6150FF" />
      </head>
      <body>
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
            }
          }}
        />
      </body>
    </html>
  )
}
