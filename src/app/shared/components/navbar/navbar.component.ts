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

  constructor(private authService: AuthService, private dialog: MatDialog, private generalService: GeneralService) {}

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
}
