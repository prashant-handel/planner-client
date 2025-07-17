import { Component, ViewChild, ElementRef, AfterViewChecked, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeService } from '../../services/home.service';
import { HomeGeneralConstants } from '../../constants/home-general.constants';
import { debounceTime } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-dialog',
  standalone: false,
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.scss'
})
export class TaskDialogComponent implements AfterViewChecked, OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef<HTMLInputElement> | undefined;
  
  progressList = HomeGeneralConstants.progressList;
  priorityList = HomeGeneralConstants.priorityList;

  notCompletedImg: string = 'assets/images/todo-not-completed.svg';
  inProgressImg: string = 'assets/images/todo-in-progress.svg';
  completedImg: string = 'assets/images/todo-completed.svg';

  taskForm:FormGroup;

  showNameInput: boolean = false;
  currentDate: Date = new Date();
  selectedUsers: any[] = [];
  allUsers: any[] = [];
  filteredUsers: any[] = [];
  userSearchControl = new FormControl();
  isEdit: boolean = false;


  constructor(
    private readonly dialogRef: MatDialogRef<TaskDialogComponent>,
    private readonly fb: FormBuilder,
    private readonly homeService: HomeService,
    private readonly snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.taskForm = this.fb.group({
      progress: ['', Validators.required],
      priority: ['', Validators.required],
      name: ['', Validators.required],
      dueDate: ['', Validators.required],
      startDate: [null],
      description: [null],
      assignees: [null]
    });

    if(this.data?.task) {
      this.taskForm.patchValue(this.data?.task);
      this.selectedUsers = this.data?.task?.assignees ?? [];
      this.isEdit = true;
    }
  }

  ngOnInit() {
    this.userSearchControl?.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {

        if (!value) {
          this.filteredUsers = [];
          return;
        }

        this.homeService.getUserList(value).subscribe((res: any) => {
          this.allUsers = res?.users ?? [];
          const selectedIds = this.selectedUsers.map(u => u._id);
          this.filteredUsers = this.allUsers.filter(u => !selectedIds.includes(u._id));
        });
      });
  }

  closeDialog(result: boolean = false) {
    this.dialogRef.close(result);
  }

  onSubmit() {
    if(this.isEdit) {
      this.updateTask();
      return;
    }

    let payload = this.taskForm?.value;

    payload.assignees = this.selectedUsers.map(u => u._id);

    this.homeService.createTask(payload).subscribe({
      next: (res: any) => {
        if(res?.status) {
          this.closeDialog(true);
          this.snackBar.open('Task created successfully', 'Close', {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }
      },
      error: (error: any) => {
        this.snackBar.open(error?.message ?? 'Error creating task', 'Close', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
     }
    )
  }

  updateTask() {
    const payload = this.taskForm?.value;
    payload.assignees = this.selectedUsers.map(u => u._id);
    payload._id = this.data?.task?._id;
    payload.assigner = this.data?.task?.assigner;

    this.homeService.updateTask(payload).subscribe({
      next: (res: any) => {
        if(res?.status) {
          this.closeDialog(true);
          this.snackBar.open('Task updated successfully', 'Close', {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }
      },
      error: (error: any) => {
        this.snackBar.open(error?.message ?? 'Error updating task', 'Close', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    })
  }

  ngAfterViewChecked() {
    if (this.showNameInput && this.nameInputRef) {
      setTimeout(() => {
        this.nameInputRef?.nativeElement.focus();
      }, 0);
    }
  }

  displayUserFn(user: any): string {
    return user ? `${user.firstName} ${user.lastName}` : '';
  }
  
  selectUser(user: any) {
    if (!this.selectedUsers.find(u => u._id === user._id)) {
      this.selectedUsers.push(user);
    }
    this.userSearchControl.setValue('');
  }
  
  removeUser(user: any) {
    this.selectedUsers = this.selectedUsers.filter(u => u._id !== user._id);
  }
}