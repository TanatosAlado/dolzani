import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/modules/auth/services/auth.service'; // Asegúrate de tener el servicio para manejo de login
import { LoginRequest } from '../../models/loginRequest.model';
import { Cliente } from '../../models/cliente.model';
import { CambioPassComponent } from '../cambio-pass/cambio-pass.component';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css'],
})
export class IngresoComponent {
  usuario: string = '';
  contrasena: string = '';
  loginFail: boolean = false; // Variable para manejar el error de login
  readonly CONTRASENA_DEFAULT: string = 'Dolzani123'; // Contraseña por defecto para el cliente

  constructor(private authService: AuthService, private dialogRef: MatDialogRef<IngresoComponent>, private dialog: MatDialog) {}

  //value = 'Clear me';

  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.usuario && this.contrasena) {
      const ingresante: LoginRequest = new LoginRequest(this.usuario, this.contrasena);
      this.authService.getClienteByLogin(ingresante).subscribe((cliente: Cliente) => {
        if (cliente) {
          if (this.contrasena === this.CONTRASENA_DEFAULT) {
            // Abrir modal para forzar cambio de contraseña
            this.dialog.open(CambioPassComponent, {
              data: { cliente },
              disableClose: true // evita que lo cierre sin cambiarla
            });
          } else {
            this.dialogRef.close(cliente); // Login exitoso normal
          }
        } else {
          this.loginFail = true;
        }
      });
    }
  }

  // Método para abrir el modal de registro
  abrirRegistro() {
    this.cerrar()
    this.authService.openRegistroModal();
  }

  cerrar() {
    this.dialogRef.close();
  }

  resetLoginFail(): void {
    this.loginFail = false;
  }
}
