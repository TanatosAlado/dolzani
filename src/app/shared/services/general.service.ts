import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cliente } from 'src/app/modules/auth/models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

 //private clienteSubject = new BehaviorSubject<Cliente | null>(null);
 private clienteSubject = new BehaviorSubject<Cliente | null>(this.loadClienteFromLocalStorage());
 private busquedaSource = new BehaviorSubject<string>('');
 busqueda$ = this.busquedaSource.asObservable();
 
  constructor(private paginatorIntl: MatPaginatorIntl,private router: Router) { 
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
  
  private loadClienteFromLocalStorage(): Cliente | null {
    const cliente = localStorage.getItem('cliente');
    return cliente ? JSON.parse(cliente) : null;
  }

  setCliente(cliente: Cliente) {
    this.clienteSubject.next(cliente);
    localStorage.setItem('cliente', JSON.stringify(cliente)); // Guardar cliente en localStorage
  }

  getCliente(): Observable<Cliente | null> {
    return this.clienteSubject.asObservable();
  }

  getClienteActual(): Cliente | null {
    return this.clienteSubject.value;
  }

  logout() {
    this.clienteSubject.next(null);
    localStorage.removeItem('cliente'); // Eliminar cliente de localStorage al hacer logout
    localStorage.removeItem('mail');
  }

  //FUNCION PARA NAVEGAR AL HOME
  home(){
    this.router.navigate([''])
  }
  
 // FUNCION PARA NAVEGAR Y MOSTRAR EL COMPONENTE DE BUSQUEDA DEL PRODUCTO
 showBusqueda(idProducto: string) {
  if (idProducto != '') {
    this.router.navigate([`busqueda/${idProducto}`])
  }
  else {
    this.router.navigate([`busqueda`])
  }
  this.busquedaSource.next(idProducto);
}

}
