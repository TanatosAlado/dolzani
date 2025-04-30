import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/shared/models/producto.model';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css']
})
export class FormProductoComponent implements OnInit {
  productoForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
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
      console.log('Producto creado:', producto);
      // Aquí podés emitir un evento, llamar a un servicio, etc.
    } else {
      this.productoForm.markAllAsTouched();
    }
  }

}
