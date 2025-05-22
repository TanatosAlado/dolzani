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
import { CarritoComponent } from './components/carrito/carrito.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [NavbarComponent, FooterComponent, ConfirmDialogComponent, CarritoComponent, CheckoutComponent],
  imports: [CommonModule, MatDialogModule, RouterModule, MatGridListModule, MatCardModule, MatIconModule, MatButtonModule, MatTableModule, MatPaginatorModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSlideToggleModule, MatDividerModule, MatSnackBarModule, MatTooltipModule, MatBadgeModule, MatAutocompleteModule, MatProgressSpinnerModule],
  exports: [NavbarComponent, FooterComponent, MatDialogModule, RouterModule, MatGridListModule, MatCardModule, MatIconModule, MatButtonModule, MatTableModule, MatPaginatorModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSlideToggleModule, MatDividerModule, MatSnackBarModule, MatTooltipModule, MatBadgeModule, MatAutocompleteModule, MatProgressSpinnerModule, CheckoutComponent],
})
export class SharedModule {}
