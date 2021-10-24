import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { image, ProductPIDHeadings } from '../class/headings';
import { pin, postProductId, questionAsking } from '../class/post';
import { CommunicateService } from '../services/communicate.service';
import { NavService } from '../services/nav.service';
import { ToastrService } from '../services/toastr.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  data: any;
  public cust_attr:any;
  addedToWishlist: Boolean = false;
  ratings: any;
  unique_code: any;
  estimated_date: any;
  daysAdded:any;
  public count  = 0;
  constructor(public _ApiServiceService:NavService,public route:ActivatedRoute,
    public router :Router,private titleService: Title,    private communicate:CommunicateService,private toast:ToastrService) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }
    colorsPro :any;
   public prtid: any ;
    public msn :any;
    public pcolorId :any;
    catName : any;
    subCatName:any;
    productName:any;

    questionAns: any = [];

    avgRating: any;

    public p_name :any;
    public product_url:any  = null;


  ngOnInit(): void {

    var prtid = this.route.snapshot.queryParamMap.get('prtid');
    var msn = this.route.snapshot.queryParamMap.get('msn');
    this.product_url= this.route.snapshot.paramMap.get('product');
    var pcolorId = this.route.snapshot.queryParamMap.get('pcolorId');
    this.productName = this.route.snapshot.paramMap.get('productList');
    this.subCatName = this.route.snapshot.paramMap.get('subcategory');
   this.catName = this.route.snapshot.paramMap.get('category');

    this.prtid = prtid ;
    this.msn = msn;
    this.pcolorId = pcolorId;

    this.getProductsDetails();

    this.colors();

    this.getImages();


    this.showRatings();

    this.averageRating();

    this.questionShow();
    this.getCrossSell();

    // this.getSchema()
  }

  cust:any=[];
  msnColors:any;
  pcolorIdPro:any;

  // getSchema(){
  //   this._ApiServiceService.getSchema(this.prtid,this.msn,this.pcolorId).subscribe(res=>{
  //     addScriptForMurchant(res[0].p_name,res[0].description,res[0].tag,window.location.href,{name:'MYNDIA',url:'myndia.in'},res[0].total_price_after_tax,res[0].imgurl_jpeg,res[0].stock_quantity,res[0].sku)
  //   })
  // }

  averageRating()
  {
    this._ApiServiceService.avgRatings(this.prtid).subscribe(
      data=>{
        this.avgRating = data;
      }
    )
  }


  // changing the color code in url
  colorChangePrice(pcolorId:any)
  {
    this.pcolorIdPro = pcolorId;
    // this.router.navigate(['/productDetail',this.prtid,this.msn,this.pcolorIdPro]).then(() => {
    this.router.navigate(['/',this.catName,this.subCatName,this.productName,this.product_url], { queryParams: { prtid: this.prtid,msn:this.msn,pcolorId:this.pcolorIdPro } }).then(()=>{
      window.location.reload()
    })
  }

  msnCustAttr:any;

  // custmsnAttribute
  custAttributeRadio(msn : any)
  {
    this.msnCustAttr = msn;
    this.router.navigate(['/',this.catName,this.subCatName,this.productName,this.product_url], { queryParams: { prtid: this.prtid,msn:this.msnCustAttr,pcolorId:this.pcolorId } }).then(()=>{
      window.location.reload()
    })

  }

  // product details
  lstProductDetailsHeadings: ProductPIDHeadings[] = [];


  getProductsDetails()
  {
    this._ApiServiceService.getProductsDetails(this.prtid,this.msn,this.pcolorId,this.product_url).subscribe(
      data=>{
        this.p_name = data[0].p_name;
        this.product_url = data[0].product_url;
        this.lstProductDetailsHeadings=data;
        this.titleService.setTitle(this.p_name);
        this.router.navigate(['/',this.catName,this.subCatName,this.productName,this.product_url], { queryParams: { prtid: this.prtid,msn:this.msn,pcolorId:this.pcolorId } });
      }
    )
  }

  images : image[]=[];
  public img0 :any;
  // show images
  getImages()
  {
    this._ApiServiceService.image(this.prtid,this.msn,this.pcolorId).subscribe(
      data=>{
        this.images=data;
        this.img0=data[0].imgurl;
      }
    )
  }

  colors()
  {
    this._ApiServiceService.color(this.prtid,this.msn,this.pcolorId).subscribe(
      data=>{
        this.colorsPro=data;
      }
    )
  }

  cartRouting(prtid:any)
  {
    var pidPost = new postProductId();
    pidPost.prtid = prtid;
    this._ApiServiceService.onclickCart(pidPost).subscribe(
      res=>{
        this.communicate.updateCart()
        // this.toast.successToast('Added To','Cart');
        this.toast.successToast('Added to cart');
        this.router.navigate(['/accountCart']);
      }
    );
  }

  postMsn(msn=this.msn,prtid=this.prtid)
  {

    if(localStorage.getItem('token'))
    {
      this._ApiServiceService.postMsnToCart(msn,prtid).subscribe(
        res=>{
          if(res.id == 0)
          {
            this.communicate.updateCart()
            this.router.navigate(['/accountCart']);
          }
          else{
            this.toast.warnToast('Already in cart');
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
          this._ApiServiceService.guestCartAddition(msn,this.unique_code).subscribe(
            res=>{
              localStorage.setItem('unique_code',res[0].unique_code);
              if(res[0].id == 0)
              {
                this.communicate.updateCart()
                this.router.navigate(['/accountGuestCart']);
              }
              else{
                this.toast.warnToast('Already in guest cart');
                // this.toastr.warning('Already In Guest Cart');
              }

            }
            );
          }else{
        this._ApiServiceService.guestCartAddition(msn,this.unique_code).subscribe(
          res=>{

            if(res[0].id == 0)
            {
              this.router.navigate(['/accountGuestCart']);
              this.communicate.updateCart()
            }
            else{
              this.toast.warnToast('Already in guest cart');
              // this.toastr.warning('Already In Guest Cart');
            }

          }
        );
      }


    }
  }


    // BUY NOW
    localMSN()
    {

      if(localStorage.getItem('token'))
      {
        this._ApiServiceService.postMsnToCart(this.msn,this.prtid).subscribe(
          res=>{
            if(res.id == 0)
            {
              localStorage.setItem('msnCarts',this.msn);
              // localStorage.setItem('qtyCart',quantity.quantity14);
              this.router.navigate(['/accountCartAddress']);
            }
            else{
              this.toast.warnToast('Already in cart cart');
              // this.toastr.warning('Already In Cart','Please Purchase From Cart');
            }

          }
        );
      }
      else{
        localStorage.setItem('msnCarts',this.msn);
        localStorage.setItem('pppppp81258',this.prtid);
        // this.communicate.navbarOpen.next(true),  // login popup in nav bar
          this.router.navigate(['/accountLogin']);
          this.toast.warnToast('Please login first');
        // this.toastr.warning("Please login first")
      }


    }


    url(path:any)
    {
      document.querySelector('.expandedImg')?.setAttribute("src", this._ApiServiceService.baseImgUrl+"/productImages"+path) ;
    }


    // imageZoom() {

    //   var img:any, lens:any, result:any, cx:any, cy:any;
    //   img = document.getElementById("myimage");
    //   result = document.getElementById("myresult");

    //   /*create lens:*/
    //   lens = document.createElement("DIV");
    //   lens.setAttribute("id", "img-zoom-lens");
    //   lens.setAttribute("style","position: absolute !important;;width: 80px !important;height: 80px !important;" )

    //   /*insert lens:*/
    //   img.parentElement.insertBefore(lens, img);
    //   /*calculate the ratio between result DIV and lens:*/
    //   cx = result.offsetWidth / lens.offsetWidth;
    //   cy = result.offsetHeight / lens.offsetHeight;

    //   /*set background properties for the result DIV:*/
    //   result.style.backgroundImage = "url('" + img.src + "')";
    //   result.style.backgroundSize = (img.width * cx) + "px" + (img.height * cy) + "px";
    //   /*execute a function when someone moves the cursor over the image, or the lens:*/
    //   lens.addEventListener("mousemove", moveLens);
    //   img.addEventListener("mousemove", moveLens);
    //   /*and also for touch screens:*/
    //   lens.addEventListener("touchmove", moveLens);
    //   img.addEventListener("touchmove", moveLens);
    //   function moveLens(e:any) {

    //     var pos, x, y;
    //     /*prevent any other actions that may occur when moving over the image:*/
    //     e.preventDefault();
    //     /*get the cursor's x and y positions:*/
    //     pos = getCursorPos(e);
    //     /*calculate the position of the lens:*/
    //     x = pos.x - (lens.offsetWidth / 2);
    //     y = pos.y - (lens.offsetHeight / 2);
    //     /*prevent the lens from being positioned outside the image:*/
    //     if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
    //     if (x < 0) {x = 0;}
    //     if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
    //     if (y < 0) {y = 0;}
    //     /*set the position of the lens:*/
    //     lens.style.left = x + "px";
    //     lens.style.top = y + "px";
    //     /*display what the lens "sees":*/
    //     result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";

    //   }
    //   function getCursorPos(e:any) {
    //     var a, x = 0, y = 0;
    //     e = e || window.event;
    //     /*get the x and y positions of the image:*/
    //     a = img.getBoundingClientRect();
    //     /*calculate the cursor's x and y coordinates, relative to the image:*/
    //     x = e.pageX - a.left;
    //     y = e.pageY - a.top;
    //     /*consider any page scrolling:*/
    //     x = x - window.pageXOffset;
    //     y = y - window.pageYOffset;
    //     return {x : x, y : y};
    //   }
    // }

         // adding wishlists in the tables
         wishList()
         {

           this._ApiServiceService.wishlist(this.msn,this.prtid).subscribe(
             res=>{
               if(res.id == 0)
               {
                 this.communicate.updateWishlist()
                 this.addedToWishlist = true;
                
                 this.toast.successToast('Product sent to wishlist');
                //  this.toast.successToast('Product Sent To Wishlist');
               }
               else{
                this.toast.warnToast('Already in wishlist');
                //  this.toastr.warning('Already In Wishlist');
               }

             },err=>{
              this.toast.warnToast('Please login first');
              //  this.toastr.warning('Please Login First');
             }
           )
         }

         delwishlist()
         {
           this._ApiServiceService.delwishlist(this.msn,this.prtid).subscribe(
             res=>{
               this.addedToWishlist = false;
               this.toast.warnToast('Product remove from wishlist');
              //  this.toastr.warning('Product Removed From Wishlist');
               this.ngOnInit();
             }
           )
         }

         showRatings()
         {
           this._ApiServiceService.productRatingsReviews(this.prtid).subscribe(
             res=>{
               this.ratings = res;
             }
           )
         }



         askQuestions(value:any)
         {
           var ques = new questionAsking();
           ques.question = value.question;

           this._ApiServiceService.postQuestions(ques,this.prtid).subscribe(
             res=>{
              this.toast.successToast('Question sent to seller');
              //  this.toast.successToast('Question Sent To Seller');
               window.location.reload();
             }
           )
         }

         questionShow()
         {
           this._ApiServiceService.questionAns(this.prtid).subscribe(
             res=>{
               this.questionAns = res;
             }
           )
         }


         public Service:any;
         nodelivery:any;
         checkPincode(value:any)
         {
           var pinc = new pin();
           pinc.delivery_postcode = value.pincodes;
           pinc.prtid = this.prtid;

           this._ApiServiceService.checkPincode(pinc).subscribe(
             res=>{
               if(!res){
                 this.nodelivery = 'Delivered in 7 - 8 days approx.'
               }
               else{
                 this.nodelivery = null
                 this.estimated_date = res[0].estimated_date;
                 this.daysAdded = res[0].daysAdded;
                 if(res[0].counting == 0)
                 {
                   this.count = -1;
                 }
                 else{
                   this.count = res[0].counting;
                 }
                 this.Service = res[0];
               }
             }
           )
         }


         crossSellProduct = [] as any;
         getCrossSell(){
           this._ApiServiceService.getCrossSell(this.msn).subscribe(res=>{
             this.crossSellProduct = res;
           })
         }


}
