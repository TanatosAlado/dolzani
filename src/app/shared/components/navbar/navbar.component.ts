import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { IngresoComponent } from 'src/app/modules/auth/views/ingreso/ingreso.component';
import { Cliente } from 'src/app/modules/auth/models/cliente.model';
import { GeneralService } from '../../services/general.service';

import {
  trigger,
  transition,
  style,
  animate,
} from '@angular/animations';


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

  constructor(private authService: AuthService, private dialog: MatDialog, public generalService: GeneralService) {}

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
        console.log('Cliente logueado:', cliente);
        // Guardamos el cliente en el servicio general
        this.usuarioLogueado = true;
        this.usrAdmin = cliente.administrador;
        this.generalService.setCliente(cliente);
      } else {
        console.log('El usuario cerró el modal sin loguearse');
      }
    });
  }

  openRegistro() {
    this.authService.openRegistroModal();
  }

  closeSesion(){
    this.generalService.logout();
    this.usuarioLogueado = false;
    this.usrAdmin = false;
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
      // this.sharedService.showBusqueda(busqueda)
      this.searchTerm=''
      this.resultados=[]
    }
}
