import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { Publicidad } from '../models/publicidad.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicidadService {
  private storage = getStorage();
  private firestore = getFirestore();
  private coleccion = collection(this.firestore, 'Publicidad');
  publicidadSubject = new BehaviorSubject<Publicidad[]>([]);
  publicidad$ = this.publicidadSubject.asObservable();
  constructor() { }


  // Subir archivo a Storage y obtener URL
  uploadFile(file: File, path: string): Promise<string> {
    const storageRef = ref(this.storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);
    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed',
        () => { },
        error => reject(error),
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        }
      );
    });
  }

  // Guardar metadata en Firestore (url, descripcion, nombre, ruta, fecha)
  async guardarInfoImagen(data: { tipo: string; nombreImagen: string, urlImagen: string,ruta:string,urlBoton:string }) {
    const ref = collection(this.firestore, 'Publicidad');
    const docRef = await addDoc(ref, data);
    await updateDoc(doc(this.firestore, 'Publicidad', docRef.id), {
      id: docRef.id
    });
    return docRef.id;
  }

  // Listar todas las imágenes con descripción
    async listarImagenes(): Promise<Publicidad[]> {
      const q = query(this.coleccion);
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Publicidad[];
    }

      // Eliminar archivo Storage + documento Firestore
      async eliminarArchivo(ruta: string, idFirestore: string) {
        // Eliminar Storage
        const storageRef = ref(this.storage, ruta);
        await deleteObject(storageRef);
    
        // Eliminar Firestore
        const docRef = doc(this.firestore, 'Publicidad', idFirestore);
        await deleteDoc(docRef);
      }
    
      // En tu servicio PublicidadService
    getPublicidad(): void {
      this.listarImagenes().then(imagenes => {
        this.publicidadSubject.next(imagenes);
      }).catch(error => {
        console.error('Error al listar imágenes:', error);
      });
    }
}
