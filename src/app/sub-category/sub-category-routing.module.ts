import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubCategoryPage } from './sub-category.page';

const routes: Routes = [
  {
    path: '',
    component: SubCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubCategoryPageRoutingModule {}
