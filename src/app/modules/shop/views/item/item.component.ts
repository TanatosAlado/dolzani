import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent {
  @Input() producto!: {
    nombre: string;
    descripcion?: string;
    imagenUrl: string;
    precioOriginal: number;
    precioConDescuento: number;
    descuento: number;
  };
}
