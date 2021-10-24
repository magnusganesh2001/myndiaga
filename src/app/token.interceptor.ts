import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NavService } from './services/nav.service';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(private injector :Injector,private _ApiServiceService:NavService ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this._ApiServiceService.getToken()}`
      }
    });
    return next.handle(request);
  }
}
