import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { msnExportFromCart, orderOverViewPostMSN } from '../class/post';
import { NavService } from '../services/nav.service';
import { ToastrService } from '../services/toastr.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.page.html',
  styleUrls: ['./order-summary.page.scss'],
})
export class OrderSummaryPage implements OnInit {

  constructor(public _ApiServiceService:NavService,
    private router :Router,
    private toastr: ToastrService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.getCartDetails();

    this.getPricings();
  }

  // get product overView details
  listCart : any= [];
  getCartDetails()
  {
    this.msn = localStorage.getItem('msnCarts');

    var orderOverView  = new orderOverViewPostMSN();
    orderOverView.msnArray = this.msn;

    this._ApiServiceService.orderOverView(orderOverView).subscribe(
      res=>{
        this.listCart=res;
      }
    )
  }

  msn : any;

  totalPricings : any= [];


  // post msn and get price response
  getPricings()
  {
    this.msn = localStorage.getItem('msnCarts');

    var opost = new msnExportFromCart();
    opost.msnArray = this.msn;

    this._ApiServiceService.aftercartPricings(opost).subscribe(
      res=>{
        this.totalPricings = res;
      }
    )
  }


    // adding quantity
    addingqty(quantity:any,ordr_id:any,msn:any) {

      var qty= parseInt(quantity)+1 ;

      this._ApiServiceService.updateQuantityOrderSummary(qty,ordr_id,msn).subscribe(
        res=>{

          if(res == true)
          {
            this.toastr.successToast('Quantity Added');
            this.ngOnInit();
          }
        },err=>{
          this.toastr.errorToast('Something Went Wrong');
        }
      )


    }



    // minu quantity
    minusqty(quantity:any,ordr_id:any,msn:any) {

      var qty= parseInt(quantity)-1 ;

      this._ApiServiceService.updateQuantityOrderSummary(qty,ordr_id,msn).subscribe(
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
