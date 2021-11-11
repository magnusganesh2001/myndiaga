import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountNavigationPageRoutingModule } from './account-navigation-routing.module';

import { AccountNavigationPage } from './account-navigation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountNavigationPageRoutingModule
  ],
  declarations: [AccountNavigationPage]
})
export class AccountNavigationPageModule {}
