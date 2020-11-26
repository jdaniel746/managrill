import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryList: AngularFireList<any>;

  constructor(private firabase: AngularFireDatabase) { }

  getCategory() {
    return this.categoryList = this.firabase.list('category');
  }
}
