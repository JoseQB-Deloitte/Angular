import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StudentsComponent } from './students/students.component';
import { CoursesComponent } from './courses/courses.component';
import { ProjectsComponent } from './projects/projects.component';

import { StudentsByCoursesComponent } from './relations/students-by-courses/students-by-courses.component';
import { StudentsByProjectsComponent } from './relations/students-by-projects/students-by-projects.component';

import { DataService } from './app.service';

const routes: Routes = [
  { path: 'students', component: StudentsComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'students_by_courses', component: StudentsByCoursesComponent },
  { path: 'students_by_projects', component: StudentsByProjectsComponent },
  
  { path: '', redirectTo: '/students', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    CoursesComponent,
    ProjectsComponent,
    StudentsByCoursesComponent,
    StudentsByProjectsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
