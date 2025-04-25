import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/modules/auth/services/auth.service'; // Asegúrate de tener el servicio para manejo de login
import { LoginRequest } from '../../models/loginRequest.model';
import { Cliente } from '../../models/cliente.model';

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
      this.authService.getUsuarioByLogin(ingresante).subscribe((cliente: Cliente) => {
        if (cliente) {
          console.log('Ingreso exitoso');
          this.dialogRef.close(cliente); // Cierra el modal y pasa el cliente logueado (evitamos traer todos)
        } else {
          console.error('Usuario o contraseña incorrectos');
        }
      })

    }
  }

  // Método para abrir el modal de registro
  abrirRegistro() {
    this.authService.openRegistroModal();
  }

  cerrar() {
    this.dialogRef.close();
  }

  alta(){
    const _cliente: Cliente = {
      id: "1",
      usuario: "calessan",
      contrasena: "admin123",
      mail: "cris@hotmail.com",
      telefono: "123456789",
      direccion: "calle falsa 123",
      historial: [],
      estado: true,
      razonSocial: "calesaLand",
      nombre: "Cristian",
      apellido: "Alessandro",
      administrador: true,
    }
    
    
    this.authService.createUsuario(_cliente).then((res) => {
      console.log("Usuario creado con éxito", res);
    }).catch((err) => {
      console.error("Error al crear el usuario", err);
    })

  }
}
