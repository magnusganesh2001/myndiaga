import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { orderDetails, ratingsPost } from '../class/headings';
import { NavService } from '../services/nav.service';
import { ToastrService } from '../services/toastr.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {
  lstProductDetailsHeadings =  new orderDetails() ;
  status: any;

  uploadForm : FormGroup | undefined;

  constructor(public _ApiServiceService:NavService,public route:ActivatedRoute,
    public router :Router,private toastr: ToastrService, private sanitizer:DomSanitizer) {
     }

    order_ids : any;
  ngOnInit(): void {

    var order_id = this.route.snapshot.paramMap.get('order_id');

    this.order_ids = order_id ;

    this.orderDetails();

    this.bankDetails();
  }

  banking:any;
  bankDetails()
  {
    this._ApiServiceService.getCustomerBankDetails().subscribe(
      res=>{
        this.banking=res;
      }
    )
  }

  orderDetails()
  {
    this._ApiServiceService.orderPlaced(this.order_ids).subscribe(
      res=>{
        this.lstProductDetailsHeadings=res;
        this.status=res.order_status;

      }
    )
  }

  // post ratings
  ratings(val:any)
  {
    var postRating = new ratingsPost();
    postRating.rating = val.rating;
    postRating.review = val.review;
    postRating.rating_head = val.rating_head;
    this._ApiServiceService.postRating(postRating).subscribe(
      res=>{
        this.toastr.successToast('Rating Saved');
        window.location.reload()
      }
    )
  }

  // upload multiple images
  filedata = [] as any;
  imageUrl = [] as any;
  base64Value : any;
  fileEvent(e:any) : void{
    for (let i =0; i<e.target.files.length;i++){
      this.filedata.push(e.target.files[i])
      this.imageUrl.push(this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(e.target.files[i])))
    }
  }

  // refund post
  refundForm(val:any)
  {
    let currentUrl = this.router.url;
    let data = new FormData();
    data.append('reason',val.reason);
    data.append('bankAccount',val.bankAccount);
    this.filedata.forEach((img:any)=>{
      data.append('refundImage[]',img)
    })
    this._ApiServiceService.refundFormSubmit(data,this.order_ids).subscribe(
      res=>{
          if(res == 1)
          {
            this.router.navigate([currentUrl])
            .then(() => {
              window.location.reload();
            });
          }else{
            this.toastr.errorToast("Already Applied for refund");
          }
      },err=>{
        this.toastr.errorToast(err.error.errors.bankAccount[0]);
        this.toastr.errorToast(err.error.errors.reason[0]);
        this.toastr.errorToast(err.error.errors.refundImage[0]);

        console.log(err);

      }
    )
  }


    // cancel products
    cancelProducts(val:any)
    {
      let currentUrl = this.router.url;
      // let data = new FormData();
      // data.append('cancelOptions',val.cancelOptions);

      this._ApiServiceService.cancelOrder(this.order_ids,{cancelOptions:val.cancelOptions}).subscribe(
        res=>{
            if(res == 1)
            {
              this.router.navigate([currentUrl])
              .then(() => {
                window.location.reload();
              });
            }
        },err=>{
          this.toastr.errorToast("Some error occured. Please try after few minutes.");
        }
      )
    }

  helpCenterQuery(val:any)
  {
    let currentUrl = this.router.url;
    let data = new FormData();
    data.append('helpReason',val.helpReason);

    this._ApiServiceService.queryHelp(this.order_ids,data).subscribe(
      res=>{
          if(res == 1)
          {
            this.toastr.successToast("Message Sent To Admin");

            this.router.navigate([currentUrl])
            .then(() => {
              window.location.reload();
            });
          }
      },err=>{
        this.toastr.warnToast("Some problem came");
      }
    )
  }
  // all the bank details

}
