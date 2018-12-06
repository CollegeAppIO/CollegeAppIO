import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDynamicComponent } from './student-dynamic.component';

describe('StudentDynamicComponent', () => {
  let component: StudentDynamicComponent;
  let fixture: ComponentFixture<StudentDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
