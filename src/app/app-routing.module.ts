import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: "", redirectTo: "inicio", pathMatch: "prefix" },
  { 
    path: "inicio",
    component: DashboardComponent,
    //canActivate: [AuthGuard],
    data: {
      header: "Inicio",
      navigable: true,
      //access: Puertas.Consulta_OC_CI,
      quick: {
        header: "Inicio",
        icon: "home",
        navigable: true,
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
