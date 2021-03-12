import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { ImagesService } from "src/app/Services/images.service";
import { PreguntasService } from "src/app/Services/preguntas.service";

@Component({
  selector: "app-tutorial",
  templateUrl: "./tutorial.page.html",
  styleUrls: ["./tutorial.page.scss"],
})
export class TutorialPage implements OnInit {
  public preguntasArr: any = [];
  public imageArrHFSW: any = [];
  public imageArrLFSA: any = [];

  mapHFSW = new Map();

  constructor(
    public loadingController: LoadingController,
    public preguntas: PreguntasService,
    public imagenes: ImagesService,
    private router: Router,

  ) {
    this.imageArrHFSW = new Array();
    this.imageArrLFSA = new Array();

  }

  ngOnInit() {
    this.preguntas.getText().subscribe((pregunta) => {
      this.preguntasArr = pregunta;
    });

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
  }
  showButton = true;
  showQuestion = false;
  hideButton = false;
  hideButtonComenzar = true;
  changeQuestion: number = 0;
  next:Boolean= false;
  nextTutorial:Boolean= false;
  paired:Boolean= false;
  showNext:Boolean= true;
  fin:Boolean= false;

  
  enunciado = "";
  nomostrar = "hide";
  urli = "";
  urld = "";
  showButton1 = true;
  showNext1 = true;
  showImagenes = false;
  showButtonNext1 = false;
  contadorPreg1: number = 0;

  color: string = "";
  value: number = 50;

  contadorPreg: number = 0;
  pregunta: string = "";
  idPregunta: string = "";
  idImagen: string = "";
  url: string = "";
  tipo: string = "";

  startTest() {
    this.pregunta = this.preguntasArr[this.contadorPreg].text;
    //console.log(JSON.stringify(this.preguntasArr[this.contadorPreg].text))

    //añadir imagen al html
    let random: number = Math.floor(
      Math.random() * Object.keys(this.imageArrHFSW).length
    );
    this.mapHFSW.set(this.imageArrHFSW[random], this.imageArrHFSW[random]);
    

    this.url = this.imageArrHFSW[random].url;
    //this.idImagen = this.imageArrHFSW[random].id;
    //this.tipo = this.imageArrHFSW[random].tipo;

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

    this.contadorPreg++;



    if (this.contadorPreg == 4) {
      console.log("quieres parar loco?");
      this.mapHFSW = new Map();
      this.next = true;
    }
    
    this.pregunta = this.preguntasArr[this.contadorPreg % 2].text;

    //añadir imagen al html
    let random: number = Math.floor(
      Math.random() * Object.keys(this.imageArrHFSW).length
    );
    while (this.mapHFSW.get(this.imageArrHFSW[random])) {
      random = Math.floor(
        Math.random() * Object.keys(this.imageArrHFSW).length
      );
      console.log("calculando randommm...." + random);
    }
    this.mapHFSW.set(this.imageArrHFSW[random], this.imageArrHFSW[random]);
    
      this.url = this.imageArrHFSW[random].url;



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

  tutorial(){
    //this.next = false;
    this.nextTutorial = true;

      console.log("Test Comenzado!");
  
      this.nomostrar = "block";
      this.enunciado = "Elija el alimento que  desee más comer ahora";
  
      this.hideButtonComenzar = false;
      this.showButtonNext1 = true;
  
      //this.calculateImage();
  
      //console.time("t1");
    
  }

  nextPaired() {
    this.showImagenes = true;
    this.showNext1 = false;
    this.calculateImage();


    this.contadorPreg1++;
  }

  nextQuestionLeft() {
    this.showImagenes = false;
    this.showNext1 = true;
    //console.log("hola izquierda");

    
    if (this.contadorPreg1 == 3) {
      this.fin = true;
      this.nextTutorial = false;
      this.next = false;

      return;
      //this.descanso = true;
    } 
    
  }
  nextQuestionRight() {
    this.showImagenes = false;
    this.showNext1 = true;
    if (this.contadorPreg1 == 3) {
      this.fin = true;
      this.nextTutorial = false;
return;
    
  }
}

  calculateImage() {
  

    let randomImagenIzq: number;
    let randomImagenDer: number;

    //let urli: string;
    //let urld: string;
    //randomGrupoIzq = Math.floor(Math.random() * 4);
    randomImagenIzq = Math.floor(Math.random() * 4);
    randomImagenDer = Math.floor(Math.random() * 4);

    this.urli = "";
    this.urld = "";

    this.urli = this.imageArrHFSW[randomImagenIzq].url;
    this.urld = this.imageArrLFSA[randomImagenDer].url;
    console.log("AQUI"+this.urli)

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
    this.nextPaired();
  }


  pairedOpen(){
    this.paired = true;
  }

  finAll(){
    this.router.navigateByUrl("");

  }
}
