import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IngresoComponent } from '../views/ingreso/ingreso.component';
import { RegistroComponent } from '../views/registro/registro.component';
import { LoginRequest } from '../models/loginRequest.model';
import { map, Observable, of, from } from 'rxjs';
import { Firestore, collection, query, where, getDocs, addDoc, doc, updateDoc } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private firestore = inject(Firestore);

  constructor(private dialog: MatDialog) {}

  openIngresoModal() {
    const dialogRef = this.dialog.open(IngresoComponent, {
      width: '400px',
      disableClose: true, 
      data: {}, 
    });

    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  openRegistroModal(): Observable<any> {
    const dialogRef = this.dialog.open(RegistroComponent, {
      width: '90vw',
      maxWidth: '950px',
      data: {},
    });
  
    return dialogRef.afterClosed(); 
  }

  login(ingresante: LoginRequest): Observable<Cliente> {
    return this.getClienteByLogin(ingresante);
  }

  getClienteByLogin(ingresante: LoginRequest): Observable<Cliente> {
    const clientesRef = collection(this.firestore, 'Clientes');
    const q = query(clientesRef, where('usuario', '==', ingresante.user), where('contrasena', '==', ingresante.password));

    return from(getDocs(q)).pipe(
      map(snapshot => {
        const clientes = snapshot.docs.map(doc => {
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
            data.administrador,
            data.carrito,
            data.dni,
            data.cuit
          );
        });
        return clientes.length > 0 ? clientes[0] : null;
      })
    );
  }

  getClienteById(cliente: any): Observable<Cliente | null> {
    const clientesRef = collection(this.firestore, 'Clientes');
    const q = query(clientesRef, where('mail', '==', cliente.mail));

    return from(getDocs(q)).pipe(
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

  getClientes(): Observable<any> {
    const clientesRef = collection(this.firestore, 'Clientes');
    return from(getDocs(clientesRef)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })))
    );
  }

  createCliente(usuario: any): Promise<any> {
    const ref = collection(this.firestore, 'Clientes');
    return addDoc(ref, usuario);
  }

  updateUsuario(id: string, cliente: any): Promise<any> {
    const productoRef = doc(this.firestore, `Clientes/${id}`);
    return updateDoc(productoRef, { ...cliente });
  }
}
