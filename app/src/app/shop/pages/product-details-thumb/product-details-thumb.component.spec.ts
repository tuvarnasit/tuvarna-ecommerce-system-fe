import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsThumbComponent } from './product-details-thumb.component';

describe('ProductDetailsThumbComponent', () => {
  let component: ProductDetailsThumbComponent;
  let fixture: ComponentFixture<ProductDetailsThumbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailsThumbComponent]
    });
    fixture = TestBed.createComponent(ProductDetailsThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
