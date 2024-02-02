import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/students`);
  }
  
  addStudent(student: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/students`, student);
  }

  updateStudent(student: any): Observable<any> {
    const url = `${this.apiUrl}/students/${student.id}`;
    return this.http.put(url, student);
  }

  getCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/courses`);
  }

  addCourse(course: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/courses`, course);
  }

  updateCourse(course: any): Observable<any> {
    const url = `${this.apiUrl}/courses/${course.id}`;
    return this.http.put(url, course);
  }

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/projects`);
  }

  addProject(project: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/projects`, project);
  }

  updateProject(project: any): Observable<any> {
    const url = `${this.apiUrl}/projects/${project.id}`;
    return this.http.put(url, project);
  }
}

