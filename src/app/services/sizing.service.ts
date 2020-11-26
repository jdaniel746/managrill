import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class SizingService {
  sizingList: AngularFireList<any>;

  constructor(private firabase: AngularFireDatabase) { }

  getSizing() {
    return this.sizingList = this.firabase.list('sizing');
  }
}
