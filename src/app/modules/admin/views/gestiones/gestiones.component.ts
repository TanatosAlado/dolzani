import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestiones',
  templateUrl: './gestiones.component.html',
  styleUrls: ['./gestiones.component.css']
})
export class GestionesComponent {

  gestiones = [
    {
      titulo: 'Clientes',
      descripcion: 'Gestión de clientes',
      icono: 'fas fa-users',
      ruta: '/gestiones/clientes',
    },
    {
      titulo: 'Productos',
      descripcion: 'Gestión de productos',
      icono: 'fas fa-box-open',
      ruta: '/gestiones/productos',
    },
    {
      titulo: 'Pedidos',
      descripcion: 'Gestión de pedidos',
      icono: 'fas fa-shopping-cart',
      ruta: '/gestiones/pedidos',
    },
    {
      titulo: 'Banner',
      descripcion: 'Gestión de banner',
      icono: 'fas fa-image',
      ruta: '/gestiones/banner',
    },
    {
      titulo: 'Nosotros',
      descripcion: 'Gestión de nosotros',
      icono: 'fa-solid fa-address-card',
      ruta: '/gestiones/nosotros',
    },
  ];

  constructor(private router: Router) {}

  irAGestion(ruta: string) {
    this.router.navigate(['/gestiones', ruta]);
  }

}
