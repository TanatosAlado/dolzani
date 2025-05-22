import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WhatsappService {

  constructor() { }

  //SERVICIO PARA ABRIR EL WHATSAPP
  abrirWhatsApp(numero: string, mensaje: string = ''): void {
   const numeroLimpio = numero.replace(/\D/g, '');
    const mensajeCodificado = encodeURIComponent(mensaje);
    const url = `https://wa.me/${numero}?text=${mensajeCodificado}`;
    window.open(url, '_blank');
  }
}
