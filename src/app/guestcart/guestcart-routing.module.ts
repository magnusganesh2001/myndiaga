import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestcartPage } from './guestcart.page';

const routes: Routes = [
  {
    path: '',
    component: GuestcartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestcartPageRoutingModule {}
