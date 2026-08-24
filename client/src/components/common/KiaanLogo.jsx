import React from 'react';

export const KiaanEmblem = ({ className = "w-10 h-10", isDark = false }) => {
  return (
    <div className={`relative flex items-center justify-center rounded-2xl overflow-hidden shrink-0 shadow-soft-sm ${
      isDark ? 'bg-black border border-amber-500/30' : 'bg-slate-950 border border-amber-400/20'
    } ${className}`}>
      {/* Subtle Golden Glow behind the logo */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/30 via-yellow-400/20 to-transparent opacity-80" />
      
      {/* High-Fidelity Golden Metallic KT Monogram */}
      <svg
        viewBox="0 0 120 100"
        className="w-full h-full p-1.5 relative z-10 drop-shadow-[0_2px_8px_rgba(234,179,8,0.4)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Rich 3D Gold Gradient */}
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2A3" />
            <stop offset="25%" stopColor="#F5B82E" />
            <stop offset="50%" stopColor="#D98A00" />
            <stop offset="75%" stopColor="#F7CE68" />
            <stop offset="100%" stopColor="#C47A00" />
          </linearGradient>

          <linearGradient id="goldSheen" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D98A00" />
            <stop offset="50%" stopColor="#FFF9D2" />
            <stop offset="100%" stopColor="#E5A610" />
          </linearGradient>

          <filter id="goldShine" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#FFE066" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Letter 'K' Serif Stem with Flare Top & Bottom */}
        <path
          d="M 22 18 C 30 18 32 19 32 24 L 32 76 C 32 81 30 82 22 82 L 40 82 C 34 82 36 81 36 76 L 36 24 C 36 19 34 18 40 18 Z"
          fill="url(#goldGradient)"
        />
        
        {/* Dynamic Curved Upper Wing of K merging into upper swoosh */}
        <path
          d="M 36 50 C 45 42 58 28 65 20 C 67 18 69 18 73 18 L 82 18 C 76 22 66 34 52 48 L 76 78 C 82 82 86 82 92 82 L 78 82 C 72 78 60 62 48 53 Z"
          fill="url(#goldSheen)"
          filter="url(#goldShine)"
        />

        {/* Elegant Golden Swoosh Arc connecting K and T */}
        <path
          d="M 12 86 C 22 75 36 56 60 40 C 78 28 98 22 114 18 C 104 22 88 26 72 35 C 50 48 32 68 18 90 C 14 94 11 92 12 86 Z"
          fill="url(#goldGradient)"
        />

        {/* Letter 'T' Stem & Top Bar */}
        <path
          d="M 72 26 L 108 26 C 112 26 114 24 114 20 L 70 20 C 70 24 72 26 72 26 Z"
          fill="url(#goldGradient)"
        />
        <path
          d="M 86 26 L 86 76 C 86 81 84 82 78 82 L 96 82 C 90 82 92 81 92 76 L 92 26 Z"
          fill="url(#goldSheen)"
        />
      </svg>
    </div>
  );
};

export const KiaanBrandLogo = ({
  showBadge = true,
  badgeText = "PRO",
  subtitle = "Commerce Business OS",
  size = "md",
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Luxury Golden KT Monogram Tile */}
      <KiaanEmblem className={size === "lg" ? "w-12 h-12" : size === "sm" ? "w-8 h-8" : "w-10 h-10"} />

      {/* Two-Tone Typography: KIAAN (Black/Dark Slate) + TECHNOLOGY (Amber Gold) */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className="font-black tracking-tight text-lg sm:text-xl font-heading flex items-center">
            <span className="text-slateText-main">KIAAN</span>
            <span className="text-[#E5A610] tracking-tight">TECHNOLOGY</span>
          </span>
          {showBadge && (
            <span className="text-[9px] uppercase font-black px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 shadow-soft-sm">
              {badgeText}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-[10px] sm:text-[11px] text-slateText-muted font-bold tracking-wide mt-1">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default KiaanBrandLogo;
