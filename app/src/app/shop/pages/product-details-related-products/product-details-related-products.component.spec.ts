import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsRelatedProductsComponent } from './product-details-related-products.component';

describe('ProductDetailsRelatedProductsComponent', () => {
  let component: ProductDetailsRelatedProductsComponent;
  let fixture: ComponentFixture<ProductDetailsRelatedProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailsRelatedProductsComponent]
    });
    fixture = TestBed.createComponent(ProductDetailsRelatedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
