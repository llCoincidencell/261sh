import React, { useState } from 'react';
import { Smartphone, Download, CheckCircle, ExternalLink, QrCode, X, Share2, ShieldCheck, Zap } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, isAndroid, install } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'direct' | 'apk' | 'qr'>('direct');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const pwabuilderUrl = `https://www.pwabuilder.com/?site=${encodeURIComponent(currentUrl)}`;

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
      onClose();
    }
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-sky-700 p-5 text-white flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-inner">
              <Smartphone className="w-6 h-6 text-sky-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">Android & APK Kurulumu</h3>
                <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-500/90 text-white px-2 py-0.5 rounded-full">
                  WebAPK / PWA
                </span>
              </div>
              <p className="text-xs text-sky-200 mt-0.5">TCDD 261 Saha Veri Asistanı</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            title="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 pt-2 gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('direct')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'direct'
                ? 'border-blue-600 text-blue-600 dark:text-sky-400 dark:border-sky-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Telefona Yükle</span>
          </button>
          <button
            onClick={() => setActiveTab('apk')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'apk'
                ? 'border-blue-600 text-blue-600 dark:text-sky-400 dark:border-sky-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>APK İndir / Paketle</span>
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'qr'
                ? 'border-blue-600 text-blue-600 dark:text-sky-400 dark:border-sky-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Karekod (QR)</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-sm text-slate-700 dark:text-slate-300">
          {activeTab === 'direct' && (
            <div className="space-y-4">
              {isInstalled ? (
                <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-4 rounded-xl flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-emerald-900 dark:text-emerald-200">Uygulama Zaten Yüklü!</h4>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
                      Bu cihazda tam ekran ve bağımsız uygulama modunda çalışıyorsunuz. Çevrimdışı saha desteği etkindir.
                    </p>
                  </div>
                </div>
              ) : isInstallable ? (
                <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 p-4 rounded-xl text-center space-y-3">
                  <div className="inline-flex p-3 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-500/30">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">Android Cihaza Tek Tıkla Yükleme Hazır</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Google Chrome WebAPK motoru sayesinde doğrudan telefonunuzun uygulama çekmecesine eklenir. Dosya yöneticisiyle uğraşmadan gerçek bir mobil uygulama gibi kurulur.
                  </p>
                  <button
                    onClick={handleInstallClick}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <Download className="w-5 h-5" />
                    <span>Şimdi Telefona Yükle (WebAPK)</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="bg-slate-100 dark:bg-slate-800/60 p-4 rounded-xl space-y-2 border border-slate-200 dark:border-slate-700">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm">
                      <Smartphone className="w-4 h-4 text-blue-600 dark:text-sky-400" />
                      {isAndroid ? 'Android Chrome ile Kurulum:' : isIOS ? 'iPhone / iOS ile Kurulum:' : 'Tarayıcıdan Kurulum:'}
                    </h4>

                    {isIOS ? (
                      <ol className="text-xs space-y-2 pl-4 list-decimal marker:font-bold marker:text-blue-600">
                        <li>Safari alt çubuğundaki <strong>Paylaş (Share)</strong> simgesine dokunun.</li>
                        <li>Açılan menüde aşağı kaydırıp <strong>"Ana Ekrana Ekle" (Add to Home Screen)</strong> butonuna basın.</li>
                        <li>Sağ üstteki <strong>"Ekle"</strong> butonuna dokunun. Uygulama ana ekranınıza TCDD logosuyla gelecektir.</li>
                      </ol>
                    ) : (
                      <ol className="text-xs space-y-2 pl-4 list-decimal marker:font-bold marker:text-blue-600">
                        <li>Google Chrome'un sağ üst köşesindeki <strong>üç noktaya (⋮)</strong> dokunun.</li>
                        <li>Menüden <strong>"Uygulamayı Yükle"</strong> veya <strong>"Ana Ekrana Ekle"</strong> seçeneğini seçin.</li>
                        <li>Gelen pencerede <strong>"Yükle"</strong> butonuna basın. Android sistemi uygulamayı otomatik WebAPK olarak telefonunuza yükler.</li>
                      </ol>
                    )}
                  </div>
                </div>
              )}

              {/* Avantajlar */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 dark:text-white">Çevrimdışı Çalışma</strong>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px]">Sinyal olmayan hat boylarında dahi tüm veriler açılır.</span>
                  </div>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 flex items-start gap-2">
                  <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 dark:text-white">Tam Ekran Hızı</strong>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px]">Adres çubuğu olmadan tam yerel uygulama deneyimi.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'apk' && (
            <div className="space-y-4">
              <div className="bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 p-4 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-sky-900 dark:text-sky-200 font-bold">
                  <Download className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                  <h4>Doğrudan Standalone .APK Paketi Oluşturma</h4>
                </div>
                <p className="text-xs text-sky-800 dark:text-sky-300 leading-relaxed">
                  Bu uygulama standart <strong>PWA & WebAPK Manifest v2</strong> spesifikasyonuna uygundur. Microsoft'un ve Google'ın resmi <strong>PWABuilder</strong> aracı ile tek tıkla imzalı bağımsız <code>.apk</code> veya <code>.aab</code> (Google Play) dosyası oluşturabilirsiniz.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl space-y-1 text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Uygulamanın Canlı URL Adresi:</span>
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      readOnly 
                      value={currentUrl} 
                      className="flex-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 px-3 py-1.5 rounded-lg text-xs font-mono select-all" 
                    />
                    <button
                      onClick={handleCopyLink}
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shrink-0"
                    >
                      {copied ? 'Kopyalandı!' : 'Kopyala'}
                    </button>
                  </div>
                </div>

                <a
                  href={pwabuilderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 text-center"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>PWABuilder ile Otomatik APK Üret</span>
                </a>

                <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-slate-50 dark:bg-slate-950 text-xs space-y-2">
                  <h5 className="font-bold text-slate-800 dark:text-slate-200">APK Nasıl Üretilir? (30 Saniye):</h5>
                  <ol className="list-decimal pl-4 space-y-1 text-slate-600 dark:text-slate-400">
                    <li>Yukarıdaki <strong>"PWABuilder ile Otomatik APK Üret"</strong> butonuna tıklayın.</li>
                    <li>Sistem manifest ve ikonları otomatik doğrulayacaktır (Skor: 100/100).</li>
                    <li><strong>"Package for Android"</strong> butonuna basın.</li>
                    <li>İndirilen <code>.apk</code> dosyasını telefonunuza yükleyip WhatsApp veya kablo ile saha ekiplerine dağıtabilirsiniz!</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'qr' && (
            <div className="space-y-4 text-center">
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Saha personelinin kendi telefonundan kamerayı açıp bu karekodu okutması yeterlidir:
              </p>

              <div className="inline-block p-4 bg-white rounded-2xl shadow-md border border-slate-200">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}&color=1e3a8a`}
                  alt="TCDD Saha Asistanı QR Kodu"
                  className="w-48 h-48 mx-auto"
                />
              </div>

              <div className="flex gap-2 justify-center">
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{copied ? 'Bağlantı Kopyalandı!' : 'Bağlantıyı Kopyala'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex justify-between items-center text-xs">
          <span className="text-slate-500 dark:text-slate-400">TCDD 261 Sinyalizasyon & Haberleşme</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 font-semibold rounded-lg text-slate-700 dark:text-slate-300 transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
