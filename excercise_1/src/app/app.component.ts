import { Component, OnInit } from '@angular/core';
import { DataService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentTab: string = 'students';
  students: any[] = [];
  courses: any[] = [];
  projects: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadData();
  }

  showTab(tab: string): void {
    this.currentTab = tab;
  }

  private loadData(): void {
    this.dataService.getStudents().subscribe(data => {
      this.students = data;
    });

    this.dataService.getCourses().subscribe(data => {
      this.courses = data;
    });

    this.dataService.getProjects().subscribe(data => {
      this.projects = data;
    });
  }
}


