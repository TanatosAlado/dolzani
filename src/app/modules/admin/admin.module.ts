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
import { BannerComponent } from './views/banner/banner.component';
import { EncabezadoComponent } from './views/encabezado/encabezado.component';
import { ClienteDetalleComponent } from './views/clientes/components/cliente-detalle/cliente-detalle.component';
import { ClienteEditarComponent } from './views/clientes/components/cliente-editar/cliente-editar.component';
import { ProductoDetalleComponent } from './views/productos/components/producto-detalle/producto-detalle.component';
import { ProductoEditarComponent } from './views/productos/components/producto-editar/producto-editar.component';
import { CambioPassComponent } from '../auth/views/cambio-pass/cambio-pass.component';
import { NosotrosGestionComponent } from './views/nosotros-gestion/nosotros-gestion.component';
import { EmpresaComponent } from './views/empresa/empresa.component';




@NgModule({
  declarations: [
    AdminLayoutComponent,
    ClientesComponent,
    ProductosComponent,
    PedidosComponent,
    GestionesComponent,
    FormProductoComponent,
    ListaProductosComponent,
    BannerComponent,
    EncabezadoComponent,
    ClienteDetalleComponent,
    ClienteEditarComponent,
    ProductoDetalleComponent,
    ProductoEditarComponent,
    CambioPassComponent,
    NosotrosGestionComponent,
    EmpresaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthModule,
    MatDialogModule
  ],
})
export class AdminModule { }
