import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavService } from '../services/nav.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.page.html',
  styleUrls: ['./sub-category.page.scss'],
})
export class SubCategoryPage implements OnInit {

  constructor( private _nav:NavService, private route:ActivatedRoute, private location:Location) { }

  subCategory = [] as any;
  catName:any;
  subCatName:any;
  cid:any;
  outCid:any;
  baseUrl = this._nav.baseImgUrl+'/sub_category'

  ngOnInit(): void {
   this.subCatName = this.route.snapshot.paramMap.get('subcategory');
   this.catName = this.route.snapshot.paramMap.get('category');
   this.cid = this.route.snapshot.queryParamMap.get('cid')
   this.outCid = this.route.snapshot.queryParamMap.get('outCid')

   this._nav.getSubCategories(this.outCid,this.cid).subscribe(res=>{
     this.subCategory = res;
   },err=>console.log(err))
  }

  goback(){
    this.location.back()
  }

}
