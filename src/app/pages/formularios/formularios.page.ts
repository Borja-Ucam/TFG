import { DatePipe, formatDate, registerLocaleData } from '@angular/common';
import { Component, LOCALE_ID, NgModule, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

import localeEs from 'node_modules/@angular/common/locales/es';
registerLocaleData(localeEs, 'es');

@Component({
  selector: "app-formularios",
  templateUrl: "./formularios.page.html",
  styleUrls: ["./formularios.page.scss"],
})
@NgModule({
  providers: [{provide: LOCALE_ID, useValue: 'es'}],
  exports: []

})
export class FormulariosPage implements OnInit {
  submitted = false;

  checked: Boolean;

  aceptado: Boolean;
  idUser: string = null;
  today: string = null;

  constructor(public modalController: ModalController) {}

  ngOnInit() {
    this.aceptado = false;
  }

  enlace() {
    window.open(
      "https://drive.google.com/file/d/1R115VmbKofXSOw6fqMdTneMvo0bQpNx7/view?usp=sharing",
      "_system"
    );
  }

  dismiss() {
    //this.today = new Date();

    console.log("ACEPTADO: "+this.aceptado);

    if (this.aceptado) {
      sessionStorage.setItem("idUser",this.idUser);
      
      //let dateFormat = require("dateformat");
      let now = new Date();
      this.today = formatDate(now, "dd/MM/yyyy HH:mm:ss", 'es');
      //console.log(this.today);
      //console.log(now.toString());

      sessionStorage.setItem("date", this.today);
      console.log("date " + sessionStorage.getItem("date"));
      console.log("idUser " + sessionStorage.getItem("idUser"));

      this.modalController.dismiss({
        dismissed: true,
        resultado: true,
      });
    } else {
      alert("Debe aceptar los terminos y condiciones.");
    }
  }

  cerrar() {
    this.modalController.dismiss({
      dismissed: false,
      resultado: false,
    });
  }
}
