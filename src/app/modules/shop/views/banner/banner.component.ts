import { Component } from '@angular/core';
import { BannerService } from 'src/app/modules/admin/service/banner.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {

  imagenes: any[] = [];

  constructor(private bannerService: BannerService) {}

    ngOnInit(): void {
    this.imagenes = this.bannerService.obtenerImagenes();
  }

}
