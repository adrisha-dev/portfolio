"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"

// ===================== AVATAR TARGET DATA =====================
const AVATAR_TARGETS = [
  { id: 1, src: "/images/avatar1.png", label: "SQUADS & ALLIANCES", left: "10%", bottom: "8%", scale: 2.4, height: "clamp(180px, 28vh, 320px)", z: 4 },
  { id: 2, src: "/images/avatar2.png", label: "MISSIONS", left: "28%", bottom: "5%", scale: 2.8, height: "clamp(200px, 32vh, 360px)", z: 5 },
  { id: 3, src: "/images/avatar3.png", label: "PROFILE", left: "50%", bottom: "10%", scale: 3.0, height: "clamp(220px, 35vh, 400px)", z: 6 },
  { id: 4, src: "/images/avatar4.png", label: "CORE ABILITIES", left: "72%", bottom: "12%", scale: 2.5, height: "clamp(190px, 30vh, 340px)", z: 4 },
  { id: 5, src: "/images/avatar5.png", label: "CONTACT", left: "90%", bottom: "8%", scale: 2.4, height: "clamp(190px, 30vh, 340px)", z: 4 },
]

// ===================== ENHANCED RED AURA ENGINE =====================
function RedAuraEngine() {
  const sparks = useMemo(() => 
    Array.from({ length: 16 }, (_, i) => ({
      id: i,
      left: 15 + Math.random() * 70,
      delay: Math.random() * 4,
      duration: 2 + Math.random() * 2.5,
      size: 3 + Math.random() * 4,
    })), []
  )

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Strong outer glow - increased blur by 40% */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center 70%, rgba(200,50,35,0.25) 0%, rgba(150,30,20,0.15) 40%, transparent 70%)",
          filter: "blur(28px)",
          animation: "aura-flicker 3s ease-in-out infinite",
        }}
      />
      {/* Inner rim light around silhouette */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center 55%, rgba(255,80,50,0.2) 0%, rgba(220,60,40,0.1) 30%, transparent 55%)",
          filter: "blur(12px)",
        }}
      />
      {/* Silhouette edge highlight */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center 50%, rgba(255,100,60,0.15) 0%, transparent 40%)",
          filter: "blur(6px)",
          animation: "edge-pulse 2.5s ease-in-out infinite",
        }}
      />
      {/* Increased ember particles (30% more density) */}
      {sparks.map((spark) => (
        <div
          key={spark.id}
          className="absolute rounded-full"
          style={{
            left: `${spark.left}%`,
            bottom: "8%",
            width: spark.size,
            height: spark.size,
            background: "radial-gradient(circle, rgba(255,140,70,1) 0%, rgba(220,60,30,0.5) 100%)",
            boxShadow: "0 0 8px rgba(255,120,60,0.8), 0 0 16px rgba(255,80,40,0.4)",
            animation: `ember-rise ${spark.duration}s ease-out infinite`,
            animationDelay: `${spark.delay}s`,
          }}
        />
      ))}
      {/* Stronger ground glow beneath feet */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: "100%",
          height: "20%",
          background: "radial-gradient(ellipse at center bottom, rgba(200,60,40,0.35) 0%, rgba(150,40,25,0.2) 40%, transparent 70%)",
          filter: "blur(8px)",
          animation: "ground-glow 4s ease-in-out infinite",
        }}
      />
    </div>
  )
}

