import { Component } from '@angular/core';
import { BannerService } from 'src/app/modules/admin/service/banner.service';
import { PublicidadService } from 'src/app/shared/services/publicidad.service';

declare var bootstrap: any;

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  publicidadIzquierda: any = null;
  publicidadDerecha: any = null;

  mediaItems: { nombre: string, url: string, tipo: 'imagen' | 'video' }[] = [];

  subBannerItems: { nombre: string, url: string, tipo: 'imagen' | 'video' }[] = [];


  constructor(private bannerService: BannerService, private publicidadService: PublicidadService) { }

  ngOnInit(): void {
    this.cargarImagenes();
    this.cargarPublicidad();
  }

  private esVideo(ext: string): boolean {
    return ['mp4', 'webm', 'ogg'].includes(ext);
  }

  private esImagen(ext: string): boolean {
    return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext);
  }

  async cargarImagenes() {
    // Banner principal
    const archivos = await this.bannerService.listarArchivos('uploads');
    this.mediaItems = archivos.map(item => {
      const ext = item.nombre.split('.').pop()?.toLowerCase() || '';
      let tipo: 'imagen' | 'video' = this.esVideo(ext) ? 'video' : 'imagen';
      return { ...item, tipo };
    });

    // Sub banners
    const subArchivos = await this.bannerService.listarArchivos('sub-banners');
    this.subBannerItems = subArchivos.map(item => {
      const ext = item.nombre.split('.').pop()?.toLowerCase() || '';
      let tipo: 'imagen' | 'video' = this.esVideo(ext) ? 'video' : 'imagen';
      return { ...item, tipo };
    });

    // Inicia el carousel principal
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

  async cargarPublicidad() {

  const data = await this.publicidadService.listarImagenes();

  this.publicidadIzquierda =
    data.find(x => x.tipo === 'izquierda');

  this.publicidadDerecha =
    data.find(x => x.tipo === 'derecha');
}


}
