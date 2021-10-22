import { Component, Input, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-all-category',
  templateUrl: './all-category.page.html',
  styleUrls: ['./all-category.page.scss'],
})
export class AllCategoryPage implements OnInit {

  baseUrl = this._nav.baseImgUrl+'/outerCategory'
  constructor(private _nav:NavService) { }

  // @Input() open:Boolean = false;
  // @Input() categories = [] as any;

  ngOnInit() {

    this.showOuterCategory()
  }

  
  outerCategory:any;
  showOuterCategory(){
    this._nav.getOuterCategories().subscribe(
      data=>{
        this.outerCategory = data;
      }
    )
  }

}
