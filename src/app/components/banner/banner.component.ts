import { Component, OnInit } from '@angular/core';
import {Settings} from '../../global/settings';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  constructor(public settings: Settings) { }

  ngOnInit(): void {
  }

}
