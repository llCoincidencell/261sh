import { BuildingInfo, Crossing, RailwayItem } from '../types';

export const STATION_ORDER = [
  'ÖRENKÖY',
  'İNCESU',
  'BAŞKÖY',
  'YEŞİLHİSAR',
  'AKKÖY',
  'ARAPLI',
  'BOĞAZKÖPRÜ'
];

export const bInfo: Record<string, BuildingInfo> = {
  "ÖRENKÖY-PL4": { loc: "168+467", ctrl: "165+595 - 170+846" },
  "ÖRENKÖY-PL3": { loc: "162+780", ctrl: "162+707 - 165+595" },
  "ÖRENKÖY-PP+PL2": { loc: "161+140", ctrl: "159+464 - 162+707" },
  "ÖRENKÖY-PL1": { loc: "159+363", ctrl: "157+093 - 159+464" },
  "İNCESU-CP/PL2": { loc: "153+852", ctrl: "152+133 - 157+093" },
  "İNCESU-PL1": { loc: "150+997", ctrl: "146+279 - 152+133" },
  "BAŞKÖY-PL3": { loc: "145+369", ctrl: "141+611 - 146+279" },
  "BAŞKÖY-PP+PL2": { loc: "136+957", ctrl: "134+526 - 141+611" },
  "BAŞKÖY-PL1": { loc: "132+388", ctrl: "129+152 - 134+526" },
  "YEŞİLHİSAR-PL4": { loc: "126+113", ctrl: "124+895 - 129+152" },
  "YEŞİLHİSAR-CP+PL2+PL3": { loc: "122+356", ctrl: "120+199 - 124+895" },
  "YEŞİLHİSAR-PL1": { loc: "118+500", ctrl: "115+372 - 120+199" },
  "AKKÖY-PP+PL1": { loc: "110+930", ctrl: "107+643 - 115+372" },
  "ARAPLI-PP+PL3": { loc: "104+226", ctrl: "103+159 - 107+643" },
  "ARAPLI-PL2": { loc: "102+225", ctrl: "100+064 - 103+159" },
  "ARAPLI-PL1": { loc: "98+271", ctrl: "97+049 - 100+064" },
  "AKKÖY-PL1": { loc: "110+930", ctrl: "107+643 - 115+372" },
  "BOĞAZKÖPRÜ-PL": { loc: "", ctrl: "Bilinmiyor" }
};

export const crossings: Crossing[] = [
  { name: "G47 (SARAYCIK)", kmStr: "168+437", val: 168437 },
  { name: "G44 (UN FABRİKASI)", kmStr: "159+425", val: 159425 },
  { name: "G43 (İNCESU)", kmStr: "154+153", val: 154153 },
  { name: "G41 (BAŞKÖY)", kmStr: "136+391", val: 136391 },
  { name: "G40 (GÜLBAYIR)", kmStr: "132+206", val: 132206 },
  { name: "G39 (ERDEMLİ)", kmStr: "126+094", val: 126094 },
  { name: "G38 (KALE)", kmStr: "118+489", val: 118489 },
  { name: "G36 (BUGET)", kmStr: "102+285", val: 102285 }
];

export function parseKmValue(kmStr?: string): number {
  if (!kmStr) return 0;
  let s = kmStr.toString().replace(/\s+/g, '');
  if (s.includes('+') || s.includes('.')) {
    s = s.replace('.', '+');
    const parts = s.split('+');
    if (parts.length === 2) {
      const km = parseFloat(parts[0]);
      const m = parseFloat(parts[1]);
      if (!isNaN(km) && !isNaN(m)) return km * 1000 + m;
    }
  } else if (/^\d+$/.test(s)) {
    let totalMeters = parseFloat(s);
    if (s.length <= 3) totalMeters = totalMeters * 1000;
    return totalMeters;
  }
  return 0;
}

