export class Publicidad {
  id: string;
  nombreImagen: string;
  urlImagen: string;
  urlBoton: string;
  tipo: 'izquierda' | 'derecha';
  ruta: string;

  constructor(
    id: string,
    nombreImagen: string,
    urlBoton: string,
    urlImagen: string,
    tipo: 'izquierda' | 'derecha',
    ruta: string
  ) {
    this.id = id;
    this.nombreImagen = nombreImagen;
    this.urlImagen = urlImagen;
    this.urlBoton = urlBoton;
    this.tipo = tipo;
    this.ruta = ruta;
  }
}