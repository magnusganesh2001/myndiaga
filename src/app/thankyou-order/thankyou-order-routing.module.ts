import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThankyouOrderPage } from './thankyou-order.page';

const routes: Routes = [
  {
    path: '',
    component: ThankyouOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThankyouOrderPageRoutingModule {}
