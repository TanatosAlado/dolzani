import { Component, Input } from '@angular/core';
import { Producto } from 'src/app/shared/models/producto.model';
import { GeneralService } from 'src/app/shared/services/general.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent {
  @Input() producto!: Producto;

  constructor(private generalService:GeneralService){

  }

 
 //FUNCION PARA AGREGAR EL CARRITO EN EL CLIENTE
  agregarCarrito(id:any){
  this.generalService.cargarProductoCarrito(id,1)
  }

  calcularDescuento(producto: Producto): number {
  if (producto.oferta && producto.precio > 0 && producto.precioOferta > 0) {
    const descuento = ((producto.precio - producto.precioOferta) / producto.precio) * 100;
    return Math.round(descuento); 
  }
  return 0;
}

}
