import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavService } from '../services/nav.service';
import { ToastrService } from '../services/toastr.service';

@Component({
  selector: 'app-account-password',
  templateUrl: './account-password.page.html',
  styleUrls: ['./account-password.page.scss'],
})
export class AccountPasswordPage implements OnInit {
  name:any;

  constructor(public _ApiServiceService:NavService,
    private router :Router,
    private toastr: ToastrService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
  }

  changePassword(val:any){
    this.passwordPayload = val;
this._ApiServiceService.changePasswordOTP().subscribe(res=>{
  this.toastr.successToast("check your registered mobile number OTP sent")
  window.clearInterval(this.timeInter)
  this.timer()
},err=>console.log(err));
  }

passwordPayload:any;
  otpResponse:any;
  varifyOtp(val:any){
this._ApiServiceService.changePasswordUpdate({...val,...this.passwordPayload}).subscribe(res=>{
  this.toastr.successToast("Password changed");
  window.location.reload();
},err=>this.toastr.errorToast(err.error.err_message))
  }

   // timer for resnd otp
   time = "";
   timeInter:any;
   timer(){
     this.time = '00:00'
     let t = 59;
    this.timeInter = setInterval(()=>{
      t--;
       this.time = `00:${t}`;
       if(t==0){
          window.clearInterval(this.timeInter);
         this.time = '';
         };
     },1000)
   }

}
