import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Producto } from 'src/app/shared/models/producto.model';
import { ProductosService } from 'src/app/shared/services/productos.service';
import { FormProductoComponent } from '../form-producto/form-producto.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ProductoDetalleComponent } from '../producto-detalle/producto-detalle.component';
import { ProductoEditarComponent } from '../producto-editar/producto-editar.component';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent {

  productos: Producto[] = [];
  displayedColumns: string[] = ['nombre', 'descripcion', 'precio', 'stock', 'acciones'];
  public productoAEliminar: string = ''; 

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
    const dialogRef = this.dialog.open(ProductoEditarComponent, {
      width: '600px',
      data: producto,  // Enviar los datos del producto a editar
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.obtenerProductos(); // Refrescar la lista después de cerrar el modal
      }
    });
  }

  abrirModalAltaProducto(): void {
    const dialogRef = this.dialog.open(FormProductoComponent, {
      width: '90vw',       // 90% del ancho de la ventana
      maxWidth: '600px',   // máximo 600px
      height: 'auto',
      maxHeight: '90vh',   // 90% del alto de la ventana
      panelClass: 'custom-dialog-container', // opcional para estilos
      data: {} // si querés pasar datos iniciales, podés hacerlo acá
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        // Podés actualizar la lista, mostrar mensaje, etc.
        console.log('Producto creado:', resultado);
      }
    });
  }

  verProducto(producto: any): void {
    this.dialog.open(ProductoDetalleComponent, {
      width: '500px',
      data: producto
    });
  }

  openConfirmDialog(producto: any): void {
    this.productoAEliminar = producto.id;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        message: `¿Está seguro que desea eliminar este producto: ${producto.nombre}?`,
        confirmAction: () => this.eliminarProducto() // Acción a ejecutar si se confirma
      }
    });
  }

  eliminarProducto(): void {
    console.log('Eliminar', this.productoAEliminar);
    // LLAMAR AL SERVICIO, SUSCRIBIRSE E INFIRMAR AL USUARIO
  }


}
