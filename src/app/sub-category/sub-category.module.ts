import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubCategoryPageRoutingModule } from './sub-category-routing.module';

import { SubCategoryPage } from './sub-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubCategoryPageRoutingModule
  ],
  declarations: [SubCategoryPage]
})
export class SubCategoryPageModule {}
