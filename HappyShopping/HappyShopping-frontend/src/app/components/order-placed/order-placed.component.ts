import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.component.html',
  styleUrl: './order-placed.component.css'
})
export class OrderPlacedComponent implements OnInit {
  orderTrackingNumber:string='';
  totalPrice:number=0.00;
  totalQuantity:number=0;
  constructor(private route:ActivatedRoute,public cartService:CartService) { }

  ngOnInit(): void {
      this.handleOrderPlaced();
    }
    handleOrderPlaced(){
      this.orderTrackingNumber=this.route.snapshot.paramMap.get('orderTrackingNumber')!;  
      this.totalPrice=+this.route.snapshot.paramMap.get('totalPrice')!;
      this.totalQuantity=+this.route.snapshot.paramMap.get('totalQuantity')!;
    }
}
