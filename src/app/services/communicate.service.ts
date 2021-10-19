import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavService } from './nav.service';

@Injectable({
  providedIn: 'root'
})
export class CommunicateService {

  constructor(private _service:NavService) {
    this.updateCart()
    this.updateWishlist()
    this.updateOrder()
  }

  cartNo:any
  wishlistNo:any
  orderNo:any

  updateCart(){
    if(this._service.isLoggedIn())
    this._service.getCartQuantity().subscribe(res=>{
      this.cartNo = res
  })
  else{
    let unique_code = localStorage.getItem('unique_code')
  this._service.getGuestCartQuantity(unique_code).subscribe(res=>{
    this.cartNo = res
})

}
  }
  updateWishlist(){
    if(this._service.isLoggedIn())
this._service.getWishlistQuantity().subscribe(res=>{
  this.wishlistNo = res
})
  }
  updateOrder(){
    if(this._service.isLoggedIn())
this._service.updateOrder().subscribe(res=>{
  this.orderNo = res
})
  }




  navbarOpen = new BehaviorSubject(false);

 allCategory = new BehaviorSubject(null);
}
