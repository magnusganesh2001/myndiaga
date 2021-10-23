import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NavService } from './services/nav.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {
  constructor(private _ApiServiceService:NavService,
    private router :Router) { }

  canActivate() :boolean{
    if(this._ApiServiceService.isLoggedIn())
    {
      this.router.navigate(['/accountCart']);
      return false;
    }
    else{
      return true;
    }
  }
}
