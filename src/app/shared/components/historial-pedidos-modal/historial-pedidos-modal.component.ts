import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-historial-pedidos-modal',
  templateUrl: './historial-pedidos-modal.component.html',
})
export class HistorialPedidosModalComponent {
  displayedColumns: string[] = ['nroPedido', 'fecha', 'estado'];
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { nroPedido: number; fecha: string; estado: string }[]
  ) {}
}
