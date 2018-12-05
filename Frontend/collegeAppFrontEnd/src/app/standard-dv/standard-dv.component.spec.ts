import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardDVComponent } from './standard-dv.component';

describe('StandardDVComponent', () => {
  let component: StandardDVComponent;
  let fixture: ComponentFixture<StandardDVComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardDVComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardDVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
