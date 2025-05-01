import { Component, Input } from '@angular/core';
import { Producto } from 'src/app/shared/models/producto.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent {
  @Input() producto!: Producto;
}
