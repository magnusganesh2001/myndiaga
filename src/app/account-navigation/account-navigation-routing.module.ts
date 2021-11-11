import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountNavigationPage } from './account-navigation.page';

const routes: Routes = [
  {
    path: '',
    component: AccountNavigationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountNavigationPageRoutingModule {}
