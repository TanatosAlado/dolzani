import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { IngresoComponent } from 'src/app/modules/auth/views/ingreso/ingreso.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  usuarioLogueado: boolean = false;

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  // Métodos para abrir los modales
  openIngreso() {
    //this.authService.openIngresoModal();
    this.dialog.open(IngresoComponent, {
      width: '400px',
      disableClose: true,
      backdropClass: 'custom-backdrop',
      panelClass: 'custom-dialog'
    });
  }

  openRegistro() {
    this.authService.openRegistroModal();
  }
}
