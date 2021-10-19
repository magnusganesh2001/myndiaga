import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {SignUpPost,signupData,loginUp, panUpdate,postProductId , addressAddition,addDataCart, msnExportFromCart , addressId , orderOverViewPostMSN, paymentAddData, thankYou, mode , phonenumber,resetPassword, questionAsking, pin} from '../class/post';
import { Routes, RouterModule ,Router} from '@angular/router';
import 'rxjs/Rx';
import { ratingsPost } from '../class/headings';
function _window() : any {
  // return the global native browser window object
  return window;
}
@Injectable({
  providedIn: 'root'
})
export class NavService {

  // get all ratings and reviews
  getRatingsCustomers():Observable<InstanceType<any>>
  {
    return this.httpclient.get(this.baseUrl+'getReviewByCustomer');
  }


  // crosssell

getCrossSell(msn:any){
  return this.httpclient.get(this.baseUrl+'upsell/crosssale/'+msn);
  }

   // delete address
   deleteAddress(custAddress_id:any):Observable<InstanceType<any>>
   {
     return this.httpclient.get(this.baseUrl+'deleteAddress'+'/'+custAddress_id);
   }


  get nativeWindow() : any {
    return _window();
  }

  static getToken() {
    throw new Error('Method not implemented.');
  }


  phone:any;
  constructor(private httpclient:HttpClient , private router :Router,) {

  };


  redirectUrl: string | undefined;

  // public baseImgUrl = "https://localhost:8000"
  // public baseUrl = "http://localhost:8000/api/";
  // public trackUrl = "http://localhost:8000";

  public baseImgUrl = "https://seller.myndia.in"
  public baseUrl = "https://seller.myndia.in/api/";
  public trackUrl = "https://seller.myndia.in";



    // sgenerateOrder
  generateOrder(amount:any):Observable<InstanceType<any>>
  {
    return this.httpclient.get<any>(this.baseUrl+'orderid/Generation/'+amount);
  }
  // cancel orders
  cancelOrder(order_id:any,reason:any):Observable<InstanceType<any>>
  {
    return this.httpclient.post(this.baseUrl+'cancel/'+order_id,reason);
  }

  searchProduct(product:any){
    return this.httpclient.get(this.baseUrl+'searching/products/'+product);
  }

    // query add
  queryHelp(order_id:any,helpReason:any):Observable<InstanceType<any>>
  {
    return this.httpclient.post(this.baseUrl+'helpCenter/'+order_id,helpReason);
  }


// home page
getHomePageBanner(section:any):Observable<InstanceType<any>>
{
  return this.httpclient.get<any>(this.baseUrl+'product/home/section/images/'+section);
}

getHomeProduct(section:any):Observable<InstanceType<any>>
{
  return this.httpclient.get<any>(this.baseUrl+'product/home/section/'+section);
}


// home page


// cart no. notification
getCartQuantity():Observable<InstanceType<any>>
{
  return this.httpclient.get<any>(this.baseUrl+'cart/quantity');
}
// cart no. notification for guest cart
getGuestCartQuantity(unique_code:any):Observable<InstanceType<any>>
{
  return this.httpclient.get<any>(this.baseUrl+'guest/cart/quantity/'+unique_code);
}


// wishlist no. notification
getWishlistQuantity():Observable<InstanceType<any>>
{
  console.log('grsfg')
  console.trace('servei call from here')
  return this.httpclient.get<any>(this.baseUrl+'wishlist/quantity');
}



 // post rating and review
 postRating(ratings:ratingsPost):Observable<InstanceType<any>>
 {
   return this.httpclient.post(this.baseUrl+'rating',ratings);
 }

  // Define a function to handle back button and use anywhere

  // outercategories
  // getting all the categories and everythings
  getOuterCategories():Observable<InstanceType<any>>
  {
    return this.httpclient.get<any[]>(this.baseUrl+'outerCategory/phone');
  }

  getCategories(outCid:any):Observable<InstanceType<any>>
  {
    return this.httpclient.get<any[]>(this.baseUrl+'Category/phone/'+outCid);
  }

  getSubCategories(outCid:any,cid:any):Observable<InstanceType<any>>
  {
    return this.httpclient.get<any[]>(this.baseUrl+'subCategory/phone/'+outCid+'/'+cid);
  }

   // post questions
   postQuestions(questions:questionAsking , prtid:any):Observable<InstanceType<any>>
   {
     return this.httpclient.post(this.baseUrl+'postQuestion'+'/'+prtid,questions);
   }

