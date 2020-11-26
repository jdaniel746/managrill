import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productList: AngularFireList<any>;

  constructor(private firabase: AngularFireDatabase) { }

  getProducts() {
    return this.productList = this.firabase.list('products');
  }

  getProductsByCategory(cat) {
    return this.firabase.list('products', ref => ref.orderByChild('category').equalTo(parseInt(cat)));
  }
}
