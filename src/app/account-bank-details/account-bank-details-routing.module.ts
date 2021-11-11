import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountBankDetailsPage } from './account-bank-details.page';

const routes: Routes = [
  {
    path: '',
    component: AccountBankDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountBankDetailsPageRoutingModule {}
