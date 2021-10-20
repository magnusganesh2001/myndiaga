import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommunicateService } from './services/communicate.service';
import { NavService } from './services/nav.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _ApiServiceService:NavService,
    private router :Router,private _communicate:CommunicateService) { }

  canActivate() :boolean{
    if(this._ApiServiceService.isLoggedIn())
    {
      return true;
    }
    else{
      // this.toastr.warning('Please Login To Access This Section');
      this._communicate.navbarOpen.next(true)
      this.router.navigate(['/home']);
      return false;
    }
  }
}
