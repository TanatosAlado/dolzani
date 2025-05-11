import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class BannerService {

  private imagenes: any[] = [];
  private idCounter = 1;
  

  constructor() {}

    obtenerImagenes() {
    return this.imagenes.sort((a, b) => a.orden - b.orden);
  }

  agregarImagen(imagen: any) {
    imagen.id = this.idCounter++;
    this.imagenes.push(imagen);
  }

  eliminarImagen(id: number) {
    this.imagenes = this.imagenes.filter(img => img.id !== id);
  }

}
