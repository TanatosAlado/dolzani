import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Producto } from 'src/app/shared/models/producto.model';
import { ProductosService } from 'src/app/shared/services/productos.service';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css']
})
export class FormProductoComponent implements OnInit {
  productoForm!: FormGroup;

  constructor(
  @Inject(MAT_DIALOG_DATA) public data: { rubros: string[], subrubros: string[], marcas: string[] },
  private fb: FormBuilder,
  private productosService: ProductosService,
  private dialogRef: MatDialogRef<FormProductoComponent>
) {}

  rubros: string[] = [];
  subrubros: string[] = [];
  marcas: string[] = [];
  rubrosFiltrados: string[] = [];
  subrubrosFiltrados: string[] = [];
  marcasFiltradas: string[] = []

  ngOnInit(): void {
    if (this.data) {
      this.rubros = this.data.rubros || [];
      this.subrubros = this.data.subrubros || [];
      this.marcas = this.data.marcas || [];
    }
    // this.rubros = this.data.rubros;  // Recibe rubros
    // this.subrubros = this.data.subrubros;  // Recibe subrubros
    this.productoForm = this.fb.group({
      id: ['1'],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      rubro: ['', Validators.required],
      subrubro: ['', Validators.required],
      marca: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      destacado: [false],
      imagen: [''],
      cantidad: [1],
      oferta: [false, Validators.required],
      precioOferta: [{ value: 0, disabled: true }],
      impuestoNacional: [false, Validators.required],
      precioImpuestoNacional: [{ value: 0, disabled: true }],
    });

    this.setupAutocomplete();
    this.setupConditionalFields();
  }

  setupConditionalFields(): void {
    this.productoForm.get('oferta')?.valueChanges.subscribe((oferta) => {
      const precioOferta = this.productoForm.get('precioOferta');
      if (oferta) {
        precioOferta?.enable();
        precioOferta?.setValidators([Validators.required, Validators.min(0)]);
      } else {
        precioOferta?.disable();
        precioOferta?.clearValidators();
        precioOferta?.setValue(0);
      }
      precioOferta?.updateValueAndValidity();
    });

    this.productoForm.get('impuestoNacional')?.valueChanges.subscribe((impuesto) => {
      const precioImp = this.productoForm.get('precioImpuestoNacional');
      if (impuesto) {
        precioImp?.enable();
        precioImp?.setValidators([Validators.required, Validators.min(0)]);
      } else {
        precioImp?.disable();
        precioImp?.clearValidators();
        precioImp?.setValue(0);
      }
      precioImp?.updateValueAndValidity();
    });
  }

  onSubmit() {
    if (this.productoForm.valid) {
      const producto: Producto = this.productoForm.value;

      producto.rubro = producto.rubro.toUpperCase();
      producto.subrubro = producto.subrubro.toUpperCase();
      producto.marca = producto.marca.toUpperCase();

      this.productosService.agregarProducto(producto).then((docRef) => {
        producto.id = docRef.id; 
        return this.productosService.actualizarProducto(producto);    
    }).then(() => {
      this.dialogRef.close(producto); // cerramos el modal y devolvemos el producto actualizado
    });
    } else {
      this.productoForm.markAllAsTouched();
    }
  }

  setupAutocomplete(): void {
  this.productoForm.get('rubro')?.valueChanges.subscribe(valor => {
    const filtro = (valor || '').toUpperCase();
    this.rubrosFiltrados = this.rubros.filter(r => r.includes(filtro));
  });

  this.productoForm.get('subrubro')?.valueChanges.subscribe(valor => {
    const filtro = (valor || '').toUpperCase();
    this.subrubrosFiltrados = this.subrubros.filter(s => s.includes(filtro));
  });

  this.productoForm.get('marca')?.valueChanges.subscribe(valor => {
    const filtro = (valor || '').toUpperCase();
    this.marcasFiltradas = this.marcas.filter(s => s.includes(filtro));
  });
}

filtrarSubrubros(): void {
  // lógica para filtrar los subrubros si lo necesitás
}

}