// ===================== BLUE TARGET CROSS (CHEST LEVEL) =====================
function BlueTargetCross() {
  return (
    <div 
      className="pointer-events-none absolute z-[3]"
      style={{ 
        top: "42%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Faint circular halo behind cross */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,191,255,0.12) 0%, rgba(0,150,200,0.06) 50%, transparent 70%)",
          filter: "blur(6px)",
          animation: "halo-pulse 3s ease-in-out infinite",
        }}
      />
      {/* Center glow point */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(150,220,255,1) 0%, rgba(0,191,255,0.8) 60%, transparent 100%)",
          boxShadow: "0 0 10px rgba(0,191,255,0.9), 0 0 20px rgba(0,191,255,0.6)",
          animation: "cross-center-pulse 2s ease-in-out infinite",
        }}
      />
      {/* Thin crosshair - horizontal */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 28,
          height: 1.5,
          background: "linear-gradient(90deg, transparent 0%, rgba(0,191,255,0.7) 25%, rgba(100,220,255,1) 50%, rgba(0,191,255,0.7) 75%, transparent 100%)",
          boxShadow: "0 0 6px rgba(0,191,255,0.7), 0 0 12px rgba(0,191,255,0.4)",
          animation: "cross-flicker 2.5s ease-in-out infinite",
        }}
      />
      {/* Thin crosshair - vertical */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 1.5,
          height: 28,
          background: "linear-gradient(180deg, transparent 0%, rgba(0,191,255,0.7) 25%, rgba(100,220,255,1) 50%, rgba(0,191,255,0.7) 75%, transparent 100%)",
          boxShadow: "0 0 6px rgba(0,191,255,0.7), 0 0 12px rgba(0,191,255,0.4)",
          animation: "cross-flicker 2.5s ease-in-out infinite",
          animationDelay: "0.3s",
        }}
      />
    </div>
  )
}

// ===================== HUD TITLE LABEL =====================
function HudTitleLabel({ label }: { label: string }) {
  return (
    <div 
      className="pointer-events-none absolute left-1/2 z-[4] whitespace-nowrap text-center"
      style={{ 
        top: "-8%",
        transform: "translateX(-50%)",
      }}
    >
      {/* Background strip */}
      <div
        className="relative overflow-hidden rounded-md px-3 py-1.5 sm:px-4 sm:py-2"
        style={{
          background: "rgba(0,0,0,0.1)",
          borderRadius: "6px",
        }}
      >
        {/* Scanline shimmer effect */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, transparent 0%, rgba(0,191,255,0.03) 50%, transparent 100%)",
            animation: "scanline-sweep 4s linear infinite",
          }}
        />
        <span
          className="relative font-mono font-bold uppercase"
          style={{
            fontSize: "clamp(12px, 1.2vw, 20px)",
            letterSpacing: "2px",
            color: "#00BFFF",
            textShadow: "0 0 10px rgba(0,191,255,0.9), 0 0 20px rgba(0,191,255,0.6), 0 0 30px rgba(0,191,255,0.4)",
            animation: "title-flicker 3s ease-in-out infinite",
          }}
        >
          [ {label} ]
        </span>
      </div>
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
          0% { transform: translateY(0) scale(1); opacity: 0.9; }
          50% { opacity: 1; }
          100% { transform: translateY(-140px) scale(0.2); opacity: 0; }
        }
        @keyframes aura-flicker {
          0%, 100% { opacity: 0.8; }
          25% { opacity: 1; }
          50% { opacity: 0.7; }
          75% { opacity: 0.95; }
        }
        @keyframes edge-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes ground-glow {
          0%, 100% { opacity: 0.7; transform: translateX(-50%) scaleX(1); }
          50% { opacity: 1; transform: translateX(-50%) scaleX(1.1); }
        }
        @keyframes title-flicker {
          0%, 100% { opacity: 0.9; }
          25% { opacity: 1; }
          50% { opacity: 0.8; }
          75% { opacity: 0.95; }
        }
        @keyframes scanline-sweep {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes cross-flicker {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes cross-center-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.85; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
        }
        @keyframes halo-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
          50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.7; }
        }
        @keyframes energy-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.9; }
          50% { transform: translate(-50%, -50%) scale(1.3); opacity: 1; }
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
          {/* Enhanced Red Aura Engine */}
          <RedAuraEngine />
          
          {/* Blue Target Cross at chest level */}
          <BlueTargetCross />
          
          {/* HUD Title Label anchored to head */}
          <HudTitleLabel label={avatar.label} />
          
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
