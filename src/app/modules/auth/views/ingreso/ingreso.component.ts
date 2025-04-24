import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/modules/auth/services/auth.service'; // Asegúrate de tener el servicio para manejo de login
import { LoginRequest } from '../../models/loginRequest.model';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css'],
})
export class IngresoComponent {
  usuario: string = '';
  contrasena: string = '';

  constructor(private authService: AuthService, private dialogRef: MatDialogRef<IngresoComponent>) {}

  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.usuario && this.contrasena) {
      const ingresante: LoginRequest = new LoginRequest(this.usuario, this.contrasena);
    
      this.authService.login(ingresante);
    }
  }

  // Método para abrir el modal de registro
  abrirRegistro() {
    this.authService.openRegistroModal();
  }

  cerrar() {
    this.dialogRef.close();
  }
}
