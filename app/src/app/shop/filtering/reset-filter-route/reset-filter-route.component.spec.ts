import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetFilterRouteComponent } from './reset-filter-route.component';

describe('ResetFilterRouteComponent', () => {
  let component: ResetFilterRouteComponent;
  let fixture: ComponentFixture<ResetFilterRouteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResetFilterRouteComponent]
    });
    fixture = TestBed.createComponent(ResetFilterRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
