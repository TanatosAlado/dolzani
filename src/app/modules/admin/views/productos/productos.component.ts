import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormProductoComponent } from './components/form-producto/form-producto.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {

  constructor(private dialog: MatDialog){
    
  }

  // abrirModalAltaProducto(): void {
  //   const dialogRef = this.dialog.open(FormProductoComponent, {
  //     width: '90vw',       // 90% del ancho de la ventana
  //     maxWidth: '600px',   // máximo 600px
  //     height: 'auto',
  //     maxHeight: '90vh',   // 90% del alto de la ventana
  //     panelClass: 'custom-dialog-container', // opcional para estilos
  //     data: {} // si querés pasar datos iniciales, podés hacerlo acá
  //   });

  //   dialogRef.afterClosed().subscribe(resultado => {
  //     if (resultado) {
  //       // Podés actualizar la lista, mostrar mensaje, etc.
  //       console.log('Producto creado:', resultado);
  //     }
  //   });
  // }

}
