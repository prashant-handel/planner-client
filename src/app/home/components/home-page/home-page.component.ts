import { Component } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  host: {
    class: 'home-page'
  }
})
export class HomePageComponent {
  taskList: any[] = [];

  constructor(
    private readonly homeService: HomeService,
    private readonly snackBar: MatSnackBar
  ) {
    this.getAllTasks();
  }

  getAllTasks() {
    this.homeService.getAllTasks().subscribe({
      next: (res: any) => {
        if(res?.tasks?.length) {
          this.taskList = res?.tasks;
        }
      },
      error: (err) => {
        this.snackBar.open('Error fetching tasks', 'Close', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    })
  }
}
