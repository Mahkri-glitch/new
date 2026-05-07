'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onEnter: () => void;
}

export function LoadingScreen({ onEnter }: LoadingScreenProps) {
  const [phase, setPhase] = useState<'idle' | 'entering' | 'done'>('idle');
  const [time, setTime] = useState('');
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
      setDateStr(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  // Skip on repeat visits in the same session
  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('scro-entered')) {
      setPhase('done');
      onEnter();
    }
  }, [onEnter]);

  const handleEnter = () => {
    sessionStorage.setItem('scro-entered', '1');
    setPhase('entering');
    // Reveal site halfway through the watch zoom
    setTimeout(onEnter, 420);
    // Unmount loading screen after all animations finish
    setTimeout(() => setPhase('done'), 800);
  };

  if (phase === 'done') return null;

  const entering = phase === 'entering';

  return (
    /*
     * Outer overlay: only fades opacity — cheap GPU composite, no layout.
     * Starts fading at 220ms so the site reveals while the watch is still zooming.
     */
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-black"
      animate={{ opacity: entering ? 0 : 1 }}
      initial={{ opacity: 1 }}
      transition={{ duration: 0.45, delay: entering ? 0.22 : 0, ease: 'easeIn' }}
      style={{ willChange: 'opacity' }}
    >
      {/* Ambient gold halo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          className="h-[700px] w-[480px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(255,213,30,0.07) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/*
       * Watch wrapper: only animates scale — GPU-composited transform,
       * separated from the opacity animation above to avoid jank.
       * Initial scale matches the CSS watch size (0.72).
       */}
      <motion.div
        initial={{ scale: 0.72 }}
        animate={{ scale: entering ? 10 : 0.72 }}
        transition={{ duration: 0.55, ease: [0.55, 0, 1, 0.45] }}
        style={{ willChange: 'transform', transform: 'translateZ(0)' }}
      >
        {/* ── Apple Watch assembly ── */}
        <div className="scro-watch-inner">
          <div className="scro-watch-frame">
            {/* Face content */}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.55, ease: 'easeOut' }}
              >
                <Image src="/scro-logo.png" alt="SCRO @ UCF" width={44} height={44} className="rounded-xl" priority />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="scro-watch-time"
              >
                {time || '00:00'}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="scro-watch-date"
              >
                {dateStr}
              </motion.div>

              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.75, duration: 0.45 }}
                className="my-1 h-px w-14"
                style={{ background: 'rgba(255,213,30,0.22)' }}
              />

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.45 }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleEnter}
                className="scro-enter-btn"
              >
                ENTER
              </motion.button>
            </div>

            <div className="scro-side-btn" aria-hidden="true" />
            <div className="scro-power-btn" aria-hidden="true" />
          </div>

          {/* Band connector dots */}
          <div className="scro-watch-dots" aria-hidden="true">
            <span className="scro-dot" />
            <span className="scro-dot" />
          </div>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: entering ? 0 : 0.35 }}
        transition={{ delay: entering ? 0 : 1.3, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] text-[#ffd51e]"
        style={{ letterSpacing: '0.3em' }}
      >
        SCRO @ UCF · SEMICONDUCTOR CAREER READINESS
      </motion.p>
    </motion.div>
  );
}
