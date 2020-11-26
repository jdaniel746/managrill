import {ProductDetail} from './product-detail';

export class Order {
  $key: string;
  code: string;
  names: string;
  phone: string;
  email: string;
  date: string;
  deliveryType: string;
  direction: string;
  products: ProductDetail[];
}
