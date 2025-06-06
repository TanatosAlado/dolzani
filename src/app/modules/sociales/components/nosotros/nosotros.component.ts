import { Component } from '@angular/core';
import { Nosotros } from 'src/app/shared/models/nosotros.models';
import { NosotrosService } from 'src/app/shared/services/nosotros.service';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent {

  nosotros: Nosotros[] = [];

constructor(private nosotrosService:NosotrosService){

}
ngOnInit(): void {
   this.getNosotros()
   
  }


  getNosotros(){
    this.nosotrosService.getNosotros();
    this.nosotrosService.nosotros$.subscribe(data => {
      this.nosotros = data;
    });
  }
}