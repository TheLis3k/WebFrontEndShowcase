import { useRef } from 'react'
import type React from 'react'

const CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
const randomString = (len: number) =>
  Array.from({ length: len }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join("")

export function useLetterScramble() {
  const lettersRef = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = lettersRef.current
    if (!el) return
    const rect = e.currentTarget.getBoundingClientRect()
    el.style.setProperty("--x", `${e.clientX - rect.left}px`)
    el.style.setProperty("--y", `${e.clientY - rect.top}px`)
    el.textContent = randomString(1500)
  }

  const onMouseEnter = () => { if (lettersRef.current) lettersRef.current.style.opacity = "1" }
  const onMouseLeave = () => { if (lettersRef.current) lettersRef.current.style.opacity = "0" }

  return { lettersRef, onMouseMove, onMouseEnter, onMouseLeave }
}
