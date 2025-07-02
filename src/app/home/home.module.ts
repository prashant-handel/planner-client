import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RemoveUnderscorePipe } from './components/home-page/pipes/remove-underscore.pipe';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HomePageComponent,
    RemoveUnderscorePipe
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatSnackBarModule,
    FlexLayoutModule,
    MatButtonToggleModule,
    SharedModule
  ]
})

export class HomeModule { }
