import { Component, OnInit } from '@angular/core';
import { DataService } from '../../app.service';
import { StudentService } from '../../student.service';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-students_by_projects',
    templateUrl: './students-by-projects.component.html',
    styleUrls: ['./students-by-projects.component.css']
})

export class StudentsByProjectsComponent implements OnInit {
    students: any[] = [];
    projects: any[] = [];
    selectedStudentId: any = '';
    selectedProjectId: any = '';
    existingRelations: any[] = [];

    constructor(
        private dataService: DataService,
        private studentService: StudentService
    ) {}

    ngOnInit() {
        forkJoin({
            students: this.dataService.getStudents(),
            projects: this.dataService.getProjects()
        }).subscribe(result => {
            this.students = result.students;
            this.projects = result.projects;
            this.loadExistingRelations();
        });
    }

    private loadExistingRelations(): void {
        this.studentService.getAllProjectRelations().subscribe(data => {
            this.existingRelations = data.map(relation => {
                const student = this.students.find(s => s.id === relation.studentId);
                const project = this.projects.find(p => p.id === relation.projectId);

                return {
                    studentName: student ? student.name : 'Desconocido',
                    projectTitle: project ? project.title : 'Desconocido',
                };
            });
        });
    }

    registerStudentToProject(): void {
        if (this.selectedStudentId && this.selectedProjectId) {
            this.studentService.getStudentInProject(
                this.selectedStudentId,
                this.selectedProjectId
            ).subscribe(existingRelation => {
                if (existingRelation.length === 0) {
                    const newRelation = {
                        studentId: this.selectedStudentId,
                        projectId: this.selectedProjectId
                    };

                    this.studentService.addStudentToProject(newRelation).subscribe(() => {
                        console.log('Relación registrada con éxito.');
                        this.loadExistingRelations();
                    });
                } else {
                    alert('La relación ya existe.');
                }
            });
        } else {
            alert('Por favor, selecciona un estudiante y un proyecto.');
        }
    }
}
