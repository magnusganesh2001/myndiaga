import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartAddressPage } from './cart-address.page';

const routes: Routes = [
  {
    path: '',
    component: CartAddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartAddressPageRoutingModule {}
