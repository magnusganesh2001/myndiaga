import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountLoginPageRoutingModule } from './account-login-routing.module';

import { AccountLoginPage } from './account-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountLoginPageRoutingModule
  ],
  declarations: [AccountLoginPage]
})
export class AccountLoginPageModule {}
