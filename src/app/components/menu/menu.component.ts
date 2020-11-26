import { Component, OnInit } from '@angular/core';
import {Settings} from '../../global/settings';
import {CartService} from "../../global/cart-service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(public settings: Settings, public cart: CartService) { }

  ngOnInit(): void {
  }

}
