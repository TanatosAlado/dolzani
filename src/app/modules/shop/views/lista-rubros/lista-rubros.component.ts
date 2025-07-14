import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-rubros',
  templateUrl: './lista-rubros.component.html',
  styleUrls: ['./lista-rubros.component.css']
})
export class ListaRubrosComponent {

  public destacados = [{"rubro": "BEBIDAS"}, {"rubro": "ALMACEN"}, {"rubro": "HERRAMIENTAS"}, {"rubro": "YERBAS"}, {"rubro": "LACTEOS"}, {"rubro": "FIDEOS"}, {"rubro": "CAFE"}, {"rubro": "BATERIAS"}, {"rubro": "LIMPIEZA"}, {"rubro": "PERFUMERIA"}];
  public rubrosDestacados = [  
    { rubro: 'BEBIDAS', icon: 'fa-martini-glass' },
    { rubro: 'ALIMENTOS', icon: 'fa-utensils' },
    { rubro: 'AUTOS', icon: 'fa-car' },
    { rubro: 'YERBAS', icon: 'fa-leaf' },
    { rubro: 'DEPORTES', icon: 'fa-dumbbell' }];

}
