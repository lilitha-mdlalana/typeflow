"use client"

import { useEffect, useState } from "react"

export function TypewriterAnimation() {
  const [position, setPosition] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => (prev + 1) % 100)
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-8 left-8">
      <div
        className="relative transition-transform duration-100 ease-linear"
        style={{ transform: `translateX(${Math.sin(position / 10) * 4}px)` }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-muted-foreground/40"
        >
          {/* Typewriter body */}
          <rect x="8" y="20" width="32" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />

          {/* Paper */}
          <path
            d="M14 20 L14 10 L34 10 L34 20"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            className="animate-pulse"
          />

          {/* Keys */}
          <circle cx="16" cy="28" r="1.5" fill="currentColor" opacity="0.6" />
          <circle cx="22" cy="28" r="1.5" fill="currentColor" opacity="0.6" />
          <circle cx="28" cy="28" r="1.5" fill="currentColor" opacity="0.6" />
          <circle cx="34" cy="28" r="1.5" fill="currentColor" opacity="0.6" />

          {/* Carriage */}
          <rect x="10" y="32" width="28" height="3" rx="1" fill="currentColor" opacity="0.4" />
        </svg>
      </div>
    </div>
  )
}