   //get avergae ratings of the product
   avgRatings(prtid: any):Observable<InstanceType<any>>
   {
     var a= this.httpclient.get<any[]>(this.baseUrl+'getAverageRating/'+prtid);

     return a ;
   }

     //show  all the questions and answers
  questionAns(prtid:any):Observable<InstanceType<any>>
  {
    return this.httpclient.get(this.baseUrl+'allQuestionAnswered'+'/'+prtid);
  }

  // check the pincode
    // remove guest cart product
    checkPincode(pincode:pin):Observable<InstanceType<any>>
    {
      return this.httpclient.post(this.baseUrl+'checkPincode',pincode);
    }

   // adding data to cart by wishlist
   addMSN(prtid:any,msn:any,wishlist_id:any):Observable<InstanceType<any>>
   {
     return this.httpclient.get(this.baseUrl+'postMSNbywish'+'/'+msn+'/'+prtid+'/'+wishlist_id);
   }



  // guest data to cart
  guestCartAddition(msn:any,unique_code:any):Observable<InstanceType<any>>
  {
    return this.httpclient.get(this.baseUrl+'guestAddToCart'+'/'+msn+'/'+unique_code);
  }


  // update minus guest cart quantity
  updateQuantityMinusGuest(qty:any,guest_cart_id:any):Observable<InstanceType<any>>
  {
    return this.httpclient.get(this.baseUrl+'guestProductSubtration'+'/'+qty+'/'+guest_cart_id);
  }

  // schema for murchant
  getSchema(prtid:any,msn:any,pcolorid:any):Observable<InstanceType<any>>
  {
    return this.httpclient.get(this.baseUrl+'productScehma/'+prtid+'/'+msn+'/'+pcolorid);
  }



  // update minus on order summary cart quantity
  updateQuantityOrderSummary(qty:any,ordr_id:any,msn:any):Observable<InstanceType<any>>
  {
    return this.httpclient.get(this.baseUrl+'order/quantity/update/'+qty+'/'+ordr_id+'/'+msn);
  }

   // post unique code to check the the guest cart
   guestCartDetails(unique_code:any):Observable<InstanceType<any>>
   {
     return this.httpclient.get(this.baseUrl+'guestCartDetails'+'/'+unique_code);
   }

  // all products
  getProducts(scid:any):Observable<InstanceType<any>>
  {
    return this.httpclient.get(this.baseUrl+'products/'+scid);
  }

  // get the path of product
  fullPath(scid:any):Observable<InstanceType<any>>
  {
    return this.httpclient.get(this.baseUrl+'fullPath/'+scid);
  }
  // product details of a specific product
  getProductsDetails(prtid: any,msn:any,pcolorId:any,title=null):Observable<InstanceType<any>>
  {
    var a= this.httpclient.get<any[]>(this.baseUrl+'productsDetailsId/'+title+'/'+prtid+'/'+msn+'/'+pcolorId);
    return a ;
  }

  // product details of a specific product
  color(prtid: any,msn:any,pcolorId:any):Observable<InstanceType<any>>
  {
    var a= this.httpclient.get(this.baseUrl+'colors/'+prtid+'/'+msn+'/'+pcolorId);

    return a ;
  }
  // image showing in product
  image(prtid: any,msn:any,pcolorId:any):Observable<InstanceType<any>>
  {
    var a= this.httpclient.get(this.baseUrl+'image/'+prtid+'/'+msn+'/'+pcolorId);

    return a ;
  }
  // signup customer
  signUpCustomer(opost:signupData):Observable<InstanceType<any>>
  {
    return this.httpclient.post(this.baseUrl+'customer/SignUp',opost);
  }

  // delete cart data from cart
  cartData(cartprt_id:any):Observable<InstanceType<any>>
  {
    return this.httpclient.get(this.baseUrl+'deleteCart/'+cartprt_id);
  }
  // return token
  public isLoggedIn() {
      return !!localStorage.getItem('token') ;
  }


  // filter system api brand show
  filterBrand(scid:any)
  {
    return this.httpclient.get(this.baseUrl+'allBrands'+'/'+scid);
  }

  // filter system api color show
  filterColor(scid:any)
  {
    return this.httpclient.get(this.baseUrl+'color/'+scid);
  }

  postProduct(filter:any)
  {
    return this.httpclient.post(this.baseUrl+'postProducts',filter);
  }

    // settings details general details
  logout()
  {
    return this.httpclient.get(this.baseUrl+'customer/logout');
  }

  // login customer
  loginCustomer(post:loginUp):Observable<InstanceType<any>>
  {
    return this.httpclient.post(this.baseUrl+'customer/SignIn',post);
  }

