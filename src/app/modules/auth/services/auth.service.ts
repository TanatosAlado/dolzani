import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IngresoComponent } from '../views/ingreso/ingreso.component';
import { RegistroComponent } from '../views/registro/registro.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private dialog: MatDialog) {}

  // Método para abrir el modal de ingreso
  openIngresoModal() {
    const dialogRef = this.dialog.open(IngresoComponent, {
      width: '400px', // Ancho del modal
      data: {}, // Puedes pasar datos si lo necesitas
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('El modal de ingreso se cerró');
    });
  }

  // Método para abrir el modal de registro
  openRegistroModal() {
    const dialogRef = this.dialog.open(RegistroComponent, {
      width: '400px', // Ancho del modal
      data: {}, // Puedes pasar datos si lo necesitas
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('El modal de registro se cerró');
    });
  }

  login(usuario: string, contraseña: string) {
    // Aquí puedes agregar la lógica para autenticar al usuario
    console.log('Autenticando usuario:', usuario);
    // Aquí podrías hacer una llamada HTTP para autenticar al usuario
  }
}
