"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const [isFading, setIsFading] = useState(false)
  const router = useRouter()

  const handleStartWriting = () => {
    setIsFading(true)
    setTimeout(() => {
      router.push("/write")
    }, 800)
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-8 transition-opacity duration-1000 ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="max-w-2xl text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight text-balance">Typeflow</h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light text-balance">The Calm Writing Space</p>
        </div>

        <div className="space-y-6 py-8">
          <p className="text-lg text-muted-foreground/80 max-w-xl mx-auto text-pretty">
            A minimal writing app designed for focus, flow, and fun. No distractions. Just you and your words.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button
              onClick={handleStartWriting}
              className="group relative px-8 py-4 bg-foreground text-background rounded-lg text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <span className="relative z-10">Start Writing</span>
              <div className="absolute inset-0 bg-foreground/80 rounded-lg blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 pt-12 text-sm">
          <div className="space-y-2">
            <div className="text-2xl">⌨️</div>
            <h3 className="font-medium">Typewriter Sounds</h3>
            <p className="text-muted-foreground/70">Choose from multiple authentic typing sounds</p>
          </div>
          <div className="space-y-2">
            <div className="text-2xl">✨</div>
            <h3 className="font-medium">Rich Formatting</h3>
            <p className="text-muted-foreground/70">Bold, italic, headings, and more</p>
          </div>
          <div className="space-y-2">
            <div className="text-2xl">🌙</div>
            <h3 className="font-medium">Dark Mode</h3>
            <p className="text-muted-foreground/70">Easy on your eyes, day or night</p>
          </div>
        </div>
      </div>
    </div>
  )
}
