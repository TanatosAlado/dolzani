import { Injectable } from '@angular/core';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { collection, getDocs } from '@angular/fire/firestore';
import { Contador } from '../models/contador.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContadorService {
    contadorSubject = new BehaviorSubject<Contador[]>([]);
    contador$ = this.contadorSubject.asObservable();

  constructor(private firestore:Firestore) { }


 // SERVICE PARA TRAER EL CONTADOR DE PEDIDOS
  getContador(): Promise<void> {
    const contadorRef = collection(this.firestore, 'Contador Pedidos');
    return getDocs(contadorRef).then(snapshot => {
      const contador: Contador[] = snapshot.docs.map(doc => ({
        ...doc.data() as Contador,
        id: doc.id
      }));
      this.contadorSubject.next(contador);
      console.log(contador)
    }).catch(error => {
      console.error('Error al obtener contador:', error);
    });
  }

  //SERVICE PARA ACTUALIZAR CONTADOR DE PEDIDOS
    updateContador(id: string, contador: any) {
      console.log(id)
      console.log(contador)
      const contadorRef = doc(this.firestore, 'Contador Pedidos', id);
      return updateDoc(contadorRef, contador);
    }

}