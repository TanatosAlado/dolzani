import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Producto } from 'src/app/shared/models/producto.model';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent {

  productos: Producto[] = [];

  constructor(
    private productoService: ProductoService,  
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }






}
