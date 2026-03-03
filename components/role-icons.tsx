export function RecruiterIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Crosshair / target - represents seeking talent */}
      <circle cx="60" cy="60" r="36" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <circle cx="60" cy="60" r="20" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <circle cx="60" cy="60" r="4" fill="currentColor" opacity="0.8" />
      <line x1="60" y1="18" x2="60" y2="38" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="60" y1="82" x2="60" y2="102" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="18" y1="60" x2="38" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="82" y1="60" x2="102" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      {/* Head silhouette */}
      <circle cx="60" cy="48" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <path d="M44 78 C44 65 52 58 60 58 C68 58 76 65 76 78" stroke="currentColor" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
    </svg>
  )
}

export function TeammateIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Connected nodes - represents collaboration */}
      <circle cx="60" cy="36" r="6" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      <circle cx="36" cy="76" r="6" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      <circle cx="84" cy="76" r="6" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      <line x1="56" y1="41" x2="40" y2="71" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      <line x1="64" y1="41" x2="80" y2="71" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      <line x1="42" y1="76" x2="78" y2="76" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      {/* Outer ring */}
      <circle cx="60" cy="60" r="44" stroke="currentColor" strokeWidth="0.75" opacity="0.15" strokeDasharray="4 6" />
      {/* Inner pulse */}
      <circle cx="60" cy="60" r="3" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

export function ExplorerIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Compass / navigation - represents exploration */}
      <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <circle cx="60" cy="60" r="28" stroke="currentColor" strokeWidth="0.75" opacity="0.3" strokeDasharray="3 5" />
      {/* Diamond compass needle */}
      <path d="M60 28 L66 60 L60 92 L54 60 Z" stroke="currentColor" strokeWidth="1" opacity="0.5" fill="none" />
      <path d="M60 28 L66 60 L60 44 L54 60 Z" fill="currentColor" opacity="0.15" />
      <path d="M28 60 L60 54 L92 60 L60 66 Z" stroke="currentColor" strokeWidth="1" opacity="0.3" fill="none" />
      {/* Center */}
      <circle cx="60" cy="60" r="3" fill="currentColor" opacity="0.6" />
      {/* Cardinal ticks */}
      <line x1="60" y1="16" x2="60" y2="22" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <line x1="60" y1="98" x2="60" y2="104" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <line x1="16" y1="60" x2="22" y2="60" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <line x1="98" y1="60" x2="104" y2="60" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    </svg>
  )
}

export function StudentIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Hexagonal data structure - represents learning / knowledge */}
      <polygon
        points="60,20 95,40 95,80 60,100 25,80 25,40"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.25"
        fill="none"
      />
      <polygon
        points="60,34 82,46 82,74 60,86 38,74 38,46"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.4"
        fill="none"
      />
      {/* Inner data lines */}
      <line x1="60" y1="34" x2="60" y2="86" stroke="currentColor" strokeWidth="0.75" opacity="0.2" />
      <line x1="38" y1="46" x2="82" y2="74" stroke="currentColor" strokeWidth="0.75" opacity="0.2" />
      <line x1="82" y1="46" x2="38" y2="74" stroke="currentColor" strokeWidth="0.75" opacity="0.2" />
      {/* Center eye / knowledge */}
      <circle cx="60" cy="60" r="8" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <circle cx="60" cy="60" r="3" fill="currentColor" opacity="0.6" />
    </svg>
  )
}
