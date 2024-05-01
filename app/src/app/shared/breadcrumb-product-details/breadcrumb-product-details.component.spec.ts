import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbProductDetailsComponent } from './breadcrumb-product-details.component';

describe('BreadcrumbProductDetailsComponent', () => {
  let component: BreadcrumbProductDetailsComponent;
  let fixture: ComponentFixture<BreadcrumbProductDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BreadcrumbProductDetailsComponent]
    });
    fixture = TestBed.createComponent(BreadcrumbProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
