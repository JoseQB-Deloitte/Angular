import { Component } from '@angular/core';
import { DataService } from '../app.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  coursesList: any[] = [];
  newCourseName: string = '';
  newCourseCredits: number = 1;
  selectedCourse: any = null;

  constructor(private dataService: DataService) {}

  registerCourse(): void {
    if (this.newCourseName.trim() === '') {
      console.log("Acción no permitida: campos vacíos.");
      return;
    }

    const newCourse = {
      "id": (this.coursesList.length + 1).toString(),
      "name": this.newCourseName,
      "credits": this.newCourseCredits
    };
    
    // Llamar al servicio para registrar el curso
    this.dataService.addCourse(newCourse).subscribe(response => {
      this.loadCourses();
      this.clearInputFields();
    });
  }

  // Llamar al servicio para cargar los cursos
  loadCourses(): void {
    this.dataService.getCourses().subscribe(data => {
      this.coursesList = data;
    });
  }

  loadCourseDetails(course: any): void {
    this.selectedCourse = { ...course };
  }

  updateCourse(): void {
    if (this.selectedCourse.name.trim() === '') {
      console.log("Acción no permitida: campos vacíos.");
      return;
    }
  }

  clearInputFields(): void {
    this.newCourseName = '';
    this.newCourseCredits = 1;
    this.selectedCourse = null;
  }

  ngOnInit(): void {
    this.loadCourses();
  }
}
