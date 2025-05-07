import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Cliente } from 'src/app/modules/auth/models/cliente.model';
import { ClientesService } from './clientes.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

 //private clienteSubject = new BehaviorSubject<Cliente | null>(null);
 private clienteSubject = new BehaviorSubject<Cliente | null>(null);
 
  constructor(private paginatorIntl: MatPaginatorIntl,private router: Router, private clientesService: ClientesService) { 
    this.setPaginatorLabels();
  }

  ngOnInit() {
    this.loadClienteFromLocalStorage().subscribe(cliente => {
      this.clienteSubject.next(cliente);
    });
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
  
  private loadClienteFromLocalStorage(): Observable<Cliente | null> {
    console.log('Cargando cliente desde localStorage...');
    const clienteId = localStorage.getItem('cliente');
    if (clienteId) {
      return this.clientesService.getClienteById(clienteId);
    } else {
      return of(null); 
    }
  }

  setCliente(cliente: Cliente) {
    this.clienteSubject.next(cliente);
    localStorage.setItem('cliente', cliente.id); // Guardar cliente en localStorage
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
  }

  //FUNCION PARA NAVEGAR AL HOME
  home(){
    this.router.navigate([''])
  }


}
