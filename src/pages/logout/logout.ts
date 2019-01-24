import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { HomePage } from '../home/home';
import { LoginRegisterPage } from '../login-register/login-register';

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage implements OnInit {

  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaProvider: MediaProvider) {
  }

  ngOnInit() {
    this.mediaProvider.loggedIn = false;
    localStorage.clear();
    this.navCtrl.setRoot(LoginRegisterPage);
  }

}
