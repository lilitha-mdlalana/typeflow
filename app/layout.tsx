import type React from "react"
import type { Metadata } from "next"
import { Special_Elite } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const font = Special_Elite({
  subsets: ["latin"],
  weight: "400",
})

export const metadata: Metadata = {
  title: "Typeflow — The Calm Writing Space",
  description: "A minimal writing app designed for focus, flow, and fun",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
