"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"

// ===================== AVATAR TARGET DATA =====================
const AVATAR_TARGETS = [
  { id: 1, src: "/images/avatar1.png", label: "SQUADS & ALLIANCES", left: "8%", bottom: "18%", scale: 1.85, height: "clamp(180px, 28vh, 320px)", z: 4 },
  { id: 2, src: "/images/avatar2.png", label: "MISSIONS", left: "26%", bottom: "14%", scale: 2.15, height: "clamp(200px, 32vh, 360px)", z: 5 },
  { id: 3, src: "/images/avatar3.png", label: "PROFILE", left: "50%", bottom: "18%", scale: 2.35, height: "clamp(220px, 35vh, 400px)", z: 6 },
  { id: 4, src: "/images/avatar4.png", label: "CORE ABILITIES", left: "74%", bottom: "22%", scale: 1.95, height: "clamp(190px, 30vh, 340px)", z: 4 },
  { id: 5, src: "/images/avatar5.png", label: "CONTACT", left: "92%", bottom: "18%", scale: 1.85, height: "clamp(190px, 30vh, 340px)", z: 4 },
]

// ===================== RED AURA ENGINE =====================
function RedAuraEngine({ scale }: { scale: number }) {
  const sparks = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: 20 + Math.random() * 60,
      delay: Math.random() * 4,
      duration: 2.5 + Math.random() * 2,
      size: 2 + Math.random() * 3,
    })), []
  )

  return (
    <div className="pointer-events-none absolute inset-0" style={{ transform: `scale(${1/scale})` }}>
      {/* Outer soft glow */}
      <div 
        className="absolute inset-0 animate-pulse"
        style={{
          background: "radial-gradient(ellipse at center 70%, rgba(180,40,30,0.15) 0%, rgba(120,20,15,0.08) 40%, transparent 70%)",
          filter: "blur(20px)",
          animationDuration: "4s",
        }}
      />
      {/* Inner edge glow */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center 60%, rgba(220,60,40,0.12) 0%, transparent 50%)",
          filter: "blur(8px)",
        }}
      />
      {/* Ember particles */}
      {sparks.map((spark) => (
        <div
          key={spark.id}
          className="absolute rounded-full"
          style={{
            left: `${spark.left}%`,
            bottom: "10%",
            width: spark.size,
            height: spark.size,
            background: "radial-gradient(circle, rgba(255,120,60,0.9) 0%, rgba(200,50,30,0.4) 100%)",
            boxShadow: "0 0 6px rgba(255,100,50,0.6)",
            animation: `ember-rise ${spark.duration}s ease-out infinite`,
            animationDelay: `${spark.delay}s`,
          }}
        />
      ))}
      {/* Heat shimmer at feet */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: "80%",
          height: "15%",
          background: "linear-gradient(to top, rgba(180,50,30,0.1) 0%, transparent 100%)",
          filter: "blur(4px)",
          animation: "shimmer 3s ease-in-out infinite",
        }}
      />
    </div>
  )
}

// ===================== BLUE TARGET RIM =====================
function BlueTargetRim({ scale }: { scale: number }) {
  return (
    <div 
      className="pointer-events-none absolute left-1/2 -translate-x-1/2"
      style={{ 
        top: "8%",
        width: "70%",
        height: "35%",
        transform: `translateX(-50%) scale(${1/scale})`,
      }}
    >
      {/* Upper arc rim */}
      <svg viewBox="0 0 100 50" className="h-full w-full overflow-visible" style={{ animation: "rim-oscillate 6s ease-in-out infinite" }}>
        <defs>
          <filter id="blue-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M 10 45 Q 50 0 90 45"
          fill="none"
          stroke="rgba(0,191,255,0.5)"
          strokeWidth="1.5"
          filter="url(#blue-glow)"
          style={{ animation: "rim-flicker 2s ease-in-out infinite" }}
        />
        <path
          d="M 15 42 Q 50 5 85 42"
          fill="none"
          stroke="rgba(100,200,255,0.3)"
          strokeWidth="0.8"
          filter="url(#blue-glow)"
        />
      </svg>
    </div>
  )
}

// ===================== BLUE TITLE LABEL =====================
function BlueTitleLabel({ label, scale }: { label: string; scale: number }) {
  return (
    <div 
      className="pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center"
      style={{ 
        top: "-12%",
        transform: `translateX(-50%) scale(${1/scale})`,
      }}
    >
      <span
        className="font-mono text-xs font-bold uppercase tracking-[0.2em]"
        style={{
          color: "#00BFFF",
          textShadow: "0 0 8px rgba(0,191,255,0.8), 0 0 16px rgba(0,191,255,0.5), 0 0 24px rgba(0,191,255,0.3)",
          animation: "title-flicker 3s ease-in-out infinite",
        }}
      >
        {label}
      </span>
    </div>
  )
}

