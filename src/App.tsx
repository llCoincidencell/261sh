import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Moon, 
  Sun, 
  Train, 
  Radio, 
  Building2, 
  ShieldAlert
} from 'lucide-react';
import { railwayData, bInfo, parseKmValue, STATION_ORDER } from './data/railwayData';
import { AssetType, FilterType, RailwayItem } from './types';
import { DetailModal } from './components/DetailModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { SplashScreen } from './components/SplashScreen';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tcdd_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [kmInput, setKmInput] = useState('');
  const [currentType, setCurrentType] = useState<FilterType>('HEPSİ');
  const [currentRegion, setCurrentRegion] = useState<'HEPSİ' | 'MS1' | 'MS2'>('HEPSİ');
  const [currentStation, setCurrentStation] = useState<string>('HEPSİ');
  const [selectedItem, setSelectedItem] = useState<RailwayItem | null>(null);

  // Haptic feedback
  const vibrate = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(30);
    }
  };

  // Sync theme
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('tcdd_theme', 'dark');
      const meta = document.getElementById('metaThemeColor');
      if (meta) meta.setAttribute('content', '#020617');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('tcdd_theme', 'light');
      const meta = document.getElementById('metaThemeColor');
      if (meta) meta.setAttribute('content', '#1e3a8a');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    vibrate();
    setDarkMode(prev => !prev);
  };

  // Available stations dynamically based on region & type
  const availableStations = useMemo(() => {
    let filtered = railwayData;
    if (currentRegion !== 'HEPSİ') {
      filtered = filtered.filter(d => d.region === currentRegion);
    }
    if (currentType === 'DEVRE') filtered = filtered.filter(d => d.type === 'devre');
    else if (currentType === 'SINYAL') filtered = filtered.filter(d => d.type === 'sinyal');
    else if (currentType === 'CDA') filtered = filtered.filter(d => d.type === 'cda');
    else if (currentType === 'GECIT') filtered = filtered.filter(d => d.crossings && d.crossings.length > 0);

    if (currentType !== 'CDA') {
      filtered = filtered.filter(d => d.station !== 'BOĞAZKÖPRÜ');
    }

    const set = new Set(filtered.map(d => d.station));
    // Sıralama kuralı: 1- ÖRENKÖY, 2- İNCESU, 3- BAŞKÖY, 4- YEŞİLHİSAR, 5- AKKÖY, 6- ARAPLI
    const ordered = STATION_ORDER.filter(st => set.has(st));
    return ['HEPSİ', ...ordered];
  }, [currentRegion, currentType]);

  // Reset station if not present
  useEffect(() => {
    if (!availableStations.includes(currentStation)) {
      setCurrentStation('HEPSİ');
    }
  }, [availableStations, currentStation]);

  // Parsed KM center for distance search
  const searchCenterKm = useMemo(() => {
    const trimmed = kmInput.trim();
    if (trimmed.length >= 3 && (trimmed.includes('+') || trimmed.includes('.') || /^\d+$/.test(trimmed.replace(/\s+/g, '')))) {
      const parsed = parseKmValue(trimmed);
      return parsed > 0 ? parsed : null;
    }
    return null;
  }, [kmInput]);

  // Filtered and sorted railway items
  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    let items = railwayData.filter(item => {
      if (item.station === 'BOĞAZKÖPRÜ' && currentType !== 'CDA') return false;

      const crossingText = item.crossings ? item.crossings.map(c => `${c.name} ${c.kmStr}`).join(' ').toLowerCase() : '';
      const iCode = item.code || '';
      const iSt = item.station || '';
      const iBld = item.building || '';
      const iFreq = item.frequency || '';
      const iCap = item.capacitor || '';

      const matchSearch = 
        !q ||
        iCode.toLowerCase().includes(q) ||
        iSt.toLowerCase().includes(q) ||
        iBld.toLowerCase().includes(q) ||
        iFreq.toLowerCase().includes(q) ||
        iCap.toLowerCase().includes(q) ||
        crossingText.includes(q) ||
        (q.includes('cda') && item.type === 'cda');

      let matchType = false;
      if (currentType === 'HEPSİ') matchType = true;
      else if (currentType === 'DEVRE') matchType = item.type === 'devre';
      else if (currentType === 'SINYAL') matchType = item.type === 'sinyal';
      else if (currentType === 'CDA') matchType = item.type === 'cda';
      else if (currentType === 'GECIT') matchType = !!(item.crossings && item.crossings.length > 0);

      const matchReg = currentRegion === 'HEPSİ' || item.region === currentRegion;
      const matchSt = currentStation === 'HEPSİ' || item.station === currentStation;

      if (!(matchSearch && matchType && matchReg && matchSt)) return false;

      if (searchCenterKm !== null) {
        if (item.centerKm === 0) return false;
        const dist = Math.abs(item.centerKm - searchCenterKm);
        if (dist > 3000) return false;
      }

      return true;
    });

    if (searchCenterKm !== null) {
      items = items.map(item => ({
        ...item,
        dist: Math.abs(item.centerKm - searchCenterKm)
      }));
      items.sort((a, b) => (a.dist ?? 0) - (b.dist ?? 0));
      return items.slice(0, 3);
    } else {
      const typeOrder: Record<AssetType, number> = { devre: 1, sinyal: 2, cda: 3 };
      items.sort((a, b) => {
        // Tümü seçiliyken önce tür gruplaması (Devre -> Sinyal -> CDA)
        if (currentType === 'HEPSİ') {
          if (typeOrder[a.type] !== typeOrder[b.type]) {
            return typeOrder[a.type] - typeOrder[b.type];
          }
        }

        // İstasyon Kilometre Sıralaması:
        // 1- ÖRENKÖY, 2- İNCESU, 3- BAŞKÖY, 4- YEŞİLHİSAR, 5- AKKÖY, 6- ARAPLI
        const idxA = STATION_ORDER.indexOf(a.station);
        const idxB = STATION_ORDER.indexOf(b.station);
        const rankA = idxA === -1 ? 999 : idxA;
        const rankB = idxB === -1 ? 999 : idxB;

        if (rankA !== rankB) {
          return rankA - rankB;
        }

        // Aynı istasyon içinde KM uyumlu sıralama: km büyükten küçüğe doğru (170 -> 97)
        return (b.centerKm || 0) - (a.centerKm || 0);
      });
      return items;
    }
  }, [searchQuery, kmInput, currentType, currentRegion, currentStation, searchCenterKm]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors pb-16 font-sans">
      {/* 5-Second Opening Splash Screen */}
      {showSplash && (
        <SplashScreen onFinish={() => setShowSplash(false)} durationMs={5000} />
      )}

      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-gradient-to-r from-blue-900 via-blue-800 to-sky-700 text-white shadow-lg border-b border-blue-950/40">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-inner shrink-0 overflow-hidden p-1">
              <img
                src="./pwa-192x192.png"
                alt="TCDD 261 Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = './tcdd-logo.svg';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-extrabold tracking-tight">TCDD 261 SH Şefliği</h1>
                <span className="hidden sm:inline-block text-[11px] font-semibold bg-sky-500/30 text-sky-200 px-2 py-0.5 rounded-full border border-sky-400/30">
                  Sinyalizasyon & Haberleşme
                </span>
              </div>
              <p className="text-xs text-sky-200 font-medium">Saha Veri Asistanın </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Gece/Gündüz Modu */}
            <button
              type="button"
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white border border-white/20 transition-all cursor-pointer shadow-sm"
              title="Gece / Gündüz Modu"
              aria-label="Gece / Gündüz Modu"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-300" /> : <Moon className="w-5 h-5 text-sky-200" />}
            </button>
          </div>
        </div>
      </header>

      {/* FILTER PANEL */}
      <div className="max-w-4xl mx-auto px-4 pt-4 space-y-3">
        {/* KM Arama Kutusu */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <MapPin className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </div>
          <input
            type="text"
            value={kmInput}
            onChange={(e) => setKmInput(e.target.value)}
            placeholder="📍 Bulunduğunuz KM'yi buraya yazın (Örn: 142500)"
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-amber-300 dark:border-amber-700/60 bg-amber-50/70 dark:bg-amber-950/30 text-amber-950 dark:text-amber-100 font-semibold text-sm placeholder:text-amber-800/60 dark:placeholder:text-amber-400/50 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
          />
          {kmInput && (
            <button
              onClick={() => setKmInput('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-amber-600 dark:text-amber-400 text-xs font-bold hover:text-amber-800"
            >
              Temizle
            </button>
          )}
        </div>

        {/* Metin Arama Kutusu */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ara: Devre, Sinyal, CDA, Geçit..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-sm placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Varlık Türü Filtreleri */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => { vibrate(); setCurrentType('HEPSİ'); }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-sm ${
              currentType === 'HEPSİ'
                ? 'bg-blue-600 text-white shadow-blue-500/30'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            Tümü
          </button>
          <button
            onClick={() => { vibrate(); setCurrentType('DEVRE'); }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-sm ${
              currentType === 'DEVRE'
                ? 'bg-slate-700 text-white shadow-slate-600/30'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            🛤️ Sinyal Devreleri
          </button>
          <button
            onClick={() => { vibrate(); setCurrentType('SINYAL'); }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-sm ${
              currentType === 'SINYAL'
                ? 'bg-emerald-600 text-white shadow-emerald-500/30'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            🚦 Sinyaller
          </button>
          <button
            onClick={() => { vibrate(); setCurrentType('CDA'); }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-sm ${
              currentType === 'CDA'
                ? 'bg-purple-600 text-white shadow-purple-500/30'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            🔌 CDA Kartları
          </button>
          <button
            onClick={() => { vibrate(); setCurrentType('GECIT'); }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-sm ${
              currentType === 'GECIT'
                ? 'bg-orange-600 text-white shadow-orange-500/30'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            🚧 Geçitler
          </button>
        </div>

        {/* Hat / Bölge Filtreleri */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none items-center">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">Bölge:</span>
          {(['HEPSİ', 'MS1', 'MS2'] as const).map(reg => (
            <button
              key={reg}
              onClick={() => { vibrate(); setCurrentRegion(reg); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm ${
                currentRegion === reg
                  ? 'bg-sky-600 text-white shadow-sky-500/30'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {reg === 'HEPSİ' ? 'Tüm Hatlar' : reg}
            </button>
          ))}
        </div>

        {/* İstasyon Filtreleri */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none items-center">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">İstasyon:</span>
          {availableStations.map(st => (
            <button
              key={st}
              onClick={() => { vibrate(); setCurrentStation(st); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all shadow-sm ${
                currentStation === st
                  ? 'bg-indigo-600 text-white shadow-indigo-500/30'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Sayaç ve Durum Metni */}
        <div className="flex items-center justify-between text-xs font-semibold px-1 text-slate-500 dark:text-slate-400">
          <span>
            {searchCenterKm !== null ? (
              <span className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                ± 3 KM Çevrenizdeki En Yakın {filteredItems.length} Varlık
              </span>
            ) : (
              `Toplam ${filteredItems.length} varlık listeleniyor`
            )}
          </span>
          {searchCenterKm !== null && (
            <button
              onClick={() => setKmInput('')}
              className="text-xs text-blue-600 dark:text-sky-400 font-bold hover:underline"
            >
              Tüm Listeyi Göster
            </button>
          )}
        </div>
      </div>

      {/* VARLIK LİSTESİ */}
      <main className="max-w-4xl mx-auto px-4 mt-3 space-y-3">
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-700 dark:text-slate-300">Kayıt Bulunamadı</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Arama kriterlerinize veya girilen kilometre aralığına uygun sinyalizasyon varlığı bulunamadı.
            </p>
          </div>
        ) : (
          filteredItems.map(item => {
            const bKey = `${item.station}-${item.building}`;
            const bMeta = bInfo[bKey] || { loc: "", ctrl: "Bilinmiyor" };

            let borderTheme = 'border-slate-200 dark:border-slate-800';
            let badgeBg = 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
            let badgeText = 'RAY DEVRESİ';

            if (item.type === 'sinyal') {
              borderTheme = 'border-l-4 border-l-emerald-500';
              badgeBg = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
              badgeText = 'SİNYAL';
            } else if (item.type === 'cda') {
              borderTheme = 'border-l-4 border-l-purple-500';
              badgeBg = 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300';
              badgeText = 'CDA KARTI';
            } else {
              borderTheme = 'border-l-4 border-l-blue-500';
            }

            return (
              <div
                key={item.id}
                onClick={() => { vibrate(); setSelectedItem(item); }}
                className={`bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 ${borderTheme} hover:shadow-md active:scale-99 transition-all cursor-pointer relative overflow-hidden`}
              >
                {/* Distance Badge */}
                {item.dist !== undefined && (
                  <div className="absolute top-3 right-3 bg-amber-500 text-white font-extrabold text-[11px] px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>~{Math.round(item.dist)}m</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row justify-between gap-3 sm:items-center">
                  <div className="space-y-1.5 flex-1 pr-14 sm:pr-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-base font-extrabold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 font-mono">
                        {item.code}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${badgeBg}`}>
                        {badgeText}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                        {item.region}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                      <span>🚂 {item.station}</span>
                    </div>

                    {/* Km info */}
                    {item.type === 'sinyal' && (
                      <div className="inline-flex items-center gap-1 text-xs font-bold text-cyan-800 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/50 border border-cyan-200 dark:border-cyan-800 px-2 py-0.5 rounded-md">
                        🚦 Km: {item.km}
                      </div>
                    )}

                    {item.type === 'cda' && item.km && (
                      <div className="inline-flex items-center gap-1 text-xs font-bold text-purple-800 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 px-2 py-0.5 rounded-md">
                        📍 Km: {item.km}
                      </div>
                    )}

                    {item.type === 'devre' && (
                      <div className="space-y-1.5">
                        <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-md">
                          🛣️ Km: {item.start_km} - {item.end_km} ({item.length}m)
                        </div>

                        {(item.frequency || item.capacitor) && (
                          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                            {item.frequency && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-cyan-50 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800/80">
                                ⚡ {item.frequency}
                              </span>
                            )}
                            {item.capacitor && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-violet-50 dark:bg-violet-950/60 text-violet-800 dark:text-violet-300 border border-violet-200 dark:border-violet-800/80">
                                🔋 {item.capacitor}
                              </span>
                            )}
                          </div>
                        )}

                        {item.crossings && item.crossings.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.crossings.map((c, idx) => (
                              <span key={idx} className="inline-flex items-center gap-1 text-[11px] font-bold text-orange-800 dark:text-orange-300 bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 px-2 py-0.5 rounded-md">
                                ⚠️ Hemzemin: {c.name} ({c.kmStr})
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right side: Building info */}
                  <div className="sm:text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-dashed border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="inline-flex items-center gap-1 text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-lg text-slate-700 dark:text-slate-300 shadow-xs">
                      🏢 {item.building}
                    </span>
                    {bMeta.loc && (
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        📍 Bina: {bMeta.loc}
                      </div>
                    )}
                    {bMeta.ctrl && (
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 max-w-[200px] truncate">
                        Alan: {bMeta.ctrl}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </main>

      {/* DETAIL MODAL */}
      <DetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        vibrate={vibrate}
      />

      {/* OFFLINE INDICATOR */}
      <OfflineIndicator />
    </div>
  );
}
