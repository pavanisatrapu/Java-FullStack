import { Component } from '@angular/core';
import { ProductService } from '../../service/product.service';
import {ProductCategory} from '../../common/product-category';
@Component({
  selector: 'app-product-category-memu',
  templateUrl: './product-category-memu.component.html',
  styleUrl: './product-category-memu.component.css'
})
export class ProductCategoryMemuComponent {
  
  productCategories : ProductCategory[]=[];
  constructor(private productService:ProductService){}
  ngOnInit(){
    this.listProductCategories();
  }
  listProductCategories(){
    this.productService.getProductCategories().subscribe(
      data=>{
        this.productCategories=data;
      }
    );
  }

}

