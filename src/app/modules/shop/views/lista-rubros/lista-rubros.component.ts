import { Component } from '@angular/core';
import { RubroConSubrubros } from 'src/app/shared/models/rubroConSubrubro.model';
import { ProductosService } from 'src/app/shared/services/productos.service';

@Component({
  selector: 'app-lista-rubros',
  templateUrl: './lista-rubros.component.html',
  styleUrls: ['./lista-rubros.component.css']
})
export class ListaRubrosComponent {

  rubrosConSubrubros: RubroConSubrubros[] = [];
  rubroActivo: RubroConSubrubros | null = null;

  constructor(private productosService: ProductosService) {}

  ngOnInit() {
    this.productosService.obtenerProductos().subscribe(productos => {
      const rubroMap = new Map<string, Set<string>>();

      productos.forEach(p => {
        if (!rubroMap.has(p.rubro)) {
          rubroMap.set(p.rubro, new Set());
        }
        rubroMap.get(p.rubro)!.add(p.subrubro);
      });

      this.rubrosConSubrubros = Array.from(rubroMap.entries()).map(([rubro, subSet]) => ({
        rubro,
        subrubros: Array.from(subSet)
      }));
    });
  }

  mostrarSubrubros(rubro: RubroConSubrubros) {
    this.rubroActivo = rubro;
  }

  ocultarSubrubros() {
    this.rubroActivo = null;
  }

  filtrarPorSubrubro(rubro: string, subrubro: string) {
 // this.router.navigate(['/productos'], { queryParams: { rubro, subrubro } });
} 


}

