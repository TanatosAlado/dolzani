import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { ClientesComponent } from './views/clientes/clientes.component';
import { ProductosComponent } from './views/productos/productos.component';
import { PedidosComponent } from './views/pedidos/pedidos.component';
import { GestionesComponent } from './views/gestiones/gestiones.component';
import { AuthModule } from '../auth/auth.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FormProductoComponent } from './views/productos/components/form-producto/form-producto.component';
import { ListaProductosComponent } from './views/productos/components/lista-productos/lista-productos.component';




@NgModule({
  declarations: [
    AdminLayoutComponent,
    ClientesComponent,
    ProductosComponent,
    PedidosComponent,
    GestionesComponent,
    FormProductoComponent,
    ListaProductosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthModule,
    MatDialogModule
  ],
})
export class AdminModule { }
