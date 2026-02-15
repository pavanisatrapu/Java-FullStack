import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-products-cart-list',
  templateUrl: './products-cart-list.component.html',
  styleUrl: './products-cart-list.component.css'
})
export class ProductsCartListComponent implements OnInit {

  cartList: CartItem[] = [];
  totalPrice: number = 0.00;
  totalQuantity: number = 0;
  subTotal: number = 0.00;
  constructor(private cartService: CartService) { }
  ngOnInit(): void {
      this.displayCartItems();
  }
  displayCartItems() {
    this.cartList = this.cartService.cartItems;
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
    this.cartService.calculatecartTotals();
  }
  incrementQuantity(tempCartItem:CartItem){
    this.cartService.addToCart(tempCartItem);
  }
  decrementQuantity(tempCartItem:CartItem){
    this.cartService.decrementQuantity(tempCartItem);
  }
  removeCartItem(tempCartItem:CartItem){
    this.cartService.removeCartItem(tempCartItem);
  }
  
}
