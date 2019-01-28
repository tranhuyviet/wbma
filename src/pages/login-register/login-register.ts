import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { HomePage } from '../home/home';
import { User } from '../../interfaces/pic';

@Component({
  selector: 'page-login-register',
  templateUrl: 'login-register.html',
})
export class LoginRegisterPage {

  user: User = { username: null };
  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaProvider: MediaProvider, public alertCtrl: AlertController) {
  }


  login() {
    this.mediaProvider.login(this.user).subscribe(
      response => {
        // console.log(response);
        this.mediaProvider.loggedIn = true;
        // save token to localstorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('user_id', response.user.user_id.toString());
        localStorage.setItem('username', response.user.username);
        localStorage.setItem('email', response.user.email);
        // move to home page (navCtrl)
        this.navCtrl.setRoot(HomePage).catch(err => { console.log(err); });
        console.log('token:', localStorage.getItem('token'));
      },
      error => {
        console.log(error);
      }
    );
  }

  // TODO: register method
  register() {
    let userAvailable: boolean;
    this.mediaProvider.checkUserExist(this.user.username).subscribe((result: any) => {
      // console.log(result.available);
      userAvailable = result.available;
      if (userAvailable) { // user is not exist, can create new user
        // console.log('create user');
        this.mediaProvider.register(this.user).subscribe((res: any) => {
          console.log(res);
          if (res.message === 'User created successfully') {
             console.log('go to home');
             // this.navCtrl.push(HomePage);
             this.login();
          }
        });
      } else { // user is exist, cannot create
        console.log('user exist');
        const alert = this.alertCtrl.create({
          title: 'User exist!',
          subTitle: 'Please enter another user name!',
          buttons: ['OK']
        });
        alert.present().catch(err => {
          console.log(err);
        });
      }
    });
  }
}
