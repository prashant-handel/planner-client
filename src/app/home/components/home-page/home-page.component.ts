import { Component } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from '../../../shared/models/task.model';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router'; 
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

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
  isListView: boolean = true;
  tableOptions = {
    headers: [
      { name: '', key: 'checkbox', width: 5 },
      { name: 'Task Name', key: 'taskName', width: 25 },
      { name: 'Due Date', key: 'dueDate', width: 20 },
      { name: 'Priority', key: 'priority', width: 25 },
      { name: 'Progress', key: 'progress', width: 25 },
      { name: 'Assigned To', key: 'assignees', width: 20 },
      { name: '', key: 'actions', width: 5 }
    ]
  };
  notCompletedImg: string = 'assets/images/todo-not-completed.svg';
  inProgressImg: string = 'assets/images/todo-in-progress.svg';
  completedImg: string = 'assets/images/todo-completed.svg';
  avatarConfig: any = { height: '1rem', width: '1rem', name: 'A', color: '#FF6B6B' }

  constructor(
    private readonly homeService: HomeService,
    private readonly snackBar: MatSnackBar,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly dialog: MatDialog
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
      error: (_err) => {
        this.snackBar.open('Error fetching tasks', 'Close', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    })
  }

  completeTask(task: Task) {
    if(task?.progress === 'completed') {
      return;
    }
    const payload: Task = { ...task, progress: 'completed' };
    this.homeService.updateTask(payload).subscribe({
      next: (res: any) => {
        if(res?.status) {
          this.snackBar.open('Task completed successfully', 'Close', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        this.getAllTasks();
        }
        else {
          this.snackBar.open(res?.message ?? 'Error completing task', 'Close', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        }
      },
      error: (err: any) => {
        this.snackBar.open(err?.message ?? 'Error completing task', 'Close', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    })
  }

  getAvatarConfig(user:any) {
    return { ...this.avatarConfig, color: user?.color, name: user?.firstName };
  }

  logout() {
    localStorage.clear();
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  openTaskDialog(task?: Task) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '50vw',
      enterAnimationDuration: 300,
      exitAnimationDuration: 300,
      disableClose: true,
      data: { task: task ?? null }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if(result) {
        this.getAllTasks();
      }
    });
  }
}
