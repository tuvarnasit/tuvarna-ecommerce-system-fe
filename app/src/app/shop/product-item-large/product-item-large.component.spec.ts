import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemLargeComponent } from './product-item-large.component';

describe('ProductItemLargeComponent', () => {
  let component: ProductItemLargeComponent;
  let fixture: ComponentFixture<ProductItemLargeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductItemLargeComponent]
    });
    fixture = TestBed.createComponent(ProductItemLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
