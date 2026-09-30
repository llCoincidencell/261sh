export type AssetType = 'devre' | 'sinyal' | 'cda';

export interface Crossing {
  name: string;
  kmStr: string;
  val: number;
}

export interface BuildingInfo {
  loc: string;
  ctrl: string;
}

export interface RailwayItem {
  id: number;
  type: AssetType;
  region: 'MS1' | 'MS2';
  station: string;
  building: string;
  code: string;
  km?: string;
  start_km?: string;
  end_km?: string;
  length?: number;
  centerKm: number;
  crossings?: Crossing[];
  dist?: number;
  frequency?: string;
  capacitor?: string;
}

export type FilterType = 'HEPSİ' | 'DEVRE' | 'SINYAL' | 'CDA' | 'GECIT';
