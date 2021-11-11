import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountBankDetailsPageRoutingModule } from './account-bank-details-routing.module';

import { AccountBankDetailsPage } from './account-bank-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountBankDetailsPageRoutingModule
  ],
  declarations: [AccountBankDetailsPage]
})
export class AccountBankDetailsPageModule {}
