import { User } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login(form){
    this.authService.login(form.value.email, form.value.password).subscribe(response => {
      if (response.foundUser && response.token) {
        var x = new User(
          response.foundUser._id,
          response.foundUser.name,
          response.foundUser.username,
          response.foundUser.email,
          response.token
        )
        this.authService.setUserValue(JSON.stringify(x))
        this.goToHome();
      } else {
      }
    });

    this.goToHome();
  }

  goToHome() {
    this.router.navigate(['home']);
    this.router.navigateByUrl('/home/my-notes');
  }

  public registro() {
    this.router.navigate(['sign-up']);
  }

}
