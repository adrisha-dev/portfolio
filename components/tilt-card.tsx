"use client"

import { useRef, useState, useCallback, type MouseEvent, type ReactNode } from "react"

interface TiltCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
}

export function TiltCard({ children, className = "", glowColor = "var(--primary)" }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState("perspective(800px) rotateX(0deg) rotateY(0deg)")
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8

    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`)
    setGlowPosition({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)")
    setIsHovering(false)
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`relative transition-transform duration-300 ease-out ${className}`}
      style={{ transform, transformStyle: "preserve-3d" }}
    >
      {/* Glow overlay that follows the cursor */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-lg opacity-0 transition-opacity duration-500"
        style={{
          opacity: isHovering ? 0.15 : 0,
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${glowColor}, transparent 60%)`,
        }}
      />
      {/* Border glow */}
      <div
        className="pointer-events-none absolute -inset-px z-0 rounded-lg opacity-0 blur-sm transition-opacity duration-500"
        style={{
          opacity: isHovering ? 0.5 : 0,
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${glowColor}, transparent 70%)`,
        }}
      />
      {children}
    </div>
  )
}
