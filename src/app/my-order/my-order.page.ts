import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ordersDone } from '../class/headings';
import { NavService } from '../services/nav.service';
import { ToastrService } from '../services/toastr.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.page.html',
  styleUrls: ['./my-order.page.scss'],
})
export class MyOrderPage implements OnInit {
  name: any;

  constructor(public _ApiServiceService:NavService,public route:ActivatedRoute,
    public router :Router,private toastr: ToastrService) { }

  lstProductHeadings: ordersDone[] = [] ;
  ngOnInit(): void {
    this.name = localStorage.getItem('name');
    this._ApiServiceService.ordersPlaced().subscribe(
      data=>{
        this.lstProductHeadings=data;
        // console.log(this.lstProductHeadings);
      }
    )

  }

  onselect(order_id: any)
  {
    this._ApiServiceService.orderPlaced(order_id);
    this.router.navigate(['/accountOrderDetails',order_id]);
  }

}
