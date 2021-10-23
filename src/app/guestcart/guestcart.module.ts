import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestcartPageRoutingModule } from './guestcart-routing.module';

import { GuestcartPage } from './guestcart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuestcartPageRoutingModule
  ],
  declarations: [GuestcartPage]
})
export class GuestcartPageModule {}
