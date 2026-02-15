import { Component } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Product } from '../../common/product';
import { CartService } from '../../service/cart.service';
import { CartItem } from '../../common/cart-item';
@Component({
  selector: 'app-full-product-details',
  templateUrl: './full-product-details.component.html',
  styleUrl: './full-product-details.component.css'
})
export class FullProductDetailsComponent {
  product !: Product;
  categoryId: number=1;
  constructor(private route:ActivatedRoute,
              private router:Router,
              public cartService:CartService,
              private productService:ProductService){}
  ngOnInit(){
    this.categoryId= +this.route.snapshot.paramMap.get('catId')!;
    this.route.paramMap.subscribe(()=>{
      this.displayProductDetails();
    });
  }
  displayProductDetails(){
    
    const productId:number = +this.route.snapshot.paramMap.get('prodId')!;
    this.productService.getProductDetails(productId).subscribe(
        data=>{
          this.product=data;
        }
    );
  }
  addToCart(productId:string){
    if(this.cartService.isAddedToCart(productId)){
      this.router.navigateByUrl("/cart-list");
    }
    else{
    const cartItemInput=new CartItem(this.product);
    this.cartService.addToCart(cartItemInput);   
    } 
  }
}
