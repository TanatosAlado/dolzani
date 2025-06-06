import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDoc, query, updateDoc, where } from '@angular/fire/firestore';

import { collectionData } from 'rxfire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cliente } from 'src/app/modules/auth/models/cliente.model';
import { ClientesService } from './clientes.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private cantidadProductosSubject = new BehaviorSubject<number>(0);
  cantidadProductos$ = this.cantidadProductosSubject.asObservable();
  private carritoSubject = new BehaviorSubject<any[]>([]);
  carrito$ = this.carritoSubject.asObservable();

  
  constructor(private firestore: Firestore, private clienteService:ClientesService) { }

  //SERVICE PARA OBTENER EL CLIENTE LOGUEADO
 obtenerClienteLogueado(): Observable<Cliente[]> {
  let userLogueado=localStorage.getItem('mail')
     const ref = collection(this.firestore, 'Clientes');
     const q = query(ref, where('mail', '==', userLogueado));
     return collectionData(q) as Observable<Cliente[]>;
   }
 //SERVICIO PARA CONTAR LA CANTIDAD DE PRODUCTOS EN EL CARRO DEL CLIENTE
 contadorProductos() {
  const mail = localStorage.getItem('mail');
  this.clienteService.clientes$.subscribe(clientes => {
    const cliente = clientes.find(c => c.mail === mail);
    if (cliente && cliente.carrito) {
      const total = cliente.carrito.reduce((sum, producto) => sum + producto.cantidad, 0);
      this.cantidadProductosSubject.next(total);
    } else {
      this.cantidadProductosSubject.next(0);
    }
  });
}

  // SERVICIO PARA ELIMINAR UN PRODUCTO DEL CARRITO ID
  async deleteProductoCarrito(clienteId: string, productoId: string): Promise<void> {
    const clienteRef = doc(this.firestore, `Clientes/${clienteId}`);
    try {
      const clienteSnap = await getDoc(clienteRef);
      if (clienteSnap.exists()) {
        const clienteData = clienteSnap.data();
        const carritoActual = clienteData['carrito'] || [];
        const nuevoCarrito = carritoActual.filter((producto: any) => producto.id !== productoId);
        await updateDoc(clienteRef, { carrito: nuevoCarrito });
        this.carritoSubject.next(nuevoCarrito);

      }
    } catch (error) {
    }
  }

  actualizarCantidadProductos(cliente: Cliente) {
    if (!cliente || !cliente.carrito) {
      this.cantidadProductosSubject.next(0);
      return;
    } else {
      const total = cliente.carrito?.reduce((sum, p) => sum + p.cantidad, 0) || 0;
      this.cantidadProductosSubject.next(total);
    }
  
  }

resetEstadoCarrito() {
  this.cantidadProductosSubject.next(0);
  this.carritoSubject.next([]);
}



}
   


