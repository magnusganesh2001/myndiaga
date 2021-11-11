import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountPANPage } from './account-pan.page';

const routes: Routes = [
  {
    path: '',
    component: AccountPANPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountPANPageRoutingModule {}
