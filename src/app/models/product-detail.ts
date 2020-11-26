import {Toppins} from './toppins';
import {Size} from './size';

export class ProductDetail {
  productKey: string;
  name: string;
  description: string;
  price: string;
  quantity: number;
  note: string;
  toppins: Toppins[];
  size: Size[];
  sizeDefault?: string;

  constructor() {
  }
}
