import { Component } from '@angular/core';
import { BannerService } from '../../service/banner.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {

  // Banner principal
  archivoSeleccionadoPrincipal: File | null = null;
  subiendoPrincipal = false;
  urlArchivoPrincipal: string | null = null;
  archivosPrincipal: { nombre: string, url: string }[] = [];
  carpetaPrincipal = 'uploads';

  // Sub banner
  archivoSeleccionadoSub: File | null = null;
  subiendoSub = false;
  urlArchivoSub: string | null = null;
  archivosSub: { nombre: string, url: string }[] = [];
  carpetaSub = 'sub-banners';

  constructor(private bannerService: BannerService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.cargarArchivos('principal');
    this.cargarArchivos('sub');
  }

  onFileSelected(event: any, tipo: 'principal' | 'sub') {
    const file = event.target.files[0] || null;

    if (tipo === 'principal') {
      this.archivoSeleccionadoPrincipal = file;
      this.urlArchivoPrincipal = null;
    } else {
      this.archivoSeleccionadoSub = file;
      this.urlArchivoSub = null;
    }
  }

  subirArchivo(tipo: 'principal' | 'sub') {
    const archivo = tipo === 'principal' ? this.archivoSeleccionadoPrincipal : this.archivoSeleccionadoSub;
    const carpeta = tipo === 'principal' ? this.carpetaPrincipal : this.carpetaSub;

    if (!archivo) return;

    if (tipo === 'principal') this.subiendoPrincipal = true;
    else this.subiendoSub = true;

    const filePath = `${carpeta}/${Date.now()}_${archivo.name}`;

    this.bannerService.uploadFile(archivo, filePath)
      .then(url => {
        if (tipo === 'principal') {
          this.urlArchivoPrincipal = url;
          this.subiendoPrincipal = false;
        } else {
          this.urlArchivoSub = url;
          this.subiendoSub = false;
        }
        this.cargarArchivos(tipo);
      })
      .catch(error => {
        console.error('Error al subir el archivo:', error);
        if (tipo === 'principal') this.subiendoPrincipal = false;
        else this.subiendoSub = false;
      });
  }

  async cargarArchivos(tipo: 'principal' | 'sub') {
    if (tipo === 'principal') {
      this.archivosPrincipal = await this.bannerService.listarArchivos(this.carpetaPrincipal);
    } else {
      this.archivosSub = await this.bannerService.listarArchivos(this.carpetaSub);
    }
  }

  eliminar(tipo: 'principal' | 'sub', nombre: string) {
    const carpeta = tipo === 'principal' ? this.carpetaPrincipal : this.carpetaSub;

    this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: `¿Deseás eliminar el archivo "${nombre}" del ${tipo === 'principal' ? 'banner principal' : 'sub banner'}?`,
        confirmAction: async () => {
          await this.bannerService.eliminarArchivo(`${carpeta}/${nombre}`);
          this.cargarArchivos(tipo);
        }
      }
    });
  }
}