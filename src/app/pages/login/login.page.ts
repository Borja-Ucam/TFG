import { image } from "./../../Services/images.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/Services/auth.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  login: FormGroup;
  constructor(private router: Router, 
    public authService: AuthService,
    public translate: TranslateService) {}

  ngOnInit() {
    this.login = new FormGroup({
      user: new FormControl(""),
      password: new FormControl(""),
    });
  }
  img = "assets/img/s.png";

  goReset() {
    this.router.navigateByUrl("/forgot-password");
  }
}
