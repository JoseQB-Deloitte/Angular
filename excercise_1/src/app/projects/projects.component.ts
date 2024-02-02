import { Component } from '@angular/core';
import { DataService } from '../app.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  projectsList: any[] = [];
  newProjectTitle: string = '';
  newProjectDescription: string = '';
  selectedProject: any = null;

  constructor(private dataService: DataService) {}

  registerProject(): void {
    if (this.newProjectTitle.trim() === '' || this.newProjectDescription.trim() === '') {
      console.log("Acción no permitida: campos vacíos.");
      return;
    }

    const newProject = {
      "id": (this.projectsList.length + 1).toString(),
      "title": this.newProjectTitle,
      "description": this.newProjectDescription
    };

    // Llamar al servicio para registrar el proyecto
    this.dataService.addProject(newProject).subscribe(response => {
      this.loadProjects();
      this.clearInputFields();
    });
  }

  // Llamar al servicio para cargar los proyectos
  loadProjects(): void {
    this.dataService.getProjects().subscribe(data => {
      this.projectsList = data;
    });
  }

  loadProjectDetails(project: any): void {
    this.selectedProject = { ...project };
  }

  updateProject(): void {
    if (this.selectedProject.title.trim() === '' || this.selectedProject.description.trim() === '') {
      console.log("Acción no permitida: campos vacíos.");
      return;
    }
  }

  clearInputFields(): void {
    this.newProjectTitle = '';
    this.newProjectDescription = '';
    this.selectedProject = null;
  }

  ngOnInit(): void {
    this.loadProjects();
  }
}