  // get the token value when loged in
  getToken()
  {
    return localStorage.getItem('token');
  }


  // settings details general details
  getSettingNormalDetails()
  {
    return this.httpclient.get(this.baseUrl+'customerGeneralDetails');
  }


  // update adding guest cart quantity
  updateQuantityGuest(qty:any,guest_cart_id:any):Observable<InstanceType<any>>
  {
    return this.httpclient.get(this.baseUrl+'guestProductAddition'+'/'+qty+'/'+guest_cart_id);
  }

  // PAN DETAILS OF USER
  getSettingPAN()
  {
    return this.httpclient.get(this.baseUrl+'customerPAN');
  }

  // SEND OTP FOR VARIFICATION TO PROVIDED PHONE NUMBERS
  generalUpdateOTP(data:any)
  {
    return this.httpclient.post(this.baseUrl+'generalUpdateOTP',data);
  }

  // GET OTP FROM USER
  generalDetailsUpdate(data:any)
  {
    return this.httpclient.post(this.baseUrl+'generalDetailsUpdate',data);
  }

  // send otp for password change
  changePasswordOTP()
  {
    return this.httpclient.get(this.baseUrl+'changePasswordOTP');
  }

  // after varify otp update password
  changePasswordUpdate(data:any)
  {
    return this.httpclient.post(this.baseUrl+'changePasswordUpdate',data);
  }


  // post pan details
  uploadPanDetails(postPAN:any):Observable<InstanceType<any>>
  {
    return this.httpclient.post(this.baseUrl+'customer/uploadPAN',postPAN);

  }

  // adding data to cart
  onclickCart(pidPost: postProductId):Observable<InstanceType<any>>
  {
    return this.httpclient.post(this.baseUrl+'addDataCart',pidPost);
  }

  // add address data to databse
  addressSubmit(postAdress: addressAddition):Observable<InstanceType<any>>
  {
    return this.httpclient.post(this.baseUrl+'addressAddition',postAdress);
  }

  editAddress(postAdress: addressAddition, add_Id:any):Observable<InstanceType<any>>
  {
    return this.httpclient.post(this.baseUrl+'editAddress/'+add_Id,postAdress);
  }

  // show address details
  showStates()
  {
    return this.httpclient.get(this.baseUrl+'states');
  }

  city(id : any)
  {
    return this.httpclient.get(this.baseUrl+'city/'+id);
  }
  // show address details
  showAddressDetails()
  {
    return this.httpclient.get(this.baseUrl+'showAddressDetails');
  }

  // adding wishlists of a certian product
  wishlist(prtid:any,msn:any):Observable<InstanceType<any>>
  {
    return this.httpclient.get(this.baseUrl+'wishlist'+'/'+prtid+'/'+msn);
  }

  // deleteing wishlists of a certian product
  delwishlist(prtid:any,msn:any):Observable<InstanceType<any>>
  {
    return this.httpclient.get(this.baseUrl+'delete/wishlist'+'/'+prtid+'/'+msn);
  }

  // adding wishlists of a certian product
  showWishlist():Observable<InstanceType<any>>
  {
    return this.httpclient.get(this.baseUrl+'wishlist');
  }

   //get product  product ratings
   productRatingsReviews(prtid: any):Observable<InstanceType<any>>
   {
     var a= this.httpclient.get<any[]>(this.baseUrl+'getReview/'+prtid);

     return a ;
   }


  // otp send
  otpSend(phone : phonenumber):Observable<InstanceType<any>>
  {
    return this.httpclient.post(this.baseUrl+'otp',phone);
  }

  // resed password
  resetPassword(reset : resetPassword):Observable<InstanceType<any>>
  {
    return this.httpclient.post(this.baseUrl+'resetPassword',reset);
  }

  // login customer when clicking buy
  postPhone(phone : phonenumber):Observable<InstanceType<any>>
  {
    return this.httpclient.post(this.baseUrl+'checkNumber',phone);
  }

  // msn post to cart
  postMsnToCart(msnPosting : addDataCart , prtid: any):Observable<InstanceType<any>>
  {
    return this.httpclient.get(this.baseUrl+'addToCart/'+msnPosting+'/'+prtid);
  }

  // update adding cart quantity
  updateQuantity(qty:any,cart_id:any):Observable<InstanceType<any>>
  {
    return this.httpclient.get(this.baseUrl+'cart/quantity'+'/'+qty+'/'+cart_id);
  }
  updateOrder():Observable<InstanceType<any>>
  {
    return this.httpclient.get(this.baseUrl+'orderQuantity');
  }


