import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { msnExportFromCart, paymentAddData } from '../class/post';
import { NavService } from '../services/nav.service';
import { ToastrService } from '../services/toastr.service';

@Component({
  selector: 'app-order-payment',
  templateUrl: './order-payment.page.html',
  styleUrls: ['./order-payment.page.scss'],
})
export class OrderPaymentPage implements OnInit {

  loadingProgress: boolean | undefined;
  signature_id: any;
  order_id: any;
  link: any;

  constructor(public _ApiServiceService:NavService,
  private router :Router,
  private toastr: ToastrService,
  private route:ActivatedRoute) { }

  public totalPricings : any= [];

  public listSettingsDetails : any= [];
    totalPrice : any;
  ngOnInit(): void {

    this.getPricings();
    this.gettingMode();
    this.getSettingNormalDetails();

  }

  msn : any;


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


  modes : any;
  gettingMode()
  {
    this.msn = localStorage.getItem('msnCarts');

    var opost = new msnExportFromCart();
    opost.msnArray = this.msn;

    this._ApiServiceService.modePayment(opost).subscribe(
      res=>{
        this.modes = res;
      }
    )
  }

  public payment_id : any;
  options = {
      "key": environment.RAZORPAY_KEY,
      "amount": "", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Myndia",
      "description": "Myndia Transactions",
      "image": "/assets/image/razerPay.jpg",
      "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": this.paymentCapture.bind(this),
      "prefill": {
          "name": "",
          "email": "",
          "contact": ""
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#036de4"
      }
  };



  getSettingNormalDetails()
  {
    this._ApiServiceService.getSettingNormalDetails().subscribe(
      res=>{
        this.listSettingsDetails=res;
      }
    )
  }

    // order id details
    orderIds: any;
    receipt: any;
  // razer pay payment open
  rzp1: any;
  Pay(){

    var priceing = (this.totalPricings[0].totalPrice).toFixed(0) * 100;

    this._ApiServiceService.generateOrder(priceing).subscribe(
      res => {
        this.order_id = (res.order_id);
        this.receipt = (res.receipt);
        
        var price = ((this.totalPricings[0].totalPrice).toFixed(0)) * 100;
        var str: string = price + '';
        this.options.amount = str;

        this.options.prefill.email = this.listSettingsDetails.email;
        this.options.prefill.name = this.listSettingsDetails.name;

        this.options.order_id= res.order_id;

        var numbers: string = this.listSettingsDetails.phone + '';
        this.options.prefill.contact = numbers;

        this.rzp1 = new this._ApiServiceService.nativeWindow.Razorpay(this.options);


        this.rzp1.open();

        this.rzp1.on(this.options.handler);
        this.rzp1.on('payment.failed',  (response: { error: { code: any; description: any; source: any; step: any; reason: any; metadata: { order_id: any; payment_id: any; }; }; }) => {
          // console.log(response.error.code);
          // console.log(response.error.description);
          // console.log(response.error.source);
          // console.log(response.error.step);
          // console.log(response.error.reason);
          // console.log(response.error.metadata.order_id);
          // console.log(response.error.metadata.payment_id);
          this.toastr.errorToast(response.error.description);
        });
      }
    );
  }

  // payment capture
  paymentCapture(response :any) {
    this.loadingProgress = true;

    this.payment_id = response.razorpay_payment_id;
    this.signature_id = response.razorpay_signature;

    if(this.payment_id != "")
    {
      var productPlacement = {modeOfPayment: "Prepaid"};
      this.paymentAddData(productPlacement);
    }
 }

//  post payment data
 paymentAddData(productPlacement : any)
 {
   this.msn = localStorage.getItem('msnCarts');

   var paymentDetails = new paymentAddData();
   paymentDetails.msnArray = this.msn;
   paymentDetails.modeOfPayment = productPlacement.modeOfPayment;
   paymentDetails.razorpay_payment_id = this.payment_id;
   paymentDetails.razorpay_signature = this.signature_id;


    if(productPlacement.modeOfPayment == "")
    {
      this.toastr.warnToast('Please Choose Payment Methods');
    }
    else{
      this._ApiServiceService.paymentSteps(paymentDetails).subscribe(
        res=>{
            if(res == true)
            {
              localStorage.setItem('price',this.totalPricings[0].totalPrice);
              this.router.navigate(['/accountOrderBooked'])
              .then(() => {
                window.location.reload();
              });
            }
        },
        err=>{
          this.toastr.errorToast('Server Error If Payment Is Credited It Will Be Back In 4-5 working days')
        }
          )
    }
  }

}
