import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavService } from '../services/nav.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  constructor( private _nav:NavService,private route:ActivatedRoute, private location:Location) { }

  category = [] as any;
  catName:any;
  outCid :any;
  baseUrl = this._nav.baseImgUrl+'/category'

  ngOnInit(): void {
   this.catName = this.route.snapshot.paramMap.get('category')
this.outCid = this.route.snapshot.queryParamMap.get('outCid');
this._nav.getCategories(this.outCid).subscribe(res=>{
  this.category = res;
})
  }

  goback(){
this.location.back()
  }
}
