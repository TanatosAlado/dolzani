export class Producto {
    constructor(
        public id: string,
        public nombre: string,
        public descripcion: string,
        public rubro: string,
        public subrubro: string,
        public marca: string,
        public precio: number,
        public stock: number,
        public destacado: boolean = false,
        public imagen: string = '',
        public cantidad: number = 1,
        public oferta: boolean = false,
        public precioOferta: number = 0,
        public impuestoNacional: boolean = false,
        public precioSinImpuestoNacional: number = 0,
    ) {}
}




