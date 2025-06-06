import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Cliente } from '../../models/cliente.model';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  formRegistroCliente: FormGroup;

  constructor(private fb: FormBuilder,private dialogRef: MatDialogRef<RegistroComponent>,private authService: AuthService, private snackBar: MatSnackBar){

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
      dni: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{7,8}$') // ejemplo: 7 u 8 dígitos
        ]
      ],
      cuit: [
        '',
        [
          Validators.pattern('^[0-9]{11}$') // ejemplo: CUIT con 11 dígitos
        ]
      ]
    });
    
  }

  //FUNCION PARA CERRA EL MODAL
  cerrar() {
    this.dialogRef.close();
  }

  //FUNCION PARA CREAR EL CLIENTE
  crearCliente() {
    const formValues = this.formRegistroCliente.value;

    this.snackBar.open('Creando cliente...', '', {
      duration: 2000,
    });
  
    this.authService.getClienteById({ mail: formValues.mail }).subscribe((clienteEncontrado) => {
      if (clienteEncontrado) {
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
          dni: formValues.dni,
          cuit: formValues.cuit || '', 
        };
        
        this.authService.createCliente(_cliente).then((docref) => {
          this.actualizarIDCliente(docref.id, _cliente);
          this.snackBar.open('Cliente creado con éxito', 'Cerrar', {
            duration: 3000,
          });
          this.dialogRef.close(true);
        }).catch((err) => {
          this.snackBar.open('Error al crear el cliente', 'Cerrar', {
            duration: 3000,
          });
        });
      }
    }, (error) => {
      this.snackBar.open('Error al buscar el cliente', 'Cerrar', {
        duration: 3000,
      });
    });
  }
  
  
  

   //FUNCION PARA TRAER AL ARREGLO EL ID TOMADO DE FIREBASE PARA EL USUARIO
   actualizarIDCliente(idOriginal: string, unRegistrado: Cliente) {
    let actualizado: any = unRegistrado
    actualizado.id = idOriginal
    this.authService.updateUsuario(idOriginal, actualizado)
  }
  }
