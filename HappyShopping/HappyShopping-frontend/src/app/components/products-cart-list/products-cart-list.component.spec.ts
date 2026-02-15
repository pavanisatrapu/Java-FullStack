import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsCartListComponent } from './products-cart-list.component';

describe('ProductsCartListComponent', () => {
  let component: ProductsCartListComponent;
  let fixture: ComponentFixture<ProductsCartListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsCartListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsCartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
