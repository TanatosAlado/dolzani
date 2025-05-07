import { Injectable } from '@angular/core';
import { collection, Firestore, query, where } from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/modules/auth/models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(private firestore: Firestore) { }

  //SERVICE PARA OBTENER EL CLIENTE LOGUEADO
 obtenerClienteLogueado(): Observable<Cliente[]> {
  let userLogueado=localStorage.getItem('mail')
     const ref = collection(this.firestore, 'Clientes');
     const q = query(ref, where('mail', '==', userLogueado));
     return collectionData(q) as Observable<Cliente[]>;
   }

   
}

