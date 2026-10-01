'use client';

interface CardNetworkBadgeProps {
  type?: 'master' | 'visa' | 'vip';
  themeId?: string;
  className?: string;
}

export default function CardNetworkBadge({ type = 'master', themeId, className = '' }: CardNetworkBadgeProps) {
  if (type === 'master') {
    // Two overlapping circles
    const isTitanium = themeId === 'titanium';
    const circle1Color = isTitanium ? 'rgba(71, 85, 105, 0.75)' : '#EB001B';
    const circle2Color = isTitanium ? 'rgba(148, 163, 184, 0.75)' : '#F79E1B';

    return (
      <div className={`flex items-center ${className}`} title="Payment Network">
        <svg width="40" height="26" viewBox="0 0 40 26" fill="none">
          <circle cx="14" cy="13" r="11" fill={circle1Color} fillOpacity={isTitanium ? "0.8" : "0.9"} />
          <circle cx="26" cy="13" r="11" fill={circle2Color} fillOpacity={isTitanium ? "0.7" : "0.9"} />
          <path
            d="M20 5.4A11 11 0 0 0 20 20.6A11 11 0 0 0 20 5.4Z"
            fill={isTitanium ? "#94A3B8" : "#FF5F00"}
          />
        </svg>
      </div>
    );
  }

  if (type === 'visa') {
    return (
      <div className={`flex flex-col items-end leading-none font-black italic tracking-tighter ${className}`} title="Visa Infinite">
        <span className="text-base tracking-widest text-amber-300 font-serif">VISA</span>
        <span className="text-[7px] tracking-[0.2em] uppercase font-sans text-amber-200/90 not-italic">INFINITE</span>
      </div>
    );
  }

  // VIP / Private Client Shield
  return (
    <div className={`flex items-center gap-1.5 ${className}`} title="Private Member">
      <div className="w-6 h-6 rounded-full border border-amber-400/60 bg-gradient-to-tr from-amber-600/30 to-amber-300/30 flex items-center justify-center">
        <svg className="w-3.5 h-3.5 text-amber-300" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-[8px] font-bold tracking-widest text-amber-400/90">BLACK</span>
        <span className="text-[6px] tracking-wider text-amber-200/70">EXCLUSIVE</span>
      </div>
    </div>
  );
}
