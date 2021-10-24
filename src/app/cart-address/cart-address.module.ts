import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartAddressPageRoutingModule } from './cart-address-routing.module';

import { CartAddressPage } from './cart-address.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartAddressPageRoutingModule
  ],
  declarations: [CartAddressPage]
})
export class CartAddressPageModule {}
