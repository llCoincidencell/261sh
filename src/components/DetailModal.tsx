import React from 'react';
import { X, Send, Building2, MapPin, Radio, ShieldAlert } from 'lucide-react';
import { RailwayItem } from '../types';
import { bInfo } from '../data/railwayData';

interface Props {
  item: RailwayItem | null;
  onClose: () => void;
  vibrate: () => void;
}

export const DetailModal: React.FC<Props> = ({ item, onClose, vibrate }) => {
  if (!item) return null;

  const bKey = `${item.station}-${item.building}`;
  const bMeta = bInfo[bKey] || { loc: "", ctrl: "Bilinmiyor" };

  let titleHtml = '';
  let detailKm = '';
  let typeLabel = '';

  if (item.type === 'sinyal') {
    titleHtml = `🚦 Sinyal: ${item.code}`;
    detailKm = item.km || 'Belirtilmedi';
    typeLabel = 'Sinyal';
  } else if (item.type === 'cda') {
    titleHtml = `🔌 CDA Kartı: ${item.code}`;
    detailKm = item.km || 'Belirtilmedi';
    typeLabel = 'CDA Kartı';
  } else {
    titleHtml = `🛤️ Devre: ${item.code}`;
    detailKm = `${item.start_km} ile ${item.end_km} arası (${item.length} metre)`;
    typeLabel = 'Ray Devresi';
  }

  let wpMessage = `⚠️ *ARIZA/DURUM BİLDİRİMİ*\n`;
  wpMessage += `Varlık: ${typeLabel} - *${item.code}*\n`;
  wpMessage += `Bölge: ${item.region} / ${item.station}\n`;
  wpMessage += `Km: ${detailKm}\n`;
  if (item.building) wpMessage += `Bağlı Bina: ${item.building}`;
  if (bMeta && bMeta.loc) wpMessage += ` (Bina Konumu: ${bMeta.loc})\n`;

  const waUrl = `https://wa.me/?text=${encodeURIComponent(wpMessage)}`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={() => { vibrate(); onClose(); }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl font-extrabold text-slate-900 dark:text-white">
            {titleHtml}
          </span>
        </div>

        <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-5 pb-3 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <span>{item.region} Bölgesi</span>
          <span>•</span>
          <span>{item.station} İstasyonu</span>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Varlık Kilometresi</span>
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-500 shrink-0" />
              <span>{detailKm}</span>
            </div>
          </div>

          {item.building && (
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Bağlı Olduğu Teknik Bina</span>
              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl space-y-1">
                <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>{item.building} {bMeta.loc ? `(Km: ${bMeta.loc})` : ''}</span>
                </div>
                {bMeta.ctrl && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 pl-6">
                    Kontrol Ettiği Alan: {bMeta.ctrl}
                  </p>
                )}
              </div>
            </div>
          )}

          {item.crossings && item.crossings.length > 0 && (
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-500">Kesişen Hemzemin Geçit</span>
              {item.crossings.map((c, i) => (
                <div key={i} className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl font-semibold text-amber-900 dark:text-amber-200 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{c.name} — Km: {c.kmStr}</span>
                </div>
              ))}
            </div>
          )}

          {item.dist !== undefined && (
            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl flex items-center justify-between text-xs font-semibold text-blue-900 dark:text-blue-200">
              <span className="flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-blue-500 animate-pulse" />
                Bulunduğunuz Konuma Uzaklık
              </span>
              <span className="font-bold text-sm">~{Math.round(item.dist)} metre</span>
            </div>
          )}

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={vibrate}
            className="w-full mt-4 py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            <span>Durumu WhatsApp ile Şefe Bildir</span>
          </a>
        </div>
      </div>
    </div>
  );
};
