import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountPANPageRoutingModule } from './account-pan-routing.module';

import { AccountPANPage } from './account-pan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountPANPageRoutingModule
  ],
  declarations: [AccountPANPage]
})
export class AccountPANPageModule {}
