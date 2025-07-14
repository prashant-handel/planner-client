import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RemoveUnderscorePipe } from './pipes/remove-underscore.pipe';
import { SharedModule } from '../shared/shared.module';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [
    HomePageComponent,
    RemoveUnderscorePipe,
    TaskDialogComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatSnackBarModule,
    FlexLayoutModule,
    MatButtonToggleModule,
    SharedModule,
    MatIconModule,
    MatTooltipModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatAutocompleteModule,
    MatChipsModule
  ]
})

export class HomeModule { }
