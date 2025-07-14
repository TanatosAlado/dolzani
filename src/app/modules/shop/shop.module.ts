import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CarritoComponent } from './components/carrito/carrito.component';
import { LayoutComponent } from './components/layout/layout.component';
import { BannerComponent } from './views/banner/banner.component';
import { DestacadosComponent } from './views/destacados/destacados.component';
import { GrillaItemsComponent } from './views/grilla-items/grilla-items.component';
import { ItemComponent } from './views/item/item.component';
import { ListaRubrosComponent } from './views/lista-rubros/lista-rubros.component';

@NgModule({
  declarations: [
    CarritoComponent,
    BannerComponent,
    DestacadosComponent,
    GrillaItemsComponent,
    ItemComponent,
    LayoutComponent,
    ListaRubrosComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class ShopModule {}
