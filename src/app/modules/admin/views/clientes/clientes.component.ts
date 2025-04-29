import { Component, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/modules/auth/models/cliente.model';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {

  clientes: Cliente[] = [];

  pageSize = 10; // cantidad de clientes por página
  clientesStack: any[] = []; // pila para manejar navegación
  currentPage = 0; // página actual
  ultimoCliente: any = null; // último documento de la página actual

  displayedColumns: string[] = ['nombre', 'apellido', 'razonSocial', 'acciones'];
  dataSource = new MatTableDataSource<any>([]);
  totalClientes = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private clientesService: ClientesService) {}

  ngOnInit(): void {
    this.loadClientes();
    this.loadTotalClientes();
  }

  loadClientes(startAfterDoc?: any, direction: 'next' | 'prev' = 'next') {
    this.clientesService.getClientes(this.pageSize, startAfterDoc).subscribe(clientes => {
      this.dataSource.data = clientes;
  
      if (direction === 'next') {
        if (this.ultimoCliente) {
          this.clientesStack.push(this.ultimoCliente);
        }
        if (clientes.length > 0) {
          this.ultimoCliente = clientes[clientes.length - 1].id;
        }
        this.currentPage++;
      } else if (direction === 'prev') {
        this.clientesStack.pop(); // sacamos la última
        this.ultimoCliente = this.clientesStack[this.clientesStack.length - 1];
        this.currentPage--;
      }
    });
  }

  loadTotalClientes(): void {
    this.clientesService.getClientesCount().subscribe(total => {
      this.totalClientes = total;
    });
  }

  onPageChange(event: PageEvent) {
    if (event.pageIndex > event.previousPageIndex!) {
      // Avanzando
      this.loadClientes(this.clientesService.ultimoCliente);
    } else {
      // Retrocediendo aún no implementado (hay que hacer una pila si querés)
      console.log('Retroceder no implementado aún');
    }
  }

  editarCliente(cliente: any): void {
    console.log('Editar', cliente);
    // abrir modal o navegar a componente de edición
  }
  
  eliminarCliente(cliente: any): void {
    console.log('Eliminar', cliente);
    // mostrar confirmación y llamar servicio
  }

  verCliente(cliente: any): void {
    console.log('Ver', cliente);
    // mostrar confirmación y llamar servicio
  }

  abrirRegistro(){
    
  }

}
