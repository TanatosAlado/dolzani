import { inject, Injectable } from '@angular/core';
import { collection, Firestore, orderBy, query, limit, startAfter, getDocs, getDoc, doc, updateDoc } from '@angular/fire/firestore';
import { BehaviorSubject, from, map, Observable } from 'rxjs';
import { Cliente } from 'src/app/modules/auth/models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  ultimoCliente: any;
  private firestore = inject(Firestore);
  clientesSubject = new BehaviorSubject<Cliente[]>([]);
  clientes$ = this.clientesSubject.asObservable();

  constructor() { }

  getClientes(limitValue: number = 10, startAfterDoc?: any): Observable<any[]> {
    const clientesRef = collection(this.firestore, 'Clientes');
    
    // Crear la consulta con limit y orderBy
    let q = query(clientesRef, orderBy('nombre'), limit(limitValue));

    // Si se pasa un documento de paginación, añadir el operador startAfter
    if (startAfterDoc) {
      q = query(q, startAfter(startAfterDoc));
    }

    // Ejecutar la consulta y devolver los resultados como un Observable
    return from(getDocs(q)).pipe(
      map(snapshot => {
        const actions = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        if (actions.length > 0) {
          this.ultimoCliente = actions[actions.length - 1];
        }

        return actions;
      })
    );
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
  console.log('Actualizando cliente con ID:', id, 'y datos:', datosParciales);
  const clienteDocRef = doc(this.firestore, 'Clientes', id);
  const datosPlano = JSON.parse(JSON.stringify(datosParciales)); // 🔧 conversión segura
  return updateDoc(clienteDocRef, datosPlano);
}
  
  

}
