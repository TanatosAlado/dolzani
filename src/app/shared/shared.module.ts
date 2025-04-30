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




@NgModule({
  declarations: [NavbarComponent, FooterComponent],
  imports: [CommonModule, MatDialogModule, RouterModule, MatGridListModule, MatCardModule, MatIconModule, MatButtonModule, MatTableModule, MatPaginatorModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule],
  exports: [NavbarComponent, FooterComponent, MatDialogModule, RouterModule, MatGridListModule, MatCardModule, MatIconModule, MatButtonModule, MatTableModule, MatPaginatorModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule],
})
export class SharedModule {}
