import { Component } from '@angular/core';
import { BannerService } from '../../service/banner.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {

  imagenes: any[] = [];
  nuevaImagen = { id: 0, url: '', orden: 0 };

  constructor(private bannerService: BannerService) {}

    ngOnInit(): void {
    this.imagenes = this.bannerService.obtenerImagenes();
  }

    agregarImagen() {
    this.bannerService.agregarImagen({ ...this.nuevaImagen });
    this.nuevaImagen = { id: 0, url: '', orden: 0 };
    this.imagenes = this.bannerService.obtenerImagenes();
  }

  eliminarImagen(id: number) {
    this.bannerService.eliminarImagen(id);
    this.imagenes = this.bannerService.obtenerImagenes();
  }

}
