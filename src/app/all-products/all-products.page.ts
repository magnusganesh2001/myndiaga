import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavService } from '../services/nav.service';
import { ToastrService } from '../services/toastr.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.page.html',
  styleUrls: ['./all-products.page.scss'],
})
export class AllProductsPage implements OnInit {
  constructor(public _ApiServiceService: NavService,private route:ActivatedRoute,private toastr: ToastrService) { }
  products = [] as any;

  ngOnInit(): void {
   let id = this.route.snapshot.paramMap.get('id');
    this.getProduct(id)
  }

  unique_code:any;


  getProduct(id:any){
    this._ApiServiceService.getHomeProduct(id).subscribe(res=>{
      this.products = res;
    })
  }

  postMsn(msn:any,prtid:any)
  {

    if(localStorage.getItem('token'))
    {
      this._ApiServiceService.postMsnToCart(msn,prtid).subscribe(
        res=>{
          if(res.id == 0)
          {
            this.toastr.successToast('Added to cart');
          }
          else{
            this.toastr.warnToast('Already In Cart');
          }

        }
      );
    }
    else{
      this.unique_code=localStorage.getItem('unique_code');

      if(!(localStorage.getItem('unique_code')))
      {
        this.unique_code = "No";
        this._ApiServiceService.guestCartAddition(msn,this.unique_code).subscribe(
          res=>{
            localStorage.setItem('unique_code',res[0].unique_code);
            if(res[0].id == 0)
            {
              this.toastr.successToast('Added to cart');
            }
            else{
              this.toastr.warnToast('Already In Guest Cart');
            }

          }
        );
      }else{
        this._ApiServiceService.guestCartAddition(msn,this.unique_code).subscribe(
          res=>{

            if(res[0].id == 0)
            {
              this.toastr.successToast('Added to cart');
            }
            else{
              this.toastr.warnToast('Already In Guest Cart');
            }

          }
        );
      }


    }
  }

}
