import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { NgModule } from "@angular/core";
import { HomePage } from "../home/home";
import { Http, Headers } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { User, LoginResponse, UsernameResponse } from "../../interfaces/pic";
import { MediaProvider } from "../../providers/media/media";
import { NgForm } from "@angular/forms";

@IonicPage()
@Component({
  selector: "page-login-register",
  templateUrl: "login-register.html"
})
export class LoginRegisterPage {
  user: User = { username: null };
  onRegister = false;
  usernameError = "";
  passwordError = "";
  emailError = "";

  constructor(
    public mediaprovider: MediaProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient
  ) {}
  ngOnInit() {
    this.checkLogin();
  }
  checkLogin() {
    if (localStorage.getItem("token")) {
      this.navCtrl.push(HomePage);
    }
  }
  loginClicked(formSignIn) {
    console.log(formSignIn);
    this.mediaprovider.login(this.user).subscribe(
      (response: LoginResponse) => {
        console.log("response");
        console.log(response);
        localStorage.setItem("token", response.token);
        this.navCtrl.push(HomePage);
        this.mediaprovider.token = response.token;
        this.mediaprovider.loggedIn = true;
        this.mediaprovider.user_id = response.user.user_id;
        console.log("user.id: " + this.mediaprovider.user_id);
      },
      error => {
        console.log(error);
      }
    );
  }
  //thanhvl@metropolia.fi

  registerClicked(formSignUp) {
    console.log(formSignUp);

    if (formSignUp.valid) {
      this.mediaprovider.checkIfUserExists(this.user).subscribe(
        (response: UsernameResponse) => {
          console.log("res :", response);
          console.log("user :", this.user);

          if (response.available) {
            this.mediaprovider.register(this.user).subscribe(
              (response: LoginResponse) => {
                localStorage.setItem("token", response.token);
                this.navCtrl.push(HomePage);
                console.log(response);
              },
              error => {
                console.log(error);
              }
            );
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  openRegisterForm() {
    this.onRegister = true;
  }

  checkUsername() {
    this.usernameError = "";
    if (this.user.username != null) {
      if (this.user.username.length < 3) {
        this.usernameError = "The username should be more than 3 characters.";
      } else {
        this.mediaprovider.checkIfUserExists(this.user).subscribe(
          (response: UsernameResponse) => {
            console.log(response);
            if (!response.available) {
              this.usernameError = "this username is not available!";
            }
          },
          error => {
            console.log(error);
          }
        );
      }
    } else {
      this.usernameError = "please, enter the usernam";
    }
  }

  checkPassword() {
    this.passwordError = "";

    if (this.user.password == null) {
      this.passwordError = "Please, enter your password";
    } else if (this.user.password.length < 5) {
      this.passwordError = "The username should be more than 5 characters.";
    }
    if (this.user.password !== this.user.password2) {
      this.passwordError += "These passwords do not match..";
    }
  }

  checkEmail(formSignUp) {
    this.emailError = "";
    console.log(formSignUp.controls.email.valid);
    if (this.user.email == null) {
      this.emailError = "Please, enter your Email";
    } else if (!formSignUp.controls.email.valid) {
      this.emailError = "Email error";
    } else this.emailError = "";
  }
}