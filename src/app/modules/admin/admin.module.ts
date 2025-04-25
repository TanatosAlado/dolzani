import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { ClientesComponent } from './views/clientes/clientes.component';
import { ProductosComponent } from './views/productos/productos.component';



@NgModule({
  declarations: [
    AdminLayoutComponent,
    ClientesComponent,
    ProductosComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
