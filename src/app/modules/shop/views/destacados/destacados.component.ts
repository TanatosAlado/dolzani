import { Component } from '@angular/core';
import { Producto } from 'src/app/shared/models/producto.model';
import { ProductosService } from 'src/app/shared/services/productos.service';

@Component({
  selector: 'app-destacados',
  templateUrl: './destacados.component.html',
  styleUrls: ['./destacados.component.css'],
})
export class DestacadosComponent {

  public destacados: Producto[] = [];

  constructor(private productosService: ProductosService) {

   }

  

  ngOnInit(): void {
    this.productosService.obtenerProductos().subscribe((productos) => {
      this.destacados = productos.filter((producto) => producto.destacado);
      console.log(this.destacados);
    })

  }


}
