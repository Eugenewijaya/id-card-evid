'use client';

interface EmvChipProps {
  type?: 'gold' | 'silver';
  className?: string;
}

export default function EmvChip({ type = 'gold', className = '' }: EmvChipProps) {
  const isGold = type === 'gold';

  const baseGradient = isGold
    ? 'linear-gradient(135deg, #FDE68A 0%, #F59E0B 45%, #D97706 70%, #FEF3C7 100%)'
    : 'linear-gradient(135deg, #F1F5F9 0%, #CBD5E1 45%, #94A3B8 70%, #FFFFFF 100%)';

  const borderColor = isGold ? '#B45309' : '#64748B';
  const lineColor = isGold ? 'rgba(180, 83, 9, 0.45)' : 'rgba(71, 85, 105, 0.45)';

  return (
    <div
      className={`relative w-11 h-8 rounded-md overflow-hidden shadow-inner flex-shrink-0 ${className}`}
      style={{
        background: baseGradient,
        border: `1px solid ${borderColor}`,
        boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.6), 0 2px 4px rgba(0,0,0,0.3)',
      }}
      title="EMV Smart Chip"
    >
      {/* Circuit lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 44 32" fill="none">
        {/* Horizontal divider */}
        <line x1="0" y1="16" x2="44" y2="16" stroke={lineColor} strokeWidth="1" />
        
        {/* Left vertical cuts */}
        <line x1="14" y1="0" x2="14" y2="10" stroke={lineColor} strokeWidth="1" />
        <line x1="14" y1="22" x2="14" y2="32" stroke={lineColor} strokeWidth="1" />

        {/* Right vertical cuts */}
        <line x1="30" y1="0" x2="30" y2="10" stroke={lineColor} strokeWidth="1" />
        <line x1="30" y1="22" x2="30" y2="32" stroke={lineColor} strokeWidth="1" />

        {/* Central contact pad outline */}
        <rect
          x="14"
          y="10"
          width="16"
          height="12"
          rx="2"
          stroke={lineColor}
          strokeWidth="1"
          fill="none"
        />

        {/* Subtle diagonal reflective highlight */}
        <line x1="2" y1="2" x2="10" y2="2" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
