import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCategoryMemuComponent } from './components/product-category-memu/product-category-memu.component';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { FullProductDetailsComponent } from './components/full-product-details/full-product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductsCartListComponent } from './components/products-cart-list/products-cart-list.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderPlacedComponent } from './components/order-placed/order-placed.component';



@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMemuComponent,
    SearchProductComponent,
    FullProductDetailsComponent,
    ShoppingCartComponent,
    ProductsCartListComponent,
    CheckoutComponent,
    OrderPlacedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
