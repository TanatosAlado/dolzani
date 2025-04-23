import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  usuarioLogueado: boolean = false;

  constructor(private authService: AuthService) {}

  // Métodos para abrir los modales
  openIngreso() {
    this.authService.openIngresoModal();
  }

  openRegistro() {
    this.authService.openRegistroModal();
  }
}
