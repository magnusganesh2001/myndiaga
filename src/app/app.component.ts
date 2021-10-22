import { ModalController } from '@ionic/angular';
import { LoginmodalPage } from './modals/loginmodal/loginmodal.page';
import { NavService } from './services/nav.service';
import { Router } from '@angular/router';
import {loginUp, phonenumber, resetPassword, signupData} from './class/post';
import { Location } from '@angular/common';
import { CommunicateService } from 'src/app/services/communicate.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // @ViewChild('loginBtn') loginBtn :any;
  @ViewChild('continue') continueBtn:any;
  
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'All Category', url: '/all-category', icon: 'grid' },
    { title: 'My Orders', url: '/folder/Favorites', icon: 'push' },
    { title: 'My Cart', url: '/folder/Archived', icon: 'cart' },
    { title: 'My Wishlist', url: '/folder/Trash', icon: 'heart' },
    { title: 'My Account', url: '/folder/Spam', icon: 'person' },

    { title: 'Pan Card', url: '/folder/pan', icon: 'card' },
    { title: 'Change Password', url: '/folder/password', icon: 'key' },

    { title: 'Address', url: '/folder/address', icon: 'locate' },
    { title: 'Bank Details', url: '/folder/cash', icon: 'cash' },
    { title: 'Rating And Reviews', url: '/folder/rating', icon: 'star' },
  ];
  constructor(public modalController: ModalController,private _nav:NavService,private router :Router,private _location:Location, public _communicate:CommunicateService,private _ApiServiceService:NavService,) {}

  dataReturned: any;
  async openModal() {
    const modal = await this.modalController.create({
      component: LoginmodalPage,
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
  }



  signUp: any;


  cat :any;
  response: any;
  user:any;
  isHome = true;

  name :any;
  ngOnInit(): void {
this.getSettingNormalDetails();
// this.cartQuantity()
// this.wishListQuantity()
this._location.onUrlChange(()=>{
  this.isHome = window.location.pathname === '/home'
})
    // show outercat
    this.showOuterCategory();
this._communicate.navbarOpen.subscribe(res=>{
  // if(res) this.loginBtn.nativeElement.click();
})

  }

  searchProduct(product:any){
this.router.navigate(['search',product.productName.split(' ').join('-')]);
  }

  imgUrl(path:any) {
    return this._ApiServiceService.baseImgUrl+'/productImages'+path;
  }


  goBack(){
  this._location.back()
  }


  listSettingsDetails : any= [];

  outerCategory : Object ={};

  // showing outercategories
  showOuterCategory()
  {
    this._ApiServiceService.getOuterCategories().subscribe(
      data=>{
        this.outerCategory = data;
      }
    )
  }

  // getting product details
  productPage(scid:any)
  {
    this.router.navigate(['/accountProductList',scid])
    .then(() => {
      window.location.reload();
    });
  }

  getUser(){
    return localStorage.getItem('name');
  }


  getSettingNormalDetails()
  {
    this._ApiServiceService.getSettingNormalDetails().subscribe(
      data=>{
        if(data == null)
        {
          localStorage.removeItem('token');
          localStorage.removeItem('name');
        }
        else{
          this.listSettingsDetails=data;
        }
      }
    )
  }

  message : string | undefined;

  error : string | undefined;

  lstPost: signupData[] = [];

  loginPost :loginUp[]= [];


  // login
  login(data:any)
  {
    let currentUrl = window.location.pathname;
    console.log(currentUrl);
    var postLogin = new loginUp()
    postLogin.phone = data.phone;
    postLogin.password = data.password;

    this._ApiServiceService.loginCustomer(postLogin).subscribe(
        res=>{
          if(res.length == 0)
          {
            // this.toastr.error('Wrong', 'Password Or Phone Is');
            this.router.navigate([currentUrl])
          }else{
            localStorage.setItem('token',res.token.token);
            localStorage.setItem('name',res.name);
            this.router.navigate([currentUrl])
            window.location.reload()
          }
        }
      );
  }
  phone:any;
  // Submiting form
  onSubmitRegistration(data: any){
    let currentUrl = this.router.url;

    var opost = new signupData();
    this.phone = localStorage.getItem('phone');
    opost.name = data.name;
    opost.phone = this.phone;
    opost.password = data.password;
    opost.email = data.email;
    opost.otp = data.otp;

    console.log(opost);

    this._ApiServiceService.signUpCustomer(opost).subscribe(
      res=>{
        // this.toastr.success('Registered', 'Successfully');
        console.log(res);

        if(res.length == 0)
          {
            // this.toastr.error('Wrong', 'Password Or Phone Is');
            this.router.navigate([currentUrl])
          }else{
            localStorage.setItem('token',res.token.token);
            localStorage.setItem('name',res.name);

            this.router.navigate([currentUrl])
            .then(() => {
              window.location.reload();
            });
          }
      },
      err=>{
        // this.toastr.warning(err.error.err_message);
      }
    );

  }

  // checking phone is it there or not
  signIn(val : any)
  {

    var login  = new phonenumber();
    login.phone = val;
    this._ApiServiceService.postPhone(login).subscribe(
      res=>{
        this.continueBtn.nativeElement.style.display = "none";
        this.response = res;
        if(res.phone != null)
        {
          var clicking = <HTMLElement>document.querySelector('.login');
          clicking?.click();
          // this.toastr.warning('You Are Already Registered With This Number');
        }
        else{
          document.querySelector('.signup')?.classList.remove('display-none');
          document.querySelector('.continue')?.classList.add('display-none');
          var phone= <HTMLElement>document.querySelector('.phone');
          phone.remove();
          localStorage.setItem('phone',val);
        }
      },
      error =>{
        // this.toastr.warning(error.error.errors.phone[0]);
      }
    )
  }

  phoneValue : any;
  // resend oyp
  resendOtp()
  {
    this.phoneValue = localStorage.getItem('phone');
    var login  = new phonenumber();
    login.phone = this.phoneValue ;
    this._ApiServiceService.postPhone(login).subscribe(
      res=>{
        console.log(res);
        if(res.phone == null)
        {
          // this.toastr.success('OTP send successfully');
        }

      }
    )
  }

  // forgot password otp send
  forgotPasword(val:any)
  {
    var forgot  = new phonenumber();
    forgot.phone = val ;
    this._ApiServiceService.otpSend(forgot).subscribe(
      res=>{
        console.log(res);
        if(res == true)
        {
          document.querySelector('.changePassword')?.classList.remove('display-none');
          document.querySelector('.continue')?.classList.add('display-none');
          var phone= <HTMLElement>document.querySelector('.phoneForgot');
          phone.remove();
          localStorage.setItem('phone',val);
        }
        else{
          var clicking = <HTMLElement>document.querySelector('.login');
          clicking?.click();
          // this.toastr.warning('You Are Already Registered With This Number');
        }

      },
      // err=>this.toastr.error(err.error.err_message)
    )
  }

  resetPhone : any;
  resetPassword(value:any)
  {
    let currentUrl = this.router.url;
    this.resetPhone = localStorage.getItem('phone');
    var reset = new resetPassword();
    reset.otp = value.otp;
    reset.phone = this.resetPhone;
    reset.password = value.password;
    reset.confirmPassword = value.confirmpassword;

    this._ApiServiceService.resetPassword(reset).subscribe(
      res=>{
          if(res==true)
          {
            // this.toastr.success("Pasword Changed");
            this.router.navigate([currentUrl])
            .then(() => {
              window.location.reload();
            });
          }

      },err=>{
        // this.toastr.warning(err.err_message);
        // this.toastr.warning();
      }
    )

  }
    isLoggedIn() {
    return !!localStorage.getItem('token') ;
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['/']);
    window.location.reload()
  }

  // signup
  singupPage()
  {
    document.querySelector('.createAccount')?.classList.remove('display-none');
    document.querySelector('.loginPart')?.classList.add('display-none');
    document.querySelector('.forgotPassword')?.classList.add('display-none');
  }
  // login
  loginPage()
  {
    document.querySelector('.createAccount')?.classList.add('display-none');
    document.querySelector('.loginPart')?.classList.remove('display-none');
    document.querySelector('.forgotPassword')?.classList.add('display-none');
  }

  forgotClick()
  {
    document.querySelector('.forgotPassword')?.classList.remove('display-none');
    document.querySelector('.createAccount')?.classList.add('display-none');
    document.querySelector('.loginPart')?.classList.add('display-none');
  }

}
