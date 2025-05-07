import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { Cliente } from '../../models/cliente.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cambio-pass',
  templateUrl: './cambio-pass.component.html',
  styleUrls: ['./cambio-pass.component.css']
})
export class CambioPassComponent {

  readonly CONTRASENA_DEFAULT: string = 'Dolzani123'; // Contraseña por defecto para el cliente

  contrasenaActual: string = '';
  contrasenaNueva: string = '';
  contrasenaRep: string = '';
  loginFail; boolean = false; // Variable para manejar el error de claves

  constructor(@Inject(MAT_DIALOG_DATA) public data: { cliente: Cliente }, private dialogRef: MatDialogRef<CambioPassComponent>, private clientesService: ClientesService, private snackBar: MatSnackBar) { }

  cerrar() {
    this.dialogRef.close();
  }

    onSubmit() {
      if ((this.contrasenaActual == this.CONTRASENA_DEFAULT) && (this.contrasenaNueva == this.contrasenaRep)) {
        this.clientesService.actualizarCliente(this.data.cliente.id, { contrasena: this.contrasenaNueva })
        .then(() => {
          this.snackBar.open('Cambio realizado con éxito', 'Cerrar', {
            duration: 3000,
          });
        })
        .catch(error => {
          this.snackBar.open('Error al realizar el cambio', 'Cerrar', {
            duration: 3000,
          });
        });
        this.dialogRef.close();
      }
      else {
        this.loginFail = true;
      }
    }

    resetLoginFail(): void {
      this.loginFail = false;
    }


}
