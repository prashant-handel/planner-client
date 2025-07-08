import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Task } from '../../shared/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private taskBaseUrl = `${environment.baseUrl}/task`;
  private userBaseUrl = `${environment.baseUrl}/user`;

  constructor(
    private readonly http: HttpClient
  ) {}

  getAllTasks() {
    return this.http.get(`${this.taskBaseUrl}/allTasks`, { withCredentials: true });
  }

  updateTask(task: Task) {
    return this.http.patch(`${this.taskBaseUrl}/update`, task, { withCredentials: true });
  }

  createTask(task: Task) {
    return this.http.post(`${this.taskBaseUrl}/create`, task, { withCredentials: true });
  }

  getUserList(search: string) {
    return this.http.get(`${this.userBaseUrl}/searchExpectSelf?query=${search}`, { withCredentials: true });
  }

  getAllUsers(search: string) {
    return this.http.get(`${this.userBaseUrl}/allUsers`, { withCredentials: true });
  }
}
