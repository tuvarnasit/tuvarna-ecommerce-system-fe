import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsTabNavComponent } from './product-details-tab-nav.component';

describe('ProductDetailsTabNavComponent', () => {
  let component: ProductDetailsTabNavComponent;
  let fixture: ComponentFixture<ProductDetailsTabNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailsTabNavComponent]
    });
    fixture = TestBed.createComponent(ProductDetailsTabNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
