import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Task } from '../../shared/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private baseUrl = `${environment.baseUrl}/task`;

  constructor(
    private readonly http: HttpClient
  ) {}

  getAllTasks() {
    return this.http.get(`${this.baseUrl}/allTasks`);
  }

  updateTask(task: Task) {
    return this.http.patch(`${this.baseUrl}/update`, task);
  }
}
