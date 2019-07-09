import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErgoApiService } from 'src/app/services/ergo-api.service';
import { ToastController } from '@ionic/angular';
import { Note } from 'src/app/models/note.model';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.page.html',
  styleUrls: ['./add-note.page.scss'],
})
export class AddNotePage implements OnInit {
  public isChecked = false;
  public titulo: string;
  public fechaLim: string;
  public contenido: string;

  constructor(
    private router: Router,
    private ergoApi: ErgoApiService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
  }

  async presentToast(message: string, button) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      buttons: [
        button
      ]
    });
    toast.onDidDismiss().finally(() => {
      this.router.navigate(['home']);
    });
    toast.present();
  }

  saveNote() {
    console.log(this.titulo)
    if (!this.titulo) {
      this.presentToast("No se puede dejar el titulo vacio.", {
        text: 'Aceptar'
      });
    } else {
      this.fechaLim = this.fechaLim !== 'undefined' || this.fechaLim !== null ? this.fechaLim : '';
      this.contenido = this.contenido !== 'undefined' || this.contenido !== null ? this.contenido : '';

      this.ergoApi.addNote(new Note(this.titulo, this.contenido, this.fechaLim, '', false))
        .subscribe(response => {
          this.presentToast("Nota agregada.", {
            text: 'Aceptar'
          });
          this.isChecked = false;
          this.titulo = '';
          this.fechaLim = '';
          this.contenido = '';
        }, err => {

        });
    }
  }

  regresarHome() {
    this.router.navigate(['home'])
  }

}
