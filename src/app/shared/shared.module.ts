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
import { FormsModule } from '@angular/forms';


// const materialModules = [
//   MatGridListModule,
//   MatCardModule,
//   MatIconModule,
//   MatButtonModule
// ];

@NgModule({
  declarations: [NavbarComponent, FooterComponent],
  imports: [CommonModule, MatDialogModule, RouterModule, MatGridListModule, MatCardModule, MatIconModule, MatButtonModule, MatTableModule, MatPaginatorModule,FormsModule],
  exports: [NavbarComponent, FooterComponent, MatDialogModule, RouterModule, MatGridListModule, MatCardModule, MatIconModule, MatButtonModule, MatTableModule, MatPaginatorModule],
})
export class SharedModule {}
