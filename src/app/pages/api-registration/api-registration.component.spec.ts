import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiRegistrationComponent } from './api-registration.component';

describe('ApiRegistrationComponent', () => {
  let component: ApiRegistrationComponent;
  let fixture: ComponentFixture<ApiRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
