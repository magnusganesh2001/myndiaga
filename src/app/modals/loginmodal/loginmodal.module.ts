import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { LoginmodalPageRoutingModule } from './loginmodal-routing.module';

import { LoginmodalPage } from './loginmodal.page';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginmodalPageRoutingModule,
  ],
  exports:[FormsModule],
  declarations: [LoginmodalPage]
})
export class LoginmodalPageModule {}
