import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountPasswordPageRoutingModule } from './account-password-routing.module';

import { AccountPasswordPage } from './account-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountPasswordPageRoutingModule
  ],
  declarations: [AccountPasswordPage]
})
export class AccountPasswordPageModule {}
