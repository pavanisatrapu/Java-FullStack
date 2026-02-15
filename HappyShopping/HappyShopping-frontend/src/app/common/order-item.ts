import { CartItem } from "./cart-item";

export class OrderItem {
    imageUrl:String;
    unitPrice:number;
    quantity:number;
    productId:string;
    constructor(cartItem:CartItem){
        this.imageUrl=cartItem.imageUrl;
        this.unitPrice=cartItem.unitPrice;
        this.quantity=cartItem.qunatity;
        this.productId=cartItem.id;
    }
}
