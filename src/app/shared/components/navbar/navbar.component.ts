import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { IngresoComponent } from 'src/app/modules/auth/views/ingreso/ingreso.component';
import { Cliente } from 'src/app/modules/auth/models/cliente.model';
import { GeneralService } from '../../services/general.service';
// Si usás Bootstrap v5
import * as bootstrap from 'bootstrap';


import {
  trigger,
  transition,
  style,
  animate,
} from '@angular/animations';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ClientesService } from '../../services/clientes.service';
import { ProductosService } from '../../services/productos.service';
import { CarritoComponent } from '../carrito/carrito.component';
import { CarritoService } from '../../services/carrito.service';
import { PedidosService } from '../../services/pedidos.service';
import { HistorialPedidosModalComponent } from '../historial-pedidos-modal/historial-pedidos-modal.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('navbarFadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class NavbarComponent {
  usuarioLogueado: boolean = false;
  usrAdmin: boolean = false;
  searchTerm: string = '';
  resultados: any[] = [];
  productos:any[]=[]
  cantidadProductos: number = 0;
  cantidadProductos$ = this.carritoService.cantidadProductos$;
  clienteLogueado: Cliente | null = null;


  constructor(private carritoService: CarritoService, private authService: AuthService, private dialog: MatDialog, public generalService: GeneralService, private router: Router, private clientesService: ClientesService, private productoService:ProductosService, private pedidosService: PedidosService) {}

  ngOnInit() {

  this.getProductos();

  // Escuchar cambios del cliente en todo momento
  this.generalService.getCliente().subscribe(cliente => {
    if (cliente) {
      this.usuarioLogueado = true;
      this.usrAdmin = cliente.administrador;
      this.cantidadProductos = this.getCantidadProductos(cliente.carrito);
    } else {
      this.usuarioLogueado = false;
      this.usrAdmin = false;
      this.cantidadProductos = 0;
    }
  });

  // Cargar desde localStorage por si ya hay uno guardado al iniciar
  const clienteGuardado = localStorage.getItem('cliente');
  if (clienteGuardado) {
    this.clientesService.getClienteById(clienteGuardado).subscribe({
      next: (cliente) => {
        this.generalService.setCliente(cliente); // Esto va a activar la suscripción de arriba
        this.carritoService.actualizarCantidadProductos(cliente);
      },
      error: (err) => {
        console.error('Error al obtener cliente', err);
        localStorage.removeItem('cliente');
      }
    });
  }

  }

  // Métodos para abrir los modales
  openIngreso() {
    //this.authService.openIngresoModal();
    const dialogRef = this.dialog.open(IngresoComponent, {
      width: '400px',
      disableClose: true,
      backdropClass: 'custom-backdrop',
      panelClass: 'custom-dialog'
    });

    // Escuchar el cierre del modal y obtener el cliente logueado
    dialogRef.afterClosed().subscribe((cliente: Cliente) => {
      if (cliente) {
        this.carritoService.actualizarCantidadProductos(cliente); 
        this.cantidadProductos= this.getCantidadProductos(cliente.carrito)
        this.usuarioLogueado = true;
        this.usrAdmin = cliente.administrador;
        this.generalService.setCliente(cliente);
        
        this.clienteLogueado = cliente; // Guardar el cliente logueado
        localStorage.setItem('cliente', cliente.id); // clienteId = 'ApdVnmooZNKXXhu5sL01'


      } else {
      }
    });
  }

  getCantidadProductos(carrito: any[]): number {
    return carrito.reduce((total, producto) => total + producto.cantidad, 0);
  }

  openRegistro() {
    this.authService.openRegistroModal();
  }

  closeSesion(){
    this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        message: '¿Está seguro que desea cerrar sesión?',
        confirmAction: () => {
          this.generalService.logout();
          this.usuarioLogueado = false;
          this.usrAdmin = false;
          this.clienteLogueado = null; // Limpiar el cliente logueado
          this.cantidadProductos = 0;
          this.carritoService.actualizarCantidadProductos(null); // Actualizar el contador de productos en el carrito
          this.carritoService.resetEstadoCarrito();

          this.router.navigate(['/']); // redirigir al home
        }
      }
    });
  }

    //FUNCION PARA BUSCAR PRODUCTOS EN EL CUADRO DE BUSQUEDA Y APAREZCAN LA LISTA DE LOS ENCONTRADOS
    autocompletar() {
      if (this.searchTerm.length === 0) {
        this.resultados = [];
        return;
      }
      this.resultados = this.productos.filter(item =>
        item.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

      //FUNCION PARA SELECCIONAR EL PRODUCTO ENCONTRADO Y VER SUS DETALLES
  seleccionar(item: any) {
    this.searchTerm = item.nombre;
    // this.sharedService.showProductoById(item.id)
    this.resultados = []; // Ocultar la lista después de seleccionar
  }
    //FUNCION PARA NAVEGAR A LA BUSQUEDA DEL PEDIDO
    busquedaPedido(busqueda:any){
      this.generalService.showBusqueda(busqueda)
      this.searchTerm=''
      this.resultados=[]
    }

     //FUNCION PARA GUARDAR LOS PRODUCTOS EN UN ARRAY
   getProductos(){
    this.productoService.obtenerProductos().subscribe((productos) => {
      this.productos = productos;
    })
    
  }

    abrirCarrito() {
    // Lógica para abrir el offcanvas o cualquier acción que necesites
    // Si usas Bootstrap para el offcanvas, puedes hacerlo con código JavaScript o Angular
  }

cerrarMenu() {
  const closeButton = document.querySelector('#offcanvasMenu .btn-close') as HTMLElement;
  if (closeButton) {
    closeButton.click(); 
  }
}



async abrirHistorial() {
  const historial = await this.pedidosService.obtenerHistorialCompleto(this.clienteLogueado.historial);

  this.dialog.open(HistorialPedidosModalComponent, {
    width: '600px',
    data: historial,
  });
}



}
