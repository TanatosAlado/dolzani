import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { GeneralService } from 'src/app/shared/services/general.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private generalService: GeneralService, private router: Router) {}

  canActivate(): boolean {
    const cliente = this.generalService.getClienteActual(); // Obtener el cliente actual
    if (cliente && cliente.administrador) {
      return true; // El cliente es administrador
    } else {
      this.router.navigate(['/inicio']); // Redirigir si no es administrador
      return false;
    }
  }
}