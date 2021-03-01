import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NavController } from "@ionic/angular";

import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from "@angular/fire/database";
import { PreguntasService, preg } from "../../Services/preguntas.service";
import { ImagesService, image, food } from "../../Services/images.service";
import { Router } from "@angular/router";

@NgModule({
  imports: [FormsModule],
})
@Component({
  selector: "app-paired-test",
  templateUrl: "./paired-test.page.html",
  styleUrls: ["./paired-test.page.scss"],
})
export class PairedTestPage implements OnInit {
  public imageArrHFSA: any = [];
  public imageArrHFSW: any = [];
  public imageArrLFSA: any = [];
  public imageArrLFSW: any = [];

  constructor(
    public loadingController: LoadingController,
    public imagenes: ImagesService,
    private router: Router
  ) {
    this.imageArrHFSA = new Array();
    this.imageArrHFSW = new Array();
    this.imageArrLFSA = new Array();
    this.imageArrLFSW = new Array();
  }

  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
    console.log("Saliendo...");
  }

  ngOnInit() {
    if (sessionStorage.getItem("imageArrHFSA")) {
      this.imageArrHFSA = JSON.parse(sessionStorage.getItem("imageArrHFSA"));
      this.imageArrHFSA = this.imageArrHFSA.filter(
        (element) => element.available
      );
    } else {
      this.imagenes.getImageHFSA().subscribe((food) => {
        this.imageArrHFSA = food.filter((element) => element.available);
        console.log("hfsa: " + JSON.stringify(this.imageArrHFSA));
      });
    }

    if (sessionStorage.getItem("imageArrHFSW")) {
      this.imageArrHFSW = JSON.parse(sessionStorage.getItem("imageArrHFSW"));
      this.imageArrHFSW = this.imageArrHFSW.filter(
        (element) => element.available
      );
    } else {
      this.imagenes.getImageHFSW().subscribe((food) => {
        this.imageArrHFSW = food.filter((element) => element.available);
      });
    }

    if (sessionStorage.getItem("imageArrLFSA")) {
      this.imageArrLFSA = JSON.parse(sessionStorage.getItem("imageArrLFSA"));
      this.imageArrLFSA = this.imageArrLFSA.filter(
        (element) => element.available
      );
    } else {
      this.imagenes.getImageLFSA().subscribe((food) => {
        this.imageArrLFSA = food.filter((element) => element.available);
      });
    }

    if (sessionStorage.getItem("imageArrLFSW")) {
      this.imageArrLFSW = JSON.parse(sessionStorage.getItem("imageArrLFSW"));
      this.imageArrLFSW = this.imageArrLFSW.filter(
        (element) => element.available
      );
    } else {
      this.imagenes.getImageLFSW().subscribe((food) => {
        this.imageArrLFSW = food.filter((element) => element.available);
      });
    }
  }
  nomostrar = "hide";
  enunciado = "";
  urli = "";
  urld = "";
  showButton = true;
  showNext = true;
  showImagenes = false;

  //plantillas
  descanso: boolean = false;
  fin: boolean = false;
  checkClose: boolean = false;

  contadorPreg: number = 94;

  //mediciones de tiempo
  //before=null;
  before2 = null;
  after = null;
  tiempo = null;

  hideButtonComenzar = true;
  showButtonNext = false;

  randomI: number;
  randomD: number;
  idImagenI: string = "";
  idImagenD: string = "";

  mapHFSA = new Map();
  mapLFSW = new Map();
  mapHFSW = new Map();
  mapLFSA = new Map();

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: "Cargando...",
      duration: 2000,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log("Loading dismissed!");

    //llamada a funcion que empieza el test onclick()
    this.startTest();
  }

  startTest() {
    console.log("Test Comenzado!");

    this.nomostrar = "block";
    this.enunciado = "Elija el alimento que  desee más comer ahora";

    this.hideButtonComenzar = false;
    this.showButtonNext = true;

    this.calculateImage();

    this.startTimer();
    //console.time("t1");
  }

  startTimer() {
    this.before2 = null;
    this.before2 = Date.now();
  }

  nextQuestionLeft() {
    this.showImagenes = false;
    this.showNext = true;
    console.log("hola izquierda");

    this.after = Date.now();
    this.tiempo = (this.after - this.before2) / 1000;
    console.log(this.tiempo);
    //console.log((this.after-this.before)/1000);
    console.log("tiempooo IZQQQ: " + this.tiempo);

    if (this.contadorPreg == 32) {
      console.log("quieres parar loco?");
      /* this.mapHFSA = new Map();
      this.mapLFSW = new Map();
      this.mapHFSW = new Map();
      this.mapLFSA = new Map();*/

      this.descanso = true;
    } else if (this.contadorPreg == 64) {
      console.log("quieres parar loco?");
      /*this.mapHFSA = new Map();
      this.mapLFSW = new Map();
      this.mapHFSW = new Map();
      this.mapLFSA = new Map();*/

      this.descanso = true;
    } else if (this.contadorPreg == 96) {
      console.log("Fin");
      this.fin = true;
      return;
      //fin
    }
  }
  nextQuestionRight() {
    this.showImagenes = false;
    this.showNext = true;
    console.log("hola derecha");

    this.after = Date.now();
    this.tiempo = (this.after - this.before2) / 1000;
    console.log(this.tiempo);
    console.log("tiempooo DERECC: " + this.tiempo);

    if (this.contadorPreg == 32) {
      console.log("quieres parar loco?");
      /* this.mapHFSA = new Map();
      this.mapLFSW = new Map();
      this.mapHFSW = new Map();
      this.mapLFSA = new Map();*/

      this.descanso = true;
    } else if (this.contadorPreg == 64) {
      console.log("quieres parar loco?");
      /*this.mapHFSA = new Map();
      this.mapLFSW = new Map();
      this.mapHFSW = new Map();
      this.mapLFSA = new Map();*/

      this.descanso = true;
    } else if (this.contadorPreg == 96) {
      console.log("Fin");
      this.fin = true;
      //fin
      return;
    }
  }

  next() {
    this.showImagenes = true;
    this.showNext = false;
    this.calculateImage();
    this.startTimer();

    console.log("CONTADOR PREGUNTA: " + this.contadorPreg);

    this.contadorPreg++;
  }

  continuar() {
    this.descanso = false;
    //this.startTest();
  }
  salir() {
    if (this.checkClose) {
      this.router.navigateByUrl("home");
      sessionStorage.clear();
    } else {
      if(window.confirm('No ha guardado los cambios, ¿Está seguro que quiere salir?')){
        this.checkClose = true
        sessionStorage.clear();
        this.router.navigateByUrl("");
      }
    }
  }

  save() {
    this.checkClose = true;
  }


