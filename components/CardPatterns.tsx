'use client';

interface CardPatternsProps {
  type?: 'carbon' | 'metallic' | 'waves' | 'guilloche' | 'prismatic';
}

export default function CardPatterns({ type = 'carbon' }: CardPatternsProps) {
  if (type === 'carbon') {
    return (
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.12) 0%, transparent 65%),
            linear-gradient(45deg, rgba(255,255,255,0.06) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(255,255,255,0.06) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.06) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.06) 75%)
          `,
          backgroundSize: '100% 100%, 8px 8px, 8px 8px, 8px 8px, 8px 8px',
          backgroundPosition: '0 0, 0 0, 0 4px, 4px -4px, -4px 0px',
        }}
      />
    );
  }

  if (type === 'metallic') {
    // Brushed metallic micro-lines
    return (
      <div
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              90deg,
              rgba(255,255,255,0.03) 0px,
              rgba(255,255,255,0.03) 1px,
              transparent 1px,
              transparent 3px
            ),
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.6) 0%, transparent 50%)
          `,
        }}
      />
    );
  }

  if (type === 'waves') {
    // Elegant wavy security lines
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path d="M-50,80 Q50,20 150,80 T350,80 T550,80" fill="none" stroke="url(#waveGrad)" strokeWidth="1.2" />
        <path d="M-50,110 Q50,50 150,110 T350,110 T550,110" fill="none" stroke="url(#waveGrad)" strokeWidth="1.2" />
        <path d="M-50,140 Q50,80 150,140 T350,140 T550,140" fill="none" stroke="url(#waveGrad)" strokeWidth="1.2" />
        <path d="M-50,170 Q50,110 150,170 T350,170 T550,170" fill="none" stroke="url(#waveGrad)" strokeWidth="1.2" />
        <path d="M-50,200 Q50,140 150,200 T350,200 T550,200" fill="none" stroke="url(#waveGrad)" strokeWidth="1.2" />
      </svg>
    );
  }

  if (type === 'guilloche') {
    // Banknote / security rosette pattern
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15" xmlns="http://www.w3.org/2000/svg">
        <circle cx="280" cy="130" r="80" fill="none" stroke="#FDE68A" strokeWidth="0.8" strokeDasharray="4 2" />
        <circle cx="280" cy="130" r="110" fill="none" stroke="#FDE68A" strokeWidth="0.8" strokeDasharray="3 3" />
        <circle cx="280" cy="130" r="140" fill="none" stroke="#FDE68A" strokeWidth="0.8" />
        <circle cx="280" cy="130" r="170" fill="none" stroke="#FDE68A" strokeWidth="0.8" strokeDasharray="6 2" />
      </svg>
    );
  }

  // Prismatic fintech rainbow reflections
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-30 mix-blend-color-dodge"
      style={{
        backgroundImage: `
          linear-gradient(115deg, transparent 0%, rgba(6, 182, 212, 0.4) 30%, rgba(236, 72, 153, 0.4) 60%, transparent 100%),
          radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.4) 0%, transparent 50%)
        `,
      }}
    />
  );
}
