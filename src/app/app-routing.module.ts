import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LayoutComponent } from './modules/shop/components/layout/layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'prefix' },
  {
    path: 'inicio',
    component: LayoutComponent,
    //canActivate: [AuthGuard],
    data: {
      header: 'Inicio',
      navigable: true,
      //access: Puertas.Consulta_OC_CI,
      quick: {
        header: 'Inicio',
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
