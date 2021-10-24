import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderPaymentPageRoutingModule } from './order-payment-routing.module';

import { OrderPaymentPage } from './order-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderPaymentPageRoutingModule
  ],
  declarations: [OrderPaymentPage]
})
export class OrderPaymentPageModule {}
