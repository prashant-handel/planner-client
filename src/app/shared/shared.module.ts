import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './components/avatar/avatar.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    AvatarComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    AvatarComponent,
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
