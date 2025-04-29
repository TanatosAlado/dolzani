import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cliente } from 'src/app/modules/auth/models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

 private clienteSubject = new BehaviorSubject<Cliente | null>(null);
 
  constructor(private paginatorIntl: MatPaginatorIntl) { 
    this.setPaginatorLabels();
  }

  private setPaginatorLabels() {
    // Aquí defines las traducciones de los textos del paginador
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página';
    this.paginatorIntl.nextPageLabel = 'Siguiente página';
    this.paginatorIntl.previousPageLabel = 'Página anterior';
    this.paginatorIntl.firstPageLabel = 'Primera página';
    this.paginatorIntl.lastPageLabel = 'Última página';
    this.paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      return `${page * pageSize + 1} - ${Math.min((page + 1) * pageSize, length)} de ${length}`;
    };
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
