import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThankyouOrderPageRoutingModule } from './thankyou-order-routing.module';

import { ThankyouOrderPage } from './thankyou-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThankyouOrderPageRoutingModule
  ],
  declarations: [ThankyouOrderPage]
})
export class ThankyouOrderPageModule {}
