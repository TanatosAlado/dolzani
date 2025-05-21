import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Cliente } from 'src/app/modules/auth/models/cliente.model';
import { IngresoComponent } from 'src/app/modules/auth/views/ingreso/ingreso.component';
import { Producto } from 'src/app/shared/models/producto.model';
import { GeneralService } from 'src/app/shared/services/general.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent {
  @Input() producto!: Producto;

  constructor(private generalService:GeneralService, private toastService: ToastService, private dialog: MatDialog){

  }

 
  //FUNCION PARA AGREGAR EL CARRITO EN EL CLIENTE
  // agregarCarrito(id: any) {
  //   this.generalService.cargarProductoCarrito(id, 1)
  //     .then(() => {
  //       this.toastService.toatsMessage('Producto agregado al carrito', 'green',2000);
  //     })
  //     .catch(err => {
  //       this.toastService.toatsMessage('El producto no pudo agregarse', 'red',2000);
  //     });
  // }

agregarCarrito(producto: any) {
  const cliente = this.generalService.getClienteActual();

  if (!cliente) {
    const dialogRef = this.dialog.open(IngresoComponent, {
      width: '400px',
      disableClose: true,
      backdropClass: 'custom-backdrop',
      panelClass: 'custom-dialog'
    });

    dialogRef.afterClosed().subscribe((clienteLogueado: Cliente) => {
      if (clienteLogueado) {
        this.generalService.setCliente(clienteLogueado);
        localStorage.setItem('cliente', clienteLogueado.id);
        
        this.generalService.cargarProductoCarrito(producto, 1)
          .then(() => {
            this.toastService.toatsMessage('Producto agregado al carrito', 'green', 2000);
          })
          .catch(err => {
            this.toastService.toatsMessage('El producto no pudo agregarse', 'red', 2000);
            console.error(err);
          });
      } else {
        this.toastService.toatsMessage('Debe iniciar sesión para agregar productos al carrito', 'orange', 3000);
      }
    });

    return;
  }

  // Usuario ya logueado
  this.generalService.cargarProductoCarrito(producto, 1)
    .then(() => {
      this.toastService.toatsMessage('Producto agregado al carrito', 'green', 2000);
    })
    .catch(err => {
      this.toastService.toatsMessage('El producto no pudo agregarse', 'red', 2000);
      console.error(err);
    });
}


  calcularDescuento(producto: Producto): number {
  if (producto.oferta && producto.precio > 0 && producto.precioOferta > 0) {
    const descuento = ((producto.precio - producto.precioOferta) / producto.precio) * 100;
    return Math.round(descuento); 
  }
  return 0;
}

}
