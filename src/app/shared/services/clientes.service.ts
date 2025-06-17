import { inject, Injectable } from '@angular/core';
import { collection, Firestore, orderBy, query, limit, startAfter, getDocs, getDoc, doc, updateDoc, collectionData } from '@angular/fire/firestore';
import { BehaviorSubject, from, map, Observable, shareReplay, tap } from 'rxjs';
import { Cliente } from 'src/app/modules/auth/models/cliente.model';
import { CollectionReference, deleteDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  ultimoCliente: any;
  private firestore = inject(Firestore);
  clientesSubject = new BehaviorSubject<Cliente[]>([]);
  clientes$ = this.clientesSubject.asObservable();
  private cliente$: Observable<Cliente[]> | null = null;

  constructor() { }

  getClientes(): Observable<Cliente[]> {
    if (!this.cliente$) {
      const ref = collection(this.firestore, 'Clientes') as CollectionReference<Cliente>;
      this.cliente$ = collectionData(ref, { idField: 'id' }).pipe(
        tap(clientes => console.log('')),
        shareReplay(1)
      );
    } else {
    }
    return this.cliente$;
  }

  getClientesCount(): Observable<number> {
    const clientesRef = collection(this.firestore, 'Clientes');
    // Crear la consulta para contar los documentos
    const q = query(clientesRef);

    // Convertir la Promesa de `getDocs` en un Observable usando `from`
    return from(getDocs(q)).pipe(
      map(snapshot => snapshot.size)
    );
  }


  getClienteById(id: string): Observable<Cliente> {
    const clientesRef = collection(this.firestore, 'Clientes');
    const clienteDocRef = doc(clientesRef, id);
    return from(getDoc(clienteDocRef)).pipe(
      map(snapshot => {
        const data = snapshot.data();
        if (!data) {
          throw new Error('Cliente no encontrado');
        }

        return {
          id: snapshot.id,
          ...data
        } as Cliente;
      })
    );
  }


  actualizarCliente(id: string, datosParciales: Partial<Cliente>): Promise<void> {
    const clienteDocRef = doc(this.firestore, 'Clientes', id);
    const datosPlano = JSON.parse(JSON.stringify(datosParciales)); // 🔧 conversión segura
    return updateDoc(clienteDocRef, datosPlano);
  }


  eliminarCliente(id: string): Promise<void> {
    const ref = doc(this.firestore, 'Clientes', id);
    return deleteDoc(ref);
  }




}
