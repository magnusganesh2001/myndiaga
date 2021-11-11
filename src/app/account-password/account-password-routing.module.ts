import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountPasswordPage } from './account-password.page';

const routes: Routes = [
  {
    path: '',
    component: AccountPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountPasswordPageRoutingModule {}
