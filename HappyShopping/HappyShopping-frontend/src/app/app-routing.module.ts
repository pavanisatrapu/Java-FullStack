import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { FullProductDetailsComponent } from './components/full-product-details/full-product-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProductsCartListComponent } from './components/products-cart-list/products-cart-list.component'
import { OrderPlacedComponent } from './components/order-placed/order-placed.component';
const routes:Routes=[
  {path:'orderPlaced/:orderTrackingNumber/:totalPrice/:totalQuantity',component:OrderPlacedComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'products/:catId/:prodId',component:FullProductDetailsComponent},
  {path:'cart-list',component:ProductsCartListComponent},
  {path:'search/:searchingWord',component:ProductListComponent},
  {path:'products',component:ProductListComponent},
  {path:'category/:id',component:ProductListComponent},
  {path:'category',component:ProductListComponent},
  {path:'',redirectTo:'/products',pathMatch:'full'},
  {path:'**',redirectTo:'/products',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
