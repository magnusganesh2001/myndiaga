import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunicateService } from '../services/communicate.service';
import { NavService } from '../services/nav.service';
import { ToastrService } from '../services/toastr.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {
  name: any;

  constructor(public _ApiServiceService:NavService,
    private router :Router,
    private toastr: ToastrService,
    private route:ActivatedRoute,
    private _communicate:CommunicateService) { }

  ngOnInit(): void {

    this.showwishlist();
    this._communicate.updateWishlist()

  }
  product:any= [];
  showwishlist()
  {
    this._ApiServiceService.showWishlist().subscribe(
      res=>{
        this.product=res;
        this.name = localStorage.getItem('name');

      }
    )
  }

  addMSN(prtid:any,msn:any,wishlist:any)
  {
    if(localStorage.getItem('token'))
    {
      this._ApiServiceService.addMSN(prtid,msn,wishlist).subscribe(
        res=>{
          if(res.id == 0)
          {
            this.router.navigate(['/accountCart']);
          }
          else{
            this.toastr.warnToast('Already In Cart');
          }

        }
      );
      this._communicate.updateWishlist()
      this._communicate.updateCart()
    }
    else{
      this.toastr.warnToast('Please Login First');
    }
  }

  // onselect(prtid: any,msn_pro :any,pcolorId:any)
  // {

  //   this._ApiServiceService.getProductsDetails(prtid,msn_pro,pcolorId);
  //   this.router.navigate(['/accountProductDetails',prtid,msn_pro,pcolorId]);
  // }

  delwishlist(msn:any , prtid:any)
  {
    this._ApiServiceService.delwishlist(msn,prtid).subscribe(
      res=>{
        this.toastr.successToast('Product Removed From Wishlist');
        this.ngOnInit();
      }
    )
  }

}
