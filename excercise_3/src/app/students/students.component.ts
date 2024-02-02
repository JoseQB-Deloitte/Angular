import { Component } from '@angular/core';
import { DataService } from '../app.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  studentsList: any[] = [];
  newStudentName: string = '';
  newStudentAge: number = 18;
  selectedStudent: any = null;

  constructor(private dataService: DataService) {}

  registerStudent(): void {
    if (this.newStudentName.trim() === '' || this.newStudentAge <= 0) {
      alert("Acción no permitida: campos vacíos.");
      return;
    }

    const newStudent = {
      "id": (this.studentsList.length + 1).toString(),
      "name": this.newStudentName,
      "age": this.newStudentAge
    };

    // Llamar al servicio para registrar el estudiante
    this.dataService.addStudent(newStudent).subscribe(response => {
      this.loadStudents();
      this.clearInputFields();
    });
  }

  loadStudents(): void {
    this.dataService.getStudents().subscribe(data => {
      this.studentsList = data;
    });
  }

  loadStudentDetails(student: any): void {
    this.selectedStudent = { ...student };
  }

  updateStudent(): void {
    if (this.selectedStudent.name.trim() === '' || this.selectedStudent.age <= 0) {
      alert("Acción no permitida: campos vacíos.");
      return;
    }

    // Llamar al servicio para actualizar el estudiante
    this.dataService.updateStudent(this.selectedStudent).subscribe(response => {
      this.clearInputFields();
    });
  }

  clearInputFields(): void {
    this.newStudentName = '';
    this.newStudentAge = 18;
    this.selectedStudent = null;
  }

  ngOnInit(): void {
    this.loadStudents();
  }
}