// no se que es esto
  focusInput(input) {
    input.setFocus();
  }

  calculateImage() {
    //añadir imagen al html  ((izquierda))
    let randomI: number = Math.floor(
      Math.random() * Object.keys(this.imageArrHFSA).length
    );
    this.mapHFSA.set(this.imageArrHFSA[randomI], this.imageArrHFSA[randomI]);
    console.log(
      JSON.stringify(
        "aaaaaaa: " + JSON.stringify(this.imageArrHFSA[randomI].url)
      )
    );
    this.urli = this.imageArrHFSA[randomI].url;
    this.idImagenI = this.imageArrHFSA[randomI].id;

    //añadir imagen al html  ((derecha))
    let randomD: number = Math.floor(
      Math.random() * Object.keys(this.imageArrLFSW).length
    );
    this.mapHFSA.set(this.imageArrLFSW[randomD], this.imageArrLFSW[randomD]);
    //console.log(JSON.stringify('aaaaaaa: '+this.selectedHFSA))
    this.urld = this.imageArrLFSW[randomD].url;
    this.idImagenD = this.imageArrHFSA[randomD].id;
  }

  async loadingImages() {
    const loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      spinner: "dots",
      duration: 500,
      keyboardClose: false,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log("Loading dismissed!");
    this.next();
  }
}
