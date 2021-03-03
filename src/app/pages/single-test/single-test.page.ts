import { FirebaseUploadService } from './../../Services/firebaseUpload.service';
import { food } from "./../../Services/images.service";
import { Respuesta } from "./../../Classes/Respuesta";
import { Router } from "@angular/router";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";

import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from "@angular/fire/database";
import { PreguntasService, preg } from "../../Services/preguntas.service";
import { ImagesService, image } from "../../Services/images.service";
import { identifierModuleUrl } from "@angular/compiler";
import { RespuestaGeneral } from "src/app/Classes/RespuestaGeneral";
import * as math from "mathjs";


@NgModule({
  imports: [FormsModule],
})
@Component({
  selector: "app-single-test",
  templateUrl: "./single-test.page.html",
  styleUrls: ["./single-test.page.scss"],
})
export class SingleTestPage implements OnInit, OnDestroy {
  public preguntasArr: any = [];

  public imageArrHFSA: any = [];
  public imageArrHFSW: any = [];
  public imageArrLFSA: any = [];
  public imageArrLFSW: any = [];

  public sumaGustoHFSA: any[] = [];
  public sumaGustoHFSW: any[] = [];
  public sumaGustoLFSA: any[] = [];
  public sumaGustoLFSW: any[] = [];

  public sumaDeseoHFSA: any[] = [];
  public sumaDeseoHFSW: any[] = [];
  public sumaDeseoLFSA: any[] = [];
  public sumaDeseoLFSW: any[] = [];

  public aaaa: food[] = new Array();

