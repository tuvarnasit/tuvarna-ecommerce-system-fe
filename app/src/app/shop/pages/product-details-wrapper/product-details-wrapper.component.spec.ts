import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsWrapperComponent } from './product-details-wrapper.component';

describe('ProductDetailsWrapperComponent', () => {
  let component: ProductDetailsWrapperComponent;
  let fixture: ComponentFixture<ProductDetailsWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailsWrapperComponent]
    });
    fixture = TestBed.createComponent(ProductDetailsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
