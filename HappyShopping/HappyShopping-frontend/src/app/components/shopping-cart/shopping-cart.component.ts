import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit{
  cartItemsCount:number=0;
  constructor(private route:Router,
              private cartService:CartService){}
    ngOnInit(): void {
        this.incrementCartCount();
    }
  
  updateShoppingCart(){
    this.route.navigateByUrl(`/cart-list`);
  }
  incrementCartCount(){
    this.cartService.totalQuantity.subscribe(
      data => this.cartItemsCount = data
    );

  }
}
