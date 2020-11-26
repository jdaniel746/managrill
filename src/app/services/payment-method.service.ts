import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  methodList: AngularFireList<any>;

  constructor(private firabase: AngularFireDatabase) {
  }

  getPaymentMethod() {
    return this.methodList = this.firabase.list('paymentMethods');
  }
}
