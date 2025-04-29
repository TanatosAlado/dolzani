import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference } from '@angular/fire/compat/firestore';
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  ultimoCliente: any;

  constructor(private firestore: AngularFirestore) { }

  getClientes(limit: number = 10, startAfterDoc?: any): Observable<any[]> {
    return this.firestore.collection('Clientes', ref => {
      let query = ref.orderBy('nombre').limit(limit);
      if (startAfterDoc) {
        query = query.startAfter(startAfterDoc);
      }
      return query;
    }).snapshotChanges().pipe(
      map(actions => {
        if (actions.length > 0) {
          this.ultimoCliente = actions[actions.length - 1].payload.doc;
        }
        return actions.map(a => {
          const data = a.payload.doc.data() as Record<string, any>;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getClientesCount(): Observable<number> {
    return this.firestore.collection('Clientes').snapshotChanges().pipe(
      map(actions => actions.length)
    );
  }

}
