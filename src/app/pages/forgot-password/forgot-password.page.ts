import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/Services/auth.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.page.html",
  styleUrls: ["./forgot-password.page.scss"],
})
export class ForgotPasswordPage implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit() {}


 
}
