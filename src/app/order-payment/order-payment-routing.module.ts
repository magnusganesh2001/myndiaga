import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderPaymentPage } from './order-payment.page';

const routes: Routes = [
  {
    path: '',
    component: OrderPaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderPaymentPageRoutingModule {}
