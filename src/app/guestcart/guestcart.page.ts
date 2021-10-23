import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavService } from '../services/nav.service';

@Component({
  selector: 'app-guestcart',
  templateUrl: './guestcart.page.html',
  styleUrls: ['./guestcart.page.scss'],
})
export class GuestcartPage implements OnInit {
  postAdress: any;
  msnArray: any;

  constructor(public _ApiServiceService:NavService,
    private router :Router,
    private route:ActivatedRoute) { }

    public msnInput : any = [];
    public quantity : any = [];
  // show address
  listCart : any= [];

  // add button
  plusBtn:any;
  minusBtn :any;
  qtyVal:any;
  ngOnInit(): void {
    this.getCartDetails();
  }

  // get cart daat
  getCartDetails()
  {
    this._ApiServiceService.guestCartDetails(localStorage.getItem('unique_code')).subscribe(
      data=>{
        console.log(data);
        
        this.listCart=data;
        for(let i = 0 ; i< this.listCart[0].cartsDetails.length ; i++)
        {
          if(!this.msnInput.includes(this.listCart[0].cartsDetails[i].msn)){
            this.msnInput.push(this.listCart[0].cartsDetails[i].msn);
            this.quantity.push(this.listCart[0].cartsDetails[i].qty);
          }
        }
      }
    )
  }

  allmsn:any;
  // delete cart data
  deleteCartData(guest_cart_id:any,msn:any)
  {
    this._ApiServiceService.removeProductGuest(guest_cart_id).subscribe(
      res=>{
        // this.toastr.success('Deleted');
        this.ngOnInit();
      }
    )
  }

  postMsnFromCart()
  {
    if(localStorage.getItem('msnCarts'))
    {
      localStorage.removeItem('msnCarts');
      localStorage.setItem('msnCarts',this.msnInput);
    }
    else{
      localStorage.setItem('msnCarts',this.msnInput);
    }
    // localStorage.setItem('qtyCart',quantity.quantity14);
    this.router.navigate(['/accountLogin']);
  }


  // adding quantity
  addingqty(quantity:any,guest_cart_id:any) {
    this.plusBtn = document.getElementById('plus');
    this.minusBtn = document.getElementById('minus');

    var qty= parseInt(quantity)+1 ;

    this._ApiServiceService.updateQuantityGuest(qty,guest_cart_id).subscribe(
      res=>{

        if(res == true)
        {
          // this.toastr.success('Quantity Added');
          this.ngOnInit();
        }
      },err=>{
        // this.toastr.warning('Something Went Wrong');
      }
    )


  }

  // minu quantity
  minusqty(quantity:any,guest_cart_id:any) {
    this.plusBtn = document.getElementById('plus');
    this.minusBtn = document.getElementById('minus');

    console.log(guest_cart_id);
    
    var qty= parseInt(quantity)-1 ;

    this._ApiServiceService.updateQuantityMinusGuest(qty,guest_cart_id).subscribe(
      res=>{
        if(res == true)
        {
          // this.toastr.success('Quantity Decreased');
          this.ngOnInit();
        }
      },err=>{
        // this.toastr.warning('Something Went Wrong');
      }
    )
  }

}
