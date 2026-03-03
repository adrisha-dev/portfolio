"use client"

import { useEffect, useState, useRef, useCallback, useMemo } from "react"
import { useSound } from "@/hooks/use-sound"

// ---------- CONSTANTS ----------
const TOTAL_DURATION = 6000
const FADE_IN_MS = 500
const FADE_OUT_MS = 800
const AUDIO_FADE_MS = 600
const AUDIO_VOLUME = 0.5

// Progress easing: slow 0-60% over ~4 s, then fast 60-100% over ~2 s
const SLOW_PHASE_END = 4000
const SLOW_PHASE_TARGET = 60
const FAST_PHASE_DURATION = TOTAL_DURATION - SLOW_PHASE_END - 200
const FAST_PHASE_TARGET = 40

const SEGMENT_COUNT = 24

interface CinematicLoaderProps {
  modeLabel: string
  onComplete: () => void
}

export function CinematicLoader({ modeLabel, onComplete }: CinematicLoaderProps) {
  const [phase, setPhase] = useState<"enter" | "active" | "exit">("enter")
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fadeRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const { enabled: soundEnabled } = useSound()

  // ---- helpers ----
  const clearFade = useCallback(() => {
    if (fadeRef.current) {
      clearInterval(fadeRef.current)
      fadeRef.current = null
    }
  }, [])

  const fadeOutAudio = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    clearFade()
    const steps = 25
    const stepTime = AUDIO_FADE_MS / steps
    const volumeStep = audio.volume / steps
    fadeRef.current = setInterval(() => {
      if (!audioRef.current || audioRef.current.volume - volumeStep <= 0.005) {
        if (audioRef.current) {
          audioRef.current.volume = 0
          audioRef.current.pause()
        }
        clearFade()
      } else {
        audioRef.current.volume = Math.max(audioRef.current.volume - volumeStep, 0)
      }
    }, stepTime)
  }, [clearFade])

  // ---- audio lifecycle ----
  useEffect(() => {
    if (!soundEnabled) return
    const audio = new Audio("/audio/loading-page.mp3")
    audio.volume = AUDIO_VOLUME
    audio.preload = "auto"
    audioRef.current = audio
    audio.play().catch(() => {})
    return () => {
      clearFade()
      audio.pause()
      audio.src = ""
    }
  }, [soundEnabled, clearFade])

  // ---- phase sequencing ----
  useEffect(() => {
    const enterTimer = setTimeout(() => setPhase("active"), FADE_IN_MS)
    const exitTimer = setTimeout(() => {
      setPhase("exit")
      fadeOutAudio()
    }, TOTAL_DURATION - FADE_OUT_MS)
    const completeTimer = setTimeout(onComplete, TOTAL_DURATION)
    return () => {
      clearTimeout(enterTimer)
      clearTimeout(exitTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete, fadeOutAudio])

  // ---- custom eased progress bar ----
  useEffect(() => {
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      let value: number
      if (elapsed <= SLOW_PHASE_END) {
        const t = Math.min(elapsed / SLOW_PHASE_END, 1)
        const eased = 1 - Math.pow(1 - t, 3)
        value = eased * SLOW_PHASE_TARGET
      } else {
        const fastElapsed = elapsed - SLOW_PHASE_END
        const t = Math.min(fastElapsed / FAST_PHASE_DURATION, 1)
        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
        value = SLOW_PHASE_TARGET + eased * FAST_PHASE_TARGET
      }
      setProgress(Math.min(value, 100))
      if (elapsed < TOTAL_DURATION - 200) requestAnimationFrame(tick)
      else setProgress(100)
    }
    requestAnimationFrame(tick)
  }, [])

  // Floating particles
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 0.5,
        duration: `${Math.random() * 8 + 6}s`,
        delay: `${Math.random() * 4}s`,
        opacity: Math.random() * 0.4 + 0.1,
      })),
    []
  )

  // Determine which segments are filled / active
  const filledSegments = Math.floor((progress / 100) * SEGMENT_COUNT)
  const activeSegmentProgress =
    ((progress / 100) * SEGMENT_COUNT - filledSegments) * 100

  const isVisible = phase !== "exit"

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden transition-opacity ease-in-out ${
        phase === "enter"
          ? "opacity-0 duration-500"
          : isVisible
            ? "opacity-100 duration-500"
            : "opacity-0 duration-700"
      }`}
      style={{ backgroundColor: "#0b0b0f" }}
      role="alert"
      aria-live="assertive"
      aria-label={`Loading ${modeLabel}`}
    >
      {/* ============= BACKGROUND LAYERS ============= */}

      {/* Red nebula / energy cloud 1 */}
      <div
        aria-hidden="true"
        className="animate-cinematic-drift pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 25% 35%, rgba(140,20,20,0.14) 0%, transparent 60%), radial-gradient(ellipse 70% 50% at 75% 65%, rgba(110,15,15,0.10) 0%, transparent 55%)",
          backgroundSize: "300% 300%",
          filter: "blur(90px)",
        }}
      />
      {/* Red nebula / energy cloud 2 */}
      <div
        aria-hidden="true"
        className="animate-cinematic-drift-alt pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 60% 30%, rgba(120,10,10,0.08) 0%, transparent 55%), radial-gradient(ellipse 50% 50% at 35% 70%, rgba(100,20,20,0.06) 0%, transparent 50%)",
          backgroundSize: "300% 300%",
          filter: "blur(110px)",
        }}
      />
      {/* Central breathing glow */}
      <div
        aria-hidden="true"
        className="animate-cinematic-breathe pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(130,18,18,0.07) 0%, transparent 60%)",
          filter: "blur(100px)",
        }}
      />

      {/* Tactical grid lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(180,50,50,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(180,50,50,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Scanning horizontal line */}
      <div
        aria-hidden="true"
        className="animate-scan-line pointer-events-none absolute left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(180,50,50,0.15) 20%, rgba(180,50,50,0.3) 50%, rgba(180,50,50,0.15) 80%, transparent 100%)",
          boxShadow: "0 0 20px 2px rgba(180,50,50,0.08)",
        }}
      />

      {/* Digital noise texture */}
      <div
        aria-hidden="true"
        className="animate-noise pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* Floating particles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="animate-float-particle absolute rounded-full"
            style={{
              left: p.left,
              bottom: "-10px",
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: `rgba(180,50,50,${p.opacity})`,
              boxShadow: `0 0 ${p.size * 4}px rgba(180,50,50,${p.opacity * 0.5})`,
              ["--duration" as string]: p.duration,
              ["--delay" as string]: p.delay,
            }}
          />
        ))}
      </div>

      {/* ============= TACTICAL HUD ELEMENTS ============= */}

      {/* Outer HUD ring */}
      <div
        aria-hidden="true"
        className="animate-loader-spin-slow pointer-events-none absolute h-[340px] w-[340px] rounded-full sm:h-[420px] sm:w-[420px]"
        style={{
          border: "1px solid rgba(180,50,50,0.06)",
          borderTopColor: "rgba(180,50,50,0.15)",
        }}
      />
      {/* Middle HUD ring */}
      <div
        aria-hidden="true"
        className="animate-loader-spin-reverse-slow pointer-events-none absolute h-[280px] w-[280px] rounded-full sm:h-[350px] sm:w-[350px]"
        style={{
          border: "1px solid rgba(180,50,50,0.04)",
          borderBottomColor: "rgba(180,50,50,0.10)",
          borderLeftColor: "rgba(180,50,50,0.05)",
        }}
      />
      {/* Inner HUD ring */}
      <div
        aria-hidden="true"
        className="animate-loader-spin-slow pointer-events-none absolute h-[220px] w-[220px] rounded-full sm:h-[280px] sm:w-[280px]"
        style={{
          border: "1px dashed rgba(180,50,50,0.05)",
        }}
      />

      {/* Corner brackets -- top-left */}
      <div aria-hidden="true" className="absolute left-6 top-6 h-8 w-8 sm:left-10 sm:top-10 sm:h-10 sm:w-10">
        <div className="absolute left-0 top-0 h-full w-px bg-danger/15" />
        <div className="absolute left-0 top-0 h-px w-full bg-danger/15" />
      </div>
      {/* Corner brackets -- top-right */}
      <div aria-hidden="true" className="absolute right-6 top-6 h-8 w-8 sm:right-10 sm:top-10 sm:h-10 sm:w-10">
        <div className="absolute right-0 top-0 h-full w-px bg-danger/15" />
        <div className="absolute right-0 top-0 h-px w-full bg-danger/15" />
      </div>
      {/* Corner brackets -- bottom-left */}
      <div aria-hidden="true" className="absolute bottom-6 left-6 h-8 w-8 sm:bottom-10 sm:left-10 sm:h-10 sm:w-10">
        <div className="absolute bottom-0 left-0 h-full w-px bg-danger/15" />
        <div className="absolute bottom-0 left-0 h-px w-full bg-danger/15" />
      </div>
      {/* Corner brackets -- bottom-right */}
      <div aria-hidden="true" className="absolute bottom-6 right-6 h-8 w-8 sm:bottom-10 sm:right-10 sm:h-10 sm:w-10">
        <div className="absolute bottom-0 right-0 h-full w-px bg-danger/15" />
        <div className="absolute bottom-0 right-0 h-px w-full bg-danger/15" />
      </div>

      {/* ============= CENTER CONTENT ============= */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-4 sm:gap-10">
        {/* Typography */}
        <div className="flex flex-col items-center gap-2.5">
          <p className="animate-loader-text font-mono text-[11px] font-medium uppercase tracking-[0.4em] text-foreground/80 sm:text-xs">
            Initializing Interface
          </p>
          <p className="animate-loader-text-delayed font-mono text-[9px] uppercase tracking-[0.3em] text-danger/60 sm:text-[10px]">
            Please wait...
          </p>
        </div>

        {/* Segmented progress bar */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative flex items-center gap-[2px]">
            {Array.from({ length: SEGMENT_COUNT }).map((_, i) => {
              const isFilled = i < filledSegments
              const isActive = i === filledSegments
              const segmentFill = isActive ? activeSegmentProgress : 0

              return (
                <div
                  key={i}
                  className="relative h-[6px] w-[10px] overflow-hidden rounded-[1px] sm:h-[7px] sm:w-[12px]"
                  style={{
                    backgroundColor: "rgba(180,50,50,0.08)",
                    border: "1px solid rgba(180,50,50,0.12)",
                  }}
                >
                  {/* Filled state */}
                  {isFilled && (
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundColor: "var(--danger)",
                        boxShadow: "0 0 6px rgba(180,50,50,0.5)",
                      }}
                    />
                  )}
                  {/* Active / partially filling segment */}
                  {isActive && segmentFill > 0 && (
                    <div
                      className="absolute inset-y-0 left-0"
                      style={{
                        width: `${segmentFill}%`,
                        background:
                          "linear-gradient(90deg, var(--danger) 60%, rgba(255,255,255,0.45) 100%)",
                        boxShadow:
                          "0 0 8px rgba(180,50,50,0.6), 0 0 2px rgba(255,255,255,0.3)",
                      }}
                    />
                  )}
                </div>
              )
            })}

            {/* Glow backdrop behind the whole bar */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-3 -z-10 rounded"
              style={{
                background: `radial-gradient(ellipse at ${Math.min(progress, 100)}% 50%, rgba(180,50,50,0.12) 0%, transparent 70%)`,
              }}
            />
          </div>

          {/* Percentage readout */}
          <p className="font-mono text-[10px] tabular-nums tracking-[0.2em] text-danger/50">
            {Math.round(progress)}
            <span className="text-danger/30">%</span>
          </p>
        </div>
      </div>

      {/* Bottom status line */}
      <div className="absolute bottom-8 flex flex-col items-center gap-1 sm:bottom-12">
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-danger/20 to-transparent" />
        <p className="animate-loader-text-delayed font-mono text-[8px] uppercase tracking-[0.25em] text-muted-foreground/25 sm:text-[9px]">
          SYS.READY
        </p>
      </div>
    </div>
  )
}
