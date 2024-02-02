import { Component, OnInit } from '@angular/core';
import { DataService } from '../../app.service';
import { StudentService } from '../../student.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-students_by_courses',
  templateUrl: './students-by-courses.component.html',
  styleUrls: ['./students-by-courses.component.css']
})

export class StudentsByCoursesComponent implements OnInit {
  students: any[] = [];
  courses: any[] = [];
  selectedStudentId: any = '';
  selectedCourseId: any = '';
  existingRelations: any[] = [];

  constructor(
      private dataService: DataService,
      private studentService: StudentService
  ) {}

  ngOnInit() {
    forkJoin({
        students: this.dataService.getStudents(),
        courses: this.dataService.getCourses()
    }).subscribe(result => {
        this.students = result.students;
        this.courses = result.courses;

        this.loadExistingRelations();
    });
  }

  private loadExistingRelations(): void {
    // Obtener las relaciones existentes
    this.studentService.getAllCourseRelations().subscribe(data => {
        this.existingRelations = data.map(relation => {
            const student = this.students.find(s => s.id === relation.studentId);
            const course = this.courses.find(c => c.id === relation.courseId);

            // Crear un nuevo objeto con los nombres
            return {
                studentName: student ? student.name : 'Desconocido',
                courseName: course ? course.name : 'Desconocido',
            };
        });
    });
  }

  registerStudentToCourse(): void {
      // Verificar si se han seleccionado tanto un estudiante como un curso
      if (this.selectedStudentId && this.selectedCourseId) {
          // Comprobar si ya existe una relación entre el estudiante y el curso
          this.studentService.getStudentInCourse(
              this.selectedStudentId,
              this.selectedCourseId
          ).subscribe(existingRelation => {
              if (existingRelation.length === 0) {
                  // Si no existe, crear una nueva relación
                  const newRelation = {
                      studentId: this.selectedStudentId,
                      courseId: this.selectedCourseId
                  };

                  // Registrar la nueva relación en el servicio
                  this.studentService.addStudentToCourse(newRelation).subscribe(() => {
                      alert('Relación registrada con éxito.');
                      // Actualizar la lista de relaciones existentes
                      this.loadExistingRelations();
                  });
              } else {
                  alert('La relación ya existe.');
              }
          });
      } else {
        alert('Por favor, selecciona un estudiante y un curso.');
      }
  }
}

