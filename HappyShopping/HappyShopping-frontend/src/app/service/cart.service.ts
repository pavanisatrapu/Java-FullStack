import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject} from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems:CartItem[]=[];
  totalPrice : Subject<number>=new Subject<number>();
  totalQuantity:Subject<number>=new Subject<number>();

  constructor() { }

  addToCart(cartItem:CartItem){
    let alreadyPresentsInCart:boolean=false;
    let alreadyPresentItem:CartItem=undefined!;
    alreadyPresentItem=this.cartItems.find(tempCartItem=>tempCartItem.id===cartItem.id)!;
    alreadyPresentsInCart=(alreadyPresentItem != undefined);
    if(alreadyPresentsInCart){
      alreadyPresentItem.qunatity++;
    }
    else{
      this.cartItems.push(cartItem)
    }
    this.calculatecartTotals();
  }
  isAddedToCart(productId:string):string{
    return this.cartItems.find(tempCartItem=>tempCartItem.id===productId)?.id!;
  }
  calculatecartTotals(){
    let totalPriceValue:number=0.00;
    let totalQuantityValue:number=0;
    for(let tempCartItem1 of this.cartItems){
      totalPriceValue+=tempCartItem1.unitPrice*tempCartItem1.qunatity;
      totalQuantityValue+=tempCartItem1.qunatity;
      
    }
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }

  decrementQuantity(cartItem:CartItem){
    cartItem.qunatity--;
    if(cartItem.qunatity==0){
      this.removeCartItem(cartItem);
    }
    else{
      this.calculatecartTotals();
    }
  }
  removeCartItem(cartItem:CartItem){
    const cartItemIndx=this.cartItems.findIndex(tempCart=>tempCart.id===cartItem.id);
    if(cartItemIndx>-1){
      this.cartItems.splice(cartItemIndx,1);
      this.calculatecartTotals();
    }
  }
  
}
