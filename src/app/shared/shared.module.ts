import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'; 
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';




// const materialModules = [
//   MatGridListModule,
//   MatCardModule,
//   MatIconModule,
//   MatButtonModule
// ];

@NgModule({
  declarations: [NavbarComponent, FooterComponent, ConfirmDialogComponent],
  imports: [CommonModule, MatDialogModule, RouterModule, MatGridListModule, MatCardModule, MatIconModule, MatButtonModule, MatTableModule, MatPaginatorModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSlideToggleModule],
  exports: [NavbarComponent, FooterComponent, MatDialogModule, RouterModule, MatGridListModule, MatCardModule, MatIconModule, MatButtonModule, MatTableModule, MatPaginatorModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSlideToggleModule],
})
export class SharedModule {}
