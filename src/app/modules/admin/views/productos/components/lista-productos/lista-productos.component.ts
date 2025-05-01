import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Producto } from 'src/app/shared/models/producto.model';
import { ProductosService } from 'src/app/shared/services/productos.service';
import { FormProductoComponent } from '../form-producto/form-producto.component';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent {

  productos: Producto[] = [];
  displayedColumns: string[] = ['nombre', 'descripcion', 'precio', 'stock', 'acciones'];


  constructor(
    private productosService: ProductosService,  
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productosService.obtenerProductos().subscribe((productos: Producto[]) => {
      this.productos = productos;
    });
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(FormProductoComponent, {
      width: '600px',  // Ajusta el tamaño del modal
      data: null,  // Aquí puedes enviar datos si es necesario (por ejemplo, para editar un producto)
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.obtenerProductos(); // Refrescar la lista después de cerrar el modal
      }
    });
  }

  editarProducto(producto: Producto): void {
    const dialogRef = this.dialog.open(FormProductoComponent, {
      width: '600px',
      data: producto,  // Enviar los datos del producto a editar
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.obtenerProductos(); // Refrescar la lista después de cerrar el modal
      }
    });
  }

  eliminarProducto(productoId: string): void {

    alert('¿Está seguro de que desea eliminar este producto? Esta acción no se puede deshacer.');

    // this.productosService.eliminarProducto(productoId).then(() => {
    //   this.obtenerProductos();
    // });

  }

}
