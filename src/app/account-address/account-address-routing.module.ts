import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountAddressPage } from './account-address.page';

const routes: Routes = [
  {
    path: '',
    component: AccountAddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountAddressPageRoutingModule {}
