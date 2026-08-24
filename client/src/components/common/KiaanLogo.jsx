import React from 'react';
import ktLogoImg from '../../assets/kt-gold-logo.png';

/**
 * Exact Golden 3D KT Monogram Emblem using the user's exact uploaded asset
 */
export const KiaanEmblem = ({ className = "w-10 h-10" }) => {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <img
        src={ktLogoImg}
        alt="Kiaan Technology Gold Logo"
        className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(245,158,11,0.35)] hover:scale-105 transition-transform"
      />
    </div>
  );
};

/**
 * Exact Typography & Logo Brand Component
 * Font: Condensed Display (Anton / Oswald / Bebas Neue)
 * Dual-tone: "KIAAN" (Dark Slate / Black) + "TECHNOLOGY" (Bold Amber Gold)
 */
export const KiaanBrandLogo = ({
  showBadge = true,
  badgeText = "PRO",
  subtitle = "Commerce Business OS",
  size = "md",
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-2 select-none overflow-hidden max-w-full ${className}`}>
      {/* Exact Golden 3D KT Monogram */}
      <KiaanEmblem
        className={
          size === "lg"
            ? "w-12 h-12 min-w-[48px]"
            : size === "sm"
            ? "w-8 h-8 min-w-[32px]"
            : "w-10 h-10 min-w-[40px]"
        }
      />

      {/* Exact Impactful Typography */}
      <div className="flex flex-col min-w-0 justify-center">
        <div className="flex items-center gap-1.5 flex-nowrap leading-none">
          <span
            className="tracking-tight uppercase font-display font-extrabold flex items-center leading-none"
            style={{
              fontFamily: "'Oswald', 'Anton', 'Bebas Neue', Impact, sans-serif",
              letterSpacing: '0.01em',
              fontSize: size === 'lg' ? '1.45rem' : size === 'sm' ? '0.95rem' : '1.1rem',
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
