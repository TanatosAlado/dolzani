import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Cliente } from '../../models/cliente.model';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  formRegistroCliente: FormGroup;

  constructor(private fb: FormBuilder,private dialogRef: MatDialogRef<RegistroComponent>,private authService: AuthService){

    this.formRegistroCliente = this.fb.group({
      usuario: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('^[a-zA-Z0-9]+$') // solo letras y números, sin espacios ni símbolos
        ]
      ],
      contrasena: ['', Validators.required],
      nombre: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$') // solo letras y espacios (opcional)
        ]
      ],
      apellido: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')
        ]
      ],
      mail: [
        '',
        [
          Validators.required,
          Validators.email // valida formato de email
        ]
      ],
      telefono: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$') // solo números
        ]
      ],
      direccion: ['', Validators.required],
      historial: [''],
      estado: [''],
      razonSocial: ['', Validators.required],
    });
    
  }

  //FUNCION PARA CERRA EL MODAL
  cerrar() {
    this.dialogRef.close();
  }

  //FUNCION PARA CREAR EL CLIENTE
  crearCliente() {
    const formValues = this.formRegistroCliente.value;
  
    this.authService.getClienteById({ mail: formValues.mail }).subscribe((clienteEncontrado) => {
      if (clienteEncontrado) {
        console.log('Cliente ya existe:', clienteEncontrado);
      } else {
        const _cliente: Cliente = {
          id: "1",
          usuario: formValues.usuario,
          contrasena: formValues.contrasena,
          mail: formValues.mail,
          telefono: formValues.telefono,
          direccion: formValues.direccion,
          historial: [],
          carrito: [],
          estado: true,
          razonSocial: formValues.razonSocial,
          nombre: formValues.nombre,
          apellido: formValues.apellido,
          administrador: false,
        };
        
        this.authService.createCliente(_cliente).then((docref) => {
          this.actualizarIDCliente(docref.id, _cliente);
          console.log('Usuario creado con éxito', docref);
        }).catch((err) => {
          console.error('Error al crear el usuario', err);
        });
      }
    }, (error) => {
      console.error('Error buscando cliente', error);
    });
  }
  
  
  

   //FUNCION PARA TRAER AL ARREGLO EL ID TOMADO DE FIREBASE PARA EL USUARIO
   actualizarIDCliente(idOriginal: string, unRegistrado: Cliente) {
    let actualizado: any = unRegistrado
    actualizado.id = idOriginal
    this.authService.updateUsuario(idOriginal, actualizado)
  }
  }
