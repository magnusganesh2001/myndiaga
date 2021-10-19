import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllCategoryPage } from './all-category.page';

const routes: Routes = [
  {
    path: '',
    component: AllCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllCategoryPageRoutingModule {}
