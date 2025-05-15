import { Component } from '@angular/core';
import { Cliente } from 'src/app/modules/auth/models/cliente.model';
import { GeneralService } from '../../services/general.service';
import { CarritoService } from '../../services/carrito.service';
import { ClientesService } from '../../services/clientes.service';
import { take } from 'rxjs';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  cliente:Cliente
  userLogueado=localStorage.getItem('mail')
  
   constructor(public generalService:GeneralService, private carritoService:CarritoService, private clienteService: ClientesService, private router: Router){

   }

  ngOnInit(){
  this.getCliente()
  }

  getCliente(){
    this.generalService.getCliente().subscribe(cliente => {
      this.cliente = cliente;
    });
  }

  //FUNCION PARA DISMINUIR EN UNO LA CANTIDAD DEL PRODUCTO EN EL CARRO
  disminuirCantidad(producto: any): void {
    if (producto.cantidad > 1) {
      producto.cantidad--;
    }
    this.guardarCambiosCarrito()
    //this.carritoService.contadorProductos()
    this.carritoService.actualizarCantidadProductos(this.cliente)
  }

  //FUNCION PARA AUMENTAR EN UNO LA CANTIDAD DEL PRODUCTO EN EL CARRO
  aumentarCantidad(producto: any): void {
    producto.cantidad++;
    this.guardarCambiosCarrito()
    // this.carritoService.contadorProductos()
    this.carritoService.actualizarCantidadProductos(this.cliente)
  }

  
  //ACTUALIZAR CAMBIOS EN EL CARRITO DEL CLINETE
  guardarCambiosCarrito() {
     const cliente = this.cliente
     if (cliente) {
       this.clienteService.actualizarCliente(cliente.id, cliente)
         .then(() => console.log('Carrito actualizado al cerrar'))
         .catch(err => console.error('Error actualizando carrito:', err));
     }
  }


  eliminarDelCarrito(productoId: string) {
    console.log(this.cliente)
      const clienteEncontrado = this.cliente
      if (clienteEncontrado) {
        const clienteId = clienteEncontrado.id;
        this.carritoService.deleteProductoCarrito(clienteId, productoId).then(() => {
         
        });
      }
       this.clienteService.getClientes();
  }

  navigateCheckout(){
    // Forzar cierre manual quitando clases de Bootstrap
  document.body.classList.remove('offcanvas-backdrop', 'show');
  document.body.style.overflow = 'auto';

  this.router.navigate(['checkout']);
  this.cerrarCarrito();
  }

  cerrarCarrito() {
    const offcanvasElement = document.getElementById('offcanvasCarrito');
    if (offcanvasElement) {
      const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
      offcanvasInstance?.hide();
    }
  }

}

  
  // getClienteLogueado(){
  //     this.carritoService.obtenerClienteLogueado().subscribe((clientes) => {
  //       this.clientes = clientes;
  //       console.log("cliente logueado",this.clientes)
  //     });
  //   }


