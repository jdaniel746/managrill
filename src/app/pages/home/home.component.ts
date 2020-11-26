import {Component, ElementRef, OnInit} from '@angular/core';
import {Settings} from '../../global/settings';
import {Category} from '../../models/category';
import {Product} from '../../models/product';
import {CategoryService} from '../../services/category.service';
import {ProductService} from '../../services/product.service';
import {CartService} from '../../global/cart-service';
import {ProductDetail} from '../../models/product-detail';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PaymentMethod} from '../../models/payment-method';
import {PaymentMethodService} from '../../services/payment-method.service';
import {ToppinsService} from '../../services/toppins.service';
import {Toppins} from '../../models/toppins';
import * as moment from 'moment';
import {Size} from '../../models/size';
import {SizingService} from '../../services/sizing.service';
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categoryList: Category[];
  productList: Product[];
  selectedProduct: ProductDetail;
  paymentMethodList: PaymentMethod[];
  contactForm: FormGroup;
  paymentForm: FormGroup;
  submitted = false;
  submittedPayment = false;
  selectedPayment: PaymentMethod;
  toppinsList: Toppins[];
  sizingList: Size[];
  daysWeek: string[] = ['Dom' , 'Lun' , 'Mar' , 'Mie' , 'Jue' , 'Vie' , 'Sab' ];
  tittle = '';
  description = '';

  constructor(public settings: Settings, private categoryService: CategoryService, private formBuilder: FormBuilder,
              private productService: ProductService, public cart: CartService, public element: ElementRef,
              private paymentMethodService: PaymentMethodService, public toppinsService: ToppinsService,
              public sizingService: SizingService, private settingsService: SettingsService) {
  }

  ngOnInit(): void {
    this.selectedProduct = new ProductDetail();
    this.toppinsList = [];
    this.sizingList = [];
    this.selectedPayment = new PaymentMethod();

    this.paymentForm = this.formBuilder.group({
      bank: ['', Validators.required],
      date: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      confirm: ['', [Validators.required, Validators.maxLength(30)]]
    });
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^(\\d{10})')]],
      email: ['', [Validators.email, Validators.maxLength(30)]],
      note: [''],
      direction: [''],
      deliveryType: ['', Validators.required]
    });

    this.categoryService.getCategory().snapshotChanges().subscribe(items => {
      this.categoryList = [];
      items.forEach(element => {
        const x = element.payload.toJSON() as Category;
        this.productService.getProductsByCategory(element.key).snapshotChanges().subscribe(prods => {
          this.productList = [];
          prods.forEach(element2 => {
            const y = element2.payload.toJSON() as Product;
            console.log('df' + JSON.stringify(y));
            y.quantity = 1;
            this.productList.push(y);
          });
          x.products = this.productList;
        });
        this.categoryList.push(x as Category);
      });
    });
    this.paymentMethodService.getPaymentMethod().snapshotChanges().subscribe( pm => {
      this.paymentMethodList = [];
      pm.forEach(elm => {
        const pay = elm.payload.toJSON() as PaymentMethod;
        pay.$key = elm.key;
        this.paymentMethodList.push(pay);
      });
    });
    this.toppinsService.getToppins().snapshotChanges().subscribe( tops => {
      tops.forEach( t => {
        const top = t.payload.toJSON() as Toppins;
        top.$key = t.key;
        this.toppinsList.push(top);
      });
    });
    this.sizingService.getSizing().snapshotChanges().subscribe( sizing => {
      sizing.forEach(size => {
        const s = size.payload.toJSON() as Size;
        s.$key = size.key;
        this.sizingList.push(s);
      });
    });
    this.cart.sizeList = this.sizingList;
  }

  get f() { return this.contactForm.controls; }
  get p() { return this.paymentForm.controls; }

  onSubmit(target) {
    this.submitted = true;
    if (this.contactForm.invalid ||
      (this.contactForm.value.deliveryType.includes('Domicilio') &&
      this.contactForm.value.direction === '')) {
      return;
    }
    this.cart.deliveryType = this.contactForm.value.deliveryType;
    this.cart.direction = this.contactForm.value.direction;
    this.cart.email = this.contactForm.value.email;
    this.cart.note = this.contactForm.value.note;
    this.cart.phone = this.contactForm.value.phone;
    this.cart.names = this.contactForm.value.name;
    this.element.nativeElement.querySelector('#' + target).style.setProperty('display', 'none');
  }

  onPaymentSubmit(target) {
    this.submittedPayment = true;
    if (this.paymentForm.invalid) {
      return;
    }

    this.cart.bank = this.paymentForm.value.bank;
    this.cart.paymentdate = this.paymentForm.value.date;
    this.cart.confirm = this.paymentForm.value.confirm;
    this.element.nativeElement.querySelector('#' + target).style.setProperty('display', 'none');
  }

  onPaymentReset() {
    this.submittedPayment = false;
    this.paymentForm.reset();
    this.element.nativeElement.querySelector('#popupPayment').style.setProperty('display', 'none');
  }

  onReset() {
    this.submitted = false;
    this.contactForm.reset();
    this.element.nativeElement.querySelector('#popupDetail').style.setProperty('display', 'none');
  }

  add(prod) {
    console.log('p' + JSON.stringify(prod));
    // if (!this.validateEquals(prod, this.cart.products)) {
    this.cart.products.push(prod);
    this.closePopup('popup');
    // }
  }

  selectProduct(prod) {
    const p = new ProductDetail();
    p.productKey = prod.productKey;
    p.name = prod.name;
    p.description = prod.description;
    p.note = prod.note === undefined ? '' : prod.note;
    p.quantity = prod.quantity;
    p.price = prod.price;
    p.sizeDefault = prod.sizeDefault;
    p.toppins = [];
    p.size = [];

    if (prod.toppins) {
      const listToppins = prod.toppins.split(',');
      listToppins.forEach(tp => {
        const toppin = new Toppins();
        const y = this.toppinsList.find(e => e.$key === tp);
        toppin.name = y.name;
        toppin.$key = y.$key;
        toppin.price = y.price;
        toppin.selected = false;
        p.toppins.push(toppin);
      });
    }
/*    if (prod.size) {
      const listSize = prod.size.split(',');
      listSize.forEach(s => {
        const size = new Size();
        const y = this.sizingList.find(e => e.$key === s);
        size.name = y.name;
        size.$key = y.$key;
        size.price = y.price;
        console.log('siz' + JSON.stringify(size) + '/' + JSON.stringify(y));
        p.size.push(size);
      });
    }*/
    this.selectedProduct = p;
    this.element.nativeElement.querySelector('#popup').style.setProperty('display', 'flex');
  }

  send() {
    if (this.isJournalValid()) {
      if (!this.contactForm.invalid && !(this.contactForm.value.deliveryType.includes('Domicilio') &&
        this.contactForm.value.direction === '')) {
        window.open('https://api.whatsapp.com/send?phone=' + this.settings.companyInfo.contactPhone + '&text=%20' +
          this.buildMessage(), '_blank');
      } else {
        this.description = 'Debe llenar toda la información.';
        this.element.nativeElement.querySelector('#popupGeneric').style.setProperty('display', 'flex');
      }
    } else {
      this.description = 'En este horario no estamos recibiendo pedidos, puede realizar sus pedidos en nuestro horario de atención.';
      this.element.nativeElement.querySelector('#popupGeneric').style.setProperty('display', 'flex');
    }
  }

  delete(prod) {
    this.cart.products.splice(prod, 1);
  }

  buildMessage() {
    const d = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    this.settingsService.incrementOrder();

    let text = '%3D%3D%3D+NUEVO+PEDIDO+ONLINE+%3D%3D%3D%0A%0A' +
      'Pedido+numero+' + this.settings.companyInfo.orderCounts + 1 + '%0A' +
      'Fecha%3A+' + d.toLocaleDateString('es-ES', options) + '.%0A' +
      'Hora%3A+' + d.getHours() + '%3A' + d.getMinutes() + '%3A' + d.getSeconds() + '.%0A%0A' +
      'Tipo+' + this.cart.deliveryType.toUpperCase() + '%0A' +
     // 'Tiempo+de+entrega%3A+26min%0A' +
      'Metodo+de+pago%3A+' + this.paymentMethodList.filter(f =>
        f.$key === this.cart.payment.$key)[0].name + '%0A';
    if (this.cart.payment.categoryPayment === 1) {
        text += 'Vuelto+para%3A+' + this.cart.change + '+%0A';
    } else if (this.cart.payment.categoryPayment === 2) {
      text += '%3D%3D%3Dinformacion+de+pago%3D%3D%3D%0A%0A' +
        'Banco%3A+' + this.cart.bank + '+%0A' +
        'Fecha transacción%3A+' + this.cart.paymentdate + '+%0A' +
        'N° de confirmación%3A+' + this.cart.confirm + '+%0A%0A';
    }
    text += 'Subtotal%3A+' + this.cart.getSubtotal() + '+USD%0A' +
      'Total+' + this.cart.getTotal() + '+USD%0A%0A' +
      '%3D%3D%3Dinformacion+del+cliente%3D%3D%3D%0A%0A' +
      'Nombres+' + this.cart.names + '%0A' +
      'Correo+electronico%3A+' + this.cart.email + '%0A' +
      'Telefono%3A+' + this.cart.phone + '%0A' +
      'Direccion%3A+' + this.cart.direction + '%0A%0A' +
      'Comentarios+' + this.cart.note + '%0A%0A' +
      '%3D%3D%3DPRODUCTOS%3D%3D%3D%0A%0A';
    this.cart.products.forEach(p => {
      if (p.sizeDefault) {
        text += p.quantity + 'x+' + p.name + '+' + this.cart.sizeList.find(x => x.$key === p.sizeDefault).name + '+' +
          this.cart.sizeList.find(x => x.$key === p.sizeDefault).price + '+USD%0A' + p.note + '%0A';
      } else {
        text += p.quantity + 'x+' + p.name + '+' + p.price + '+USD%0A' + p.note + '%0A';
      }
    });
      /*'Size%3A+Small+%0A' +
      'Toppings%3A+Extra+mozzarella+1%2C50+USD%0A' +
      'NO+MUSHROOMS%2C+PLEASE%21%0A-----------------------%0A%0A' +*/
    text += '%3D%3D%3D+final+del+pedido+%3D%3D%3D%3D%3D%0A%0A';
    if (this.cart.payment.categoryPayment === 2) {
      text += 'Su+pedido+fue+recibido!+en+breve+se+verificará+el+pago+';
    } else {
      text += 'Su+pedido+fue+recibido!+en+breve+se+procesará+';
    }

    return text;
  }

  openEdit() {
    this.element.nativeElement.querySelector('#popupDetail').style.setProperty('display', 'flex');
  }

  onPaymentChange(event) {
    if (this.cart.payment.categoryPayment === 2) {
      this.selectedPayment = this.paymentMethodList.filter(f => f.$key === this.cart.payment.$key)[0];
      this.element.nativeElement.querySelector('#popupPayment').style.setProperty('display', 'flex');
    }
  }

  closePopup(target) {
    this.element.nativeElement.querySelector('#' + target).style.setProperty('display', 'none');
  }

  validateEquals(item: ProductDetail, list: ProductDetail[]) {
    const result = list.filter(f =>
      f.note === item.note &&
      f.productKey === item.productKey &&
      f.quantity === item.quantity &&
      f.price === item.price
    );
    if (result.length > 0) {
      result.forEach(r => {
        item.toppins.forEach(t => {
          r.toppins.filter(x => x.$key === t.$key);
        });
      });
    }
    return result.length > 0 ? true : false;
  }

  isJournalValid() {
    const date = new Date();
    let result = false;
    this.settings.companyInfo.schedule.forEach(sc => {
      let days: string[];
      const beginningTime = moment(sc.startTime, 'hh:mm');
      const endTime = moment(sc.endTime, 'hh:mm');
      days = sc.days.split('-');
      const arr = days.filter(d => d === this.daysWeek[date.getUTCDay()]);
      const horaActual = moment(date.getHours() + ':' + date.getMinutes(), 'hh:mm');
      if (arr.length > 0 && horaActual.isBefore(endTime) && horaActual.isAfter(beginningTime)) {
        result = true;
      }
    });
    return result;
  }

  getSizePrice(prod: ProductDetail) {
    return this.sizingList.find(x => x.$key === prod.sizeDefault);
  }
}
