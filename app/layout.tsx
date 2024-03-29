import type { Metadata } from "next"
import { IBM_Plex_Sans } from "next/font/google"
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from "@clerk/themes"

import "./globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"

const ibmPlex = IBM_Plex_Sans({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex'
})

export const metadata: Metadata = {
  title: "reCreate.",
  description: "AI SaaS Application To Recreate Your Imagination!",
  other: {
    "theme-color": "#7600FF",
    "color-scheme": "dark only",
    "twitter:image": "https://i.ibb.co/Wy6P5Yp/banner.jpg",
    "twitter:card": "summary_large_image",
    "og:url": "https://recreate-eight.vercel.app/",
    "og:image": "https://i.ibb.co/Wy6P5Yp/banner.jpg",
    "og:type": "website"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      baseTheme: dark, 
      variables: { colorPrimary: "#7600ff" }
    }}>
      <html lang="en">
        <head>
          <link rel="manifest" href="/site.webmanifest" crossOrigin="use-credentials" />
          <meta name="msapplication-TileColor" content="#7600FF"/>
        </head>
        <body className={cn("font-ibmPlex intialiased", ibmPlex.variable)}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
