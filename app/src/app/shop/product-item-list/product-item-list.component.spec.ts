import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemListComponent } from './product-item-list.component';

describe('ProductItemListComponent', () => {
  let component: ProductItemListComponent;
  let fixture: ComponentFixture<ProductItemListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductItemListComponent]
    });
    fixture = TestBed.createComponent(ProductItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
