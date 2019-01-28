import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { LoginRegisterPage } from '../login-register/login-register';
import { ProfilePage } from '../profile/profile';
import { MediaProvider } from '../../providers/media/media';


@Component({
  selector: 'page-menu',
  template: `
    <ion-tabs selectedIndex="1">
      <ion-tab [root]="homePage" tabTitle="Home" tabIcon="home"></ion-tab>
      <ion-tab [show]="!this.mediaProvider.loggedIn" [root]="loginPage" tabTitle="Login" tabIcon="person"></ion-tab>
      <ion-tab [show]="this.mediaProvider.loggedIn" [root]="profilePage" tabTitle="Profile" tabIcon="contact"></ion-tab>
    </ion-tabs>`
})
export class MenuPage {
  homePage = HomePage;
  loginPage = LoginRegisterPage;
  profilePage = ProfilePage;


  constructor(public mediaProvider: MediaProvider) {}


}
