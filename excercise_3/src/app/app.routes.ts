import { Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { CoursesComponent } from './courses/courses.component';
import { ProjectsComponent } from './projects/projects.component';
import { StudentsByCoursesComponent } from './relations/students-by-courses/students-by-courses.component';
import { StudentsByProjectsComponent } from './relations/students-by-projects/students-by-projects.component';

export const routes: Routes = [
  { path: 'students', component: StudentsComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'students_by_courses', component: StudentsByCoursesComponent},
  { path: 'students_by_projects', component: StudentsByProjectsComponent },

  { path: '', redirectTo: '/students', pathMatch: 'full' },
];
