import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Producto } from 'src/app/shared/models/producto.model';
import { ProductosService } from 'src/app/shared/services/productos.service';
import { FormProductoComponent } from '../form-producto/form-producto.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { ProductoDetalleComponent } from '../producto-detalle/producto-detalle.component';
import { ProductoEditarComponent } from '../producto-editar/producto-editar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent {

  productos: Producto[] = [];
  displayedColumns: string[] = ['nombre', 'descripcion', 'precio', 'stock', 'acciones'];
  public productoAEliminar: string = ''; 
  paginator!: MatPaginator;
  rubrosUnicos: string[] = [];
  subrubrosUnicos: string[] = [];
  marcasUnicas: string[] = [];
  datasourceProductos: MatTableDataSource<Producto>
  erroresCarga: string[] = [];
  cargandoExcel: boolean = false;


  constructor( private productosService: ProductosService, public dialog: MatDialog,private snackBar: MatSnackBar) {
  this.datasourceProductos = new MatTableDataSource(this.productos);
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

   ngAfterViewInit() {
    this.setDataSourceAttributes()
  }

   @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
      if (mp) {
        this.paginator = mp;
        this.paginator._intl.itemsPerPageLabel = 'Productos por Página';
        this.paginator._intl.firstPageLabel = 'Primera Página';
        this.paginator._intl.previousPageLabel = 'Página Anterior';
        this.paginator._intl.nextPageLabel = 'Siguiente Página';
        this.paginator._intl.lastPageLabel = 'Última Página';
      }
      this.setDataSourceAttributes();
    }

  setDataSourceAttributes() {
    if (this.datasourceProductos) {
      this.datasourceProductos.paginator = this.paginator;
    }
  }
  obtenerProductos(): void {
    this.productosService.obtenerProductos().subscribe((productos: Producto[]) => {
      this.productos= productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
      this.datasourceProductos = new MatTableDataSource(this.productos);
      this.rubrosUnicos = [...new Set(productos.map(p => p.rubro.toUpperCase()))];
      this.subrubrosUnicos = [...new Set(productos.map(p => p.subrubro.toUpperCase()))];
      this.marcasUnicas = [...new Set(productos.map(p => p.marca.toUpperCase()))];
    });
  }

     //FUNCION PARA FILTRAR POR CUALQUIER PALABRA QUE SE ESCRIBA EN EL FILTRO
  applyFilter(event: Event, datasource: MatTableDataSource<any>) {
    const filterValue = (event.target as HTMLInputElement).value;
    datasource.filter = filterValue.trim().toLowerCase();
  }

  editarProducto(producto: Producto): void {
    const dialogRef = this.dialog.open(ProductoEditarComponent, {
      width: '600px',
      data: producto,  // Enviar los datos del producto a editar
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.productosService.actualizarProducto(resultado)
        .then(() => {
          this.obtenerProductos(); // Refrescar la lista después de cerrar el modal
        })
        .catch(error => {
        });
      }
    });
  }

abrirModalAltaProducto(): void {
  const dialogRef = this.dialog.open(FormProductoComponent, {
    width: '90vw',
    maxWidth: '600px',
    height: 'auto',
    maxHeight: '90vh',
    panelClass: 'custom-dialog-container',
    data: {
      rubros: this.rubrosUnicos,
      subrubros: this.subrubrosUnicos,
      marcas: this.marcasUnicas
    }
  });

  dialogRef.afterClosed().subscribe(resultado => {
    if (resultado) {
      this.obtenerProductos(); // Refrescar productos
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
        confirmAction: () => this.eliminarProducto(producto.id) // Acción a ejecutar si se confirma
      }
    });
  }

  eliminarProducto(id: string): void {
    this.productosService.eliminarProducto(id).then(() => {
      this.snackBar.open('Cliente eliminado con éxito', 'Cerrar', {
        duration: 3000,
      });
    })
  }

onArchivoExcelCargado(event: any): void {
  const archivo = event.target.files[0];
  if (!archivo) return;

  this.cargandoExcel = true;

  const lector = new FileReader();
  lector.onload = async (e: any) => {
    const datos = new Uint8Array(e.target.result);
    const workbook = XLSX.read(datos, { type: 'array' });
    const hoja = workbook.Sheets[workbook.SheetNames[0]];
    const filas = XLSX.utils.sheet_to_json<any>(hoja, { defval: '' });

    this.erroresCarga = [];
    await this.cargarProductosDesdeExcel(filas);

    this.cargandoExcel = false;
    this.mostrarSnackbar('Archivo procesado correctamente');
  };
  lector.readAsArrayBuffer(archivo);
}

mostrarSnackbar(mensaje: string): void {
  this.snackBar.open(mensaje, 'Cerrar', {
    duration: 3000,
    horizontalPosition: 'end',
    verticalPosition: 'bottom',
    panelClass: ['snackbar-exito']
  });
}

async cargarProductosDesdeExcel(filas: any[]): Promise<void> {
  let exitos = 0;

  for (let index = 0; index < filas.length; index++) {
    const fila = filas[index];
    const errorPrefijo = `Fila ${index + 2}:`;

    try {
      const producto: Producto = {
        id: '',
        nombre: fila.nombre?.toString() || '',
        descripcion: fila.descripcion?.toString() || '',
        rubro: fila.rubro?.toString().toUpperCase() || '',
        subrubro: fila.subrubro?.toString().toUpperCase() || '',
        marca: fila.marca?.toString().toUpperCase() || '',
        precio: Number(fila.precio),
        stock: Number(fila.stock),
        destacado: fila.destacado === true || fila.destacado?.toString().toLowerCase() === 'true',
        imagen: fila.imagen?.toString() || '',
        cantidad: 1,
        oferta: fila.oferta === true || fila.oferta?.toString().toLowerCase() === 'true',
        precioOferta: 0,
        impuestoNacional: fila.impuestoNacional === true || fila.impuestoNacional?.toString().toLowerCase() === 'true',
        precioSinImpuestoNacional: 0,
      };

      if (producto.oferta) {
        if (!fila.precioOferta && fila.precioOferta !== 0) {
          this.erroresCarga.push(`${errorPrefijo} Producto en oferta sin precioOferta`);
          continue;
        }
        producto.precioOferta = Number(fila.precioOferta);
      }

      if (producto.impuestoNacional) {
        if (!fila.precioSinImpuestoNacional && fila.precioSinImpuestoNacional !== 0) {
          this.erroresCarga.push(`${errorPrefijo} Producto con impuestoNacional sin precioSinImpuestoNacional`);
          continue;
        }
        producto.precioSinImpuestoNacional = Number(fila.precioSinImpuestoNacional);
      }

      if (isNaN(producto.precio) || isNaN(producto.stock)) {
        this.erroresCarga.push(`${errorPrefijo} Precio o stock no numérico`);
        continue;
      }

      const docRef = await this.productosService.agregarProducto(producto);
      producto.id = docRef.id;
      await this.productosService.actualizarProducto(producto);
      exitos++;

    } catch (error) {
      this.erroresCarga.push(`${errorPrefijo} Error al procesar producto: ${error}`);
    }
  }

  // Mostrar snackbar de confirmación
  this.snackBar.open(
    `Carga completada: ${exitos} producto(s) agregados, ${this.erroresCarga.length} con errores.`,
    'Cerrar',
    { duration: 5000, panelClass: 'snackbar-success' }
  );
}


}