// ===================== GUN TIP ENERGY CROSS =====================
function GunTipEnergyCross() {
  return (
    <div 
      className="pointer-events-none absolute"
      style={{
        top: "18%",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {/* Center glow point */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(100,200,255,1) 0%, rgba(0,191,255,0.6) 50%, transparent 100%)",
          boxShadow: "0 0 12px rgba(0,191,255,0.9), 0 0 24px rgba(0,191,255,0.5)",
          animation: "energy-pulse 1.5s ease-in-out infinite",
        }}
      />
      {/* Crosshair flare - horizontal */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 24,
          height: 2,
          background: "linear-gradient(90deg, transparent 0%, rgba(0,191,255,0.8) 30%, rgba(100,200,255,1) 50%, rgba(0,191,255,0.8) 70%, transparent 100%)",
          boxShadow: "0 0 8px rgba(0,191,255,0.6)",
          animation: "cross-flicker 2s ease-in-out infinite",
        }}
      />
      {/* Crosshair flare - vertical */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 2,
          height: 24,
          background: "linear-gradient(180deg, transparent 0%, rgba(0,191,255,0.8) 30%, rgba(100,200,255,1) 50%, rgba(0,191,255,0.8) 70%, transparent 100%)",
          boxShadow: "0 0 8px rgba(0,191,255,0.6)",
          animation: "cross-flicker 2s ease-in-out infinite",
          animationDelay: "0.5s",
        }}
      />
      {/* Outer bloom */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,191,255,0.15) 0%, transparent 70%)",
          filter: "blur(4px)",
          animation: "bloom-pulse 2s ease-in-out infinite",
        }}
      />
    </div>
  )
}

// ===================== MAIN COMPONENT =====================
export function BattleScreen() {
  const [mounted, setMounted] = useState(false)
  const [gunVisible, setGunVisible] = useState(false)

  useEffect(() => {
    const bgTimer = setTimeout(() => setMounted(true), 50)
    const gunTimer = setTimeout(() => setGunVisible(true), 350)
    return () => {
      clearTimeout(bgTimer)
      clearTimeout(gunTimer)
    }
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ backgroundColor: "#0a0a0f" }}>
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes ember-rise {
          0% { transform: translateY(0) scale(1); opacity: 0.8; }
          50% { opacity: 1; }
          100% { transform: translateY(-120px) scale(0.3); opacity: 0; }
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0.3; transform: translateX(-50%) scaleX(1); }
          50% { opacity: 0.5; transform: translateX(-50%) scaleX(1.05); }
        }
        @keyframes rim-oscillate {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes rim-flicker {
          0%, 100% { opacity: 0.6; }
          25% { opacity: 0.8; }
          50% { opacity: 0.5; }
          75% { opacity: 0.9; }
        }
        @keyframes title-flicker {
          0%, 100% { opacity: 0.9; }
          25% { opacity: 1; }
          50% { opacity: 0.85; }
          75% { opacity: 0.95; }
        }
        @keyframes energy-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.9; }
          50% { transform: translate(-50%, -50%) scale(1.3); opacity: 1; }
        }
        @keyframes cross-flicker {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes bloom-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.6; }
        }
      `}</style>

      {/* ============= BATTLEFIELD BACKGROUND ============= */}
      <div
        className={`fixed inset-0 z-0 transition-opacity duration-500 ease-out ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src="/images/battlefield.png"
          alt="Battlefield environment"
          fill
          className="object-cover"
          style={{ objectPosition: "center" }}
          priority
        />
      </div>

      {/* ============= CINEMATIC VIGNETTE OVERLAY ============= */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.55) 85%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* ============= AVATAR TARGETS WITH EFFECTS ============= */}
      {AVATAR_TARGETS.map((avatar) => (
        <div
          key={avatar.id}
          className="pointer-events-none absolute"
          style={{
            left: avatar.left,
            bottom: avatar.bottom,
            transform: `translateX(-50%) scale(${avatar.scale})`,
            height: avatar.height,
            width: "auto",
            zIndex: avatar.z,
          }}
        >
          {/* Red Aura Engine */}
          <RedAuraEngine scale={avatar.scale} />
          
          {/* Blue Target Rim */}
          <BlueTargetRim scale={avatar.scale} />
          
          {/* Blue Title Label */}
          <BlueTitleLabel label={avatar.label} scale={avatar.scale} />
          
          {/* Avatar Image */}
          <Image
            src={avatar.src}
            alt={`Target ${avatar.id}`}
            width={400}
            height={600}
            className="relative z-[2] h-full w-auto object-contain"
            unoptimized
          />
        </div>
      ))}

      {/* ============= GUN OVERLAY WITH ENERGY CROSS ============= */}
      <div
        className={`pointer-events-none fixed bottom-0 left-1/2 z-[10] -translate-x-1/2 transition-opacity duration-500 ease-out ${
          gunVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: "clamp(300px, 40vw, 600px)",
          height: "auto",
        }}
      >
        {/* Gun Tip Energy Cross */}
        <GunTipEnergyCross />
        
        <Image
          src="/images/gun.png"
          alt="Weapon"
          width={600}
          height={400}
          className="h-auto w-full object-contain"
          style={{ objectPosition: "bottom center" }}
          priority
        />
      </div>
    </div>
  )
}
