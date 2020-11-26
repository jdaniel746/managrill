import {Schedule} from './schedule';

export class SettingsModel {

  companyName: string;
  bannerImage: string;
  contactPhone: string;
  email: string;
  mainTitle: string;
  mainDescription: string;
  schedule: Schedule[];
  aboutContent: string;
  aboutTitle: string;
  delivery: string;
  pickup: string;
  banks: string;
  aboutImage: string;
  facebook: string;
  instagram: string;
  twitter: string;
  whatsapp: string;
  telegram: string;
  deliveryPriceMin: string;
  deliveryPriceMax: string;
  orderCounts: number;
}
