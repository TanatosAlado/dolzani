import { Carrito } from "./carrito.model";

export class Pedido {
    id: string;
    nroPedido:number
    fecha: string;
    user: string;
    mail: string;
    telefono: number;
    entrega:string;
    pago:string;
    domicilioEntrega:string;
    carrito: Carrito[] = [];
    total:number
  
    constructor(id: string, nroPedido:number, user: string, mail: string, telefono: number,entrega:string,pago:string,fecha:string, domicilioEntrega:string, carrito: Carrito[],total:number) {
      this.id = id;
      this.nroPedido=nroPedido
      this.fecha = fecha;
      this.user = user;
      this.mail = mail;
      this.telefono = telefono;
      this.entrega=entrega;
      this.domicilioEntrega=domicilioEntrega
      this.pago=pago
      this.carrito = carrito;
      this.total=total
    }
  }