import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsByCoursesComponent } from './students-by-courses.component';

describe('StudentsByCoursesComponent', () => {
  let component: StudentsByCoursesComponent;
  let fixture: ComponentFixture<StudentsByCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsByCoursesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentsByCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
