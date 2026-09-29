import React, { useState, useEffect } from 'react';

interface Props {
  onFinish: () => void;
  durationMs?: number;
}

export const SplashScreen: React.FC<Props> = ({ onFinish, durationMs = 2000 }) => {
  const [fadingOut, setFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Start progress bar animation immediately
    const startTimeout = setTimeout(() => {
      setProgress(100);
    }, 50);

    // Trigger fade-out 300ms before completion
    const fadeTimeout = setTimeout(() => {
      setFadingOut(true);
    }, Math.max(0, durationMs - 350));

    // Finish and dismiss splash after full duration
    const finishTimeout = setTimeout(() => {
      onFinish();
    }, durationMs);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(fadeTimeout);
      clearTimeout(finishTimeout);
    };
  }, [durationMs, onFinish]);

  return (
    <div
      onClick={onFinish}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#0b1633] via-[#0f224a] to-[#081026] text-white select-none transition-opacity duration-300 ease-out cursor-pointer ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="TCDD 261 Açılış Ekranı"
    >
      {/* Background ambient radial glow */}
      <div className="absolute w-96 h-96 rounded-full bg-blue-500/15 blur-3xl pointer-events-none animate-pulse" />

      {/* Main Logo Container */}
      <div className="relative z-10 flex flex-col items-center max-w-sm text-center">
        {/* Animated Badge Patch */}
        <div className="relative mb-6 transform transition-all duration-700 ease-out drop-shadow-2xl">
          <img
            src="/tcdd-logo.svg"
            alt="TCDD 261 Sinyalizasyon ve Haberleşme Şefliği Arması"
            className="w-56 h-56 sm:w-64 sm:h-64 object-contain animate-in zoom-in-90 duration-500"
          />
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white drop-shadow-md">
          TCDD 261
        </h1>
        <p className="text-sm font-bold text-sky-300 tracking-wide mt-1">
          Sinyalizasyon ve Haberleşme Şefliği
        </p>
        <p className="text-xs text-slate-300 font-medium tracking-wider uppercase mt-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/10">
          Saha Veri Asistanı
        </p>

        {/* 2-Second Animated Progress Bar */}
        <div className="w-52 h-1.5 bg-slate-800/80 rounded-full overflow-hidden mt-8 border border-white/10 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-sky-400 to-blue-500 rounded-full transition-all ease-linear"
            style={{
              width: `${progress}%`,
              transitionDuration: `${durationMs}ms`,
            }}
          />
        </div>

        <span className="text-[11px] text-slate-400 font-medium mt-3 tracking-wider">
          Saha Verileri Yükleniyor...
        </span>
      </div>
    </div>
  );
};
