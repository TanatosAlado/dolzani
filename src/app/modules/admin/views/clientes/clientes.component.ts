import { Component, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/modules/auth/models/cliente.model';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ClienteDetalleComponent } from './components/cliente-detalle/cliente-detalle.component';
import { MatDialog } from '@angular/material/dialog';
import { ClienteEditarComponent } from './components/cliente-editar/cliente-editar.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

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
  public clienteAEliminar: string = ''; 

  displayedColumns: string[] = ['nombre', 'apellido', 'razonSocial', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<any>([]);
  totalClientes = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private clientesService: ClientesService, private authService: AuthService, private dialog: MatDialog) {}

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
    const dialogRef = this.dialog.open(ClienteEditarComponent, {
      width: '500px',
      maxHeight: '90vh', 
      data: cliente
    });
  
    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
       
        console.log('Datos actualizados:', resultado);
        this.clientesService.actualizarCliente(resultado.id, resultado)
        .then(() => {
          console.log('Cliente actualizado correctamente en Firebase');
          this.loadClientes();
        })
        .catch(error => {
          console.error('Error al actualizar el cliente:', error);
        });
      }
    });
  }
  
  openConfirmDialog(cliente: any): void {
    this.clienteAEliminar = cliente.id;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        message: `¿Está seguro que desea eliminar este cliente: ${cliente.nombre}?`,
        confirmAction: () => this.eliminarCliente() // Acción a ejecutar si se confirma
      }
    });
  }

  eliminarCliente(): void {
    console.log('Eliminar', this.clienteAEliminar);
    // LLAMAR AL SERVICIO, SUSCRIBIRSE E INFIRMAR AL USUARIO
  }

  verCliente(cliente: any): void {
    this.dialog.open(ClienteDetalleComponent, {
      width: '500px',
      data: cliente
    });
  }

  abrirRegistro(){
    this.authService.openRegistroModal().subscribe((resultado) => {
      console.log('El modal de registro se cerró');
      if (resultado) {
        this.ultimoCliente = null;
        this.clientesStack = [];
        this.currentPage = 0;
        this.loadClientes();
        this.loadTotalClientes();
      }
    });
  }

}
