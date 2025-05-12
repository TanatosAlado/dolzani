import { Component } from '@angular/core';
import { BannerService } from 'src/app/modules/admin/service/banner.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {

  imagenes: { nombre: string, url: string }[] = [];

  constructor(private bannerService: BannerService) {}

  ngOnInit(): void {
    this.cargarImagenes();
  }


  async cargarImagenes() {
    // Asegurate que coincida con la carpeta usada en el upload
    this.imagenes = await this.bannerService.listarArchivos('uploads');
  }


}
