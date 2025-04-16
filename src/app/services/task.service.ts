import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/Tasks`;

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<{ data: Task[] }> {
    return this.http.get<{ data: Task[] }>(`${this.apiUrl}/all`);
  }

  getTasksByStatus(status: string): Observable<{ data: Task[] }> {
    return this.http.get<{ data: Task[] }>(`${this.apiUrl}?status=${status}`);
  }

  addTask(task: Partial<Task>): Observable<any> {
    return this.http.post(this.apiUrl, task);
  }

  updateTask(id: string, task: Partial<Task>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, task);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }  
}
