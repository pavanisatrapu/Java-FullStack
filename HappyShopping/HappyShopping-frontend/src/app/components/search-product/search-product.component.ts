import { Component } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrl: './search-product.component.css'
})
export class SearchProductComponent {
    constructor(private route:Router){}
    searchProducts(searchInput:string){
      this.route.navigateByUrl(`/search/${searchInput}`);
    }
}
