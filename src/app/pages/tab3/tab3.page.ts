import { AuthenticationService } from './../../services/authentication.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ErgoApiService } from 'src/app/services/ergo-api.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public misTareas
  public colores = ['primary', 'secondary', 'tertiary', 'danger', 'success', 'warning', 'dark', 'medium'];

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private ergoApi: ErgoApiService
  ) { this.actualizarListaNotas() }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  actualizarListaNotas() {
    this.ergoApi.getAllTasks(this.authService.currentUserValue().name).subscribe(response => {
      var x = response as any;
      this.misTareas = x.tasks;
      console.log(this.misTareas)
    });
  }

  randomColor(): string {
    return this.colores[Math.floor(Math.random() * this.colores.length)];
  }

  doRefresh(event) {
    this.actualizarListaNotas();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

}
