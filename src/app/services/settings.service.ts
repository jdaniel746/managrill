import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {Settings} from '../global/settings';
import {Schedule} from '../models/schedule';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  scheduleList: Schedule[];

  constructor(private firabase: AngularFireDatabase, private settings: Settings) { }

  getCompanyInfo() {
    this.firabase.object('companyInfo').snapshotChanges().subscribe( info => {
      this.settings.companyInfo = JSON.parse(JSON.stringify(info.payload));
      this.settings.deliveryType = [];
      this.settings.bankList = [];
      this.settings.companyInfo.banks.split(',').forEach(b => {
        this.settings.bankList.push(b);
      });
      if (this.settings.companyInfo.delivery) {
        this.settings.deliveryType.push('Entrega a Domicilio');
      }
      if (this.settings.companyInfo.pickup) {
        this.settings.deliveryType.push('Retirar personalmente (Pickup)');
      }
    });
    this.scheduleList = [];
    this.firabase.list('schedule').snapshotChanges().subscribe(sh => {
      sh.forEach(element => {
        this.scheduleList.push(JSON.parse(JSON.stringify(element.payload)));
      });
      this.settings.companyInfo.schedule = this.scheduleList;
    });
  }

  incrementOrder() {
    this.firabase.object(`companyInfo`).update({orderCounts: this.settings.companyInfo.orderCounts + 1});
  }
}
