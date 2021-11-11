import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavService } from '../services/nav.service';
import { ToastrService } from '../services/toastr.service';

@Component({
  selector: 'app-account-bank-details',
  templateUrl: './account-bank-details.page.html',
  styleUrls: ['./account-bank-details.page.scss'],
})
export class AccountBankDetailsPage implements OnInit {

  formdata: any;

  constructor(public _ApiServiceService:NavService,
    private router :Router,
    private toastr: ToastrService,
    private route:ActivatedRoute,
    private formBuilder : FormBuilder) { }

  uploadForm : FormGroup | undefined;
  name:any;
  ngOnInit(): void {
    $(document).on('click','.addAddress',function(){
      $('.addAddress').prop('hidden',true);
      $('.addressForm').prop('hidden',false);
    });

    $(document).on('click','.cancelButton',function(){
      $('.addAddress').prop('hidden',false);
      $('.addressForm').prop('hidden',true);
    });

    this.bankDetailsShow();

    this.getSettingNormalDetails();

  }

  listSettingsPAN : any;

  getSettingNormalDetails()
  {
    this._ApiServiceService.getSettingPAN().subscribe(
      data=>{
        this.listSettingsPAN=data;

        this.name = localStorage.getItem('name');
      }
    )
  }



   // SUBMITING BANK DETAILS
   bankSubmit(val : any)
   {
     let data = new FormData();
     data.append('bank_name',val.bank_name);
     data.append('bank_holder_name',val.bank_holder_name);
     data.append('accountNumebr',val.accountNumebr);
     data.append('ifsc',val.ifsc);

     this._ApiServiceService.bankDetailsAdding(data).subscribe(
       res=>{
         this.toastr.successToast('Bank account added');
         this.router.navigate(['/accountBankDetails'])
         .then(() => {
           window.location.reload();
         });
       },
       err=>{
         this.toastr.warnToast(err.error.errors.accountNumebr[0]);
         this.toastr.warnToast(err.error.errors.bank_holder_name[0]);
         this.toastr.warnToast(err.error.errors.ifsc[0]);
         this.toastr.warnToast(err.error.errors.bank_name[0]);
       }
     );
   }

   bankDetails:any;
   // SHOWING BANK DETAILS
   bankDetailsShow()
   {
     this._ApiServiceService.getCustomerBankDetails().subscribe(
       res=>{
         this.bankDetails = res;
       },
       err=>{
       }
     );
   }

   deleteBank(bank_id:any)
   {
     this._ApiServiceService.deleteBankDetails(bank_id).subscribe(
       res=>{
         this.toastr.successToast('Deleted Successfully');
         this.ngOnInit();
       },
       err=>{
       }
     );
   }


}
