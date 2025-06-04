export class Nosotros {
    id: string;
    nombreImagen: string;
    urlImagen:string
    descripcion: string;

    constructor(id: string, imagen: string, descripcion: string,urlImagen:string) {
        this.id = id,
        this.nombreImagen = imagen,
        this.urlImagen=urlImagen
        this.descripcion = descripcion
    }
}