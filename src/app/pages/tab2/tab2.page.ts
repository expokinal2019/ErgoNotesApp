import { Component } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { Router } from '@angular/router';
import { ErgoApiService } from 'src/app/services/ergo-api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public misNotasFav: [Note];

  constructor(
    private router: Router,
    private ergoApi: ErgoApiService,
    private authService: AuthenticationService,
  ) { this.actualizarListaNotas(); }

  actualizarListaNotas() {
    this.ergoApi.getAllNotes().subscribe(response => {
      var x = response as any;
      this.misNotasFav = x.notes.filter(this.isFav);
    });
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  changeFav(note: Note) {
    this.ergoApi.changeFavStatus(note._id, note.favorite)
      .subscribe(response => {
        this.actualizarListaNotas()
      });
  }

  isFav(element, index, array) { 
    return (element.favorite === true); 
  } 

  doRefresh(event) {
    this.actualizarListaNotas();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}
