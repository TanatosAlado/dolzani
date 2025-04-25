import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './modules/shop/components/layout/layout.component';
import { AdminLayoutComponent } from './modules/admin/components/admin-layout/admin-layout.component';
import { NosotrosComponent } from './modules/sociales/components/nosotros/nosotros.component';
import { ContactoComponent } from './modules/sociales/components/contacto/contacto.component';

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
    //canActivate: [AuthGuard],
    data: {
      header: 'gestiones',
      navigable: true,
      quick: {
        header: 'Gestiones',
        icon: 'home',
        navigable: true,
      },
    },
  },
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
