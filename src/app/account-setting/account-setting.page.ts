import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavService } from '../services/nav.service';
import { ToastrService } from '../services/toastr.service';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.page.html',
  styleUrls: ['./account-setting.page.scss'],
})
export class AccountSettingPage implements OnInit {

  public token: any ;
  formEditable = false;

  constructor(public _ApiServiceService:NavService,
    private router :Router,
    private toastr: ToastrService,
    private route:ActivatedRoute,
   ) { }

  ngOnInit(): void {

    this.getSettingNormalDetails();

  }
  listSettingsDetails : any= [];
  previousPhone:any;

  getSettingNormalDetails()
  {
    this._ApiServiceService.getSettingNormalDetails().subscribe(
      (data:any)=>{
        this.listSettingsDetails=data;
        this.previousPhone = data.phone;
      }
    )
  }
  // click edit button
  // editing()
  // {
  //   document.querySelector('.submitSystem')?.classList.remove('display-none');
  //   document.querySelector('.editButton')?.classList.add('display-none');

  //   document.querySelector('.editingFields')?.setAttribute('disabled','false');;

  // }

  cancel()
  {
    document.querySelector('.submitSystem')?.classList.add('display-none');
    document.querySelector('.editButton')?.classList.remove('display-none');
  }

  // send otp on previous number
  sendOtp(phone_exist:any,phone_new:any)
  {
    console.log(phone_exist);
    console.log(phone_new);


  }
  // edit form post
  otpResponse:Number = 0;
  otpPayload :any;
  editDetails(value:any)
  {
    this.otpPayload = value;
    this._ApiServiceService.generalUpdateOTP(value).subscribe((res:any)=>{
      this.otpResponse=res;
      window.clearInterval(this.timeInter)
      this.timer()
    },err=>console.log(err))
  }

  varifyOtp(val:any){
    this._ApiServiceService.generalDetailsUpdate({...val,...this.otpPayload}).subscribe(res=>{
      this.toastr.successToast("Account detail update Successfully")
      window.location.reload()
    },err=>this.toastr.errorToast(err.err_message))
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
