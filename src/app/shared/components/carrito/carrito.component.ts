import { Component } from '@angular/core';
import { Cliente } from 'src/app/modules/auth/models/cliente.model';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
// import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  clientes:Cliente[]=[]
  
  // constructor(private carritoService:CarritoService){

  // }

  ngOnInit(){
  // this.getClienteLogueado()
  }

  
  // getClienteLogueado(){
  //     this.carritoService.obtenerClienteLogueado().subscribe((clientes) => {
  //       this.clientes = clientes;
  //       console.log("cliente logueado",this.clientes)
  //     });
  //   }
}

