import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { ClientesComponent } from './views/clientes/clientes.component';
import { ProductosComponent } from './views/productos/productos.component';
import { PedidosComponent } from './views/pedidos/pedidos.component';
import { GestionesComponent } from './views/gestiones/gestiones.component';




@NgModule({
  declarations: [
    AdminLayoutComponent,
    ClientesComponent,
    ProductosComponent,
    PedidosComponent,
    GestionesComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
})
export class AdminModule { }
