import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NavService } from '../services/nav.service';
import { CommunicateService } from '../services/communicate.service';
import { ToastController } from '@ionic/angular';
import { ToastrService } from '../services/toastr.service';//yaha h
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  unique_code: any;

  constructor(private _nav:NavService, private router:Router,private communicate:CommunicateService, private toast:ToastrService) { }

  slider = [] as any;
  products = [] as any;
  products7section = [] as any;
  section8Images = [] as any;
  bestSellerProduct = [] as any;
  topPicksProduct = [] as any;

  homeEssential = [] as any;
  womenStyle = [] as any;
  menStyle = [] as any;
  topPicksHome = [] as any;
  discountTime = {} as {
    total:number,
    days:number,
    hours:number,
    minutes:number,
    seconds:number
  };

  ngOnInit(): void {
    this.initializeClock('2021-09-13');
    this.showOuterCategory();
    this.getBanner()
    this.getProduct()
    this.getSection7Product()
    this.getImage8section();
    this.getsection9()
    this.getsection10()
    this.getHomeSubcat()
  }

  outerCategory:any;
baseUrl = this._nav.baseImgUrl+'/outerCategory'
  showOuterCategory(){
    this._nav.getOuterCategories().subscribe(
      data=>{
        this.outerCategory = data;
      }
    )
  }


  getBanner(){
    this._nav.getHomePageBanner(1).subscribe(res=>{
      this.slider = res;
    })
  }

  getImage8section(){
    this._nav.getHomePageBanner(8).subscribe(res=>{
      this.section8Images = res;
    })
  }

  getProduct(){
    this._nav.getHomeProduct(2).subscribe(res=>{
      this.products = res;
      this.products.length = this.roundOff(2,this.products.length)
    })
  }
  getSection7Product(){
    this._nav.getHomeProduct(7).subscribe(res=>{
      this.products7section = res;
      this.products7section.length = this.roundOff(2,this.products7section.length)
    })
  }

    getsection9(){
    this._nav.getHomeProduct(9).subscribe(res=>{
      this.bestSellerProduct = res;
    })
  }
  getsection10(){
    this._nav.getHomeProduct(10).subscribe(res=>{
    this.topPicksProduct = res;
    })
  }



  getHomeSubcat(){
    this._nav.getHomeProduct('subCategory/3').subscribe(res=>{
  this.homeEssential = res;
    })
    this._nav.getHomeProduct('subCategory/4').subscribe(res=>{
  this.womenStyle = res
    })
    this._nav.getHomeProduct('subCategory/5').subscribe(res=>{
 this.topPicksHome = res
    })
    this._nav.getHomeProduct('subCategory/6').subscribe(res=>{
  this.menStyle = res;
    })
  }


  postMsn(msn:any,prtid:any)
  {

    if(localStorage.getItem('token'))
    {
      this._nav.postMsnToCart(msn,prtid).subscribe(
       async res=>{
          if(res.id == 0)
          {
            this.communicate.updateCart()
             this.toast.successToast('Added to cart.')
          }
          else{
            this.toast.warnToast('Already In Cart');
            // this.toastr.warning('Already In Cart');
          }

        }
      );
    }
    else{
      this.unique_code=localStorage.getItem('unique_code');

      if(!(localStorage.getItem('unique_code')))
      {
        this.unique_code = "No";
        this._nav.guestCartAddition(msn,this.unique_code).subscribe(
          res=>{
            localStorage.setItem('unique_code',res[0].unique_code);
            if(res[0].id == 0)
            {
              this.communicate.updateCart()
              this.toast.successToast('Added to Cart');
              // this.toastr.success('Added to cart');
            }
            else{
              this.toast.warnToast('Already In Guest Cart');
              // this.toastr.warning('Already In Guest Cart');
            }

          }
        );
      }else{
        this._nav.guestCartAddition(msn,this.unique_code).subscribe(
         async res=>{

            if(res[0].id == 0)
            {
              this.communicate.updateCart()
              this.toast.successToast('Added to cart');
              // this.toastr.success('Added to cart');
            }
            else{
              this.toast.warnToast('Already In Guest Cart');
              // this.toastr.warning('Already In Guest Cart');
            }

          }
        );
      }


    }
  }


  initializeClock(endtime:any) {
    const timeinterval = setInterval(() => {
      this.discountTime = this.getTimeRemaining(endtime);
      if (this.discountTime.total <= 0) {
        clearInterval(timeinterval);
      }
    },1000);
  }

   getTimeRemaining(endtime:any){
    const total = Date.parse(endtime) - Date.parse((new Date()).toString());
    const seconds = Math.floor( (total/1000) % 60 );
    const minutes = Math.floor( (total/1000/60) % 60 );
    const hours = Math.floor( (total/(1000*60*60)) % 24 );
    const days = Math.floor( total/(1000*60*60*24) );

    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  }


  roundOff(upto:number,length:number){
    return Math.floor(length/upto)*upto;
  }

}
