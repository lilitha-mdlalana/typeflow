"use client"

import { Download, RotateCcw, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface WritingToolbarProps {
  show: boolean
  wordCount: number
  onClear: () => void
  onDownload: () => void
}

export function WritingToolbar({ show, wordCount, onClear, onDownload }: WritingToolbarProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div
      className={`fixed top-8 right-8 flex items-center gap-2 transition-all duration-500 ease-out ${
        show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
    >
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-3 rounded-full bg-secondary/50 backdrop-blur-sm hover:bg-secondary transition-colors"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun className="w-4 h-4 text-foreground" /> : <Moon className="w-4 h-4 text-foreground" />}
      </button>

      {wordCount > 0 && (
        <>
          <button
            onClick={onDownload}
            className="p-3 rounded-full bg-secondary/50 backdrop-blur-sm hover:bg-secondary transition-colors"
            aria-label="Download document"
          >
            <Download className="w-4 h-4 text-foreground" />
          </button>

          <button
            onClick={onClear}
            className="p-3 rounded-full bg-secondary/50 backdrop-blur-sm hover:bg-secondary transition-colors"
            aria-label="Clear document"
          >
            <RotateCcw className="w-4 h-4 text-foreground" />
          </button>
        </>
      )}
    </div>
  )
}
