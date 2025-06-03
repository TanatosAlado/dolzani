import { Injectable } from '@angular/core';
import { Pedido } from '../models/pedido.model';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDoc, getDocs, getFirestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  pedidoPendienteSubject = new BehaviorSubject<Pedido[]>([]);
  pedidoPendiente$ = this.pedidoPendienteSubject.asObservable();
  pedidoFinalizadoSubject = new BehaviorSubject<Pedido[]>([]);
  pedidoFinalizado$ = this.pedidoFinalizadoSubject.asObservable();
  pedidoEliminadoSubject = new BehaviorSubject<Pedido[]>([]);
  pedidoEliminado$ = this.pedidoFinalizadoSubject.asObservable();

  private db = getFirestore();

  constructor(private firestore: Firestore) { }

  getPedidosPorTipo(tipo: string): Observable<Pedido[]> {
    const colRef = collection(this.firestore, tipo);
    return collectionData(colRef, { idField: 'id' }) as Observable<Pedido[]>;
  }

  // SERVICIO PARA ELIMINAR UN PEDIDO POR ID
  async deletePedidoById(id: string, tabla: string): Promise<void> {
    const productoRef = doc(this.firestore, `${tabla}/${id}`);
    console.log(`${{ tabla }}/${id}`)
    try {
      await deleteDoc(productoRef);
     // this.getPedidos(tabla);
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  }

  //SERVICE PARA CREAR PEDIDO
  createPedido(pedido: Pedido): Promise<any> {
    const clienteRef = collection(this.firestore, 'Pedidos Pendientes');
    
    return addDoc(clienteRef, pedido);
  }

  //SERVICE PARA ACTUALIZAR UN PEDIDO
  updatePedido(id: string, pedido: any) {
    const productoRef = doc(this.firestore, 'Pedidos Pendientes', id);
    return updateDoc(productoRef, pedido);
  }

  //SERVICIO PARA MOVER UN CARRO DE PEDIDO PENDIENTE A PEDIDO FINALIZADO
async moverDocumento(id: string, origen: string, destino: string): Promise<void> {
  try {
    const refOrigen = doc(this.firestore, origen, id);
    const snap = await getDoc(refOrigen);

    if (snap.exists()) {
      const data = snap.data();

      // Determinar el nuevo estado
      let nuevoEstado = '';
      if (destino === 'Pedidos Finalizados') {
        nuevoEstado = 'Finalizado';
      } else if (destino === 'Pedidos Pendientes') {
        nuevoEstado = 'Pendiente';
      } else if (destino === 'Pedidos Eliminados') {
        nuevoEstado = 'Eliminado';
      }

      // Actualizar el campo estado
      const dataActualizada = {
        ...data,
        estado: nuevoEstado
      };

      // Guardar en destino con estado actualizado
      const refDestino = doc(this.firestore, destino, id);
      await setDoc(refDestino, dataActualizada);

      // Eliminar del origen
      await deleteDoc(refOrigen);

      console.log('Documento movido con éxito.');
    } else {
      console.log('El documento no existe.');
    }
  } catch (err) {
    console.error('Error al mover el documento:', err);
  }
}


  //SERVICIO PARA ACTUALIZAR LA CANTIDAD DE PRODUCTOS Y TOTAL EN PEDIDOS PENDIENTES
  updateCarroEnPedido(idPedido: string, nuevoCarro: any[]) {
    const nuevoTotal = nuevoCarro.reduce((acc, item) => acc + item.precioFinal * item.cantidad, 0);
    const pedidoRef = doc(this.firestore, 'Pedidos Pendientes', idPedido);
    return updateDoc(pedidoRef, {
      carrito: nuevoCarro,
      total: nuevoTotal
    });
  }

  deleteProductoDelCarrito(idPedido: string, idProducto: string) {
    const pedidoRef = doc(this.firestore, 'Pedidos Pendientes', idPedido);

    return getDoc(pedidoRef).then((docSnap) => {
      if (!docSnap.exists()) {
        throw new Error('Pedido no encontrado');
      }
      const pedidoData = docSnap.data();
      const carritoActual = pedidoData['carrito'] || [];
      const carritoActualizado = carritoActual.filter((producto: any) => producto.id !== idProducto);
      if (carritoActualizado.length === 0) {
        return deleteDoc(pedidoRef);
      }
      const totalActualizado = carritoActualizado.reduce(
        (acc: number, producto: any) => acc + producto.precioFinal * producto.cantidad, 0
      );

      return updateDoc(pedidoRef, {
        carrito: carritoActualizado,
        total: totalActualizado
      });
    });
  }

    async obtenerEstadoPedido(idPedido: string): Promise<string> {
    const colecciones = [
      { nombre: 'Pedidos Pendientes' },
      { nombre: 'Pedidos Finalizados' },
      { nombre: 'Pedidos Eliminados' },
    ];

    for (const col of colecciones) {
      const ref = doc(this.db, col.nombre, idPedido);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        return data?.['estado'] || 'Sin estado';
      }
    }

    return 'Desconocido';
  }

  async obtenerHistorialCompleto(
    pedidosCliente: { id: string; nroPedido: number; fecha: string }[]
  ): Promise<{ nroPedido: number; fecha: string; estado: string }[]> {
    const resultado = await Promise.all(
      pedidosCliente.map(async (pedido) => {
        const estado = await this.obtenerEstadoPedido(pedido.id);
        return {
          nroPedido: pedido.nroPedido,
          fecha: pedido.fecha,
          estado,
        };
      })
    );
    return resultado;
  }
}

