import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullProductDetailsComponent } from './full-product-details.component';

describe('FullProductDetailsComponent', () => {
  let component: FullProductDetailsComponent;
  let fixture: ComponentFixture<FullProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FullProductDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
