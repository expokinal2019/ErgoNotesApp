import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
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
  }

  public logearse() {
    this.router.navigate(['login']);
  }

  signUp(form){
    this.authService.signUp(form.value.email, form.value.password, form.value.name, form.value.username).subscribe(
      response => {
        if (response.user) {
          this.presentToast('Registro correcto, se puede logear.', 
          {
            side: 'end',
            icon: 'log-in',
            text: 'Login',
            handler: () => {
              this.router.navigate(['login'])
            }
          })
        } else {
          this.presentToast(response.error.message, null)
        }
      }, err => {
        console.log(err)
        this.presentToast(err.error.message || 'Ocurrio un error :(', null);
      }
    );
  }

}
