import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopLayoutComponent } from './layout/shop-layout/shop-layout.component';
import { ItemsComponent } from './views/items/items.component';
import { CarritoComponent } from './carrito/carrito.component';



@NgModule({
  declarations: [
    ShopLayoutComponent,
    ItemsComponent,
    CarritoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ShopModule { }
