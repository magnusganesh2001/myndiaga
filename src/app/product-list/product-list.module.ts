import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductListPageRoutingModule } from './product-list-routing.module';

import { ProductListPage } from './product-list.page';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductListPageRoutingModule,
    NgxSliderModule
  ],
  declarations: [ProductListPage]
})
export class ProductListPageModule {}
