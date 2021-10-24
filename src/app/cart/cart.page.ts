import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavService } from '../services/nav.service';
import { ToastrService } from '../services/toastr.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  postAdress: any;
  msnArray: any;

  constructor(public _ApiServiceService:NavService,
    private router :Router,
    private toastr: ToastrService,
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
    this._ApiServiceService.showACartDetails().subscribe(
      data=>{
        this.listCart=data;

        for(let i = 0 ; i< this.listCart[0].cartsDetails.length ; i++)
        {
          if(!this.msnInput.includes(this.listCart[0].cartsDetails[i].msn)){
            this.msnInput.push(this.listCart[0].cartsDetails[i].msn);
            this.quantity.push(this.listCart[0].cartsDetails[i].cartprt_id);
          }
        }

      }
    )
  }

  allmsn:any;
  // delete cart data
  deleteCartData(cartprt_id:any,msn:any)
  {
  //   this.allmsn = localStorage.getItem('msnCarts');
  //   this.msnArray = this.allmsn.split(',');

  //   var id = this.msnArray.indexOf(msn); // 2
  //   var removedMsn = this.msnArray.splice(id,  1);



    this._ApiServiceService.cartData(cartprt_id).subscribe(
      res=>{
        this.toastr.successToast('Deleted');
        this.router.navigate(['/accountCart'])
        .then(() => {
          window.location.reload();
        });
      }
    )
  }

  postMsnFromCart()
  {
    localStorage.setItem('msnCarts',this.msnInput);

    // localStorage.setItem('qtyCart',quantity.quantity14);
    this.router.navigate(['/accountCartAddress']);
  }


  // adding quantity
  addingqty(quantity:any,cart_id:any) {
    this.plusBtn = document.getElementById('plus');
    this.minusBtn = document.getElementById('minus');

    var qty= parseInt(quantity)+1 ;

    this._ApiServiceService.updateQuantity(qty,cart_id).subscribe(
      res=>{

        if(res == true)
        {
          this.toastr.successToast('Quantity Added');
          this.ngOnInit();
        }
      },err=>{
        this.toastr.warnToast('Something Went Wrong');
      }
    )


  }

  // minu quantity
  minusqty(quantity:any,cart_id:any) {
    this.plusBtn = document.getElementById('plus');
    this.minusBtn = document.getElementById('minus');

    var qty= parseInt(quantity)-1 ;

    this._ApiServiceService.updateQuantityMinus(qty,cart_id).subscribe(
      res=>{
        if(res == true)
        {
          this.toastr.successToast('Quantity Decreased');
          this.ngOnInit();
        }
      },err=>{
        this.toastr.warnToast('Something Went Wrong');
      }
    )
  }

}
