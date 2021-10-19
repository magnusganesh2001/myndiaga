import { Component, Input, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-all-category',
  templateUrl: './all-category.page.html',
  styleUrls: ['./all-category.page.scss'],
})
export class AllCategoryPage implements OnInit {

  constructor(private _nav:NavService) { }

  @Input() open:Boolean = false;
  @Input() categories = [] as any;

  baseUrl = this._nav.baseImgUrl+'/outerCategory'
  ngOnInit() {
  }

}
