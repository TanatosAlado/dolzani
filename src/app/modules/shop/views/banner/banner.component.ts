import { Component } from '@angular/core';
import { BannerService } from 'src/app/modules/admin/service/banner.service';

declare var bootstrap: any;

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {

  imagenes: { nombre: string, url: string }[] = [];


  constructor(private bannerService: BannerService) { }

  ngOnInit(): void {
    this.cargarImagenes();
  }

  async cargarImagenes() {
    this.imagenes = await this.bannerService.listarArchivos('uploads');

    // Esperamos un "tick" para que Angular pinte el DOM actualizado
    setTimeout(() => {
      const el = document.querySelector('#bannerCarousel');
      if (el) {
        const carousel = bootstrap.Carousel.getOrCreateInstance(el, {
          interval: 3000,
          ride: 'carousel',
          pause: false
        });
        carousel.cycle();
      }
    });
  }


}
