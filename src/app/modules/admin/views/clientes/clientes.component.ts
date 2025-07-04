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
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent {

  clientes: Cliente[] = [];
  nuevaContrasena: string = 'Dolzani123'; // Nueva contraseña para el cliente

  pageSize = 10; // cantidad de clientes por página
  clientesStack: any[] = []; // pila para manejar navegación
  currentPage = 0; // página actual
  ultimoCliente: any = null; // último documento de la página actual
  public clienteAEliminar: string = ''; 
  paginator!: MatPaginator;
  displayedColumns: string[] = ['apellido', 'nombre', 'razonSocial', 'estado', 'acciones'];
  dataSourceClientes:MatTableDataSource<Cliente>;
  totalClientes = 0;
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private toastService:ToastService,private clientesService: ClientesService, private authService: AuthService, private dialog: MatDialog, private snackBar: MatSnackBar) {

    this.dataSourceClientes = new MatTableDataSource(this.clientes);
  }

  ngOnInit(): void {
    this.loadClientes();
    // this.loadTotalClientes();
  }

  ngAfterViewInit() {
    this.setDataSourceAttributes()
  }


 @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
      if (mp) {
        this.paginator = mp;
        this.paginator._intl.itemsPerPageLabel = 'Clientes por Página';
        this.paginator._intl.firstPageLabel = 'Primera Página';
        this.paginator._intl.previousPageLabel = 'Página Anterior';
        this.paginator._intl.nextPageLabel = 'Siguiente Página';
        this.paginator._intl.lastPageLabel = 'Última Página';
      }
      this.setDataSourceAttributes();
    }


    setDataSourceAttributes() {
    if (this.dataSourceClientes) {
      this.dataSourceClientes.paginator = this.paginator;
    }
  }

 loadClientes() {
  this.clientesService.getClientes().subscribe((clientes: Cliente[]) => {
    this.clientes = clientes.sort((a, b) => a.apellido.localeCompare(b.apellido));
    this.dataSourceClientes = new MatTableDataSource(this.clientes);
    this.dataSourceClientes.paginator = this.paginator;
  });
}


    //FUNCION PARA FILTRAR POR CUALQUIER PALABRA QUE SE ESCRIBA EN EL FILTRO
  applyFilter(event: Event, datasource: MatTableDataSource<any>) {
    const filterValue = (event.target as HTMLInputElement).value;
    datasource.filter = filterValue.trim().toLowerCase();
  }
  loadTotalClientes(): void {
    this.clientesService.getClientesCount().subscribe(total => {
      this.totalClientes = total;
    });
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
        confirmAction: () => this.eliminarCliente(cliente.id) // Acción a ejecutar si se confirma
      }
    });
  }

  eliminarCliente(idCliente: string): void {
    this.clientesService.eliminarCliente(idCliente).then(() => {
       this.toastService.toatsMessage('Cliente eliminado con éxito', 'green', 2000);
    })
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
