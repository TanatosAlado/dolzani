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

// const materialModules = [
//   MatGridListModule,
//   MatCardModule,
//   MatIconModule,
//   MatButtonModule
// ];

@NgModule({
  declarations: [NavbarComponent, FooterComponent],
  imports: [CommonModule, MatDialogModule, RouterModule, MatGridListModule, MatCardModule, MatIconModule, MatButtonModule],
  exports: [NavbarComponent, FooterComponent, MatDialogModule, RouterModule, MatGridListModule, MatCardModule, MatIconModule, MatButtonModule],
})
export class SharedModule {}
