import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { msnExportFromCart, orderOverViewPostMSN, thankYou } from '../class/post';
import { NavService } from '../services/nav.service';
import { ToastrService } from '../services/toastr.service';

@Component({
  selector: 'app-thankyou-order',
  templateUrl: './thankyou-order.page.html',
  styleUrls: ['./thankyou-order.page.scss'],
})
export class ThankyouOrderPage implements OnInit {
  public priceIngs: any;
  deliveryDatet: any;

  constructor(public _ApiServiceService:NavService,
    private router :Router,
    private toastr: ToastrService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getPricings();
    this.addressThanks();
    this.thankPrcings();

    this.priceIngs = localStorage.getItem('price');
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
          console.log(res);

          this.totalPricings = res;
        }
      )
    }

    address : any;
    getAddress()
    {
      this.address = localStorage.getItem('msnCarts');

      var opost = new thankYou();
      opost.msnArray = this.msn;

      this._ApiServiceService.thankYouAddress(opost).subscribe(
        res=>{
          this.totalPricings = res;
        }
      )
    }

    home()
    {
      localStorage.removeItem('msnCarts');
      localStorage.removeItem('pppppp81258');
      localStorage.removeItem('ccccc');
      localStorage.removeItem('price');
      this.router.navigate(['/']);
    }

    addressCust :any;
    addressThanks()
    {
      var custId = localStorage.getItem('ccccc');
      this.msn = localStorage.getItem('msnCarts');

      this._ApiServiceService.thankYouAddress(custId).subscribe(
        res=>{
          this.addressCust = res;
        }
      )
    }

    listCart : any= [];
    thankPrcings()
    {
      this.msn = localStorage.getItem('msnCarts');

      var price  = new orderOverViewPostMSN();
      price.msnArray = this.msn;

      this._ApiServiceService.priceThanks(price).subscribe(
        res=>{
          this.deliveryDatet=res;

        }
      )
    }

}
