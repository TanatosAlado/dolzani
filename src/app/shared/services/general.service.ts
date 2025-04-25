import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cliente } from 'src/app/modules/auth/models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

 private clienteSubject = new BehaviorSubject<Cliente | null>(null);
 
  constructor() { 

  }

  setCliente(cliente: Cliente) {
    this.clienteSubject.next(cliente);
  }

  getCliente(): Observable<Cliente | null> {
    return this.clienteSubject.asObservable();
  }

  getClienteActual(): Cliente | null {
    return this.clienteSubject.value;
  }

  logout() {
    this.clienteSubject.next(null);
  }


}
