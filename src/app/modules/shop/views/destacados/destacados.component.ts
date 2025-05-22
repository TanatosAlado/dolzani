import { Component } from '@angular/core';
import { Producto } from 'src/app/shared/models/producto.model';
import { ProductosService } from 'src/app/shared/services/productos.service';
import { WhatsappService } from 'src/app/shared/services/whatsapp.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-destacados',
  templateUrl: './destacados.component.html',
  styleUrls: ['./destacados.component.css'],
})
export class DestacadosComponent {

  public destacados: Producto[] = [];

  constructor(private productosService: ProductosService, private whatsappService: WhatsappService) {

  }



  ngOnInit(): void {
    this.productosService.obtenerProductos().subscribe((productos) => {
      this.destacados = productos.filter((producto) => producto.destacado);
    })

  }

  //FUNCION PARA ABRIR VENTANA DE WHATS APP CON MENSAJE PREDETERMINADO
  contactarWhatsapp() {
    this.whatsappService.abrirWhatsApp(environment.whatsappAdmin, 'Hola, Tengo una consulta por un producto');
  }


}
