import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';
import {AboutMinComponent} from '../about-min/about-min.component';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [HomeComponent, AboutMinComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    ComponentsModule
  ]
})
export class HomeModule { }
