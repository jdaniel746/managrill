import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// angular firebase
import { AngularFireDatabaseModule  } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { Settings } from './global/settings';
import {CartService} from './global/cart-service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [Settings, CartService],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
