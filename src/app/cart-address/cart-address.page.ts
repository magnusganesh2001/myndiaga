import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { addressAddition, addressId, msnExportFromCart } from '../class/post';
import { NavService } from '../services/nav.service';
import { ToastrService } from '../services/toastr.service';

@Component({
  selector: 'app-cart-address',
  templateUrl: './cart-address.page.html',
  styleUrls: ['./cart-address.page.scss'],
})
export class CartAddressPage implements OnInit {

  statesDetails: any;
  constructor(public _ApiServiceService:NavService,
    private router :Router,
    private toastr: ToastrService,
    private route:ActivatedRoute) { }
    public  listAddressDetails : any= [];
    public listPrcings : any = [];
    public msn : any;

    public totalPricings : any= [];
  ngOnInit(): void {

    this.getAddressDetails();
    this.getPricings();
    this.states();
  }

    // show states
    states()
    {
      this._ApiServiceService.showStates().subscribe(
        data=>{
          this.statesDetails=data;
        }
      )
    }

    cities:any;
    // citys
    getCity(id:any)
    {
      console.log(id);

      this._ApiServiceService.city(id).subscribe(
        data=>{
          this.cities=data;
        }
      )
    }
  // show address


  getAddressDetails()
  {
    this._ApiServiceService.showAddressDetails().subscribe(
      data=>{
        this.listAddressDetails=data;
        this.editAddressModel = this.listAddressDetails[0];
        if(this.listAddressDetails.length == 0)
        {
          var clicking = <HTMLElement>document.querySelector('.addAddressModal');
          clicking?.click();

        }
      }
    )
  }

  // address add
  onSubmitAddress(addressDetails : any)
  {
      var postAdress = new addressAddition();

      postAdress.name = addressDetails.name;
      postAdress.phone = addressDetails.phone;
      postAdress.pincode = addressDetails.pincode;
      postAdress.locality = addressDetails.locality;
      postAdress.address = addressDetails.address;
      postAdress.city = addressDetails.city;
      postAdress.state= addressDetails.state;
      postAdress.landmark = addressDetails.landmark;
      postAdress.address_Type = addressDetails.addressType;

      this._ApiServiceService.addressSubmit(postAdress).subscribe(
        res=>{
          this.toastr.successToast('Registered Successfully');
          // this.toastr.success('Registered', 'Successfully');
          this.router.navigate(['/accountCartAddress'])
          .then(() => {
            window.location.reload();
          });
        },
        err=>{
          this.toastr.errorToast(err.error.errors.address_Type[0]);
          this.toastr.errorToast(err.error.errors.landmark[0]);
          this.toastr.errorToast(err.error.errors.locality[0]);
          this.toastr.errorToast(err.error.errors.pincode[0]);
          this.toastr.errorToast(err.error.errors.address[0]);
          this.toastr.errorToast(err.error.errors.state[0]);
          this.toastr.errorToast(err.error.errors.city[0]);
        }
      );
  }



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

  public addressIdPost : any;
  // post address id
  postAddressId(addressID:any)
  {
    this.msn = localStorage.getItem('msnCarts');

    var addressIdPost = new addressId();
    addressIdPost.addressId = addressID.addressID;
    addressIdPost.msnArray = this.msn;

    if(addressID.addressID == "")
    {
      this.toastr.errorToast('Address Is Not Selected');
    }
    else{
      this._ApiServiceService.postAddressIds(addressIdPost).subscribe(
        res=>{
          localStorage.setItem('ccccc',addressID.addressID);
          this.router.navigate(['/accountCartOrderOverview']);
        },
        (err)=>{
          this.toastr.errorToast('Address Must not Be Null');
        }
      )
    }
  }



  editAddressModel = {
    address_type: "",
custAddress_id: 0,
custCity: "",
custLandMark: "",
custPincode: 0,
custState: "",
cust_Name: "",
cust_address: "",
locality: "",
order_phone: 0
  };
  edit_add_id:any;
  editAddress(i:any,id:any){
    this.edit_add_id = id;
this.editAddressModel = this.listAddressDetails[i];
this.getCity(this.editAddressModel.custState)
  }


  onEditAddress(addressDetails:any)
  {
      var postAdress = new addressAddition();

      postAdress.name = addressDetails.name;
      postAdress.phone = addressDetails.phone;
      postAdress.pincode = addressDetails.pincode;
      postAdress.locality = addressDetails.locality;
      postAdress.address = addressDetails.address;
      postAdress.city = addressDetails.city;
      postAdress.state= addressDetails.state;
      postAdress.landmark = addressDetails.landmark;
      postAdress.address_Type = addressDetails.addressType;

      this._ApiServiceService.editAddress(postAdress,this.edit_add_id).subscribe(
        res=>{
          if(res == 1)
          {
          this.toastr.successToast('Registered Successfully');

            // this.toastr.success('Registered', 'Successfully');
            this.router.navigate(['/accountCartAddress'])
            .then(() => {
              window.location.reload();
            });
          }else{
            this.toastr.errorToast('Something Went Wrong');
          }

        },
        err=>{
          this.toastr.errorToast(err.error.errors.address_Type[0]);
          this.toastr.errorToast(err.error.errors.landmark[0]);
          this.toastr.errorToast(err.error.errors.locality[0]);
          this.toastr.errorToast(err.error.errors.pincode[0]);
          this.toastr.errorToast(err.error.errors.address[0]);
          this.toastr.errorToast(err.error.errors.state[0]);
          this.toastr.errorToast(err.error.errors.city[0]);
        }
      );
  }


}
