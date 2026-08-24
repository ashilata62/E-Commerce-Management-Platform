import React from 'react';

/**
 * High-Resolution Luxury Golden KT Monogram Emblem
 * Handcrafted vector SVG matching the user's exact golden monogram reference
 */
export const KiaanEmblem = ({ className = "w-10 h-10", isDark = true }) => {
  return (
    <div
      className={`relative flex items-center justify-center rounded-xl overflow-hidden shrink-0 shadow-soft-sm ${
        isDark ? 'bg-[#0F1117] border border-amber-500/30' : 'bg-white border border-surface-border'
      } ${className}`}
    >
      {/* Ambient Gold Radial Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/20 via-yellow-500/10 to-transparent pointer-events-none" />

      {/* Golden Metallic KT Monogram */}
      <svg
        viewBox="0 0 100 90"
        className="w-full h-full p-1 relative z-10 drop-shadow-[0_2px_6px_rgba(245,158,11,0.45)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Multi-Stop Metallic Gold Gradient */}
          <linearGradient id="luxuryGoldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4B8" />
            <stop offset="25%" stopColor="#FFC83B" />
            <stop offset="55%" stopColor="#E69500" />
            <stop offset="80%" stopColor="#FFDF73" />
            <stop offset="100%" stopColor="#B36B00" />
          </linearGradient>

          <linearGradient id="luxuryGoldGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFBE6" />
            <stop offset="35%" stopColor="#FFB800" />
            <stop offset="70%" stopColor="#CC7A00" />
            <stop offset="100%" stopColor="#FFE066" />
          </linearGradient>

          <linearGradient id="goldSwooshGrad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#B36B00" />
            <stop offset="30%" stopColor="#FFF2A3" />
            <stop offset="65%" stopColor="#FFB800" />
            <stop offset="100%" stopColor="#E69500" />
          </linearGradient>
        </defs>

        {/* Letter 'K' Left Serif Pillar */}
        <path
          d="M 18 16 C 24 16 26 18 26 22 L 26 68 C 26 72 24 74 18 74 L 32 74 C 27 74 29 72 29 68 L 29 22 C 29 18 27 16 32 16 Z"
          fill="url(#luxuryGoldGrad1)"
        />

        {/* Letter 'K' Diagonal Upper Wing */}
        <path
          d="M 28 44 C 36 36 46 25 54 18 C 56 16 58 16 62 16 L 70 16 C 64 20 54 30 42 43 L 64 70 C 68 74 72 74 76 74 L 66 74 C 60 70 48 54 38 46 Z"
          fill="url(#luxuryGoldGrad2)"
        />

        {/* Graceful Curved Golden Swoosh Under & Across K & T */}
        <path
          d="M 10 78 C 18 68 30 52 50 36 C 65 24 82 18 95 14 C 88 18 74 22 60 30 C 42 42 26 60 14 82 C 11 86 9 84 10 78 Z"
          fill="url(#goldSwooshGrad)"
        />

        {/* Letter 'T' Top Crossbar */}
        <path
          d="M 58 22 L 90 22 C 94 22 95 20 95 16 L 56 16 C 56 20 58 22 58 22 Z"
          fill="url(#luxuryGoldGrad1)"
        />

        {/* Letter 'T' Slanted Pillar */}
        <path
          d="M 70 22 L 70 68 C 70 72 68 74 62 74 L 78 74 C 72 74 74 72 74 68 L 74 22 Z"
          fill="url(#luxuryGoldGrad2)"
        />
      </svg>
    </div>
  );
};

/**
 * Exact Typography & Logo Brand Component
 * Font: Condensed Display (Anton / Oswald / Bebas Neue)
 * Dual-tone: "KIAAN" in Dark Slate / Black + "TECHNOLOGY" in Bold Golden Amber
 */
export const KiaanBrandLogo = ({
  showBadge = true,
  badgeText = "PRO",
  subtitle = "Commerce Business OS",
  size = "md",
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-2.5 select-none overflow-hidden max-w-full ${className}`}>
      {/* Golden KT Monogram Tile */}
      <KiaanEmblem
        className={
          size === "lg"
            ? "w-11 h-11 min-w-[44px]"
            : size === "sm"
            ? "w-8 h-8 min-w-[32px]"
            : "w-9 h-9 min-w-[36px]"
        }
      />

      {/* Impactful Condensed Typography */}
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-1.5 flex-nowrap leading-none">
          <span
            className="tracking-tight uppercase font-display font-extrabold flex items-center leading-none"
            style={{
              fontFamily: "'Oswald', 'Anton', 'Bebas Neue', Impact, sans-serif",
              letterSpacing: '0.02em',
              fontSize: size === 'lg' ? '1.5rem' : size === 'sm' ? '1rem' : '1.15rem',
            }}
          >
            <span className="text-slateText-main font-black">KIAAN</span>
            <span className="text-[#F59E0B] font-black ml-0.5">TECHNOLOGY</span>
          </span>

          {showBadge && (
            <span className="text-[8px] font-black uppercase px-1 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-300 shrink-0">
              {badgeText}
            </span>
          )}
        </div>

        {subtitle && (
          <p className="text-[10px] text-slateText-muted font-bold tracking-tight mt-0.5 truncate">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default KiaanBrandLogo;
