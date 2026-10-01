'use client';

interface ContactlessIconProps {
  className?: string;
}

export default function ContactlessIcon({ className = 'w-5 h-5 text-current' }: ContactlessIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      title="Contactless Payment / NFC"
    >
      <path d="M7 16a5 5 0 0 1 0-8" />
      <path d="M10.5 18.5a8.5 8.5 0 0 1 0-13" />
      <path d="M14 21a12 12 0 0 1 0-18" />
      <path d="M17.5 23.5a15.5 15.5 0 0 1 0-23" opacity="0.4" />
    </svg>
  );
}
