import { ChangeDetectorRef, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Pedido } from 'src/app/shared/models/pedido.model';
import { PedidosService } from 'src/app/shared/services/pedidos.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTabChangeEvent } from '@angular/material/tabs';



@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent {

  showTablaPedido: boolean = true;
  activeTab: number = 1;
  datasourcePedidosPendientes: MatTableDataSource<Pedido>
  datasourcePedidosFinalizados: MatTableDataSource<Pedido>
  pedidoEncontrado: any = null;
  pedidosPendientes: Pedido[] = []
  pedidosFinalizados: Pedido[] = []
  showCarroPedido:boolean=false
  showFormPedido:Boolean=false
  showDeleteCarro:boolean=true
  columnsProductos: string[] = ['imagen', 'marca', 'nombre', 'rubro', 'subRubro','precio', 'acciones']
  columnsClientes: string[] = ['apellido','dni', 'mail', 'celular', 'direccion', 'acciones']
  columnsPedidosPendietes: string[] = ['hora', 'usuario', 'celular','direccion','entrega', 'pago','total', 'acciones']
  columnsPedidosFinalizados: string[] = ['hora', 'usuario', 'celular','direccion','entrega', 'pago','total', 'acciones']


  showFormAgregarProducto: boolean = false
  showTablaVerProducto: boolean = false
  showFormAgregarCliente: boolean = false
  showTablaVerCliente: boolean = false

  @ViewChild('paginatorPendientes') paginatorPendientes!: MatPaginator;
  @ViewChild('paginatorFinalizados') paginatorFinalizados!: MatPaginator;



  constructor(private pedidosService: PedidosService, private toastService: ToastService, private cdRef: ChangeDetectorRef){}

  ngOnInit(){
    this.getPedidos()
  }

  ngAfterViewInit() {
  if (this.datasourcePedidosPendientes) {
    this.datasourcePedidosPendientes.paginator = this.paginatorPendientes;
  }

  if (this.datasourcePedidosFinalizados) {
    this.datasourcePedidosFinalizados.paginator = this.paginatorFinalizados;
  }
}

  applyFilter(event: Event, datasource: MatTableDataSource<any>) {
    const filterValue = (event.target as HTMLInputElement).value;
    datasource.filter = filterValue.trim().toLowerCase();
  }

  //FUNCION PARA MOSTRAR LA TABLA CON EL PEDIDO DEL CLIENTE
  showCarritoPedidoPendiente(id:any){
     this.pedidoEncontrado = this.pedidosPendientes.find(p => p.id === id);
    console.log("pedido pendiente",this.pedidoEncontrado)
   this.showTablaPedido=false
   this.showCarroPedido=true
   this.showFormPedido=true
   this.showDeleteCarro=true
   this.activeTab=1
  }

    //FUNCION PARA MOSTRAR LA TABLA CON EL PEDIDO DEL CLIENTE
  showCarritoPedidoFinalizado(id:any){
  this.pedidoEncontrado = this.pedidosFinalizados.find(p => p.id === id);
    console.log("pedido finalizado",this.pedidoEncontrado)
   this.showTablaPedido=false
   this.showCarroPedido=true
   this.showFormPedido=true
   this.showDeleteCarro=false
   this.activeTab=2
  }

  //FUNCION PARA ELIMINAR UN PEDIDO ESPECIFICO
  deletePedido(id: string, tabla: string) {
    this.pedidosService.deletePedidoById(id, tabla)
  }

  getPedidos() {
    // Pedidos Pendientes
    this.pedidosService.getPedidos('Pedidos Pendientes');
    this.pedidosService.pedidoPendiente$.subscribe(data => {
      this.pedidosPendientes = data;
      this.datasourcePedidosPendientes = new MatTableDataSource(this.pedidosPendientes);
      this.cdRef.detectChanges();
      this.datasourcePedidosPendientes.paginator = this.paginatorPendientes;
    });
  
    // Pedidos Finalizados
    this.pedidosService.getPedidos('Pedidos Finalizados');
    this.pedidosService.pedidoFinalizado$.subscribe(data => {
      this.pedidosFinalizados = data;
      this.datasourcePedidosFinalizados = new MatTableDataSource(this.pedidosFinalizados);
      this.cdRef.detectChanges();
      this.datasourcePedidosFinalizados.paginator = this.paginatorFinalizados;
    });
  }

  showBodyProductos() {
    this.showFormAgregarProducto = false
    this.showTablaVerProducto = true
    this.showFormAgregarCliente = false
    this.showTablaVerCliente = false
}

activarEdicion(carro: any) {
    carro.editandoCantidad = true;
}

//FUNCION PARA DESHABILITAR EL INPUT PARA CAMBIAR CANTIDAD DE PRODUCTOS
  desactivarEdicion(carro: any) {
    carro.editandoCantidad = false;
    this.actualizarTotal();
    this.updatePedidoCarrito()
    
  }
  
  actualizarTotal() {
    if (!this.pedidoEncontrado || !this.pedidoEncontrado.carrito) return;
  
    let nuevoTotal = 0;
    for (let item of this.pedidoEncontrado.carrito) {
      nuevoTotal += item.precioFinal * item.cantidad;
    }
  
    this.pedidoEncontrado.total = nuevoTotal;
  }
  
  //FUNCION PARA ACTUALIZAR EL PEDIDO DEL CARRO EN ADMIN
  updatePedidoCarrito(){
   // Actualizar en Firestore
   this.pedidosService.updateCarroEnPedido(this.pedidoEncontrado.id, this.pedidoEncontrado.carrito)
   .then(() => {
     console.log('Cantidad actualizada en Firestore');
   })
   .catch(err => {
     console.error('Error actualizando la cantidad', err);
   });
  }

// FUNCION PARA MOSTRAR LA TABLA DEL CUERPO PRODUCTO Y OCULTAR LAS DEMAS
  showBodyPedidos() {
     if (this.pedidoEncontrado?.carrito?.length) {
    this.pedidoEncontrado.carrito.forEach((carro: any) => {
      this.desactivarEdicion(carro);
    });
  }
    this.showFormAgregarProducto = false
    this.showTablaVerProducto = true
    this.showTablaPedido=true
    this.showFormPedido=false
    // this.activeTab=2
  }

  //FUNCION PARA ELIMINAR EL PEDIDO DE UN CARRITO
  eliminarProductoCarro(carro: any) {
    const idPedido = this.pedidoEncontrado.id;
    const idProducto = carro.id;
  
    this.pedidosService.deleteProductoDelCarrito(idPedido, idProducto)
      .then(() => {
        this.toastService.toatsMessage('Producto eliminado con éxito', 'green',2000);
        this.pedidoEncontrado.carrito = this.pedidoEncontrado.carrito.filter((p: { id: any; }) => p.id !== idProducto);
        if (this.pedidoEncontrado.carrito.length === 0) {
          this.showCarroPedido = false;
          this.toastService.toatsMessage('Producto eliminado con éxito', 'green',2000);
        } else {
          this.pedidoEncontrado.total = this.pedidoEncontrado.carrito.reduce(
            (acc: number, producto: any) => acc + producto.precioFinal * producto.cantidad, 0
          );
        }
      })
      .catch((error) => {
        console.error('Error al eliminar producto:', error);
        this.toastService.toatsMessage('Producto eliminado con éxito', 'red',2000);
      });
  }

  moverDocumento(id: string, origen: string, destino: string){
    this.pedidosService.moverDocumento(id,origen,destino)
      .then(() => {
        if(origen == 'Pedidos Finalizados'){
          this.toastService.toatsMessage('Pedido recuperado con éxito', 'green',2000);
        }else{
          this.toastService.toatsMessage('Pedido finalizado con éxito', 'green',2000);
        }
        this.getPedidos();
      })

  }


onTabChange(event: MatTabChangeEvent) {
  this.cdRef.detectChanges();

  if (event.index === 0) {
    this.datasourcePedidosPendientes.paginator = this.paginatorPendientes;
  } else if (event.index === 1) {
    this.datasourcePedidosFinalizados.paginator = this.paginatorFinalizados;
  }
}

}