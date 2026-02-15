import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private categoryUrl='http://localhost:8080/productCategories';
  private productstUrl='http://localhost:8080/products';
  
  constructor(private httpClient:HttpClient) { }

  // getProducts(categoryId:number):Observable<Product[]>{
  //   const searchUrl=`${this.productstUrl}/search/findByCategoryId?id=${categoryId}`;
  //   return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
  //     map(response=>response._embedded.products));
  // }
  getProducts(pl_pageNumber:number,
              pl_pageSize:number,
              categoryId:number):Observable<GetResponseProducts>{
                // console.log(categoryId+" "+(pl_pageNumber)+" "+pl_pageSize);
    const searchUrl=`${this.productstUrl}/search/findByCategoryId?id=${categoryId}`
                    +`&page=${pl_pageNumber}&size=${pl_pageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
    
  }

  getProductCategories():Observable<ProductCategory[]>{
    return this.httpClient.get<GetResponseProductCategories>(this.categoryUrl).pipe(
      map(response=>response._embedded.productCategories)
    );
  }

  getSearchedProducts(searchKeyword:string):Observable<Product[]>{
    const searchByNameUrl=`${this.productstUrl}/search/findByNameContaining?name=${searchKeyword}`;
    return this.httpClient.get<GetResponseProducts>(searchByNameUrl).pipe(
      map(response=>response._embedded.products)
    );
  }
  

  getProductDetails(productId:number):Observable<Product>{
      const singleProduct=`${this.productstUrl}/${productId}`;
      return this.httpClient.get<Product>(singleProduct);
  }
}
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page:{
    size:number,
    totalElements:number,
    totalPages:number,
    number:number
  }
}
interface GetResponseProductCategories{
  _embedded:{
    productCategories:ProductCategory[];
  }
}