  // update adding cart quantity
  updateQuantityMinus(qty:any,cart_id:any):Observable<InstanceType<any>>
  {
    return this.httpclient.get(this.baseUrl+'cart/quantityMinus'+'/'+qty+'/'+cart_id);
  }
  // show cart details
  showACartDetails()
  {
    return this.httpclient.get(this.baseUrl+'accountCart');
  }

  // pricings Of Cart details
  cartPricings()
  {
    return this.httpclient.get(this.baseUrl+'accountCart');
  }

  // pricings Of after price
  aftercartPricings(opost:msnExportFromCart)
  {
    return this.httpclient.post(this.baseUrl+'pricingsCart',opost);
  }

  // post Address Id
  postAddressIds(addressId:addressId)
  {
    return this.httpclient.post(this.baseUrl+'addressOrders',addressId);
  }

  // show order over view
  orderOverView(orderOverView : orderOverViewPostMSN)
  {
    return this.httpclient.post(this.baseUrl+'orderOverviewPostMSN' , orderOverView);
  }

  // show order over view
  modePayment(modePayment : mode)
  {
    return this.httpclient.post(this.baseUrl+'modeOfPayment' , modePayment);
  }

  // post Payment Details
  paymentSteps(paymentDetails : paymentAddData)
  {
    return this.httpclient.post(this.baseUrl+'payments' , paymentDetails);
  }

  thankYouAddress(custId:any)
  {
    return this.httpclient.get(this.baseUrl+'thankYou/'+ custId);
  }
  // show price
  priceThanks(price : orderOverViewPostMSN)
  {
    return this.httpclient.post(this.baseUrl+'thankPrice' , price);
  }
  // show orders which are placed
  ordersPlaced():Observable<InstanceType<any>>
  {
    return this.httpclient.get(this.baseUrl+'orders');
  }


  // product details of a specific product
  orderPlaced(order_id: any):Observable<InstanceType<any>>
  {
    var a= this.httpclient.get(this.baseUrl+'orderDetail/'+order_id);

    return a ;
  }


  // otp send
  sendOtpEditing(phone_exist:any,phone_new:any):Observable<InstanceType<any>>
  {
    return this.httpclient.get(this.baseUrl+'otpEditing'+'/'+phone_exist+'/'+phone_new);
  }


  // remove guest cart product
  removeProductGuest(guest_cart_id:any):Observable<InstanceType<any>>
  {
    return this.httpclient.get(this.baseUrl+'guestProductRemove'+'/'+guest_cart_id);
  }

  // routings of settings

  // general detaisl
  settingGeneral() :void
  {
    this.router.navigate(['/accountSettings']);
  }

  // address add
  address() :void
  {
    this.router.navigate(['/accountAddress']);
  }

  // password
  password():void {
    this.router.navigate(['/accountPassword']);
  }
  // AccountPAN
  accountPAN() :void
  {
    this.router.navigate(['/accountPAN']);
  }
  // ACCOUNT GIFT CARD
  accountGiftCard() :void
  {
    this.router.navigate(['/accountGiftCard']);
  }
  // account coupons
  accountCoupons() :void
  {
    this.router.navigate(['/accountCoupons']);
  }
  // account notification
  accountNotification() : void
  {
    this.router.navigate(['/accountNotification']);
  }
  // account review ratings
  accountReviewRating():void
  {
    this.router.navigate(['/accountReviewRating']);
  }
  // account wishlist
  accountwishlist():void
  {
    this.router.navigate(['/accountwishlist']);
  }

  // place Order First Step Add Address
  addressAfterCart():void
  {
    this.router.navigate(['/accountCartAddress']);
  }
  paymentplaceOrder()
  {
    this.router.navigate(['/accountCartPayment']);
  }
  // end routings of settings



  // get all ratings and reviews
  getCustomerBankDetails():Observable<InstanceType<any>>
  {
    return this.httpclient.get(this.baseUrl+'customer/bankDetails');
  }

  // add bank details
  bankDetailsAdding(data:any):Observable<InstanceType<any>>
  {
    return this.httpclient.post(this.baseUrl+'bankDetails',data);
  }
  // refund form
  refundFormSubmit(data:any,order_id : any){
    return this.httpclient.post(this.baseUrl+'refund'+'/'+order_id,data);
  }

  // delete all bank accounts
  deleteBankDetails(bank_id:any):Observable<InstanceType<any>>
  {
    return this.httpclient.get(this.baseUrl+'bank'+'/'+bank_id);
  }
}
