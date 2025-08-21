import { Component } from '@angular/core';
import { MailsService } from 'src/app/shared/services/mails.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {

  formData:any={}
  modalMail:boolean=false
  modalClose:boolean=false
  private formUrl='https://formspree.io/f/mnnzkrqb'

  constructor(private _mailService:MailsService){
  }
  

//FUNCION PARA ENVIAR MAILS 
  submitForm() {
  this._mailService.sendMails(this.formUrl, this.formData).subscribe({
    next: (res) => {
      console.log('Enviado!', res);
      this.clearForm();
    },
    error: (err) => {
      console.error('Error al enviar', err);
      // Podés mostrar un modal de error si querés
    }
  });
  }

  //FUNCION QUE ABRE Y CIERRA EL MODAL DE ENVIO DE MAIL
   openModal() {
    this.modalMail =!this.modalMail
  }

  //FUNCION PARA VALIDAR SI EL MAIL ES VALIDO O NO
  mailValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.endsWith('.com');
  }

  
  //FUNCION PARA CERRAR EL MODAL
  closeModal() {
    this.modalClose = true;
    setTimeout(() => {
      this.modalMail = false;
      this.modalClose=false
    }, 500); 
  }
  

  //FUNCION PARA LIMPIAR EL FORMULARIO DE CONTACTO
  clearForm(){
    this.openModal()
    this.formData.apellido=""
    this.formData.nombre=""
    this.formData.mail=""
    this.formData.telefono=""
    this.formData.mensaje=""
  }
}
