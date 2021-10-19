import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllCategoryPageRoutingModule } from './all-category-routing.module';

import { AllCategoryPage } from './all-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllCategoryPageRoutingModule
  ],
  declarations: [AllCategoryPage]
})
export class AllCategoryPageModule {}
