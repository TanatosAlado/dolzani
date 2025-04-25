import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  formRegistroCliente: FormGroup;

  constructor(private fb: FormBuilder,private dialogRef: MatDialogRef<RegistroComponent>){

    this.formRegistroCliente = this.fb.group({
      usuario: ['', Validators.required],
      contrasenia: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      mail: ['', [Validators.required]],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      historial: [''],
      estado: ['', Validators.required],
      razonSocial: ['', [Validators.required]],
    });
  }

  //FUNCION PARA CERRA EL MODAL
  cerrar() {
    this.dialogRef.close();
  }

  //FUNCION PARA CREAR EL CLIENTE
  crearCliente(){

  }
}
