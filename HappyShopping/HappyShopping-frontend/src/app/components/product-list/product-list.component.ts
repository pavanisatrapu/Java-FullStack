import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';

import { Product } from '../../common/product';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../service/cart.service';
import { CartItem } from '../../common/cart-item';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  products :Product[]=[];
  searchMode : boolean =false;
  currentCategoryId:number=1;
  previousCategoryId:number=1;
  searchKeyword:string="";

  previousSearchKeyword:string="";

  pl_pageNumber:number=1;
  pl_pageSize:number=8;
  pl_totalElements:number=0;

  constructor(private productService:ProductService,
              public cartService:CartService,
              private route:ActivatedRoute,
              private router:Router){}
  
  ngOnInit(): void {
      this.route.paramMap.subscribe(()=>{
        this.listProducts();
      })
  }
  listProducts(){
    this.searchMode=this.route.snapshot.paramMap.has('searchingWord');
    if(this.searchMode){
      this.handleSearchProducts();
    }
    else{
      this.handleListProducts();
    }
  }
  handleListProducts(){
    const hasCategoryId:boolean=this.route.snapshot.paramMap.has('id');
    if(hasCategoryId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else{
      this.currentCategoryId=1;
    }
    if(this.previousCategoryId != this.currentCategoryId){
      this.pl_pageNumber=1;
    }
    this.previousCategoryId=this.currentCategoryId;
    // this.productService.getProducts(this.currentCategoryId).subscribe(
    //   data=>{
    //     this.products=data;
    //   }
    // );
    // console.log(this.currentCategoryId+" "+(this.pl_pageNumber-1)+" "+this.pl_pageSize+" "+this.pl_totalElements);

    this.productService.getProducts(this.pl_pageNumber-1,
                                    this.pl_pageSize,
                                    this.currentCategoryId)
                                    .subscribe(
                                      data=>{
                                        this.products = data._embedded.products;
                                        this.pl_pageNumber = data.page.number+1;
                                        this.pl_pageSize = data.page.size;
                                        this.pl_totalElements = data.page.totalElements;
                                        // console.log("pl "+this.currentCategoryId+" "+(this.pl_pageNumber+1)+" "+this.pl_pageSize+" "+this.pl_totalElements);
                                      }
                                    );
  }

  handleSearchProducts(){
    
    this.searchKeyword=this.route.snapshot.paramMap.get('searchingWord')!;
    this.productService.getSearchedProducts(this.searchKeyword).subscribe( 
      data=>{
        this.products=data;
      }
    );
      
  }
  addToCart(product:Product){
    // console.log(product.name);
      if(this.cartService.isAddedToCart(product.id)){
        this.router.navigateByUrl("/cart-list");
      }
      else{
      const cartItemInput=new CartItem(product);
      this.cartService.addToCart(cartItemInput);   
      } 
    }
}
