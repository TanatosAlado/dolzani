import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './modules/shop/components/layout/layout.component';
import { AdminLayoutComponent } from './modules/admin/components/admin-layout/admin-layout.component';
import { NosotrosComponent } from './modules/sociales/components/nosotros/nosotros.component';
import { ContactoComponent } from './modules/sociales/components/contacto/contacto.component';
import { ClientesComponent } from './modules/admin/views/clientes/clientes.component';
import { ProductosComponent } from './modules/admin/views/productos/productos.component';
import { PedidosComponent } from './modules/admin/views/pedidos/pedidos.component';
import { GestionesComponent } from './modules/admin/views/gestiones/gestiones.component';
import { BannerComponent } from './modules/admin/views/banner/banner.component';
import { AdminGuard } from './guards/admin.guard';
import { GrillaItemsComponent } from './modules/shop/views/grilla-items/grilla-items.component';
import { CheckoutComponent } from './shared/components/checkout/checkout.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'prefix' },
  {
    path: 'inicio',
    component: LayoutComponent,
    //canActivate: [AuthGuard],
    data: {
      header: 'Inicio',
      navigable: true,
      quick: {
        header: 'Inicio',
        icon: 'home',
        navigable: true,
      },
    },
  },
  {
    path: 'gestiones',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', component: GestionesComponent }, 
      { path: 'clientes', component: ClientesComponent },
      { path: 'productos', component: ProductosComponent },
      { path: 'pedidos', component: PedidosComponent },
      { path: 'banner', component: BannerComponent },
      
    ]
  },
  {path:'busqueda/:id',component:GrillaItemsComponent},
  {path:'busqueda',component:GrillaItemsComponent},
  {path:'checkout',component:CheckoutComponent},
  {
    path: 'nosotros',
    component: NosotrosComponent,
    //canActivate: [AuthGuard],
    data: {
      header: 'nosotros',
      navigable: true,
      quick: {
        header: 'Nosotros',
        icon: 'home',
        navigable: true,
      },
    },
  },
  {
    path: 'contacto',
    component: ContactoComponent,
    //canActivate: [AuthGuard],
    data: {
      header: 'contacto',
      navigable: true,
      quick: {
        header: 'Contacto',
        icon: 'home',
        navigable: true,
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
