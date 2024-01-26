import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MensagensService } from '../services/mensagens.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private mensagemService: MensagensService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    if ((Boolean(localStorage.getItem("userAuth")))) {
      const usuarioAutenticado = JSON.parse(localStorage.getItem("usuarioAutenticado")!);
      if (usuarioAutenticado.role != "Administrador") {
        this.mensagemService.addMensagemError("Acesso negado, consulte o administrador do sistema para mais informações.");
        this.router.navigate(["/home"]);
        return false;
      }
      return true;
    }
    this.router.navigate(["/login"]);
    return false;
  }
}