const rawData: Omit<RailwayItem, 'id' | 'centerKm' | 'crossings'>[] = [
  // =========================================================================
  // ---------------- CDA KARTLARI (Örenköy -> Araplı Sıralı) -----------------
  // =========================================================================
  // 1- ÖRENKÖY
  { type: 'cda', region: 'MS1', station: 'ÖRENKÖY', building: 'PL4', code: 'CDA 17, 18', km: '168+467' },
  { type: 'cda', region: 'MS1', station: 'ÖRENKÖY', building: 'PL3', code: 'CDA 16', km: '162+780' },
  { type: 'cda', region: 'MS1', station: 'ÖRENKÖY', building: 'PP+PL2', code: 'CDA 14, 15', km: '161+140' },
  { type: 'cda', region: 'MS1', station: 'ÖRENKÖY', building: 'PL1', code: 'CDA 13', km: '159+363' },

  // 2- İNCESU
  { type: 'cda', region: 'MS1', station: 'İNCESU', building: 'CP/PL2', code: 'CDA 01, 02, 03', km: '153+852' },
  { type: 'cda', region: 'MS1', station: 'İNCESU', building: 'PL1', code: 'CDA 04, 05', km: '150+997' },

  // 3- BAŞKÖY
  { type: 'cda', region: 'MS1', station: 'BAŞKÖY', building: 'PL3', code: 'CDA 06', km: '145+369' },
  { type: 'cda', region: 'MS1', station: 'BAŞKÖY', building: 'PP+PL2', code: 'CDA 07, 08, 09, 10', km: '136+957' },
  { type: 'cda', region: 'MS1', station: 'BAŞKÖY', building: 'PL1', code: 'CDA 11, 12', km: '132+388' },

  // 4- YEŞİLHİSAR
  { type: 'cda', region: 'MS2', station: 'YEŞİLHİSAR', building: 'PL4', code: 'CDA 05', km: '126+113' },
  { type: 'cda', region: 'MS2', station: 'YEŞİLHİSAR', building: 'CP+PL2+PL3', code: 'CDA 01, 02, 03, 04, 15', km: '122+356' },
  { type: 'cda', region: 'MS2', station: 'YEŞİLHİSAR', building: 'PL1', code: 'CDA 06, 07', km: '118+500' },

  // 5- AKKÖY
  { type: 'cda', region: 'MS2', station: 'AKKÖY', building: 'PP+PL1', code: 'CDA 08, 09', km: '110+930' },

  // 6- ARAPLI
  { type: 'cda', region: 'MS2', station: 'ARAPLI', building: 'PP+PL3', code: 'CDA 10, 11, 12', km: '104+226' },
  { type: 'cda', region: 'MS2', station: 'ARAPLI', building: 'PL2', code: 'CDA 13', km: '102+225' },
  { type: 'cda', region: 'MS2', station: 'ARAPLI', building: 'PL1', code: 'CDA 14', km: '98+271' },

  // Diğer (Boğazköprü)
  { type: 'cda', region: 'MS1', station: 'BOĞAZKÖPRÜ', building: 'PL', code: 'CDA 19', km: '' },

  // =========================================================================
  // ---------------- RAY DEVRELERİ (Örenköy -> Araplı Sıralı) ----------------
  // =========================================================================
  // 1- ÖRENKÖY
  { type: 'devre', region: 'MS1', station: 'ÖRENKÖY', building: 'PL4', code: '62/5', start_km: '170+756', end_km: '170+847', length: 91.0 },
  { type: 'devre', region: 'MS1', station: 'ÖRENKÖY', building: 'PL4', code: '62/4', start_km: '170+656', end_km: '170+756', length: 100.0 },
  { type: 'devre', region: 'MS1', station: 'ÖRENKÖY', building: 'PL4', code: '62/3', start_km: '170+146', end_km: '170+656', length: 510.0 },
  { type: 'devre', region: 'MS1', station: 'ÖRENKÖY', building: 'PL4', code: '62/2', start_km: '169+636', end_km: '170+146', length: 510.0 },
  { type: 'devre', region: 'MS1', station: 'ÖRENKÖY', building: 'PL4', code: '62/1', start_km: '169+018', end_km: '169+636', length: 618.0 },
  { type: 'devre', region: 'MS1', station: 'ÖRENKÖY', building: 'PL4', code: '61/4', start_km: '168+386', end_km: '168+476', length: 90.0 },
  { type: 'devre', region: 'MS1', station: 'ÖRENKÖY', building: 'PL4', code: '61/3', start_km: '167+526', end_km: '168+386', length: 860.0 },
  { type: 'devre', region: 'MS1', station: 'ÖRENKÖY', building: 'PL4', code: '61/2', start_km: '167+236', end_km: '167+526', length: 290.0 },
  { type: 'devre', region: 'MS1', station: 'ÖRENKÖY', building: 'PL4', code: '61/1', start_km: '166+506', end_km: '167+236', length: 730.0 },
  { type: 'devre', region: 'MS1', station: 'ÖRENKÖY', building: 'PL4', code: '60/6', start_km: '166+216', end_km: '166+506', length: 290.0 },
  { type: 'devre', region: 'MS1', station: 'ÖRENKÖY', building: 'PL4', code: '60/5', start_km: '166+116', end_km: '166+216', length: 100.0 },
  { type: 'devre', region: 'MS1', station: 'ÖRENKÖY', building: 'PL4', code: '60/4', start_km: '165+596', end_km: '166+116', length: 520.0 },
  { type: 'devre', region: 'MS1', station: 'ÖRENKÖY', building: 'PL3', code: '60/3', start_km: '164+976', end_km: '165+596', length: 620.0 },
  { type: 'devre', region: 'MS1', station: 'ÖRENKÖY', building: 'PL3', code: '60/2', start_km: '164+306', end_km: '164+976', length: 670.0 },
  { type: 'devre', region: 'MS1', station: 'ÖRENKÖY', building: 'PL3', code: '60/1', start_km: '163+956', end_km: '164+306', length: 350.0 },
  { type: 'devre', region: 'MS1', station: 'ÖRENKÖY', building: 'PL3', code: '59/3', start_km: '163+349', end_km: '163+956', length: 607.0 },
  { type: 'devre', region: 'MS1', station: 'ÖRENKÖY', building: 'PL3', code: '59/2', start_km: '162+706', end_km: '163+349', length: 643.0 },
  { type: 'devre', region: 'MS1', station: 'ÖRENKÖY', building: 'PP+PL2', code: '59/1', start_km: '162+306', end_km: '162+706', length: 400.0 },
  { type: 'devre', region: 'MS1', station: 'ÖRENKÖY', building: 'PP+PL2', code: '58/5', start_km: '160+029', end_km: '160+594', length: 565.0 },
  { type: 'devre', region: 'MS1', station: 'ÖRENKÖY', building: 'PP+PL2', code: '58/4', start_km: '159+464', end_km: '160+029', length: 565.0 },
  { type: 'devre', region: 'MS1', station: 'ÖRENKÖY', building: 'PL1', code: '58/3', start_km: '159+364', end_km: '159+464', length: 100.0 },
  { type: 'devre', region: 'MS1', station: 'ÖRENKÖY', building: 'PL1', code: '58/2', start_km: '158+695', end_km: '159+364', length: 669.0 },
  { type: 'devre', region: 'MS1', station: 'ÖRENKÖY', building: 'PL1', code: '58/1', start_km: '158+214', end_km: '158+695', length: 481.0 },
  { type: 'devre', region: 'MS1', station: 'ÖRENKÖY', building: 'PL1', code: '57/6', start_km: '157+704', end_km: '158+214', length: 510.0 },
  { type: 'devre', region: 'MS1', station: 'ÖRENKÖY', building: 'PL1', code: '57/5', start_km: '157+194', end_km: '157+704', length: 510.0 },
  { type: 'devre', region: 'MS1', station: 'ÖRENKÖY', building: 'PL1', code: '57/4', start_km: '157+094', end_km: '157+194', length: 100.0 },

  // 2- İNCESU
  { type: 'devre', region: 'MS1', station: 'İNCESU', building: 'CP/PL2', code: '57/3', start_km: '156+474', end_km: '157+094', length: 620.0 },
  { type: 'devre', region: 'MS1', station: 'İNCESU', building: 'CP/PL2', code: '57/2', start_km: '156+374', end_km: '156+474', length: 100.0 },
  { type: 'devre', region: 'MS1', station: 'İNCESU', building: 'CP/PL2', code: '57/1', start_km: '156+075', end_km: '156+374', length: 299.0 },
  { type: 'devre', region: 'MS1', station: 'İNCESU', building: 'CP/PL2', code: '56/2', start_km: '155+354', end_km: '156+075', length: 721.0 },
  { type: 'devre', region: 'MS1', station: 'İNCESU', building: 'CP/PL2', code: '56/1', start_km: '154+575', end_km: '155+354', length: 779.0 },
  { type: 'devre', region: 'MS1', station: 'İNCESU', building: 'CP/PL2', code: 'İncesu 02MT', start_km: '154+094', end_km: '154+204', length: 110.0 },
  { type: 'devre', region: 'MS1', station: 'İNCESU', building: 'CP/PL2', code: '55/5', start_km: '152+954', end_km: '153+126', length: 172.0 },
  { type: 'devre', region: 'MS1', station: 'İNCESU', building: 'CP/PL2', code: '55/4', start_km: '152+134', end_km: '152+954', length: 820.0 },
  { type: 'devre', region: 'MS1', station: 'İNCESU', building: 'PL1', code: '55/3', start_km: '151+934', end_km: '152+134', length: 200.0 },
  { type: 'devre', region: 'MS1', station: 'İNCESU', building: 'PL1', code: '55/2', start_km: '151+834', end_km: '151+934', length: 100.0 },
  { type: 'devre', region: 'MS1', station: 'İNCESU', building: 'PL1', code: '55/1', start_km: '151+124', end_km: '151+834', length: 710.0 },
  { type: 'devre', region: 'MS1', station: 'İNCESU', building: 'PL1', code: '54/4', start_km: '150+309', end_km: '151+124', length: 815.0 },
  { type: 'devre', region: 'MS1', station: 'İNCESU', building: 'PL1', code: '54/3', start_km: '149+512', end_km: '150+309', length: 797.0 },
  { type: 'devre', region: 'MS1', station: 'İNCESU', building: 'PL1', code: '54/2', start_km: '148+714', end_km: '149+512', length: 798.0 },
  { type: 'devre', region: 'MS1', station: 'İNCESU', building: 'PL1', code: '54/1', start_km: '148+148', end_km: '148+714', length: 566.0 },
  { type: 'devre', region: 'MS1', station: 'İNCESU', building: 'PL1', code: '53/3', start_km: '147+214', end_km: '148+148', length: 934.0 },
  { type: 'devre', region: 'MS1', station: 'İNCESU', building: 'PL1', code: '53/2', start_km: '146+281', end_km: '147+214', length: 933.0 },

  // 3- BAŞKÖY
  { type: 'devre', region: 'MS1', station: 'BAŞKÖY', building: 'PL3', code: '53/1', start_km: '145+348', end_km: '146+281', length: 933.0 },
  { type: 'devre', region: 'MS1', station: 'BAŞKÖY', building: 'PL3', code: '52/3', start_km: '144+414', end_km: '145+348', length: 934.0 },
  { type: 'devre', region: 'MS1', station: 'BAŞKÖY', building: 'PL3', code: '52/2', start_km: '143+481', end_km: '144+414', length: 933.0 },
  { type: 'devre', region: 'MS1', station: 'BAŞKÖY', building: 'PL3', code: '52/1', start_km: '142+548', end_km: '143+481', length: 933.0 },
  { type: 'devre', region: 'MS1', station: 'BAŞKÖY', building: 'PL3', code: '51/3', start_km: '141+614', end_km: '142+548', length: 934.0 },
  { type: 'devre', region: 'MS1', station: 'BAŞKÖY', building: 'PP+PL2', code: '51/2', start_km: '140+681', end_km: '141+614', length: 933.0 },
  { type: 'devre', region: 'MS1', station: 'BAŞKÖY', building: 'PP+PL2', code: '51/1', start_km: '139+836', end_km: '140+681', length: 845.0 },
  { type: 'devre', region: 'MS1', station: 'BAŞKÖY', building: 'PP+PL2', code: '50/4', start_km: '139+231', end_km: '139+836', length: 605.0 },
  { type: 'devre', region: 'MS1', station: 'BAŞKÖY', building: 'PP+PL2', code: '50/3', start_km: '138+714', end_km: '139+231', length: 517.0 },
  { type: 'devre', region: 'MS1', station: 'BAŞKÖY', building: 'PP+PL2', code: '50/2', start_km: '138+614', end_km: '138+714', length: 100.0 },
  { type: 'devre', region: 'MS1', station: 'BAŞKÖY', building: 'PP+PL2', code: '50/1', start_km: '137+936', end_km: '138+614', length: 678.0 },
  { type: 'devre', region: 'MS1', station: 'BAŞKÖY', building: 'PP+PL2', code: 'Başköy TC 07T', start_km: '136+344', end_km: '136+444', length: 100.0 },
  { type: 'devre', region: 'MS1', station: 'BAŞKÖY', building: 'PP+PL2', code: '49/5', start_km: '135+194', end_km: '136+154', length: 960.0 },
  { type: 'devre', region: 'MS1', station: 'BAŞKÖY', building: 'PP+PL2', code: '49/4', start_km: '134+530', end_km: '135+194', length: 664.0 },
  { type: 'devre', region: 'MS1', station: 'BAŞKÖY', building: 'PL1', code: '49/3', start_km: '134+430', end_km: '134+530', length: 100.0 },
  { type: 'devre', region: 'MS1', station: 'BAŞKÖY', building: 'PL1', code: '49/2', start_km: '134+174', end_km: '134+430', length: 256.0 },
  { type: 'devre', region: 'MS1', station: 'BAŞKÖY', building: 'PL1', code: '49/1', start_km: '134+074', end_km: '134+174', length: 100.0 },
  { type: 'devre', region: 'MS1', station: 'BAŞKÖY', building: 'PL1', code: '48/6', start_km: '133+410', end_km: '134+074', length: 664.0 },
  { type: 'devre', region: 'MS1', station: 'BAŞKÖY', building: 'PL1', code: '48/5', start_km: '133+120', end_km: '133+410', length: 290.0 },
  { type: 'devre', region: 'MS1', station: 'BAŞKÖY', building: 'PL1', code: '48/4', start_km: '132+260', end_km: '133+120', length: 860.0 },
  { type: 'devre', region: 'MS1', station: 'BAŞKÖY', building: 'PL1', code: '48/3', start_km: '132+160', end_km: '132+260', length: 100.0 },
  { type: 'devre', region: 'MS1', station: 'BAŞKÖY', building: 'PL1', code: '48/2', start_km: '131+300', end_km: '132+160', length: 860.0 },
  { type: 'devre', region: 'MS1', station: 'BAŞKÖY', building: 'PL1', code: '48/1', start_km: '131+010', end_km: '131+300', length: 290.0 },
  { type: 'devre', region: 'MS1', station: 'BAŞKÖY', building: 'PL1', code: '47/6', start_km: '130+500', end_km: '131+010', length: 510.0 },
  { type: 'devre', region: 'MS1', station: 'BAŞKÖY', building: 'PL1', code: '47/5', start_km: '129+990', end_km: '130+500', length: 510.0 },
  { type: 'devre', region: 'MS1', station: 'BAŞKÖY', building: 'PL1', code: '47/4', start_km: '129+890', end_km: '129+990', length: 100.0 },
  { type: 'devre', region: 'MS1', station: 'BAŞKÖY', building: 'PL1', code: '47/3', start_km: '129+154', end_km: '129+890', length: 736.0 },

  // 4- YEŞİLHİSAR
  { type: 'devre', region: 'MS2', station: 'YEŞİLHİSAR', building: 'PL4', code: '47/2', start_km: '128+439', end_km: '129+154', length: 715.0 },
  { type: 'devre', region: 'MS2', station: 'YEŞİLHİSAR', building: 'PL4', code: '47/1', start_km: '128+339', end_km: '128+439', length: 100.0 },
  { type: 'devre', region: 'MS2', station: 'YEŞİLHİSAR', building: 'PL4', code: '46/7', start_km: '127+809', end_km: '128+339', length: 530.0 },
  { type: 'devre', region: 'MS2', station: 'YEŞİLHİSAR', building: 'PL4', code: '46/6', start_km: '127+299', end_km: '127+809', length: 510.0 },
  { type: 'devre', region: 'MS2', station: 'YEŞİLHİSAR', building: 'PL4', code: '46/5', start_km: '127+009', end_km: '127+299', length: 290.0 },
  { type: 'devre', region: 'MS2', station: 'YEŞİLHİSAR', building: 'PL4', code: '46/4', start_km: '126+149', end_km: '127+009', length: 860.0 },
  { type: 'devre', region: 'MS2', station: 'YEŞİLHİSAR', building: 'PL4', code: '46/3', start_km: '126+049', end_km: '126+149', length: 100.0 },
  { type: 'devre', region: 'MS2', station: 'YEŞİLHİSAR', building: 'PL4', code: '46/2', start_km: '125+479', end_km: '126+049', length: 570.0 },
  { type: 'devre', region: 'MS2', station: 'YEŞİLHİSAR', building: 'PL4', code: '46/1', start_km: '124+899', end_km: '125+479', length: 580.0 },
  { type: 'devre', region: 'MS2', station: 'YEŞİLHİSAR', building: 'CP+PL2+PL3', code: '45/3', start_km: '124+390', end_km: '124+899', length: 509.0 },
  { type: 'devre', region: 'MS2', station: 'YEŞİLHİSAR', building: 'CP+PL2+PL3', code: '45/2', start_km: '123+729', end_km: '124+390', length: 661.0 },
  { type: 'devre', region: 'MS2', station: 'YEŞİLHİSAR', building: 'CP+PL2+PL3', code: '45/1', start_km: '123+629', end_km: '123+729', length: 100.0 },
  { type: 'devre', region: 'MS2', station: 'YEŞİLHİSAR', building: 'CP+PL2+PL3', code: '44/4', start_km: '120+815', end_km: '121+686', length: 871.0 },
  { type: 'devre', region: 'MS2', station: 'YEŞİLHİSAR', building: 'CP+PL2+PL3', code: '44/3', start_km: '120+715', end_km: '120+815', length: 100.0 },
  { type: 'devre', region: 'MS2', station: 'YEŞİLHİSAR', building: 'CP+PL2+PL3', code: '44/2', start_km: '120+205', end_km: '120+715', length: 510.0 },
  { type: 'devre', region: 'MS2', station: 'YEŞİLHİSAR', building: 'PL1', code: '44/1', start_km: '119+665', end_km: '120+205', length: 540.0 },
  { type: 'devre', region: 'MS2', station: 'YEŞİLHİSAR', building: 'PL1', code: '43/6', start_km: '119+405', end_km: '119+695', length: 290.0 },
  { type: 'devre', region: 'MS2', station: 'YEŞİLHİSAR', building: 'PL1', code: '43/5', start_km: '118+445', end_km: '118+545', length: 100.0 },
  { type: 'devre', region: 'MS2', station: 'YEŞİLHİSAR', building: 'PL1', code: '43/4', start_km: '118+545', end_km: '119+405', length: 860.0 },
  { type: 'devre', region: 'MS2', station: 'YEŞİLHİSAR', building: 'PL1', code: '43/3', start_km: '117+585', end_km: '118+445', length: 860.0 },
  { type: 'devre', region: 'MS2', station: 'YEŞİLHİSAR', building: 'PL1', code: '43/2', start_km: '117+295', end_km: '117+585', length: 290.0 },
  { type: 'devre', region: 'MS2', station: 'YEŞİLHİSAR', building: 'PL1', code: '43/1', start_km: '116+447', end_km: '117+295', length: 848.0 },
  { type: 'devre', region: 'MS2', station: 'YEŞİLHİSAR', building: 'PL1', code: '42/5', start_km: '116+275', end_km: '116+447', length: 172.0 },
  { type: 'devre', region: 'MS2', station: 'YEŞİLHİSAR', building: 'PL1', code: '42/4', start_km: '116+175', end_km: '116+275', length: 100.0 },
  { type: 'devre', region: 'MS2', station: 'YEŞİLHİSAR', building: 'PL1', code: '42/3', start_km: '115+380', end_km: '116+175', length: 795.0 },

  // 5- AKKÖY
  { type: 'devre', region: 'MS2', station: 'AKKÖY', building: 'PP+PL1', code: '42/2', start_km: '114+620', end_km: '115+380', length: 760.0 },
  { type: 'devre', region: 'MS2', station: 'AKKÖY', building: 'PP+PL1', code: '42/1', start_km: '113+790', end_km: '114+620', length: 830.0 },
  { type: 'devre', region: 'MS2', station: 'AKKÖY', building: 'PP+PL1', code: '41/3', start_km: '113+523', end_km: '113+790', length: 267.0 },
  { type: 'devre', region: 'MS2', station: 'AKKÖY', building: 'PP+PL1', code: '41/2', start_km: '112+600', end_km: '113+523', length: 923.0 },
  { type: 'devre', region: 'MS2', station: 'AKKÖY', building: 'PP+PL1', code: '41/1', start_km: '111+673', end_km: '112+600', length: 927.0 },
  { type: 'devre', region: 'MS2', station: 'AKKÖY', building: 'PP+PL1', code: '40/3', start_km: '109+617', end_km: '110+128', length: 511.0 },
  { type: 'devre', region: 'MS2', station: 'AKKÖY', building: 'PP+PL1', code: '40/2', start_km: '108+917', end_km: '109+617', length: 700.0 },
  { type: 'devre', region: 'MS2', station: 'AKKÖY', building: 'PP+PL1', code: '40/1', start_km: '108+237', end_km: '108+917', length: 680.0 },
  { type: 'devre', region: 'MS2', station: 'AKKÖY', building: 'PP+PL1', code: '39/4', start_km: '107+651', end_km: '108+237', length: 586.0 },

  // 6- ARAPLI
  { type: 'devre', region: 'MS2', station: 'ARAPLI', building: 'PP+PL3', code: '39/3', start_km: '107+270', end_km: '107+651', length: 381.0 },
  { type: 'devre', region: 'MS2', station: 'ARAPLI', building: 'PP+PL3', code: '39/2', start_km: '106+281', end_km: '107+270', length: 989.0 },
  { type: 'devre', region: 'MS2', station: 'ARAPLI', building: 'PP+PL3', code: '39/1', start_km: '105+292', end_km: '106+281', length: 989.0 },
  { type: 'devre', region: 'MS2', station: 'ARAPLI', building: 'PP+PL3', code: '38/5', start_km: '103+168', end_km: '103+498', length: 330.0 },
  { type: 'devre', region: 'MS2', station: 'ARAPLI', building: 'PL2', code: '38/4', start_km: '102+344', end_km: '103+168', length: 824.0 },
  { type: 'devre', region: 'MS2', station: 'ARAPLI', building: 'PL2', code: '38/3', start_km: '102+244', end_km: '102+344', length: 100.0 },
  { type: 'devre', region: 'MS2', station: 'ARAPLI', building: 'PL2', code: '38/2', start_km: '101+558', end_km: '102+244', length: 686.0 },
  { type: 'devre', region: 'MS2', station: 'ARAPLI', building: 'PL2', code: '38/1', start_km: '101+094', end_km: '101+558', length: 464.0 },
  { type: 'devre', region: 'MS2', station: 'ARAPLI', building: 'PL2', code: '37/5', start_km: '100+579', end_km: '101+094', length: 515.0 },
  { type: 'devre', region: 'MS2', station: 'ARAPLI', building: 'PL2', code: '37/4', start_km: '100+074', end_km: '100+579', length: 505.0 },
  { type: 'devre', region: 'MS2', station: 'ARAPLI', building: 'PL1', code: '37/3', start_km: '99+974', end_km: '100+074', length: 100.0 },
  { type: 'devre', region: 'MS2', station: 'ARAPLI', building: 'PL1', code: '37/2', start_km: '99+459', end_km: '99+974', length: 515.0 },
  { type: 'devre', region: 'MS2', station: 'ARAPLI', building: 'PL1', code: '37/1', start_km: '98+993', end_km: '99+459', length: 466.0 },
  { type: 'devre', region: 'MS2', station: 'ARAPLI', building: 'PL1', code: '36/5', start_km: '98+309', end_km: '98+993', length: 684.0 },
  { type: 'devre', region: 'MS2', station: 'ARAPLI', building: 'PL1', code: '36/4', start_km: '97+712', end_km: '98+309', length: 597.0 },
  { type: 'devre', region: 'MS2', station: 'ARAPLI', building: 'PL1', code: '36/3', start_km: '97+612', end_km: '97+712', length: 100.0 },
  { type: 'devre', region: 'MS2', station: 'ARAPLI', building: 'PL1', code: '36/2', start_km: '97+059', end_km: '97+612', length: 553.0 },

  // =========================================================================
  // ---------------- SİNYALLER (Örenköy -> Araplı Sıralı) -------------------
  // =========================================================================
  // 1- ÖRENKÖY (km 169+655 -> 158+193)
  { type: 'sinyal', region: 'MS1', station: 'ÖRENKÖY', building: 'PL4', code: 'BS0621', km: '169+655' },
  { type: 'sinyal', region: 'MS1', station: 'ÖRENKÖY', building: 'PL4', code: 'KBS0622', km: '168+998' },
  { type: 'sinyal', region: 'MS1', station: 'ÖRENKÖY', building: 'PL4', code: 'BS0611', km: '166+524' },
  { type: 'sinyal', region: 'MS1', station: 'ÖRENKÖY', building: 'PL4', code: 'BS0612', km: '166+485' },
  { type: 'sinyal', region: 'MS1', station: 'ÖRENKÖY', building: 'PL3', code: 'YBS0601', km: '164+326' },
  { type: 'sinyal', region: 'MS1', station: 'ÖRENKÖY', building: 'PL3', code: 'BS0602', km: '163+936' },
  { type: 'sinyal', region: 'MS1', station: 'ÖRENKÖY', building: 'PP+PL2', code: 'S01', km: '162+327' },
  { type: 'sinyal', region: 'MS1', station: 'ÖRENKÖY', building: 'PP+PL2', code: 'S12', km: '161+803' },
  { type: 'sinyal', region: 'MS1', station: 'ÖRENKÖY', building: 'PP+PL2', code: 'S22', km: '161+803' },
  { type: 'sinyal', region: 'MS1', station: 'ÖRENKÖY', building: 'PP+PL2', code: 'S11', km: '161+100' },
  { type: 'sinyal', region: 'MS1', station: 'ÖRENKÖY', building: 'PP+PL2', code: 'S21', km: '161+100' },
  { type: 'sinyal', region: 'MS1', station: 'ÖRENKÖY', building: 'PP+PL2', code: 'S02', km: '160+574' },
  { type: 'sinyal', region: 'MS1', station: 'ÖRENKÖY', building: 'PL1', code: 'BS0581', km: '158+714' },
  { type: 'sinyal', region: 'MS1', station: 'ÖRENKÖY', building: 'PL1', code: 'YBS0582', km: '158+193' },

  // 2- İNCESU (km 156+493 -> 148+126)
  { type: 'sinyal', region: 'MS1', station: 'İNCESU', building: 'PP+PL2', code: 'YBS0571', km: '156+493' },
  { type: 'sinyal', region: 'MS1', station: 'İNCESU', building: 'PP+PL2', code: 'BS0572', km: '156+054' },
  { type: 'sinyal', region: 'MS1', station: 'İNCESU', building: 'PP+PL2', code: 'S01', km: '154+594' },
  { type: 'sinyal', region: 'MS1', station: 'İNCESU', building: 'PP+PL2', code: 'S32', km: '154+074' },
  { type: 'sinyal', region: 'MS1', station: 'İNCESU', building: 'PP+PL2', code: 'S12', km: '154+033' },
  { type: 'sinyal', region: 'MS1', station: 'İNCESU', building: 'PP+PL2', code: 'S22', km: '154+033' },
  { type: 'sinyal', region: 'MS1', station: 'İNCESU', building: 'PP+PL2', code: 'S11', km: '153+669' },
  { type: 'sinyal', region: 'MS1', station: 'İNCESU', building: 'PP+PL2', code: 'S21', km: '153+669' },
  { type: 'sinyal', region: 'MS1', station: 'İNCESU', building: 'PP+PL2', code: 'S31', km: '153+629' },
  { type: 'sinyal', region: 'MS1', station: 'İNCESU', building: 'PP+PL2', code: 'S02', km: '153+105' },
  { type: 'sinyal', region: 'MS1', station: 'İNCESU', building: 'PL1', code: 'BS0551', km: '151+141' },
  { type: 'sinyal', region: 'MS1', station: 'İNCESU', building: 'PL1', code: 'YBS0552', km: '151+102' },
  { type: 'sinyal', region: 'MS1', station: 'İNCESU', building: 'PL1', code: 'BS0541', km: '148+166' },
  { type: 'sinyal', region: 'MS1', station: 'İNCESU', building: 'PL1', code: 'BS0542', km: '148+126' },

  // 3- BAŞKÖY (km 145+366 -> 130+987)
  { type: 'sinyal', region: 'MS1', station: 'BAŞKÖY', building: 'PL3', code: 'BS0531', km: '145+366' },
  { type: 'sinyal', region: 'MS1', station: 'BAŞKÖY', building: 'PL3', code: 'BS0532', km: '145+326' },
  { type: 'sinyal', region: 'MS1', station: 'BAŞKÖY', building: 'PL3', code: 'BS0521', km: '142+565' },
  { type: 'sinyal', region: 'MS1', station: 'BAŞKÖY', building: 'PL3', code: 'BS0522', km: '142+521' },
  { type: 'sinyal', region: 'MS1', station: 'BAŞKÖY', building: 'PP+PL2', code: 'YBS0511', km: '139+853' },
  { type: 'sinyal', region: 'MS1', station: 'BAŞKÖY', building: 'PP+PL2', code: 'BS0512', km: '139+813' },
  { type: 'sinyal', region: 'MS1', station: 'BAŞKÖY', building: 'PP+PL2', code: 'S01', km: '137+953' },
  { type: 'sinyal', region: 'MS1', station: 'BAŞKÖY', building: 'PP+PL2', code: 'S32', km: '137+433' },
  { type: 'sinyal', region: 'MS1', station: 'BAŞKÖY', building: 'PP+PL2', code: 'S12', km: '137+391' },
  { type: 'sinyal', region: 'MS1', station: 'BAŞKÖY', building: 'PP+PL2', code: 'S22', km: '137+391' },
  { type: 'sinyal', region: 'MS1', station: 'BAŞKÖY', building: 'PP+PL2', code: 'S11', km: '136+776' },
  { type: 'sinyal', region: 'MS1', station: 'BAŞKÖY', building: 'PP+PL2', code: 'S21', km: '136+776' },
  { type: 'sinyal', region: 'MS1', station: 'BAŞKÖY', building: 'PP+PL2', code: 'S31', km: '136+734' },
  { type: 'sinyal', region: 'MS1', station: 'BAŞKÖY', building: 'PP+PL2', code: 'S02', km: '136+130' },
  { type: 'sinyal', region: 'MS1', station: 'BAŞKÖY', building: 'PL1', code: 'BS0491', km: '134+091' },
  { type: 'sinyal', region: 'MS1', station: 'BAŞKÖY', building: 'PL1', code: 'YBS0492', km: '134+051' },
  { type: 'sinyal', region: 'MS1', station: 'BAŞKÖY', building: 'PL1', code: 'BS0481', km: '131+026' },
  { type: 'sinyal', region: 'MS1', station: 'BAŞKÖY', building: 'PL1', code: 'BS0482', km: '130+987' },

  // 4- YEŞİLHİSAR (km 128+355 -> 116+420)
  { type: 'sinyal', region: 'MS2', station: 'YEŞİLHİSAR', building: 'PL4', code: 'BS0471', km: '128+355' },
  { type: 'sinyal', region: 'MS2', station: 'YEŞİLHİSAR', building: 'PL4', code: 'BS0472', km: '128+315' },
  { type: 'sinyal', region: 'MS2', station: 'YEŞİLHİSAR', building: 'PL4', code: 'KBS0461', km: '125+495' },
  { type: 'sinyal', region: 'MS2', station: 'YEŞİLHİSAR', building: 'CP+PL2+PL3', code: 'BS0462', km: '124+873' },
  { type: 'sinyal', region: 'MS2', station: 'YEŞİLHİSAR', building: 'CP+PL2+PL3', code: 'S01', km: '123+644' },
  { type: 'sinyal', region: 'MS2', station: 'YEŞİLHİSAR', building: 'CP+PL2+PL3', code: 'S03', km: '123+195' },
  { type: 'sinyal', region: 'MS2', station: 'YEŞİLHİSAR', building: 'CP+PL2+PL3', code: 'S22', km: '123+107' },
  { type: 'sinyal', region: 'MS2', station: 'YEŞİLHİSAR', building: 'CP+PL2+PL3', code: 'S12', km: '123+106' },
  { type: 'sinyal', region: 'MS2', station: 'YEŞİLHİSAR', building: 'CP+PL2+PL3', code: 'S42', km: '123+063' },
  { type: 'sinyal', region: 'MS2', station: 'YEŞİLHİSAR', building: 'CP+PL2+PL3', code: 'S32', km: '123+029' },
  { type: 'sinyal', region: 'MS2', station: 'YEŞİLHİSAR', building: 'CP+PL2+PL3', code: 'S62', km: '123+021' },
  { type: 'sinyal', region: 'MS2', station: 'YEŞİLHİSAR', building: 'CP+PL2+PL3', code: 'S52', km: '123+020' },
  { type: 'sinyal', region: 'MS2', station: 'YEŞİLHİSAR', building: 'CP+PL2+PL3', code: 'S51', km: '122+304' },
  { type: 'sinyal', region: 'MS2', station: 'YEŞİLHİSAR', building: 'CP+PL2+PL3', code: 'S61', km: '122+303' },
  { type: 'sinyal', region: 'MS2', station: 'YEŞİLHİSAR', building: 'CP+PL2+PL3', code: 'S41', km: '122+263' },
  { type: 'sinyal', region: 'MS2', station: 'YEŞİLHİSAR', building: 'CP+PL2+PL3', code: 'S31', km: '122+187' },
  { type: 'sinyal', region: 'MS2', station: 'YEŞİLHİSAR', building: 'CP+PL2+PL3', code: 'S11', km: '122+185' },
  { type: 'sinyal', region: 'MS2', station: 'YEŞİLHİSAR', building: 'CP+PL2+PL3', code: 'S21', km: '122+185' },
  { type: 'sinyal', region: 'MS2', station: 'YEŞİLHİSAR', building: 'CP+PL2+PL3', code: 'S04', km: '122+112' },
  { type: 'sinyal', region: 'MS2', station: 'YEŞİLHİSAR', building: 'CP+PL2+PL3', code: 'S02', km: '121+599' },
  { type: 'sinyal', region: 'MS2', station: 'YEŞİLHİSAR', building: 'PL1', code: 'BS0441', km: '119+709' },
  { type: 'sinyal', region: 'MS2', station: 'YEŞİLHİSAR', building: 'PL1', code: 'KBS0442', km: '119+669' },
  { type: 'sinyal', region: 'MS2', station: 'YEŞİLHİSAR', building: 'PL1', code: 'BS0431', km: '116+460' },
  { type: 'sinyal', region: 'MS2', station: 'YEŞİLHİSAR', building: 'PL1', code: 'BS0432', km: '116+420' },

  // 5- AKKÖY (km 113+762 -> 108+209)
  { type: 'sinyal', region: 'MS2', station: 'AKKÖY', building: 'PL1', code: 'B0422', km: '113+762' },
  { type: 'sinyal', region: 'MS2', station: 'AKKÖY', building: 'PL1', code: 'YBS0421', km: '113+535' },
  { type: 'sinyal', region: 'MS2', station: 'AKKÖY', building: 'PL1', code: 'S01', km: '111+684' },
  { type: 'sinyal', region: 'MS2', station: 'AKKÖY', building: 'PL1', code: 'S12', km: '111+164' },
  { type: 'sinyal', region: 'MS2', station: 'AKKÖY', building: 'PL1', code: 'S22', km: '111+159' },
  { type: 'sinyal', region: 'MS2', station: 'AKKÖY', building: 'PL1', code: 'S21', km: '110+624' },
  { type: 'sinyal', region: 'MS2', station: 'AKKÖY', building: 'PL1', code: 'S11', km: '110+621' },
  { type: 'sinyal', region: 'MS2', station: 'AKKÖY', building: 'PL1', code: 'S02', km: '110+100' },
  { type: 'sinyal', region: 'MS2', station: 'AKKÖY', building: 'PL1', code: 'YBS0402', km: '108+209' },

  // 6- ARAPLI (km 107+281 -> 98+963)
  { type: 'sinyal', region: 'MS2', station: 'ARAPLI', building: 'PP+PL3', code: 'YBS0401', km: '107+281' },
  { type: 'sinyal', region: 'MS2', station: 'ARAPLI', building: 'PP+PL3', code: 'S01', km: '105+302' },
  { type: 'sinyal', region: 'MS2', station: 'ARAPLI', building: 'PP+PL3', code: 'S32', km: '104+780' },
  { type: 'sinyal', region: 'MS2', station: 'ARAPLI', building: 'PP+PL3', code: 'S22', km: '104+736' },
  { type: 'sinyal', region: 'MS2', station: 'ARAPLI', building: 'PP+PL3', code: 'S12', km: '104+714' },
  { type: 'sinyal', region: 'MS2', station: 'ARAPLI', building: 'PP+PL3', code: 'S11', km: '104+027' },
  { type: 'sinyal', region: 'MS2', station: 'ARAPLI', building: 'PP+PL3', code: 'S21', km: '104+027' },
  { type: 'sinyal', region: 'MS2', station: 'ARAPLI', building: 'PP+PL3', code: 'S31', km: '103+990' },
  { type: 'sinyal', region: 'MS2', station: 'ARAPLI', building: 'PP+PL3', code: 'S02', km: '103+469' },
  { type: 'sinyal', region: 'MS2', station: 'ARAPLI', building: 'PL2', code: 'BS0381', km: '101+568' },
  { type: 'sinyal', region: 'MS2', station: 'ARAPLI', building: 'PL2', code: 'YBS0382', km: '101+065' },
  { type: 'sinyal', region: 'MS2', station: 'ARAPLI', building: 'PL1', code: 'BS0371', km: '99+469' },
  { type: 'sinyal', region: 'MS2', station: 'ARAPLI', building: 'PL1', code: 'BS0372', km: '98+963' }
];

