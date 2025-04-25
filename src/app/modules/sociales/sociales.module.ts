import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactoComponent } from './components/contacto/contacto.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';



@NgModule({
  declarations: [
    ContactoComponent,
    NosotrosComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SocialesModule { }
