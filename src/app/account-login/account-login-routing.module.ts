import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountLoginPage } from './account-login.page';

const routes: Routes = [
  {
    path: '',
    component: AccountLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountLoginPageRoutingModule {}
