import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cliente-editar',
  templateUrl: './cliente-editar.component.html',
  styleUrls: ['./cliente-editar.component.css']
})
export class ClienteEditarComponent {
  formCliente: FormGroup;

constructor(    private fb: FormBuilder,
  private dialogRef: MatDialogRef<ClienteEditarComponent>,
  @Inject(MAT_DIALOG_DATA) public cliente: any){
    
    this.formCliente = this.fb.group({
      nombre: [cliente.nombre, Validators.required],
      apellido: [cliente.apellido, Validators.required],
      razonSocial: [cliente.razonSocial],
      direccion: [cliente.direccion],
      telefono: [cliente.telefono],
      mail: [cliente.mail, [Validators.required, Validators.email]],
      usuario: [cliente.usuario],
      estado: [cliente.estado]
    });

  }

  guardar(): void {
    if (this.formCliente.valid) {
      const clienteActualizado = this.formCliente.value;
      // Envía datos al componente padre (o servicio)
      this.dialogRef.close(clienteActualizado);
    }
  }

}
