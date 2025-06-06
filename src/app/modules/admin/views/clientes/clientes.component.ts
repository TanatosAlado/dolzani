import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Cliente } from 'src/app/modules/auth/models/cliente.model';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ClienteDetalleComponent } from './components/cliente-detalle/cliente-detalle.component';
import { MatDialog } from '@angular/material/dialog';
import { ClienteEditarComponent } from './components/cliente-editar/cliente-editar.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
   encapsulation: ViewEncapsulation.None
})
export class ClientesComponent {

  clientes: Cliente[] = [];
  nuevaContrasena: string = 'Dolzani123'; // Nueva contraseña para el cliente

  pageSize = 10; // cantidad de clientes por página
  clientesStack: any[] = []; // pila para manejar navegación
  currentPage = 0; // página actual
  ultimoCliente: any = null; // último documento de la página actual
  public clienteAEliminar: string = ''; 

  displayedColumns: string[] = ['nombre', 'apellido', 'razonSocial', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<any>([]);
  totalClientes = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private clientesService: ClientesService, private authService: AuthService, private dialog: MatDialog, private snackBar: MatSnackBar) {}

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
        this.clientesService.actualizarCliente(resultado.id, resultado)
        .then(() => {
          this.loadClientes();
        })
        .catch(error => {
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
      if (resultado) {
        this.ultimoCliente = null;
        this.clientesStack = [];
        this.currentPage = 0;
        this.loadClientes();
        this.loadTotalClientes();
      }
    });
  }

  restablecerPass(cliente: Cliente): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        message: `¿Está seguro que desea blanquear la contraseña del cliente ${cliente.nombre} ${cliente.apellido}?`,
        confirmAction: () => this.blanquearPass(cliente) 
      }
    });
  }

  blanquearPass(cliente: Cliente): void {
    this.clientesService.actualizarCliente(cliente.id, { contrasena: this.nuevaContrasena })
      .then(() => {
        this.snackBar.open('Blanqueo realizado con éxito', 'Cerrar', {
          duration: 3000,
        });
      })
      .catch(error => {
        this.snackBar.open('Error al realizar el blanqueo', 'Cerrar', {
          duration: 3000,
        });
      });
  }


}
