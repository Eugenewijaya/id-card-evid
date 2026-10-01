'use client';

export default function GlossyOverlay({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 rounded-2xl overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at ${mouseX}% ${mouseY}%, rgba(255, 255, 255, 0.35) 0%, transparent 60%),
          linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.1) 25%, transparent 30%)
        `,
      }}
    />
  );
}
