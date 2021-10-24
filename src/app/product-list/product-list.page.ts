import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavService } from '../services/nav.service';
import { ToastrService } from '../services/toastr.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {
  scid:any;
  products = [] as any;
  productName :any;
  catName:any;
  subCatName:any;

  constructor(private route:ActivatedRoute,private toastr:ToastrService,private router:Router, private _service:NavService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

   public priceing : any;
   filter : any;
   public selectedBrandId : any;
   public selectedColorId : any;
   public product:any;
   public length:any;

  ngOnInit(): void {
    this.scid =this.route.snapshot.queryParamMap.get('scid');
    this.productName = this.route.snapshot.paramMap.get('productList');
    this.subCatName = this.route.snapshot.paramMap.get('subcategory');
   this.catName = this.route.snapshot.paramMap.get('category');
    this._service.getProducts(this.scid).subscribe(res=>this.products =res,err=>console.log(err))

    this.priceing = 0;

    this.selectedBrandId = new Array<any>();

    this.selectedColorId = new Array<any>();

    this.filter = new Array<any>();

    this.brands();

    this.color();

    this.filteingProducts();

  }

  filteingProducts()
  {
    if(this.selectedBrandId.length ==0 && this.selectedColorId.length ==0 && this.priceing == 0)
    {
      this._service.getProducts(this.scid).subscribe(
        res=>{
            this.products=res;
            this.length = this.products.length;
        }
      )
    }
    else{
      this.products = this.product;
      this.length = this.products.length;

    }
  }

  imgUrl(path:any) {
    return this._service.baseImgUrl+'/productImages'+path;
  }

    // filter all the brands present in the list
    brand: any;
    brands()
    {
      this._service.filterBrand(this.scid).subscribe(
        res=>{
          this.brand=res;
        }
      )
    }


    // filter all the brands present in the list
    colorsPro: any;
    color()
    {
      this._service.filterColor(this.scid).subscribe(
        res=>{
          this.colorsPro=res;
        }
      )
    }

    // changing brand and taking number

    bandSelect(e:any,id:any)
    {
      if(e.target.checked)
      {
        this.selectedBrandId.push(id);
      }else{
        const index: number = this.selectedBrandId.indexOf(id);
        this.selectedBrandId.splice(index, 1);
      }
      this.postingFilters();
    }

    colorsSelect(e:any,pcolorid:any)
    {
      if(e.target.checked)
      {
        this.selectedColorId.push(pcolorid);
      }else{
        const index: number = this.selectedColorId.indexOf(pcolorid);
        this.selectedColorId.splice(index, 1);
      }
      this.postingFilters();
    }

    // posting product filter

    postingFilters()
    {
    this.filter = ({brand:this.selectedBrandId , color : this.selectedColorId,scid:this.scid,max_price:this.priceing,min_price:this.minValue});

      this._service.postProduct(this.filter).subscribe(
        res=>{
          this.product=res;
          this.toastr.successToast('Filter Applied')
          // this.toastr.success('Filter Applied');
          this.filteingProducts()
        }
      )
    }

    price()
    {
      this.postingFilters();
    }

      minValue: number = 0;
  options: Options = {
    floor: 0,
    ceil: 10000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "<b>Min :</b>" + value;
        case LabelType.High:
          return "<b>Max:</b>" + value;
        default:
          return '';
      }
    },
  };

}
