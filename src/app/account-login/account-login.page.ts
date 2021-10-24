import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { loginUp, phonenumber } from '../class/post';
import { NavService } from '../services/nav.service';
import { ToastrService } from '../services/toastr.service';

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.page.html',
  styleUrls: ['./account-login.page.scss'],
})
export class AccountLoginPage implements OnInit {
  @ViewChild('continue') continueBtn:any;
    response: any;
    msn: any;
    prtid:any;
    unique_code: any;
    constructor(private _ApiServiceService:NavService,
      private router :Router,
      private toastr: ToastrService) { }
  
    ngOnInit(): void {
    }
  
    signIn(val : any)
    {
      var login  = new phonenumber();
      login.phone = val;
      this._ApiServiceService.postPhone(login).subscribe(
        res=>{
          this.response = res;
          this.continueBtn.nativeElement.style.display = "none";
          document.querySelector('.loginButton')?.firstElementChild?.removeAttribute('disabled')
          if(res.phone != null)
          {
            document.querySelector('.password')?.classList.remove('display-none');
            document.querySelector('.loginButton')?.classList.remove('display-none');
            document.querySelector('.forgotPass')?.classList.remove('display-none');
          }
          else{
            localStorage.setItem('phone',val);
            document.querySelector('.password')?.classList.remove('display-none');
            document.querySelector('.loginButton')?.classList.remove('display-none');
            // document.querySelector('.forgotPass')?.classList.remove('display-none');
  
            document.querySelector('.email')?.classList.remove('display-none');
            document.querySelector('.name')?.classList.remove('display-none');
  
  
            document.getElementById('phone')?.classList.add('display-none');
            document.querySelector('.otp')?.classList.remove('display-none');
          }
        },
        error =>{
          // this.toastr.warning(error.error.errors.phone[0]);
        }
      )
    }
  
  
    public msnInput : any = [];
  
    listCart:any;
    // login
    successAuth(value:any)
    {
      this.msn = localStorage.getItem('msnCarts');
      this.prtid =  localStorage.getItem('pppppp81258');
      this.unique_code = localStorage.getItem('unique_code');
  
      let currentUrl = this.router.url;
      if(value.nameSign == "")
      {
        var postLogin = new loginUp()
        postLogin.phone = value.phone;
        postLogin.password = value.password;
        postLogin.unique_code = this.unique_code;
        this._ApiServiceService.loginCustomer(postLogin).subscribe(
          res=>{
            if(res.length == 0)
            {
              // this.toastr.error('Wrong', 'Password Or Phone Is');
              this.router.navigate([currentUrl])
            }else{
              if((this.unique_code))
              {
                localStorage.setItem('token',res.token.token);
                localStorage.setItem('name',res.name);
                localStorage.removeItem('unique_code');
                if(res.guestResponse == true)
                {
                  // this.toastr.success('Product Saved In Your Account');
                  this.router.navigate(['/accountCartAddress']);
                }
                else{
                  // this.toastr.warning('Some Products Might Be There In Your Account');
                  this.router.navigate(['/accountCart']);
                }
              }
              else{
                localStorage.setItem('token',res.token.token);
                localStorage.setItem('name',res.name);
  
                this._ApiServiceService.postMsnToCart(this.msn,this.prtid).subscribe(
                  res=>{
                    if(res.id == 0)
                    {
                      // localStorage.setItem('qtyCart',quantity.quantity14);
                      this.router.navigate(['/accountCartAddress'])
                      .then(() => {
                        window.location.reload();
                      });
                    }
                    else{
                      // this.toastr.warning('Already In Cart','Please Purchase From Cart');
                      this.router.navigate(['/accountCart']);
                    }
  
                  },
                  error =>{
                    // this.toastr.warning(error.error.errors.phone[0]);
                  }
                );
              }
            }
          }
        );
      }
      else{
        var postLogin = new loginUp()
        postLogin.phone = localStorage.getItem('phone');
        postLogin.password = value.password;
        postLogin.name = value.nameSign;
        postLogin.email = value.email;
        postLogin.otp = value.otp;
        postLogin.unique_code = this.unique_code;
        this._ApiServiceService.signUpCustomer(postLogin).subscribe(
          res=>{
            if(res.length == 0)
            {
              // this.toastr.error('Wrong', 'Password Or Phone Is');
              this.router.navigate([currentUrl])
            }else{
  
              if((this.unique_code))
              {
                localStorage.setItem('token',res.token.token);
                localStorage.setItem('name',res.name);
                if(res.guestResponse == true)
                {
                  // this.toastr.success('Product Saved In Your Account');
  
                  this.router.navigate(['/accountCartAddress']);
                }
                else{
                  // this.toastr.warning('Some Products Might Be There In Your Account');
                  this.router.navigate(['/accountCart']);
                }
              }
              else{
                localStorage.setItem('token',res.token.token);
                localStorage.setItem('name',res.name);
                this._ApiServiceService.postMsnToCart(this.msn,this.prtid).subscribe(
                  res=>{
                    if(res.id == 0)
                    {
                      // localStorage.setItem('qtyCart',quantity.quantity14);
                      this.router.navigate(['/accountCartAddress'])
                      .then(() => {
                        window.location.reload();
                      });
                    }
                    else{
                      this.router.navigate(['/accountCart']);
                      // this.toastr.warning('Already In Cart','Please Purchase From Cart');
                    }
  
                  }
                );
              }
            }
          },
          err=>{
            // this.toastr.warning(err.error.err_message);
          }
        );
      }
    }
  
  
}
