import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ErgoApiService } from 'src/app/services/ergo-api.service';
import { Note } from 'src/app/models/note.model';
import { ToastController, AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public misNotas: [Note];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private ergoApi: ErgoApiService,
    public toastController: ToastController,
    public alertController: AlertController
  ) { this.actualizarListaNotas(); }

  showAddNote() {
    this.router.navigate(['add-note'])
  }

  async presentToast(message: string, button) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      buttons: [
        button
      ]
    });
    toast.present();
  }

  actualizarListaNotas() {
    this.ergoApi.getAllNotes().subscribe(response => {
      var x = response as any;
      this.misNotas = x.notes;
    });
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  async delete(note: Note) {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: '¿Estás seguro que deseas <strong>ELIMINAR</strong> ésta nota?',
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'secondary'
        }, {
          text: 'Aceptar',
          cssClass: 'danger',
          handler: () => {
            this.ergoApi.deleteNote(note._id)
              .subscribe(response => {
                this.presentToast("Nota eliminada correctamente.", { text: 'Aceptar' });
                this.actualizarListaNotas();
              });
          }
        }
      ]
    });

    await alert.present();
  }

  changeFav(note: Note) {
    this.ergoApi.changeFavStatus(note._id, note.favorite)
      .subscribe(response => {
        this.actualizarListaNotas()
      });
  }

  doRefresh(event) {
    this.actualizarListaNotas();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

}
