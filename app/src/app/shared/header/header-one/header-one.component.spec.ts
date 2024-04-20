import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderOneComponent } from './header-one.component';

describe('HeaderOneComponent', () => {
  let component: HeaderOneComponent;
  let fixture: ComponentFixture<HeaderOneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderOneComponent]
    });
    fixture = TestBed.createComponent(HeaderOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
