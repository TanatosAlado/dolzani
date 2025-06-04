import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { getFirestore, collection, addDoc, getDocs, query, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { Nosotros } from '../models/nosotros.models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NosotrosService {

  private storage = getStorage();
  private firestore = getFirestore();
  private coleccion = collection(this.firestore, 'Nosotros');
    nosotrosSubject = new BehaviorSubject<Nosotros[]>([]);
    nosotros$ = this.nosotrosSubject.asObservable();

  constructor() { }

  // Subir archivo a Storage y obtener URL
  uploadFile(file: File, path: string): Promise<string> {
    const storageRef = ref(this.storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);
    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed', 
        () => {}, 
        error => reject(error),
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        }
      );
    });
  }

  // Guardar metadata en Firestore (url, descripcion, nombre, ruta, fecha)
   async guardarInfoImagen(data: { descripcion: string; nombreImagen: string,urlImagen:string }) {
    const ref = collection(this.firestore, 'Nosotros');
    const docRef = await addDoc(ref, data);
    await updateDoc(doc(this.firestore, 'Nosotros', docRef.id), {
      id: docRef.id
    });
    return docRef.id;
  }

  // Listar todas las imágenes con descripción
  async listarImagenes(): Promise<Nosotros[]> {
    const q = query(this.coleccion);
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Nosotros[];
  }

  // Eliminar archivo Storage + documento Firestore
  async eliminarArchivo(ruta: string, idFirestore: string) {
    // Eliminar Storage
    const storageRef = ref(this.storage, ruta);
    await deleteObject(storageRef);

    // Eliminar Firestore
    const docRef = doc(this.firestore, 'Nosotros', idFirestore);
    await deleteDoc(docRef);
  }
}

