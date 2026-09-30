import React, { useState, useEffect } from 'react';

interface Props {
  onFinish: () => void;
  durationMs?: number;
}

export const SplashScreen: React.FC<Props> = ({ onFinish, durationMs = 5000 }) => {
  const [fadingOut, setFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imgSrc, setImgSrc] = useState<string>('./tcdd-logo.svg');
  const [remainingSec, setRemainingSec] = useState(Math.ceil(durationMs / 1000));

  useEffect(() => {
    // Start progress bar animation
    const startTimeout = setTimeout(() => {
      setProgress(100);
    }, 50);

    // Countdown interval
    const interval = setInterval(() => {
      setRemainingSec((prev) => (prev > 1 ? prev - 1 : 1));
    }, 1000);

    // Trigger fade-out 400ms before completion
    const fadeTimeout = setTimeout(() => {
      setFadingOut(true);
    }, Math.max(0, durationMs - 400));

    // Finish and dismiss splash after full 5 seconds
    const finishTimeout = setTimeout(() => {
      onFinish();
    }, durationMs);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
      clearTimeout(fadeTimeout);
      clearTimeout(finishTimeout);
    };
  }, [durationMs, onFinish]);

  return (
    <div
      onClick={onFinish}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#060d1f] via-[#0b1b3a] to-[#040814] text-white select-none transition-opacity duration-400 ease-out cursor-pointer ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="TCDD 261 Açılış Ekranı"
    >
      {/* Background ambient radial glow */}
      <div className="absolute w-96 h-96 rounded-full bg-blue-500/20 blur-3xl pointer-events-none animate-pulse" />

      {/* Main Logo Container */}
      <div className="relative z-10 flex flex-col items-center max-w-sm text-center">
       {/* Animated Badge Patch */}
        <div className="relative mb-5 transform transition-all duration-700 ease-out">
          <img
            src={imgSrc}
            onError={() => {
              if (imgSrc !== './pwa-512x512.png') {
                setImgSrc('./pwa-512x512.png');
              }
            }}
            alt="TCDD 261 Sinyalizasyon ve Haberleşme Şefliği Arması"
            className="w-56 h-56 sm:w-64 sm:h-64 object-contain animate-in zoom-in-95 duration-700 bg-transparent select-none pointer-events-none"
          />
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-lg">
          TCDD 261
        </h1>
        <p className="text-sm sm:text-base font-bold text-sky-300 tracking-wide mt-1">
          Sinyalizasyon ve Haberleşme Şefliği
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs text-slate-200 font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/15 shadow-sm">
            Saha Veri Asistanın
          </span>
          <span className="text-[11px] font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/30">
            {remainingSec} sn
          </span>
        </div>

        {/* 5-Second Animated Progress Bar */}
        <div className="w-60 h-2 bg-slate-900/90 rounded-full overflow-hidden mt-7 border border-white/15 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-sky-400 to-blue-500 rounded-full transition-all ease-linear"
            style={{
              width: `${progress}%`,
              transitionDuration: `${durationMs}ms`,
            }}
          />
        </div>

        <div className="flex items-center justify-between w-60 mt-3 text-[11px] text-slate-400 font-medium">
          <span>Saha Verileri Yükleniyor...</span>
          <span className="text-sky-300/80 hover:text-sky-200 underline cursor-pointer">
            Dokun ve Geç
          </span>
        </div>
      </div>
    </div>
  );
};