  public idUser: string = null;
  public fecha: string = null;
  constructor(
    public loadingController: LoadingController,
    public angularFirestore: AngularFirestore,
    private db: AngularFireDatabase,
    public preguntas: PreguntasService,
    public imagenes: ImagesService,
    private router: Router,
    public firebaseUpload: FirebaseUploadService
  ) {
    this.imageArrHFSA = new Array();
    this.imageArrHFSW = new Array();
    this.imageArrLFSA = new Array();
    this.imageArrLFSW = new Array();

    this.sumaGustoHFSA = new Array();
    this.sumaGustoHFSW = new Array();
    this.sumaGustoLFSA = new Array();
    this.sumaGustoLFSW = new Array();

    this.sumaDeseoHFSA = new Array();
    this.sumaDeseoHFSW = new Array();
    this.sumaDeseoLFSA = new Array();
    this.sumaDeseoLFSW = new Array();

  }
  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
    console.log("Saliendo...");
  }

  ngOnInit() {
    this.preguntas.getText().subscribe((pregunta) => {
      this.preguntasArr = pregunta;
    });

    //USUARIO QUE VIENE DEL MODAL DE INICIOOOOO
    this.idUser = sessionStorage.getItem("idUser");
    console.log("USUARIO DEL ID JEJEJE: "+this.idUser);

    this.fecha = sessionStorage.getItem("date");
    console.log("Fecha session: "+this.fecha);

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
  contadorPreg: number = 0;
  pregunta: string = "";
  idPregunta: string = "";
  idImagen: string = "";
  url: string = "";
  tipo: string = "";


  //CALCULOS NUEVOS
  /*
  sumaGustoHFSA: number = 0;
  sumaGustoHFSW: number = 0;
  sumaGustoLFSA: number = 0;
  sumaGustoLFSW: number = 0;

  sumaDeseoHFSA: number = 0;
  sumaDeseoHFSW: number = 0;
  sumaDeseoLFSA: number = 0;
  sumaDeseoLFSW: number = 0;
*/
  //media
  mediaGustoHFSA: number = 0;
  mediaGustoHFSW: number = 0;
  mediaGustoLFSA: number = 0;
  mediaGustoLFSW: number = 0;

  mediaDeseoHFSA: number = 0;
  mediaDeseoHFSW: number = 0;
  mediaDeseoLFSA: number = 0;
  mediaDeseoLFSW: number = 0;

  //desviacion estandar
  stdGustoHFSA: number = 0;
  stdGustoHFSW: number = 0;
  stdGustoLFSA: number = 0;
  stdGustoLFSW: number = 0;

  stdDeseoHFSA: number = 0;
  stdDeseoHFSW: number = 0;
  stdDeseoLFSA: number = 0;
  stdDeseoLFSW: number = 0;


  //CALCULOS ANTES
  sumaGusto: number = 0;
  sumaDeseo: number = 0;

  mediaGusto: number = 0;
  mediaDeseo: number = 0;

  color: string = "";
  value: number = 50;
  showButton = true;
  showQuestion = false;
  hideButton = false;
  hideButtonComenzar = true;
  changeQuestion: number = 0;
  i: number = 4;
  a: number = 0;
  descanso: boolean = false;
  fin: boolean = false;
  checkClose: boolean = false;

  random: number;

  mapHFSA = new Map();
  mapLFSW = new Map();
  mapHFSW = new Map();
  mapLFSA = new Map();

  respuestas: Respuesta[];
  respuestasGen: Object;

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: "Loading...",
      duration: 2000,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log("Loading dismissed!");

    //llamada a funcion que empieza el test onclick()
    this.startTest();
  }

  startTest() {
    console.log("Test started!");
    this.respuestas = new Array();

    //console.log(JSON.stringify(this.preguntasArr[this.contadorPreg].text))

    //añadir pregunta al html

    this.pregunta = this.preguntasArr[this.contadorPreg].text;

    //añadir imagen al html
    let random: number = Math.floor(
      Math.random() * Object.keys(this.imageArrHFSA).length
    );
    this.mapHFSA.set(this.imageArrHFSA[random], this.imageArrHFSA[random]);
    console.log(
      //JSON.stringify("QUE HAY DENTRO: " + this.imageArrHFSA[random].url)
    );
    
    

    this.url = this.imageArrHFSA[random].url;
    this.idImagen = this.imageArrHFSA[random].id;
    this.tipo = this.imageArrHFSA[random].tipo;
    //this.imageArrHFSA['imagen'+random]=null;
    //this.contadorHFSA++;

    //FUNCION IMAGEN DE ANTES
    /*
    //añadir imagen al html
    let random:number = Math.floor((Math.random()*(Object.keys(this.imageArrHFSA).length-1)))+1;
    this.mapHFSA.set(this.imageArrHFSA['imagen'+random],this.imageArrHFSA['imagen'+random]);
    //console.log(JSON.stringify('aaaaaaa: '+this.selectedHFSA))
    this.url = this.imageArrHFSA['imagen'+random];
    //this.imageArrHFSA['imagen'+random]=null;
    //this.contadorHFSA++;
*/
    if (this.showButton == true) {
      //console.log("entra 1");
      this.color = "danger";

      this.hideButtonComenzar = false;
      this.hideButton = true;
      this.showQuestion = true;

      return (this.showButton = false);
    } else {
      //console.log("entra 2");
      this.hideButton = false;
      this.hideButtonComenzar = true;

      //this.showQuestion = true;

      return (this.showButton = true);
    }
  }

  nextQuestion() {
    this.idPregunta = this.preguntasArr[this.contadorPreg % 2].id;
    this.contadorPreg++;

    //let pregunta=this.contadorPreg % 2 == 0?'deseo':'gusto';
    //Sacar todas las respuestas
    this.respuestas.push(
      new Respuesta(
        this.idImagen,
        this.idPregunta,
        this.pregunta,
        this.value.toString()
      )
    );
    console.log("ESTO ES LA SALIDA: " + JSON.stringify(this.respuestas));

    this.sumaValue();
    

    if (this.contadorPreg == 16) {
      console.log("quieres parar loco?");
      this.mapHFSA = new Map();
      this.mapLFSW = new Map();
      this.mapHFSW = new Map();
      this.mapLFSA = new Map();

      this.descanso = true;
    }

    console.log("CONTADOR ANTES BREAK: " + this.contadorPreg);
    if (this.contadorPreg == 32) {
      console.log("El fin? meh oki ");

      this.calcularMedia();
      //this.calcularSTD();

      //this.descanso= false;
      this.fin = true;
      //console.log("fin: "+ this.fin)
      return;
    }
    //LOGS DE LOS MAPS
    //console.log("MAPHFSA"+JSON.stringify(this.mapHFSA.get(this.imageArrHFSA[0])))
    //console.log("MAPHFSA"+JSON.stringify(this.mapHFSA.get(this.imageArrHFSA[1])))
    //console.log("MAPHFSA"+JSON.stringify(this.mapHFSA.get(this.imageArrHFSA[2])))

    switch (this.contadorPreg % 4) {
      case 0:
        console.log("holaacase 0");

        //preguntas
        this.pregunta = this.preguntasArr[this.contadorPreg % 2].text;

        //console.log(JSON.stringify(this.imageArrLFSA))
        //console.log(JSON.stringify(this.imageArrLFSW))

        //imagen
        console.log("contadorPREGG case 0: " + this.contadorPreg);
        if (this.contadorPreg < 16) {
          let random: number = Math.floor(
            Math.random() * Object.keys(this.imageArrHFSA).length
          );
          while (this.mapHFSA.get(this.imageArrHFSA[random])) {
            random = Math.floor(
              Math.random() * Object.keys(this.imageArrHFSA).length
            );
            console.log("calculando randommm...." + random);
          }
          console.log("FUERA randommm...." + random);
          this.mapHFSA.set(
            this.imageArrHFSA[random],
            this.imageArrHFSA[random]
          );
          this.url = this.imageArrHFSA[random].url;
          this.idImagen = this.imageArrHFSA[random].id;
          this.tipo = this.imageArrHFSA[random].tipo;


        } else {
          let random: number = Math.floor(
            Math.random() * Object.keys(this.imageArrHFSA).length
          );
          while (this.mapLFSW.get(this.imageArrLFSW[random])) {
            random = Math.floor(
              Math.random() * Object.keys(this.imageArrLFSW).length
            );
            console.log("calculando randommm...." + random);
          }
          console.log("FUERA randommm...." + random);
          this.mapLFSW.set(
            this.imageArrLFSW[random],
            this.imageArrLFSW[random]
          );
          this.url = this.imageArrLFSW[random].url;
          this.idImagen = this.imageArrLFSW[random].id;
          this.tipo = this.imageArrLFSW[random].tipo;

        }

        break;

      case 1:
        console.log("holacase1");

        //preguntas
        this.pregunta = this.preguntasArr[this.contadorPreg % 2].text;
        console.log("contadorPREGG case 1: " + this.contadorPreg);

        //imagen
        if (this.contadorPreg < 16) {
          let random: number = Math.floor(
            Math.random() * Object.keys(this.imageArrHFSA).length
          );
          while (this.mapLFSW.get(this.imageArrLFSW[random])) {
            random = Math.floor(
              Math.random() * Object.keys(this.imageArrLFSW).length
            );
            console.log("calculando randommm...." + random);
          }
          console.log("FUERA randommm...." + random);
          this.mapLFSW.set(
            this.imageArrLFSW[random],
            this.imageArrLFSW[random]
          );
          this.url = this.imageArrLFSW[random].url;
          this.idImagen = this.imageArrLFSW[random].id;
          this.tipo = this.imageArrLFSW[random].tipo;

        } else {
          let random: number = Math.floor(
            Math.random() * Object.keys(this.imageArrHFSA).length
          );
          while (this.mapHFSA.get(this.imageArrHFSA[random])) {
            random = Math.floor(
              Math.random() * Object.keys(this.imageArrHFSA).length
            );
            console.log("calculando randommm...." + random);
          }
          console.log("FUERA randommm...." + random);
          this.mapHFSA.set(
            this.imageArrHFSA[random],
            this.imageArrHFSA[random]
          );
          this.url = this.imageArrHFSA[random].url;
          this.idImagen = this.imageArrHFSA[random].id;
          this.tipo = this.imageArrHFSA[random].tipo;

        }
        break;

      case 2:
        console.log("holacase2");
        this.pregunta = this.preguntasArr[this.contadorPreg % 2].text;

        console.log("contadorPREGG case 2: " + this.contadorPreg);
        if (this.contadorPreg < 16) {
          let random: number = Math.floor(
            Math.random() * Object.keys(this.imageArrLFSA).length
          );
          while (this.mapLFSA.get(this.imageArrLFSA[random])) {
            random = Math.floor(
              Math.random() * Object.keys(this.imageArrLFSA).length
            );
            console.log("calculando randommm...." + random);
          }
          console.log("FUERA randommm...." + random);
          this.mapLFSA.set(
            this.imageArrLFSA[random],
            this.imageArrLFSA[random]
          );
          this.url = this.imageArrLFSA[random].url;
          this.idImagen = this.imageArrLFSA[random].id;
          this.tipo = this.imageArrLFSA[random].tipo;

        } else {
          let random: number = Math.floor(
            Math.random() * Object.keys(this.imageArrHFSW).length
          );
          while (this.mapHFSW.get(this.imageArrHFSW[random])) {
            random = Math.floor(
              Math.random() * Object.keys(this.imageArrHFSW).length
            );
            console.log("calculando randommm...." + random);
          }
          console.log("FUERA randommm...." + random);
          this.mapHFSW.set(
            this.imageArrHFSW[random],
            this.imageArrHFSW[random]
          );
          this.url = this.imageArrHFSW[random].url;
          this.idImagen = this.imageArrHFSW[random].id;
          this.tipo = this.imageArrHFSW[random].tipo;

        }
        break;

      case 3:
        console.log("holacase3");
        this.pregunta = this.preguntasArr[this.contadorPreg % 2].text;

        console.log("contadorPREGG case 2: " + this.contadorPreg);
        if (this.contadorPreg < 16) {
          let random: number = Math.floor(
            Math.random() * Object.keys(this.imageArrHFSW).length
          );
          while (this.mapHFSW.get(this.imageArrHFSW[random])) {
            random = Math.floor(
              Math.random() * Object.keys(this.imageArrHFSW).length
            );
            console.log("calculando randommm...." + random);
          }
          console.log("FUERA randommm...." + random);
          this.mapHFSW.set(
            this.imageArrHFSW[random],
            this.imageArrHFSW[random]
          );
          this.url = this.imageArrHFSW[random].url;
          this.idImagen = this.imageArrHFSW[random].id;
          this.tipo = this.imageArrHFSW[random].tipo;

        } else {
          let random: number = Math.floor(
            Math.random() * Object.keys(this.imageArrLFSA).length
          );
          while (this.mapLFSA.get(this.imageArrLFSA[random])) {
            random = Math.floor(
              Math.random() * Object.keys(this.imageArrLFSA).length
            );
            console.log("calculando randommm...." + random);
          }
          console.log("FUERA randommm...." + random);
          this.mapLFSA.set(
            this.imageArrLFSA[random],
            this.imageArrLFSA[random]
          );
          this.url = this.imageArrLFSA[random].url;
          this.idImagen = this.imageArrLFSA[random].id;
          this.tipo = this.imageArrLFSA[random].tipo;

        }
        break;

      default:
        break;
    }

    if (this.changeQuestion == 0) {
      this.color = "secondary";
      console.log(this.value);

      this.changeQuestion = 1;
    } else {
      this.color = "danger";
      console.log(this.value);

      this.changeQuestion = 0;
    } //end else


    this.value = 50;
  }


  sumaValue(){

    if (this.idPregunta == "preg1" && this.tipo == "HFSA") {
      //gusto
      this.sumaGustoHFSA.push(this.value);
      //this.sumaGustoHFSA += this.value;
      //console.log("SUMA GUSTO: " + this.sumaGustoHFSA);
      console.log("ARRAY SUMA GUSTO: " + this.sumaGustoHFSA);

    } else if(this.idPregunta == "preg2" && this.tipo == "HFSA"){
      //deseo
      this.sumaDeseoHFSA.push(this.value);

      //this.sumaDeseoHFSA += this.value;
      //this.sumaDeseo += this.value;
      //console.log("SUMA DESEO: " + this.sumaDeseoHFSA);
    }

    if (this.idPregunta == "preg1" && this.tipo == "HFSW") {
      //gusto
      this.sumaGustoHFSW.push(this.value);
      //console.log("SUMA GUSTO: " + this.sumaGustoHFSW);
    } else if(this.idPregunta == "preg2" && this.tipo == "HFSW"){
      //deseo
      this.sumaDeseoHFSW.push(this.value);
      //this.sumaDeseoHFSW += this.value;
      //this.sumaDeseo += this.value;
      //console.log("SUMA DESEO: " + this.sumaDeseoHFSW);
    }

    if (this.idPregunta == "preg1" && this.tipo == "LFSA") {
      //gusto
      this.sumaGustoLFSA.push(this.value);
      //this.sumaGustoLFSA += this.value;
      //console.log("SUMA GUSTO: " + this.sumaGustoLFSA);
    } else if(this.idPregunta == "preg2" && this.tipo == "LFSA"){
      //deseo
      this.sumaDeseoLFSA.push(this.value);
      //this.sumaDeseoLFSA += this.value;
      //this.sumaDeseo += this.value;
      //console.log("SUMA DESEO: " + this.sumaDeseoLFSA);
    }

    if (this.idPregunta == "preg1" && this.tipo == "LFSW") {
      //gusto
      this.sumaGustoLFSW.push(this.value);
      //this.sumaGustoLFSW += this.value;
      //console.log("SUMA GUSTO: " + this.sumaGustoLFSW);
    } else if(this.idPregunta == "preg2" && this.tipo == "LFSW"){
      //deseo
      this.sumaDeseoLFSW.push(this.value);
      //this.sumaDeseoLFSW += this.value;
      //this.sumaDeseo += this.value;
      //console.log("SUMA DESEO: " + this.sumaDeseoLFSW);
    }

  }


  calcularMedia() {
    
      this.mediaGustoHFSA = math.mean(this.sumaGustoHFSA);
      this.mediaGustoHFSW = math.mean(this.sumaGustoHFSW);
      this.mediaGustoLFSA = math.mean(this.sumaGustoLFSA);
      this.mediaGustoLFSW = math.mean(this.sumaGustoLFSW);
  
      this.mediaDeseoHFSA = math.mean(this.sumaDeseoHFSA);
      this.mediaDeseoHFSW = math.mean(this.sumaDeseoHFSW);
      this.mediaDeseoLFSA = math.mean(this.sumaDeseoLFSA);
      this.mediaDeseoLFSW = math.mean(this.sumaDeseoLFSW);
      this.calcularSTD();


    this.respuestasGen = new RespuestaGeneral(
      this.idUser,
      this.fecha,
      this.mediaGustoHFSA.toFixed(2).toString(),
      this.stdGustoHFSA.toFixed(2).toString(),

      this.mediaGustoHFSW.toFixed(2).toString(),
      this.stdGustoHFSW.toFixed(2).toString(),

      this.mediaGustoLFSA.toFixed(2).toString(),
      this.stdGustoLFSA.toFixed(2).toString(),

      this.mediaGustoLFSW.toFixed(2).toString(),
      this.stdGustoLFSW.toFixed(2).toString(),


      this.mediaDeseoHFSA.toFixed(2).toString(),
      this.stdDeseoHFSA.toFixed(2).toString(),

      this.mediaDeseoHFSW.toFixed(2).toString(),
      this.stdDeseoHFSW.toFixed(2).toString(),

      this.mediaDeseoLFSA.toFixed(2).toString(),
      this.stdDeseoLFSA.toFixed(2).toString(),

      this.mediaDeseoLFSW.toFixed(2).toString(),
      this.stdDeseoLFSW.toFixed(2).toString()
      );

    //Sacar media respuesta
    /*this.respuestasGen.push(
      new RespuestaGeneral(
        this.idUser,
        this.fecha,
        this.mediaGustoHFSA.toFixed(2).toString(),
        this.stdGustoHFSA.toFixed(2).toString(),

        this.mediaGustoHFSW.toFixed(2).toString(),
        this.stdGustoHFSW.toFixed(2).toString(),

        this.mediaGustoLFSA.toFixed(2).toString(),
        this.stdGustoLFSA.toFixed(2).toString(),

        this.mediaGustoLFSW.toFixed(2).toString(),
        this.stdGustoLFSW.toFixed(2).toString(),


        this.mediaDeseoHFSA.toFixed(2).toString(),
        this.stdDeseoHFSA.toFixed(2).toString(),

        this.mediaDeseoHFSW.toFixed(2).toString(),
        this.stdDeseoHFSW.toFixed(2).toString(),

        this.mediaDeseoLFSA.toFixed(2).toString(),
        this.stdDeseoLFSA.toFixed(2).toString(),

        this.mediaDeseoLFSW.toFixed(2).toString(),
        this.stdDeseoLFSW.toFixed(2).toString(),


      )
    );*/
    this.firebaseUpload.setRespuestas(this.respuestasGen);
    //this.firebaseUpload.getRespuestas();
    console.log(
      "ESTO ES LA SALIDA GENERAL 2.0: " + JSON.stringify(this.respuestasGen)
    );
  }

  calcularSTD() {

    this.stdGustoHFSA = math.std(this.sumaGustoHFSA);
    this.stdGustoHFSW = math.std(this.sumaGustoHFSW);
    this.stdGustoLFSA = math.std(this.sumaGustoLFSA);
    this.stdGustoLFSW = math.std(this.sumaGustoLFSW);

    this.stdDeseoHFSA = math.std(this.sumaDeseoHFSA);
    this.stdDeseoHFSW = math.std(this.sumaDeseoHFSW);
    this.stdDeseoLFSA = math.std(this.sumaDeseoLFSA);
    this.stdDeseoLFSW = math.std(this.sumaDeseoLFSW);
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
          'No has guardado los cambios, si deseas salir vuelve a clicar en el botón "Salir".'
        )
      ) {
        this.checkClose = true;
      }
    }
  }

  save() {
    this.checkClose = true;
  }
}
