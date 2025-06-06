import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';
import { map, Observable, shareReplay, tap } from 'rxjs';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, query, updateDoc, where } from '@angular/fire/firestore';
import { CollectionReference } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private productos$: Observable<Producto[]> | null = null;


  constructor(private firestore: Firestore) {

   }

  obtenerProductos(): Observable<Producto[]> {
    if (!this.productos$) {
      const ref = collection(this.firestore, 'productos') as CollectionReference<Producto>;
      this.productos$ = collectionData(ref, { idField: 'id' }).pipe(
        tap(productos => console.log('')),
        shareReplay(1)
      );
    } else {
    }
    return this.productos$;
  }

  // Métodos auxiliares de búsqueda/filtrado
  buscarPorNombre(nombre: string): Observable<Producto[]> {
    return this.obtenerProductos().pipe(
      map(productos =>
        productos.filter(p =>
          p.nombre.toLowerCase().includes(nombre.toLowerCase())
        )
      )
    );
  }

  filtrarPorRubro(rubro: string): Observable<Producto[]> {
    return this.obtenerProductos().pipe(
      map(productos => productos.filter(p => p.rubro === rubro))
    );
  }

  agregarProducto(producto: Producto): Promise<any> {
    const ref = collection(this.firestore, 'productos');
    return addDoc(ref, producto);
  }

  editarProducto(producto: Producto): Promise<void> {
    const productoRef = doc(this.firestore, `productos/${producto.id}`);
    return updateDoc(productoRef, { ...producto });
  }

  eliminarProducto(id: string): Promise<void> {
    const docRef = doc(this.firestore, 'productos', id);
    return deleteDoc(docRef);
  }

  obtenerDestacados(): Observable<Producto[]> {
    const ref = collection(this.firestore, 'productos');
    const q = query(ref, where('destacado', '==', true));
    return collectionData(q) as Observable<Producto[]>;
  }

  actualizarProducto(producto: Producto): Promise<void> {
    const docRef = doc(this.firestore, 'productos', producto.id);
    return updateDoc(docRef, { ...producto });
  }
}
