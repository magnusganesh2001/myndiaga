import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavService } from '../services/nav.service';
import { ToastrService } from '../services/toastr.service';

@Component({
  selector: 'app-account-pan',
  templateUrl: './account-pan.page.html',
  styleUrls: ['./account-pan.page.scss'],
})
export class AccountPANPage implements OnInit {
  formdata: any;

  constructor(public _ApiServiceService:NavService,
    private router :Router,
    private toastr: ToastrService,
    private route:ActivatedRoute,
    private formBuilder : FormBuilder) { }

  uploadForm : FormGroup | undefined;
  name:any;
  ngOnInit(): void {


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

  // checkPan is present
  checkPan()
  {
    return !!this.listSettingsPAN?.pan_number;
  }

  filedata:any;
  base64Value : any;
  fileEvent(e:any) : void{
      this.filedata = e.target.files[0];
  }


  // upload pancard
  uploadPANcard(data: any){
    let pan = new FormData();
    pan.append('panNumber',data.panNumber)
    pan.append('name',data.name)
    pan.append('panNumbeImg',this.filedata)
    pan.append('athority',data.athority)
    // postPAN.pan_number = data.panNumber;
    // postPAN.pan_card_full_name=data.name;
    // postPAN.pan_image = this.base64Value;
    // postPAN.pan_approved_By_Customer = data.athority;
    this._ApiServiceService.uploadPanDetails(pan).subscribe(
      res => {
        this.toastr.successToast('Registered Successfully');
        this.router.navigate(['/accountPAN']);
        this.ngOnInit();
      });

  }


}
