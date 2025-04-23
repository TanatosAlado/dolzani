import { Component } from '@angular/core';

@Component({
  selector: 'app-destacados',
  templateUrl: './destacados.component.html',
  styleUrls: ['./destacados.component.css'],
})
export class DestacadosComponent {
  destacados = [
    {
      nombre: 'LIMON KG',
      descripcion: '1KG = 6 UNIDADES',
      imagenUrl:
        'https://http2.mlstatic.com/D_NQ_NP_823642-MLA72062329503_102023-O.webp',
      precioOriginal: 1299,
      precioConDescuento: 999,
      descuento: 23,
    },
    {
      nombre: 'TOMATE REDONDO',
      descripcion: '1KG = 4 UNIDADES',
      imagenUrl:
        'https://cdn.pixabay.com/photo/2016/03/05/19/02/tomatoes-1238252_1280.jpg',
      precioOriginal: 1090,
      precioConDescuento: 850,
      descuento: 22,
    },
    {
      nombre: 'BANANA KG',
      descripcion: '1KG = 5 UNIDADES',
      imagenUrl:
        'https://http2.mlstatic.com/D_NQ_NP_813665-MLA82651866168_032025-O.webp',
      precioOriginal: 980,
      precioConDescuento: 770,
      descuento: 21,
    },
    {
      nombre: 'MANZANA ROJA',
      descripcion: '1KG = 6 UNIDADES',
      imagenUrl:
        'https://http2.mlstatic.com/D_NQ_NP_692232-MLA72462105149_102023-O.webp',
      precioOriginal: 1350,
      precioConDescuento: 999,
      descuento: 26,
    },
    {
      nombre: 'ZANAHORIA KG',
      descripcion: '1KG = 8 UNIDADES',
      imagenUrl:
        'https://http2.mlstatic.com/D_NQ_NP_717033-MLA83361554771_032025-O.webp',
      precioOriginal: 890,
      precioConDescuento: 690,
      descuento: 22,
    },
  ];
}
