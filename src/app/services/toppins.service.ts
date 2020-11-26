import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class ToppinsService {

  toppinsList: AngularFireList<any>;

  constructor(private firabase: AngularFireDatabase) { }

  getToppins() {
    return this.toppinsList = this.firabase.list('toppins');
  }
}
