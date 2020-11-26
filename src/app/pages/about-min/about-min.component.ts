import { Component, OnInit } from '@angular/core';
import {Settings} from '../../global/settings';

@Component({
  selector: 'app-about-min',
  templateUrl: './about-min.component.html',
  styleUrls: ['./about-min.component.scss']
})
export class AboutMinComponent implements OnInit {

  constructor(public settings: Settings) { }

  ngOnInit(): void {
  }

}
