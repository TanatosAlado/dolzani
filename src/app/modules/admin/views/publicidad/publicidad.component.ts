import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { reduce } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { PublicidadService } from 'src/app/shared/services/publicidad.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-publicidad',
  templateUrl: './publicidad.component.html',
  styleUrls: ['./publicidad.component.css']
})
export class PublicidadComponent {


  archivosSeleccionados: any = {
    derecha: null,
    izquierda: null
  };
  urlBotones: any = {
  izquierda: '',
  derecha: ''
};

  subiendo: any = {
    derecha: false,
    izquierda: false
  };

  urls: any = {
    derecha: null,
    izquierda: null
  };

  listas: any = {
    derecha: [],
    izquierda: []
  };

  constructor(private publicidadService: PublicidadService,private dialog: MatDialog, private toastService:ToastService) { }

  ngOnInit(): void {
    this.cargarArchivos('derecha');
    this.cargarArchivos('izquierda');
  }

  // 📂 seleccionar archivo
  onFileSelected(event: any, tipo: 'derecha' | 'izquierda') {
    this.archivosSeleccionados[tipo] = event.target.files[0];
  }

  // ☁️ subir archivo
async subirArchivo(tipo: 'derecha' | 'izquierda') {

  if (this.listas[tipo].length > 0) {
    this.toastService.toatsMessage(`Ya existe una publicidad ${tipo}`,"red",2000);
    return;
  }

  const file = this.archivosSeleccionados[tipo];

  if (!file) return;

  try {

    this.subiendo[tipo] = true;

    const path = `publicidad/${tipo}/${Date.now()}_${file.name}`;

    const url = await this.publicidadService.uploadFile(file, path);

    this.urls[tipo] = url;

    // ✅ validar URL
    let urlBoton = this.urlBotones[tipo];

    if (
      !urlBoton.startsWith('http://') &&
      !urlBoton.startsWith('https://')
    ) {
      urlBoton = 'https://' + urlBoton;
    }

    await this.publicidadService.guardarInfoImagen({
      tipo: tipo,
      nombreImagen: file.name,
      urlImagen: url,
      urlBoton: urlBoton,
      ruta: path
    });

    this.cargarArchivos(tipo);

  } catch (error) {

    console.error('Error al subir:', error);

  } finally {

    this.subiendo[tipo] = false;
  }
}

  // 📄 listar
  async cargarArchivos(tipo: 'derecha' | 'izquierda') {
    const data = await this.publicidadService.listarImagenes();
    this.listas[tipo] = data.filter(x => x.tipo === tipo);
  }
// ❌ eliminar
eliminar(archivo: any) {

  this.dialog.open(ConfirmDialogComponent, {
    data: {
      message: `¿Deseás eliminar la publicidad "${archivo.nombreImagen}"?`,

      confirmAction: async () => {

        await this.publicidadService.eliminarArchivo(
          archivo.ruta,
          archivo.id
        );

        this.cargarArchivos(archivo.tipo);
      }
    }
  });

}

}
