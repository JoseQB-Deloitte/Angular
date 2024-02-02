import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getStudentInCourse(studentId: string, courseId: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/studentsByCourses?studentId=${studentId}&courseId=${courseId}`
    );
  }

  getStudentInProject(studentId: string, projectId: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/studentsByProjects?studentId=${studentId}&projectId=${projectId}`
    );
  }

  getAllCourseRelations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/studentsByCourses`);
  }

  getAllProjectRelations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/studentsByProjects`);
  }

  addStudentToCourse(relation: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/studentsByCourses`, relation);
  }

  addStudentToProject(relation: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/studentsByProjects`, relation);
  }

}