export const TRACK_CIRCUIT_SPECS: Record<string, { frequency: string; capacitor: string }> = {
  '61/4': { frequency: '15,5 kHz', capacitor: 'Belirtilmedi' },
  '62/5': { frequency: '10,5 kHz', capacitor: 'Belirtilmedi' },
  '62/4': { frequency: '9,5 kHz', capacitor: 'Belirtilmedi' },
  '62/3': { frequency: '6,75 kHz', capacitor: '8 uF' },
  '62/2': { frequency: '5,75 kHz', capacitor: '8 uF' },
  '62/1': { frequency: '4,75 kHz', capacitor: '12 uF' },
  '61/3': { frequency: '5,75 kHz', capacitor: '8 uF' },
  '61/2': { frequency: '12,5 kHz', capacitor: 'Belirtilmedi' },
  '61/1': { frequency: '4,75 kHz', capacitor: '12 uF' },
  '60/6': { frequency: '11,5 kHz', capacitor: 'Belirtilmedi' },
  '60/5': { frequency: '10,5 kHz', capacitor: 'Belirtilmedi' },
  '60/3': { frequency: '5,75 kHz', capacitor: '8 uF' },
  '60/2': { frequency: '4,75 kHz', capacitor: '12 uF' },
  '60/1': { frequency: '6,75 kHz', capacitor: '8 uF' },
  '59/3': { frequency: '5,75 kHz', capacitor: '8 uF' },
  '59/2': { frequency: '4,75 kHz', capacitor: '12 uF' },
  '59/1': { frequency: '6,75 kHz', capacitor: '8 uF' },
  '58/5': { frequency: '6,75 kHz', capacitor: '8 uF' },
  '58/4': { frequency: '5,75 kHz', capacitor: '8 uF' },
  '58/3': { frequency: '10,5 kHz', capacitor: 'Belirtilmedi' },
  '58/2': { frequency: '4,75 kHz', capacitor: '12 uF' },
  '58/1': { frequency: '6,75 kHz', capacitor: '8 uF' },
  '57/6': { frequency: '5,75 kHz', capacitor: '8 uF' },
  '57/5': { frequency: '4,75 kHz', capacitor: '12 uF' },
  '57/4': { frequency: '9,5 kHz', capacitor: 'Belirtilmedi' },
  '57/3': { frequency: '6,75 kHz', capacitor: '8 uF' },
  '57/2': { frequency: '15,5 kHz', capacitor: 'Belirtilmedi' },
  '57/1': { frequency: '11,5 kHz', capacitor: 'Belirtilmedi' },
  '56/2': { frequency: '5,75 kHz', capacitor: '8 uF' },
  '56/1': { frequency: '4,75 kHz', capacitor: '12 uF' },
  '55/5': { frequency: '10,5 kHz', capacitor: 'Belirtilmedi' },
  '55/4': { frequency: '4,75 kHz', capacitor: '12 uF' },
  '55/3': { frequency: '12,5 kHz', capacitor: 'Belirtilmedi' },
  '55/2': { frequency: '11,5 kHz', capacitor: 'Belirtilmedi' },
  '55/1': { frequency: '6,75 kHz', capacitor: '8 uF' },
  '54/4': { frequency: '5,75 kHz', capacitor: '8 uF' },
  '54/3': { frequency: '4,75 kHz', capacitor: '12 uF' },
  '54/2': { frequency: '6,75 kHz', capacitor: '8 uF' },
  '54/1': { frequency: '5,75 kHz', capacitor: '8 uF' },
  '53/3': { frequency: '4,75 kHz', capacitor: '12 uF' },
  '53/2': { frequency: '6,75 kHz', capacitor: '8 uF' },
  '53/1': { frequency: '5,75 kHz', capacitor: '8 uF' },
  '52/3': { frequency: '4,75 kHz', capacitor: '12 uF' },
  '52/2': { frequency: '6,75 kHz', capacitor: '8 uF' },
  '52/1': { frequency: '5,75 kHz', capacitor: '8 uF' },
  '51/3': { frequency: '4,75 kHz', capacitor: '12 uF' },
  '51/2': { frequency: '6,75 kHz', capacitor: '8 uF' },
  '51/1': { frequency: '5,75 kHz', capacitor: '8 uF' },
  '50/4': { frequency: '4,75 kHz', capacitor: '12 uF' },
  '50/3': { frequency: '6,75 kHz', capacitor: '8 uF' },
  '50/2': { frequency: '10,5 kHz', capacitor: 'Belirtilmedi' },
  '50/1': { frequency: '5,75 kHz', capacitor: '8 uF' },
  '49/5': { frequency: '5,75 kHz', capacitor: '8 uF' },
  '49/4': { frequency: '4,75 kHz', capacitor: '12 uF' },
  '49/3': { frequency: '11,5 kHz', capacitor: 'Belirtilmedi' },
  '49/2': { frequency: '10,5 kHz', capacitor: 'Belirtilmedi' },
  '49/1': { frequency: '9,5 kHz', capacitor: 'Belirtilmedi' },
  '48/6': { frequency: '6,75 kHz', capacitor: '8 uF' },
  '48/5': { frequency: '15,5 kHz', capacitor: 'Belirtilmedi' },
  '48/4': { frequency: '5,75 kHz', capacitor: '8 uF' },
  '48/3': { frequency: '12,5 kHz', capacitor: 'Belirtilmedi' },
  '48/2': { frequency: '4,75 kHz', capacitor: '12 uF' },
  '48/1': { frequency: '11,5 kHz', capacitor: 'Belirtilmedi' },
  '47/6': { frequency: '6,75 kHz', capacitor: '8 uF' },
  '47/5': { frequency: '5,75 kHz', capacitor: '8 uF' },
  '47/4': { frequency: '10,5 kHz', capacitor: 'Belirtilmedi' },
  '47/3': { frequency: '4,75 kHz', capacitor: '12 uF' },
  '47/2': { frequency: '6,75 kHz', capacitor: '8 uF' },
  '47/1': { frequency: '15,5 kHz', capacitor: 'Belirtilmedi' },
  '46/7': { frequency: '5,75 kHz', capacitor: '8 uF' },
  '46/6': { frequency: '7,25 kHz', capacitor: '8 uF' },
  '46/5': { frequency: '10,5 kHz', capacitor: 'Belirtilmedi' },
  '46/4': { frequency: '4,75 kHz', capacitor: '12 uF' },
  '46/3': { frequency: '12,5 kHz', capacitor: 'Belirtilmedi' },
  '46/2': { frequency: '6,75 kHz', capacitor: '8 uF' },
  '46/1': { frequency: '5,75 kHz', capacitor: '8 uF' },
  '45/3': { frequency: '4,75 kHz', capacitor: '12 uF' },
  '45/2': { frequency: '6,75 kHz', capacitor: '8 uF' },
  '45/1': { frequency: '11,5 kHz', capacitor: 'Belirtilmedi' },
  '44/4': { frequency: '5,75 kHz', capacitor: '8 uF' },
  '44/3': { frequency: '15,5 kHz', capacitor: 'Belirtilmedi' },
  '44/2': { frequency: '4,75 kHz', capacitor: '12 uF' },
  '44/1': { frequency: '6,75 kHz', capacitor: '8 uF' },
  '43/6': { frequency: '12,5 kHz', capacitor: 'Belirtilmedi' },
  '43/5': { frequency: '5,75 kHz', capacitor: '8 uF' },
  '43/4': { frequency: '11,5 kHz', capacitor: 'Belirtilmedi' },
  '43/3': { frequency: '4,75 kHz', capacitor: '12 uF' },
  '43/2': { frequency: '10,5 kHz', capacitor: 'Belirtilmedi' },
  '43/1': { frequency: '6,75 kHz', capacitor: '8 uF' },
  '42/5': { frequency: '9,5 kHz', capacitor: 'Belirtilmedi' },
  '42/4': { frequency: '15,5 kHz', capacitor: 'Belirtilmedi' },
  '42/3': { frequency: '5,75 kHz', capacitor: '8 uF' },
  '42/2': { frequency: '4,75 kHz', capacitor: '12 uF' },
  '42/1': { frequency: '7,25 kHz', capacitor: '8 uF' },
  '41/3': { frequency: '9,5 kHz', capacitor: 'Belirtilmedi' },
  '41/2': { frequency: '5,75 kHz', capacitor: '8 uF' },
  '41/1': { frequency: '4,75 kHz', capacitor: '12 uF' },
  '40/3': { frequency: '6,75 kHz', capacitor: '8 uF' },
  '40/2': { frequency: '5,75 kHz', capacitor: '8 uF' },
  '40/1': { frequency: '4,75 kHz', capacitor: '12 uF' },
  '39/3': { frequency: '5,75 kHz', capacitor: '8 uF' },
  '39/2': { frequency: '4,75 kHz', capacitor: '12 uF' },
  '39/1': { frequency: '6,75 kHz', capacitor: '8 uF' },
  '38/5': { frequency: '5,75 kHz', capacitor: '8 uF' },
  '38/4': { frequency: '4,75 kHz', capacitor: '12 uF' },
  '38/3': { frequency: '15,5 kHz', capacitor: 'Belirtilmedi' },
  '38/2': { frequency: '6,75 kHz', capacitor: '8 uF' },
  '38/1': { frequency: '5,75 kHz', capacitor: '8 uF' },
  '37/5': { frequency: '4,75 kHz', capacitor: '12 uF' },
  '37/4': { frequency: '6,75 kHz', capacitor: '8 uF' },
  '37/3': { frequency: '12,5 kHz', capacitor: 'Belirtilmedi' },
  '37/2': { frequency: '5,75 kHz', capacitor: '8 uF' },
  '37/1': { frequency: '4,75 kHz', capacitor: '12 uF' },
  '36/5': { frequency: '6,75 kHz', capacitor: '8 uF' },
  '36/4': { frequency: '5,75 kHz', capacitor: '8 uF' },
  '36/3': { frequency: '11,5 kHz', capacitor: 'Belirtilmedi' },
  '36/2': { frequency: '4,75 kHz', capacitor: '12 uF' }
};

export const railwayData: RailwayItem[] = rawData.map((item, idx) => {
  if (item.type === 'devre') {
    const startVal = parseKmValue(item.start_km);
    const endVal = parseKmValue(item.end_km);
    const centerKm = (startVal + endVal) / 2;
    const minKm = Math.min(startVal, endVal);
    const maxKm = Math.max(startVal, endVal);
    const matchedCrossings = crossings.filter(c => c.val >= minKm && c.val <= maxKm);
    const spec = TRACK_CIRCUIT_SPECS[item.code];
    return {
      ...item,
      id: idx,
      centerKm,
      crossings: matchedCrossings,
      frequency: spec?.frequency || item.frequency,
      capacitor: spec?.capacitor || item.capacitor
    };
  } else {
    return {
      ...item,
      id: idx,
      centerKm: parseKmValue(item.km),
      crossings: []
    };
  }
});
