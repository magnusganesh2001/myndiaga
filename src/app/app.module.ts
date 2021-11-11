import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { TokenInterceptorInterceptor } from './token.interceptor';
import { LoginmodalPage } from './modals/loginmodal/loginmodal.page';
import { SigninComponent } from './modals/signin/signin.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent,SigninComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,
    FormsModule,
    ReactiveFormsModule, NgxSliderModule],
    exports:[],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorInterceptor,
    multi: true
  },],
  bootstrap: [AppComponent],
})
export class AppModule { }
