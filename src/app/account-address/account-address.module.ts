import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountAddressPageRoutingModule } from './account-address-routing.module';

import { AccountAddressPage } from './account-address.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountAddressPageRoutingModule
  ],
  declarations: [AccountAddressPage]
})
export class AccountAddressPageModule {}
