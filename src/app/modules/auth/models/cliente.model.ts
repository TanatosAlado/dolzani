export class Cliente {
    constructor(
        public id: string,
        public usuario: string,
        public contrasena: string,
        public mail: string,
        public telefono: string,
        public direccion: string,
        public historial: any[] = [],
        public estado: boolean,
        public razonSocial: string,
        public nombre: string,
        public apellido: string,
        public administrador: boolean = false,
        public carrito: any[] = [],
        public dni: string = '', 
        public cuit: string = '' 
    ) {}
}




