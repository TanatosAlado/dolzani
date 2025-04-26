import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IngresoComponent } from '../views/ingreso/ingreso.component';
import { RegistroComponent } from '../views/registro/registro.component';
import { LoginRequest } from '../models/loginRequest.model';
import { map, Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private dialog: MatDialog, private firestore: AngularFirestore) {}

  // Método para abrir el modal de ingreso
  openIngresoModal() {
    const dialogRef = this.dialog.open(IngresoComponent, {
      width: '400px', // Ancho del modal
      disableClose: true, 
      data: {}, // Puedes pasar datos si lo necesitas
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('El modal de ingreso se cerró');
    });
  }

  // Método para abrir el modal de registro
  openRegistroModal() {
    const dialogRef = this.dialog.open(RegistroComponent, {
      width: '400px',
      data: {}, 
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('El modal de registro se cerró');
    });
  }

  login(ingresante: LoginRequest): Observable<Cliente> {
    let respuesta: Cliente = null

    this.getClientes().subscribe((clientes) => {
      clientes.forEach((usuario) => {
        const data = usuario.payload.doc.data() as Cliente;
        const id = usuario.payload.doc.id;
        if (data.usuario === ingresante.user && data.contrasena === ingresante.password) {
          respuesta = new Cliente(
            id,
            data.usuario,
            data.contrasena,
            data.mail,
            data.telefono,
            data.direccion,
            data.historial,
            data.estado,
            data.razonSocial,
            data.nombre,
            data.apellido,
            data.administrador
          );
        }
      });
    });

    return of(respuesta);    
  }

  //SERVICE PARA TRAER CLIENTE LOGUEADO
  getClienteByLogin(ingresante: LoginRequest): Observable<Cliente> {
    return this.firestore.collection('Clientes', ref => ref.where('usuario', '==', ingresante.user).where('contrasena', '==', ingresante.password)).snapshotChanges().pipe(
      map(actions => {
        const clientes = actions.map(a => {
          const data = a.payload.doc.data() as Cliente;
          const id = a.payload.doc.id;
          return new Cliente(
            id,
            data.usuario,
            data.contrasena,
            data.mail,
            data.telefono,
            data.direccion,
            data.historial,
            data.estado,
            data.razonSocial,
            data.nombre,
            data.apellido,
            data.administrador
          );
        });
        return clientes.length > 0 ? clientes[0] : null;
      })
    );
  }

  // SERVICE PARA TRAER CLIENTE POR ID
  getClienteById(cliente: any): Observable<Cliente | null> {
    return this.firestore.collection('Clientes', ref => ref.where('mail', '==', cliente.mail))
      .get()
      .pipe(
        map(snapshot => {
          if (snapshot.empty) {
            return null;
          }
          const doc = snapshot.docs[0];
          const data = doc.data() as Cliente;
          return new Cliente(
            doc.id,
            data.usuario,
            data.contrasena,
            data.mail,
            data.telefono,
            data.direccion,
            data.historial,
            data.estado,
            data.razonSocial,
            data.nombre,
            data.apellido,
            data.administrador
          );
        })
      );
  }
  
  


  //SERVICE PARA TRAER CLIENTES
  getClientes(): Observable<any> {
    return this.firestore.collection('Clientes').snapshotChanges()
  }

//SERVICE PARA CREAR CLIENTES
  createCliente(usuario: any): Promise<any>{
    return this.firestore.collection('Clientes').add(usuario)
  }
  //SERVICE PARA ACTUALIZAR CLIENTES
  updateUsuario(id: string, cliente: any): Promise<any> {
    return this.firestore.collection('Clientes').doc(id).update(cliente);
  }
}
