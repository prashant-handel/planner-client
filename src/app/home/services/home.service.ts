import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

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
}
