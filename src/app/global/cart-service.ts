import {Injectable} from '@angular/core';
import {ProductDetail} from '../models/product-detail';
import {PaymentMethod} from '../models/payment-method';
import {Size} from "../models/size";

@Injectable()
export class CartService {

  private _$key: string;
  private _code: string;
  private _names: string;
  private _phone: string;
  private _email: string;
  private _date: string;
  private _costoEnvio: number;
  private _deliveryType: string;
  private _direction: string;
  private _note: string;
  private _payment: PaymentMethod;
  private _confirm: string;
  private _bank: string;
  private _paymentdate: string;
  private _change: number;
  private _products: ProductDetail[];
  private _sizeList: Size[];

  constructor() {
    this._products = [];
    this._sizeList = [];
    this.costoEnvio = 0;
  }

  get $key(): string {
    return this._$key;
  }

  set $key(value: string) {
    this._$key = value;
  }

  get code(): string {
    return this._code;
  }

  set code(value: string) {
    this._code = value;
  }

  get names(): string {
    return this._names;
  }

  set names(value: string) {
    this._names = value;
  }

  get phone(): string {
    return this._phone;
  }

  set phone(value: string) {
    this._phone = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get date(): string {
    return this._date;
  }

  set date(value: string) {
    this._date = value;
  }

  get deliveryType(): string {
    return this._deliveryType;
  }

  set deliveryType(value: string) {
    this._deliveryType = value;
  }

  get direction(): string {
    return this._direction;
  }

  set direction(value: string) {
    this._direction = value;
  }

  get products(): ProductDetail[] {
    return this._products;
  }

  set products(value: ProductDetail[]) {
    this._products = value;
  }

  get costoEnvio(): number {
    return this._costoEnvio;
  }

  set costoEnvio(value: number) {
    this._costoEnvio = value;
  }

  getSubtotal() {
    let subTotal = 0;

    this._products.forEach(p => {
      let totalToppins = 0;
      if (p.toppins) {
        p.toppins.forEach(t => {
          if (t.selected) {
            totalToppins +=  parseFloat(t.price);
          }
        });
      }
      if (p.sizeDefault) {
        subTotal += p.quantity * parseFloat(this.sizeList.find(x => x.$key === p.sizeDefault).price) + p.quantity * totalToppins;
      } else {
        subTotal += p.quantity * parseFloat(p.price) + p.quantity * totalToppins;
      }
    });
    return parseFloat(String(subTotal));
  }

  getTotal() {
    return this.getSubtotal() + this.costoEnvio;
  }

  get payment(): PaymentMethod {
    return this._payment;
  }

  set payment(value: PaymentMethod) {
    this._payment = value;
  }

  get note(): string {
    return this._note;
  }

  set note(value: string) {
    this._note = value;
  }

  get change(): number {
    return this._change;
  }

  set change(value: number) {
    this._change = value;
  }

  get confirm(): string {
    return this._confirm;
  }

  set confirm(value: string) {
    this._confirm = value;
  }

  get bank(): string {
    return this._bank;
  }

  set bank(value: string) {
    this._bank = value;
  }

  get paymentdate(): string {
    return this._paymentdate;
  }

  set paymentdate(value: string) {
    this._paymentdate = value;
  }

  get sizeList(): Size[] {
    return this._sizeList;
  }

  set sizeList(value: Size[]) {
    this._sizeList = value;
  }
}
