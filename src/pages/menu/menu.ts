import { Component, OnInit } from '@angular/core';

import { HomePage } from '../home/home';
import { LoginRegisterPage } from '../login-register/login-register';
import { LogoutPage } from '../logout/logout';
import { MediaProvider } from '../../providers/media/media';


@Component({
  selector: 'page-menu',
  template: `
    <ion-tabs selectedIndex="1">
      <ion-tab [root]="homePage" tabTitle="Home" tabIcon="home"></ion-tab>
      <ion-tab [show]="!this.mediaProvider.loggedIn" [root]="loginPage" tabTitle="Login" tabIcon="person"></ion-tab>
      <ion-tab [show]="this.mediaProvider.loggedIn" [root]="logoutPage" tabTitle="Logout" tabIcon="log-out"></ion-tab>
    </ion-tabs>`
})
export class MenuPage {
  homePage = HomePage;
  loginPage = LoginRegisterPage;
  logoutPage = LogoutPage;


  constructor(public mediaProvider: MediaProvider) {}


}
