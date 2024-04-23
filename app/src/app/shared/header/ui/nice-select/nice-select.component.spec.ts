import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiceSelectComponent } from './nice-select.component';

describe('NiceSelectComponent', () => {
  let component: NiceSelectComponent;
  let fixture: ComponentFixture<NiceSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NiceSelectComponent]
    });
    fixture = TestBed.createComponent(NiceSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
