import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCollegeInfoComponent } from './admin-college-info.component';

describe('AdminCollegeInfoComponent', () => {
  let component: AdminCollegeInfoComponent;
  let fixture: ComponentFixture<AdminCollegeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCollegeInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCollegeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
