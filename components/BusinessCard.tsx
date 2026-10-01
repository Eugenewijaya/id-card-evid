'use client';

import { useState, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import { ProfileData } from '@/lib/types';
import { getCardTheme } from '@/lib/themes';
import CardFront from './CardFront';
import CardBack from './CardBack';
import GlossyOverlay from './GlossyOverlay';

interface BusinessCardProps {
  profile: ProfileData;
}

export default function BusinessCard({ profile }: BusinessCardProps) {
  // Theme is controlled solely from Admin Dashboard Settings
  const themeId = profile.settings?.cardTheme || 'obsidian';
  const activeTheme = getCardTheme(themeId);

  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const springConfig = { stiffness: 140, damping: 18 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const xPct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const yPct = Math.max(0, Math.min(100, (y / rect.height) * 100));
    setMousePos({ x: xPct, y: yPct });

    const centerY = rect.height / 2;
    const centerX = rect.width / 2;

    const rX = ((y - centerY) / rect.height) * -16;
    const rY = ((x - centerX) / rect.width) * 16;

    rotateX.set(rX);
    rotateY.set(rY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    setMousePos({ x: 50, y: 50 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flex flex-col items-center w-full px-4">
      {/* 3D Smart ID Card Container */}
      <div
        style={{ perspective: 1100 }}
        className="relative w-full max-w-[420px] aspect-[1.586/1] mx-auto cursor-pointer"
      >
        <motion.div
          ref={cardRef}
          className="relative w-full h-full rounded-2xl"
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseLeave}
          onTouchStart={handleMouseEnter}
          onClick={toggleFlip}
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: isHovered ? -4 : [0, -8, 0],
          }}
          transition={{
            opacity: { duration: 0.5 },
            scale: { duration: 0.5 },
            y: {
              duration: isHovered ? 0.3 : 5,
              repeat: isHovered ? 0 : Infinity,
              ease: 'easeInOut',
            },
          }}
        >
          {/* Inner motion div for 3D flip */}
          <motion.div
            className="absolute inset-0 w-full h-full rounded-2xl"
            style={{ transformStyle: 'preserve-3d' }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 90, damping: 16 }}
          >
            <CardFront profile={profile} theme={activeTheme} />
            <CardBack profile={profile} theme={activeTheme} />
            {isHovered && <GlossyOverlay mouseX={mousePos.x} mouseY={mousePos.y} />}
          </motion.div>
        </motion.div>
      </div>

      {/* Flip hint button */}
      <div className="mt-5 flex items-center gap-2">
        <button
          onClick={toggleFlip}
          className="text-xs font-medium text-secondary hover:text-primary transition-colors flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/5 hover:bg-black/10 backdrop-blur-sm shadow-sm"
        >
          <span className="text-sm">↺</span>
          <span>{isFlipped ? 'Lihat Sisi Depan' : 'Klik / Tap untuk Balik Kartu'}</span>
        </button>
      </div>
    </div>
  );
}
