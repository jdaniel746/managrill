import {Product} from './product';
import {Toppins} from './toppins';

export class Category {
  $key: string;
  name: string;
  image: string;
  products?: Product[];
}
