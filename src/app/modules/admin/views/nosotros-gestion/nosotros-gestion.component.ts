import { Component } from '@angular/core';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NosotrosService } from 'src/app/shared/services/nosotros.service';
import { Nosotros } from 'src/app/shared/models/nosotros.models';

@Component({
  selector: 'app-nosotros-gestion',
  templateUrl: './nosotros-gestion.component.html',
  styleUrls: ['./nosotros-gestion.component.css']
})
export class NosotrosGestionComponent {
  archivoSeleccionado: File | null = null;
  descripcion: string = '';
  subiendo = false;
  urlArchivo: string | null = null;
  archivos: Nosotros[] = [];
  carpeta = 'Nosotros';

  constructor(private nosotrosService: NosotrosService, private dialog: MatDialog) {}


    ngOnInit() {
    this.cargarArchivos();
    
  }

//FUNCION PARA ELEIGR UNA IMAGEN
  onFileSelected(event: any) {
    this.archivoSeleccionado = event.target.files[0] || null;
    this.urlArchivo = null;
  }

 //FUNCOIN PARA SUBIR UN ARCHIVO
async subirArchivo() {
  if (!this.archivoSeleccionado || !this.descripcion.trim()) return;

  this.subiendo = true;
  const nombreImagen=`${Date.now()}_${this.archivoSeleccionado.name}`
  const filePath = `${this.carpeta}/${nombreImagen}`;

  try {
    const url = await this.nosotrosService.uploadFile(this.archivoSeleccionado, filePath);
    this.urlArchivo = url;

    const idGenerado = await this.nosotrosService.guardarInfoImagen({
      descripcion: this.descripcion,
      nombreImagen: nombreImagen,
      urlImagen:this.urlArchivo
    });

    console.log('ID del documento guardado:', idGenerado);

    this.descripcion = '';
    this.archivoSeleccionado = null;
    await this.cargarArchivos();

  } catch (error) {
    console.error('Error al subir el archivo:', error);
  }

  this.subiendo = false;
}
abrirImagen(url: string): void {
  window.open(url, '_blank');
}


  //FUNCION PARA CARGAR LOS ARCHIVOS
  async cargarArchivos() {
    this.archivos = await this.nosotrosService.listarImagenes();
    console.log(this.archivos)
  }

  //FUNCION PARA ELIMINAR UN ARCHIVO
  eliminar(archivo: Nosotros) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: `¿Deseás eliminar el archivo "${archivo.nombreImagen}"?`,
        confirmAction: async () => {
          await this.nosotrosService.eliminarArchivo(archivo.urlImagen, archivo.id!);
          this.cargarArchivos();
        }
      }
    });
  }


}



