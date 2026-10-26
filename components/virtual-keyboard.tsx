"use client"

import type React from "react"
import { useEffect, useState } from "react"

type VKey = { label: string; code: string; flex?: number }

const ROW_1: VKey[] = [
  ...("QWERTYUIOP".split("").map((l) => ({ label: l.toLowerCase(), code: `Key${l}` }))),
  { label: "⌫", code: "Backspace", flex: 1.5 },
]
const ROW_2: VKey[] = [
  ...("ASDFGHJKL".split("").map((l) => ({ label: l.toLowerCase(), code: `Key${l}` }))),
  { label: "⏎", code: "Enter", flex: 1.5 },
]
const ROW_3: VKey[] = [
  { label: "⇧", code: "ShiftLeft", flex: 1.5 },
  ...("ZXCVBNM".split("").map((l) => ({ label: l.toLowerCase(), code: `Key${l}` }))),
]
const ROW_4: VKey[] = [{ label: "", code: "Space", flex: 6 }]

const ROWS = [ROW_1, ROW_2, ROW_3, ROW_4]

interface VirtualKeyboardProps {
  onType: (char: string) => void
  onBackspace: () => void
  onEnter: () => void
}

export function VirtualKeyboard({ onType, onBackspace, onEnter }: VirtualKeyboardProps) {
  const [pressed, setPressed] = useState<Set<string>>(new Set())
  const [isShiftActive, setIsShiftActive] = useState(false)

  // Highlight keys from real keystrokes too
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      setPressed((prev) => (prev.has(e.code) ? prev : new Set(prev).add(e.code)))
    }
    const onKeyUp = (e: KeyboardEvent) => {
      setPressed((prev) => {
        if (!prev.has(e.code)) return prev
        const next = new Set(prev)
        next.delete(e.code)
        return next
      })
    }
    const onBlur = () => setPressed(new Set())

    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("keyup", onKeyUp)
    window.addEventListener("blur", onBlur)

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("keyup", onKeyUp)
      window.removeEventListener("blur", onBlur)
    }
  }, [])

  const press = (code: string) => {
    setPressed((prev) => (prev.has(code) ? prev : new Set(prev).add(code)))
  }
  const release = (code: string) => {
    setPressed((prev) => {
      if (!prev.has(code)) return prev
      const next = new Set(prev)
      next.delete(code)
      return next
    })
  }

  const handlePointerDown = (e: React.PointerEvent, key: VKey) => {
    e.preventDefault()
    press(key.code)

    if (key.code === "Backspace") {
      onBackspace()
      return
    }
    if (key.code === "Enter") {
      onEnter()
      return
    }
    if (key.code === "ShiftLeft") {
      setIsShiftActive((prev) => !prev)
      return
    }

    const char = key.code === "Space" ? " " : key.label
    onType(isShiftActive ? char.toUpperCase() : char)
    if (isShiftActive) setIsShiftActive(false)
  }

  return (
    <div className="fixed bottom-0 inset-x-0 bg-secondary/60 backdrop-blur-sm border-t border-border px-2 pb-2 pt-3 select-none shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
      <div className="max-w-2xl mx-auto flex flex-col gap-1.5">
        {ROWS.map((row, i) => (
          <div key={i} className="flex gap-1.5 justify-center">
            {row.map((key) => {
              const isPressed = pressed.has(key.code) || (key.code === "ShiftLeft" && isShiftActive)
              return (
                <div
                  key={key.code}
                  style={{ flex: key.flex ?? 1, touchAction: "manipulation" }}
                  onPointerDown={(e) => handlePointerDown(e, key)}
                  onPointerUp={() => release(key.code)}
                  onPointerLeave={() => release(key.code)}
                  onPointerCancel={() => release(key.code)}
                  className={`h-10 md:h-12 rounded-lg flex items-center justify-center text-xs md:text-sm font-medium cursor-pointer bg-gradient-to-b from-muted to-muted/60 text-muted-foreground transition-all duration-100 ${
                    isPressed
                      ? "translate-y-[2px] scale-[0.97] text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
                      : "shadow-[0_3px_0_0_var(--border),0_4px_6px_-2px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.35)]"
                  }`}
                >
                  {key.label}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
