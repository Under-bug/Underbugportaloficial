import React from 'react';

interface UnderbugLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function UnderbugLogo({ className = '', showText = true, size = 'md' }: UnderbugLogoProps) {
  // Size classes for the icon/emblem
  const iconSizes = {
    sm: 'h-6 w-6',
    md: 'h-[38px] w-[38px]',
    lg: 'h-16 w-16',
  };

  const textSizes = {
    sm: 'text-sm tracking-[-0.03em]',
    md: 'text-[24px] tracking-[-0.04em]',
    lg: 'text-[40px] tracking-[-0.04em]',
  };

  const spacingClasses = {
    sm: 'space-x-1.5',
    md: 'space-x-2',
    lg: 'space-x-3.5',
  };

  return (
    <div className={`flex items-center ${showText ? spacingClasses[size] : ''} ${className}`}>
      {showText && (
        <span className={`font-sans font-black uppercase flex items-center select-none leading-none ${textSizes[size]}`}>
          <span style={{ color: 'var(--brand-text)' }}>UNDER</span>
        </span>
      )}

      {/* Center green beetle emblem circle */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconSizes[size]} text-brand-green filter drop-shadow-[0_0_8px_rgba(74,222,128,0.25)]`}
      >
        {/* Outer Circle with split ring details */}
        <circle
          cx="50"
          cy="50"
          r="45"
          className="stroke-brand-green"
          strokeWidth="4"
          strokeDasharray="360"
        />
        
        {/* Inner concentric layout indicator segments */}
        <circle
          cx="50"
          cy="50"
          r="40"
          className="stroke-brand-green/20"
          strokeWidth="1"
          strokeDasharray="10 6"
        />

        {/* Head */}
        <circle cx="50" cy="30" r="4.5" className="fill-brand-green" />
        
        {/* Antennas */}
        <path
          d="M48 26 C43 23, 40 20, 42 16"
          className="stroke-brand-green"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M52 26 C57 23, 60 20, 58 16"
          className="stroke-brand-green"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Top Antenna Ends */}
        <circle cx="42" cy="15" r="1.5" className="fill-brand-green" />
        <circle cx="58" cy="15" r="1.5" className="fill-brand-green" />

        {/* Top Wings/Shoulders - angled tech wings */}
        <path
          d="M38 33 C38 33, 31 35, 33 44 C35 50, 43 45, 45 40 Z"
          className="fill-brand-green/90"
        />
        <path
          d="M62 33 C62 33, 69 35, 67 44 C65 50, 57 45, 55 40 Z"
          className="fill-brand-green/90"
        />

        {/* Six Tech Legs (Left: 3, Right: 3) */}
        {/* Leg 1: Front L & R */}
        <path
          d="M35 38 Q24 38 22 45"
          className="stroke-brand-green"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M65 38 Q76 38 78 45"
          className="stroke-brand-green"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Leg 2: Middle L & R */}
        <path
          d="M32 50 Q21 54 20 62"
          className="stroke-brand-green"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M68 50 Q79 54 80 62"
          className="stroke-brand-green"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Leg 3: Back L & R */}
        <path
          d="M36 66 Q26 73 25 80"
          className="stroke-brand-green"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M64 66 Q74 73 75 80"
          className="stroke-brand-green"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Beetle Central Carapace Shield */}
        <path
          d="M50 36 C41 36, 38 48, 38 62 C38 73, 44 76, 50 78 C56 76, 62 73, 62 62 C62 48, 59 36, 50 36 Z"
          className="stroke-brand-green"
          strokeWidth="3"
          strokeLinejoin="round"
          fill="transparent"
        />

        {/* Back spine line of shield */}
        <line x1="50" y1="36" x2="50" y2="78" className="stroke-brand-green" strokeWidth="2.5" />
        {/* Horizontal intersection divider of shield */}
        <path d="M38 56 Q50 63 62 56" className="stroke-brand-green" strokeWidth="2.5" fill="none" />

        {/* 4 Inside Nuclei/Segments (Leaf-like clover representation from user's bug) */}
        <path d="M44 48 C44 48, 47 43, 49 48 C49 48, 46 53, 44 48 Z" className="fill-brand-green" />
        <path d="M56 48 C56 48, 53 43, 51 48 C51 48, 54 53, 56 48 Z" className="fill-brand-green" />
        <path d="M44 64 C44 64, 47 69, 49 64 C49 64, 46 59, 44 64 Z" className="fill-brand-green" />
        <path d="M56 64 C56 64, 53 69, 51 64 C51 64, 54 59, 56 64 Z" className="fill-brand-green" />
      </svg>

      {showText && (
        <span className={`font-sans font-black uppercase flex items-center select-none leading-none ${textSizes[size]}`}>
          <span className="text-brand-green">BUG</span>
        </span>
      )}
    </div>
  );
}
