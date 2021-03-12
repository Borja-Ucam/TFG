import { PairedService } from "./../../Services/paired.service";
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
import { boolean, string, thomsonCrossSectionDependencies } from "mathjs";
import { RespuestaPaired } from "src/app/Classes/RespuestaPaired";
import { FirebaseUploadService } from "src/app/Services/firebaseUpload.service";

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

  respuestaMap: Map<String, number>;

  respuestas: Object;

  mapHFSA = new Map();
  mapLFSW = new Map();
  mapHFSW = new Map();
  mapLFSA = new Map();

  //recoger datos

  tiempoMedio: any;
  public tiempoIzq: any = [];
  public tiempoDer: any = [];
  //public nonChoiceIzq: any = [];
  //public nonChoiceDer: any = [];

  public CantidadTipoHFSA: string;
  public CantidadTipoHFSW: string;
  public CantidadTipoLFSA: string;
  public CantidadTipoLFSW: string;

  public nonChoiceHFSA: string;
  public nonChoiceHFSW: string;
  public nonChoiceLFSA: string;
  public nonChoiceLFSW: string;

  public tiempoTipoHFSA: any = [];
  public tiempoTipoHFSW: any = [];
  public tiempoTipoLFSA: any = [];
  public tiempoTipoLFSW: any = [];

  public nonChoiceTimeHFSA: any = [];
  public nonChoiceTimeHFSW: any = [];
  public nonChoiceTimeLFSA: any = [];
  public nonChoiceTimeLFSW: any = [];

  tiempoMedioHFSA: any;
  tiempoMedioHFSW: any;
  tiempoMedioLFSA: any;
  tiempoMedioLFSW: any;

  totalNonTimeHFSA: any;
  totalNonTimeHFSW: any;
  totalNonTimeLFSA: any;
  totalNonTimeLFSW: any;

  freqHFSA: any;
  freqHFSW: any;
  freqLFSA: any;
  freqLFSW: any;

  public idUser: string = null;
  public fecha: string = null;

  constructor(
    public loadingController: LoadingController,
    public imagenes: ImagesService,
    private router: Router,
    public pairedService: PairedService,
    public firebaseUpload: FirebaseUploadService

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
    //USUARIO QUE VIENE DEL MODAL DE INICIOOOOO
    this.idUser = sessionStorage.getItem("idUser");
    console.log("USUARIO DEL ID JEJEJE: " + this.idUser);

    this.fecha = sessionStorage.getItem("date");
    console.log("Fecha session: " + this.fecha);

    //inicializar datos
    this.tiempoMedio = "";

    this.CantidadTipoHFSA = "";
    this.CantidadTipoHFSW = "";
    this.CantidadTipoLFSA = "";
    this.CantidadTipoLFSW = "";

    this.nonChoiceHFSA = "";
    this.nonChoiceHFSW = "";
    this.nonChoiceLFSA = "";
    this.nonChoiceLFSW = "";

    this.tiempoMedioHFSA = "";
    this.tiempoMedioHFSW = "";
    this.tiempoMedioLFSA = "";
    this.tiempoMedioLFSW = "";

    this.totalNonTimeHFSA = "";
    this.totalNonTimeHFSW = "";
    this.totalNonTimeLFSA = "";
    this.totalNonTimeLFSW = "";

    this.freqHFSA = "";
    this.freqHFSW = "";
    this.freqLFSA = "";
    this.freqLFSW = "";

    this.respuestas = new Array<RespuestaPaired>();
    this.respuestaMap = new Map<String, number>();

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
  tipoi: string = "";
  tipod: string = "";
  showButton = true;
  showNext = true;
  showImagenes = false;

  //plantillas
  descanso: boolean = false;
  fin: boolean = false;
  checkClose: boolean = false;

  contadorPreg: number = 0;

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

    //this.calculateImage();

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
    this.tiempoIzq.push(this.tiempo);
    //this.nonChoiceDer.push(this.tiempo);

    console.log("TIPO izq: " + this.tipoi);

    if (this.tipoi == "HFSA") {
      this.CantidadTipoHFSA = this.pairedService.cantidad(this.tipoi);

      this.tiempoTipoHFSA.push(this.tiempo);
    }
    if (this.tipoi == "HFSW") {
      this.CantidadTipoHFSW = this.pairedService.cantidad(this.tipoi);
      this.tiempoTipoHFSW.push(this.tiempo);
    }
    if (this.tipoi == "LFSA") {
      this.CantidadTipoLFSA = this.pairedService.cantidad(this.tipoi);
      this.tiempoTipoLFSA.push(this.tiempo);
    }
    if (this.tipoi == "LFSW") {
      this.CantidadTipoLFSW = this.pairedService.cantidad(this.tipoi);
      this.tiempoTipoLFSW.push(this.tiempo);
    }

    //non choice
    if (this.tipod == "HFSA") {
      this.nonChoiceHFSA = this.pairedService.nonChoiceCantidad(this.tipod);
      this.nonChoiceTimeHFSA.push(this.tiempo);
    }
    if (this.tipod == "HFSW") {
      this.nonChoiceHFSW = this.pairedService.nonChoiceCantidad(this.tipod);
      this.nonChoiceTimeHFSW.push(this.tiempo);
    }
    if (this.tipod == "LFSA") {
      this.nonChoiceLFSA = this.pairedService.nonChoiceCantidad(this.tipod);
      this.nonChoiceTimeLFSA.push(this.tiempo);
    }
    if (this.tipod == "LFSW") {
      this.nonChoiceLFSW = this.pairedService.nonChoiceCantidad(this.tipod);
      this.nonChoiceTimeLFSW.push(this.tiempo);
    }

    console.log(
      "TIEMPO ELEGIDO: " +
        this.tiempoTipoHFSA +
        " TIEMPO NO ELEGIDO: " +
        this.nonChoiceTimeHFSA
    );
    console.log(
      "TIEMPO ELEGIDO: " +
        this.tiempoTipoHFSW +
        " TIEMPO NO ELEGIDO: " +
        this.nonChoiceTimeHFSW
    );
    console.log(
      "TIEMPO ELEGIDO: " +
        this.tiempoTipoLFSA +
        " TIEMPO NO ELEGIDO: " +
        this.nonChoiceTimeLFSA
    );
    console.log(
      "TIEMPO ELEGIDO: " +
        this.tiempoTipoLFSW +
        " TIEMPO NO ELEGIDO: " +
        this.nonChoiceTimeLFSW
    );

    console.log(
      "cantidad ELEGIDO: " +
        this.CantidadTipoHFSA +
        " cantidad NO ELEGIDO: " +
        this.nonChoiceHFSA
    );
    console.log(
      "cantidad ELEGIDO: " +
        this.CantidadTipoHFSW +
        " cantidad NO ELEGIDO: " +
        this.nonChoiceHFSW
    );
    console.log(
      "cantidad ELEGIDO: " +
        this.CantidadTipoLFSA +
        " cantidad NO ELEGIDO: " +
        this.nonChoiceLFSA
    );
    console.log(
      "cantidad ELEGIDO: " +
        this.CantidadTipoLFSW +
        " cantidad NO ELEGIDO: " +
        this.nonChoiceLFSW
    );

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
      //console.log("TIEMPO IZQ "+ this.tiempoIzq+ "tiempo der"+this.tiempoDer)
      this.tiempoMedio = this.pairedService.calculateTiempoMedio(
        this.tiempoIzq,
        this.tiempoDer
      );

      this.tiempoMedioHFSA = this.pairedService.calculateTiempoMedioCategoria(
        "HFSA",
        this.tiempoTipoHFSA
      );
      this.tiempoMedioHFSW = this.pairedService.calculateTiempoMedioCategoria(
        "HFSW",
        this.tiempoTipoHFSW
      );
      this.tiempoMedioLFSA = this.pairedService.calculateTiempoMedioCategoria(
        "LFSA",
        this.tiempoTipoLFSA
      );
      this.tiempoMedioLFSW = this.pairedService.calculateTiempoMedioCategoria(
        "LFSW",
        this.tiempoTipoLFSW
      );

      this.totalNonTimeHFSA = this.pairedService.calculateNonTime(
        "HFSA",
        this.nonChoiceTimeHFSA
      );
      this.totalNonTimeHFSW = this.pairedService.calculateNonTime(
        "HFSW",
        this.nonChoiceTimeHFSW
      );
      this.totalNonTimeLFSA = this.pairedService.calculateNonTime(
        "LFSA",
        this.nonChoiceTimeLFSA
      );
      this.totalNonTimeLFSW = this.pairedService.calculateNonTime(
        "LFSW",
        this.nonChoiceTimeLFSW
      );

      this.freqHFSA =
        this.tiempoMedio *
        (1 / this.tiempoMedioHFSA - 1 / this.totalNonTimeHFSA);
      this.freqHFSW =
        this.tiempoMedio *
        (1 / this.tiempoMedioHFSW - 1 / this.totalNonTimeHFSW);
      this.freqLFSA =
        this.tiempoMedio *
        (1 / this.tiempoMedioLFSA - 1 / this.totalNonTimeLFSA);
      this.freqLFSW =
        this.tiempoMedio *
        (1 / this.tiempoMedioLFSW - 1 / this.totalNonTimeLFSW);

      console.log("Tiempo medio: " + this.tiempoMedio);

      console.log("freq veces hfsa: " + this.freqHFSA);
      console.log("freq veces hfsw: " + this.freqHFSW);
      console.log("freq veces lfsa: " + this.freqLFSA);
      console.log("freq veces lfsw: " + this.freqLFSW);

      console.log("Cantidad veces hfsa: " + this.CantidadTipoHFSA);
      console.log("Cantidad veces hfsw: " + this.CantidadTipoHFSW);
      console.log("Cantidad veces lfsa: " + this.CantidadTipoLFSA);
      console.log("Cantidad veces lfsw: " + this.CantidadTipoLFSW);
      /*
      console.log("TIEMPO MEDIO PAIRED: "+this.tiempoMedio)
      console.log("TIEMPO MEDIO hfsa: "+this.tiempoMedioHFSA)
      console.log("TIEMPO MEDIO hfsw: "+this.tiempoMedioHFSW)
      console.log("TIEMPO MEDIO lfsa: "+this.tiempoMedioLFSA)
      console.log("TIEMPO MEDIO lfsw: "+this.tiempoMedioLFSW)
*/
this.respuestas = new RespuestaPaired(
  this.idUser,
  this.fecha,
  Number(this.tiempoMedio).toFixed(2),
  this.CantidadTipoHFSA,
  Number(this.tiempoMedioHFSA).toFixed(2),
  Number(this.freqHFSA).toFixed(2),

  this.CantidadTipoHFSW,
  Number(this.tiempoMedioHFSW).toFixed(2),
  Number(this.freqHFSW).toFixed(2),

  this.CantidadTipoLFSA,
  Number(this.tiempoMedioLFSA).toFixed(2),
  Number(this.freqLFSA).toFixed(2),

  this.CantidadTipoLFSW,
  Number(this.tiempoMedioLFSW).toFixed(2),
  Number(this.freqLFSW).toFixed(2)


  );

//const obj = Object.assign({},this.respuestas)
console.log("RESPUESTAS: ",this.respuestas)
this.firebaseUpload.setRespuestasPaired(this.respuestas);
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
    this.tiempoDer.push(this.tiempo);
    //console.log("TIPO der: " + this.tipod);

    if (this.tipod == "HFSA") {
      //console.log("entra hfsa")
      this.CantidadTipoHFSA = this.pairedService.cantidad(this.tipod);
      this.tiempoTipoHFSA.push(this.tiempo);

      //console.log("HFSA: "+this.CantidadTipoHFSA)
    }
    if (this.tipod == "HFSW") {
      //console.log("entra hfsw")
      this.CantidadTipoHFSW = this.pairedService.cantidad(this.tipod);
      this.tiempoTipoHFSW.push(this.tiempo);

      //console.log("HFSW: "+this.CantidadTipoHFSW)
    }
    if (this.tipod == "LFSA") {
      this.CantidadTipoLFSA = this.pairedService.cantidad(this.tipod);
      this.tiempoTipoLFSA.push(this.tiempo);

      //console.log("LFSA: "+this.CantidadTipoLFSA)
    }
    if (this.tipod == "LFSW") {
      this.CantidadTipoLFSW = this.pairedService.cantidad(this.tipod);
      this.tiempoTipoLFSW.push(this.tiempo);

      //console.log("LFSW: "+this.CantidadTipoLFSW)
    }

    //non choice
    console.log("SE METE: " + this.tipoi);
    if (this.tipoi == "HFSA") {
      this.nonChoiceHFSA = this.pairedService.nonChoiceCantidad(this.tipoi);
      this.nonChoiceTimeHFSA.push(this.tiempo);
    }
    if (this.tipoi == "HFSW") {
      this.nonChoiceHFSW = this.pairedService.nonChoiceCantidad(this.tipoi);
      this.nonChoiceTimeHFSW.push(this.tiempo);
    }
    if (this.tipoi == "LFSA") {
      this.nonChoiceLFSA = this.pairedService.nonChoiceCantidad(this.tipoi);
      this.nonChoiceTimeLFSA.push(this.tiempo);
    }
    if (this.tipoi == "LFSW") {
      this.nonChoiceLFSW = this.pairedService.nonChoiceCantidad(this.tipoi);
      this.nonChoiceTimeLFSW.push(this.tiempo);
    }

    console.log(
      "TIEMPO ELEGIDO: " +
        this.tiempoTipoHFSA +
        " TIEMPO NO ELEGIDO: " +
        this.nonChoiceTimeHFSA
    );
    console.log(
      "TIEMPO ELEGIDO: " +
        this.tiempoTipoHFSW +
        " TIEMPO NO ELEGIDO: " +
        this.nonChoiceTimeHFSW
    );
    console.log(
      "TIEMPO ELEGIDO: " +
        this.tiempoTipoLFSA +
        " TIEMPO NO ELEGIDO: " +
        this.nonChoiceTimeLFSA
    );
    console.log(
      "TIEMPO ELEGIDO: " +
        this.tiempoTipoLFSW +
        " TIEMPO NO ELEGIDO: " +
        this.nonChoiceTimeLFSW
    );

    console.log(
      "cantidad ELEGIDO: " +
        this.CantidadTipoHFSA +
        " cantidad NO ELEGIDO: " +
        this.nonChoiceHFSA
    );
    console.log(
      "cantidad ELEGIDO: " +
        this.CantidadTipoHFSW +
        " cantidad NO ELEGIDO: " +
        this.nonChoiceHFSW
    );
    console.log(
      "cantidad ELEGIDO: " +
        this.CantidadTipoLFSA +
        " cantidad NO ELEGIDO: " +
        this.nonChoiceLFSA
    );
    console.log(
      "cantidad ELEGIDO: " +
        this.CantidadTipoLFSW +
        " cantidad NO ELEGIDO: " +
        this.nonChoiceLFSW
    );

    if (this.contadorPreg == 32) {
      console.log("quieres parar loco?");

      this.descanso = true;
    } else if (this.contadorPreg == 64) {
      console.log("quieres parar loco?");

      this.descanso = true;
    } else if (this.contadorPreg == 96) {
      console.log("Fin");
      this.tiempoMedio = this.pairedService.calculateTiempoMedio(
        this.tiempoIzq,
        this.tiempoDer
      );

      this.tiempoMedioHFSA = this.pairedService.calculateTiempoMedioCategoria(
        "HFSA",
        this.tiempoTipoHFSA
      );
      this.tiempoMedioHFSW = this.pairedService.calculateTiempoMedioCategoria(
        "HFSW",
        this.tiempoTipoHFSW
      );
      this.tiempoMedioLFSA = this.pairedService.calculateTiempoMedioCategoria(
        "LFSA",
        this.tiempoTipoLFSA
      );
      this.tiempoMedioLFSW = this.pairedService.calculateTiempoMedioCategoria(
        "LFSW",
        this.tiempoTipoLFSW
      );

      this.totalNonTimeHFSA = this.pairedService.calculateNonTime(
        "HFSA",
        this.nonChoiceTimeHFSA
      );
      this.totalNonTimeHFSW = this.pairedService.calculateNonTime(
        "HFSW",
        this.nonChoiceTimeHFSW
      );
      this.totalNonTimeLFSA = this.pairedService.calculateNonTime(
        "LFSA",
        this.nonChoiceTimeLFSA
      );
      this.totalNonTimeLFSW = this.pairedService.calculateNonTime(
        "LFSW",
        this.nonChoiceTimeLFSW
      );

      this.freqHFSA =
        this.tiempoMedio *
        (1 / this.tiempoMedioHFSA - 1 / this.totalNonTimeHFSA);
      this.freqHFSW =
        this.tiempoMedio *
        (1 / this.tiempoMedioHFSW - 1 / this.totalNonTimeHFSW);
      this.freqLFSA =
        this.tiempoMedio *
        (1 / this.tiempoMedioLFSA - 1 / this.totalNonTimeLFSA);
      this.freqLFSW =
        this.tiempoMedio *
        (1 / this.tiempoMedioLFSW - 1 / this.totalNonTimeLFSW);

      console.log("Tiempo medio: " + this.tiempoMedio);

      console.log("freq veces hfsa: " + this.freqHFSA);
      console.log("freq veces hfsw: " + this.freqHFSW);
      console.log("freq veces lfsa: " + this.freqLFSA);
      console.log("freq veces lfsw: " + this.freqLFSW);

      console.log("Cantidad veces hfsa: " + this.CantidadTipoHFSA);
      console.log("Cantidad veces hfsw: " + this.CantidadTipoHFSW);
      console.log("Cantidad veces lfsa: " + this.CantidadTipoLFSA);
      console.log("Cantidad veces lfsw: " + this.CantidadTipoLFSW);
      /*
      console.log("TIEMPO MEDIO PAIRED: "+this.tiempoMedio)
      console.log("TIEMPO MEDIO hfsa: "+this.tiempoMedioHFSA)
      console.log("TIEMPO MEDIO hfsw: "+this.tiempoMedioHFSW)
      console.log("TIEMPO MEDIO lfsa: "+this.tiempoMedioLFSA)
      console.log("TIEMPO MEDIO lfsw: "+this.tiempoMedioLFSW)
*/

      this.respuestas = new RespuestaPaired(
        this.idUser,
  this.fecha,
  Number(this.tiempoMedio).toFixed(2),
  this.CantidadTipoHFSA,
  Number(this.tiempoMedioHFSA).toFixed(2),
  Number(this.freqHFSA).toFixed(2),

  this.CantidadTipoHFSW,
  Number(this.tiempoMedioHFSW).toFixed(2),
  Number(this.freqHFSW).toFixed(2),

  this.CantidadTipoLFSA,
  Number(this.tiempoMedioLFSA).toFixed(2),
  Number(this.freqLFSA).toFixed(2),

  this.CantidadTipoLFSW,
  Number(this.tiempoMedioLFSW).toFixed(2),
  Number(this.freqLFSW).toFixed(2)


        );

      //const obj = Object.assign({},this.respuestas)
      console.log("RESPUESTAS: "+this.respuestas)
      this.firebaseUpload.setRespuestasPaired(this.respuestas);

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
      if (
        window.confirm(
          "No ha guardado los cambios, ¿Está seguro que quiere salir?"
        )
      ) {
        this.checkClose = true;
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
    let recalculate: boolean = true;
    let randomGrupoIzq: number;
    let randomGrupoDer: number;

    let randomImagenIzq: number;
    let randomImagenDer: number;

    let urli: string;
    let urld: string;

    let tipoi: string;
    let tipod: string;

    while (recalculate) {
      randomGrupoIzq = Math.floor(Math.random() * 4);
      randomImagenIzq = Math.floor(Math.random() * 4);
      this.urli = "";
      this.urld = "";
      this.tipoi = "";
      this.tipod = "";
      //console.log("calculando random IZQUIERDA...." + randomGrupoIzq);

      randomGrupoDer = Math.floor(Math.random() * 4);
      randomImagenDer = Math.floor(Math.random() * 4);
      //console.log("calculando random DERECHA...." + randomGrupoDer);

      while (randomGrupoDer == randomGrupoIzq) {
        randomGrupoDer = Math.floor(Math.random() * 4);

        console.log("calculando random DENTRO DERECHA...." + randomGrupoDer);
      }
      console.log("Random DENTRO DERECHA...." + randomGrupoDer);

      switch (randomGrupoIzq) {
        //HFSA
        //HFSW
        //LFSA
        //LFSW
        case 0: {
          urli = this.imageArrHFSA[randomImagenIzq].url;
          tipoi = this.imageArrHFSA[randomImagenIzq].tipo;
          console.log(
            "Array mostrado izq: " +
              JSON.stringify(this.imageArrHFSA[randomImagenIzq].id)
          );
          break;
        }
        case 1: {
          urli = this.imageArrHFSW[randomImagenIzq].url;
          tipoi = this.imageArrHFSW[randomImagenIzq].tipo;

          console.log(
            "Array mostrado izq: " +
              JSON.stringify(this.imageArrHFSW[randomImagenIzq].id)
          );

          break;
        }
        case 2: {
          urli = this.imageArrLFSA[randomImagenIzq].url;
          tipoi = this.imageArrLFSA[randomImagenIzq].tipo;

          console.log(
            "Array mostrado izq: " +
              JSON.stringify(this.imageArrLFSA[randomImagenIzq].id)
          );

          break;
        }
        case 3: {
          urli = this.imageArrLFSW[randomImagenIzq].url;
          tipoi = this.imageArrLFSW[randomImagenIzq].tipo;

          console.log(
            "Array mostrado izq: " +
              JSON.stringify(this.imageArrLFSW[randomImagenIzq].id)
          );

          break;
        }
      }

      switch (randomGrupoDer) {
        case 0: {
          urld = this.imageArrHFSA[randomImagenDer].url;
          tipod = this.imageArrHFSA[randomImagenDer].tipo;

          console.log(
            "Array mostrado der: " +
              JSON.stringify(this.imageArrHFSA[randomImagenDer].id)
          );
          break;
        }
        case 1: {
          urld = this.imageArrHFSW[randomImagenDer].url;
          tipod = this.imageArrHFSW[randomImagenDer].tipo;

          console.log(
            "Array mostrado der: " +
              JSON.stringify(this.imageArrHFSW[randomImagenDer].id)
          );

          break;
        }
        case 2: {
          urld = this.imageArrLFSA[randomImagenDer].url;
          tipod = this.imageArrLFSA[randomImagenDer].tipo;

          console.log(
            "Array mostrado der: " +
              JSON.stringify(this.imageArrLFSA[randomImagenDer].id)
          );

          break;
        }
        case 3: {
          urld = this.imageArrLFSW[randomImagenDer].url;
          tipod = this.imageArrLFSW[randomImagenDer].tipo;

          console.log(
            "Array mostrado der: " +
              JSON.stringify(this.imageArrLFSW[randomImagenDer].id)
          );

          break;
        }
      }

      if (
        this.respuestaMap.get(urli + urld) != undefined ||
        this.respuestaMap.get(urld + urli) != undefined
      ) {
        recalculate = true;
        console.log("rECALCULATE TRUE: ");
        continue;
      } else {
        console.log("rECALCULATE fALSE: ");

        this.respuestaMap.set(urli + urld, 1);
        recalculate = false;
        this.urli = urli;
        this.urld = urld;
        this.tipoi = tipoi;
        this.tipod = tipod;
        console.log("ADSFASDFASDF  " + this.tipoi);
        console.log("ADSFASDFASDF  " + this.tipod);

        return;
      }
    }
  }

  async loadingImages() {
    const loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      spinner: "dots",
      duration: 2,
      keyboardClose: false,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log("Loading dismissed!");
    this.next();
  }
}
