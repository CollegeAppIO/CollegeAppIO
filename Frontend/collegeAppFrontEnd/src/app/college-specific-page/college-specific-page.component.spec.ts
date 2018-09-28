import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeSpecificPageComponent } from './college-specific-page.component';

describe('CollegeSpecificPageComponent', () => {
  let component: CollegeSpecificPageComponent;
  let fixture: ComponentFixture<CollegeSpecificPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollegeSpecificPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeSpecificPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
