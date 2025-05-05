import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cliente-detalle',
  templateUrl: './cliente-detalle.component.html',
  styleUrls: ['./cliente-detalle.component.css']
})
export class ClienteDetalleComponent {
  columnasHistorial = ['fecha', 'producto', 'cantidad'];

  constructor(@Inject(MAT_DIALOG_DATA) public cliente: any) {}




}