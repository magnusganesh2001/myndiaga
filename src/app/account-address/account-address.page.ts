import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { addressAddition } from '../class/post';
import { NavService } from '../services/nav.service';
import { ToastrService } from '../services/toastr.service';

@Component({
  selector: 'app-account-address',
  templateUrl: './account-address.page.html',
  styleUrls: ['./account-address.page.scss'],
})
export class AccountAddressPage implements OnInit {
  local: number | undefined;
  name: any;

  constructor(public _ApiServiceService:NavService,
    private router :Router,
    private toastr: ToastrService,
    private route:ActivatedRoute) { }


  ngOnInit(): void {

    this.states();
    $(document).on('click','.addAddress',function(){
      $('.addAddress').prop('hidden',true);
      $('.addressForm').prop('hidden',false);
    });

    $(document).on('click','.cancelButton',function(){
      $('.addAddress').prop('hidden',false);
      $('.addressForm').prop('hidden',true);
    });

    this.getAddressDetails();

  }




  // show address
  listAddressDetails : any= [];

  getAddressDetails()
  {
    this._ApiServiceService.showAddressDetails().subscribe(
      data=>{
        this.listAddressDetails=data;
        this.name = localStorage.getItem('name');
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
          this.router.navigate(['/accountAddress'])
          .then(() => {
            window.location.reload();
          });
        },
        err=>{
          this.toastr.warnToast(err.error.errors.address_Type[0]);
          this.toastr.warnToast(err.error.errors.landmark[0]);
          this.toastr.warnToast(err.error.errors.locality[0]);
          this.toastr.warnToast(err.error.errors.pincode[0]);
          this.toastr.warnToast(err.error.errors.address[0]);
          this.toastr.warnToast(err.error.errors.state[0]);
          this.toastr.warnToast(err.error.errors.city[0]);
        }
      );
  }

  statesDetails : any;
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

  deleteAddress(custAddress_id:any)
  {
    this._ApiServiceService.deleteAddress(custAddress_id).subscribe(
      data=>{
        this.statesDetails=data;
        this.toastr.successToast('Deleted Successfully');
        this.ngOnInit();
      }
    )
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
            this.router.navigate(['/accountCartAddress'])
            .then(() => {
              window.location.reload();
            });
          }else{
            this.toastr.errorToast('Something Went Wrong');
          }

        },
        err=>{
          this.toastr.warnToast(err.error.errors.address_Type[0]);
          this.toastr.warnToast(err.error.errors.landmark[0]);
          this.toastr.warnToast(err.error.errors.locality[0]);
          this.toastr.warnToast(err.error.errors.pincode[0]);
          this.toastr.warnToast(err.error.errors.address[0]);
          this.toastr.warnToast(err.error.errors.state[0]);
          this.toastr.warnToast(err.error.errors.city[0]);
        }
      );
  }

}
