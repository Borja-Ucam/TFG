import { food } from './../../Services/images.service';
import { Respuesta } from './../../Classes/Respuesta';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';


import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { PreguntasService, preg } from '../../Services/preguntas.service';
import { ImagesService, image } from '../../Services/images.service';
import { identifierModuleUrl } from '@angular/compiler';



@NgModule({
  imports: [
    FormsModule
  ],
})

@Component({
  selector: 'app-single-test',
  templateUrl: './single-test.page.html',
  styleUrls: ['./single-test.page.scss'],
})
export class SingleTestPage implements OnInit, OnDestroy {

  public preguntasArr: any = [];


  public imageArrHFSA: any = [];
  public imageArrHFSW: any = [];
  public imageArrLFSA: any = [];
  public imageArrLFSW: any = [];

  public selectedHFSA: any[] = [];
  public selectedHFSW: any[] = [];
  public selectedLFSA: any[] = [];
  public selectedLFSW: any[] = [];

  public aaaa: food[] = new Array();


  constructor(
    public loadingController: LoadingController,
    public angularFirestore: AngularFirestore,
    private db: AngularFireDatabase,
    public preguntas: PreguntasService,
    public imagenes: ImagesService,
    private router: Router

  ) {
    this.imageArrHFSA = new Array();
    this.imageArrHFSW = new Array();
    this.imageArrLFSA = new Array();
    this.imageArrLFSW = new Array();


    this.selectedHFSA = new Array();
    this.selectedHFSW = new Array();
    this.selectedLFSA = new Array();
    this.selectedLFSW = new Array();


  }
  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
    console.log('Saliendo...')
  }


  ngOnInit() {
    this.preguntas.getText().subscribe(pregunta => {
      this.preguntasArr = pregunta;

    })
    /*
    this.imageArrHFSA = this.imagenes.getImage()
    console.log("aqui llegaa: "+this.imagenes.getImage())
    console.log("aqui llegaa IMAGE ARR: "+this.imageArrHFSA)
    */
    this.imagenes.getImageHFSA().subscribe(food => {
      this.imageArrHFSA = food.filter(element => element.id)
      //console.log("hfsa: " + JSON.stringify(this.imageArrHFSA))
    })

    this.imagenes.getImageHFSW().subscribe(food => {
      this.imageArrHFSW = food.filter(element => element.id)
      //console.log("hfsw: " + JSON.stringify(this.imageArrHFSW))
    })

    this.imagenes.getImageLFSA().subscribe(food => {
      this.imageArrLFSA = food.filter(element => element.id)
      //console.log("LFSA: " + JSON.stringify(this.imageArrLFSA))
    })
    this.imagenes.getImageLFSW().subscribe(food => {
      this.imageArrLFSW = food.filter(element => element.id)
      //console.log("lfsw: " + JSON.stringify(this.imageArrLFSW))
    })
    /*
    this.imagenes.getImage().subscribe(food =>{
      this.imageArrHFSA = food.find(element => element.id == 'Salmon');
      console.log('aquiiuiuiui:'+JSON.stringify(this.imageArrHFSA));
      


    })*/


    /*this.imagenes.getImage().subscribe(image => {
      this.imageArrHFSA = image.find(element => element.id == 'hfsa');
      this.imageArrLFSW = image.find(element => element.id == 'lfsw');
      this.imageArrHFSW = image.find(element => element.id == 'hfsw');
      this.imageArrLFSA = image.find(element => element.id == 'lfsa');

      //console.log('aquiiuiuiui:'+JSON.stringify(this.imageArrHFSA));
      //console.log('aquiiuiuiui:'+JSON.stringify(this.imageArrLFSW));

    })*/


  }
  contadorPreg: number = 0;
  pregunta: string = '';
  idPregunta: string = '';
  idImagen: string = '';
  url: string = '';
  color: string = '';
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


  random: number;

  mapHFSA = new Map();
  mapLFSW = new Map();
  mapHFSW = new Map();
  mapLFSA = new Map();

  respuestas: Respuesta[];

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Loading...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');

    //llamada a funcion que empieza el test onclick()
    this.startTest();
  }


  startTest() {
    console.log('Test started!');
    this.respuestas = new Array();
    //console.log(JSON.stringify(this.preguntasArr[this.contadorPreg].text))

    //añadir pregunta al html

    this.pregunta = this.preguntasArr[this.contadorPreg].text;

    //añadir imagen al html
    let random: number = Math.floor((Math.random() * (Object.keys(this.imageArrHFSA).length - 1)))+1;
    this.mapHFSA.set(this.imageArrHFSA[random], this.imageArrHFSA[random]);
    console.log(JSON.stringify('QUE HAY DENTRO: '+this.imageArrHFSA[random].url))
    console.log(JSON.stringify('0 QUE HAY DENTRO: '+JSON.stringify(this.imageArrHFSA[0].url)))
    console.log(JSON.stringify('1 QUE HAY DENTRO: '+JSON.stringify(this.imageArrHFSA[1].url)))
    console.log(JSON.stringify('2 QUE HAY DENTRO: '+JSON.stringify(this.imageArrHFSA[2].url)))


    this.url = this.imageArrHFSA[random].url;
    this.idImagen = this.imageArrHFSA[random].id;

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

      return this.showButton = false;
    }
    else {
      //console.log("entra 2");
      this.hideButton = false;
      this.hideButtonComenzar = true;

      //this.showQuestion = true;

      return this.showButton = true;

    }



  }



  nextQuestion() {
    this.idPregunta = this.preguntasArr[this.contadorPreg % 2].id;
    this.contadorPreg++;


    //let pregunta=this.contadorPreg % 2 == 0?'deseo':'gusto';
    this.respuestas.push(new Respuesta(this.idImagen, this.idPregunta, this.pregunta, this.value.toString()));
    console.log('ESTO ES LA SALIDA: ' + JSON.stringify(this.respuestas))
    
    //LOGS DE LOS MAPS
    //console.log("MAPHFSA"+JSON.stringify(this.mapHFSA.get(this.imageArrHFSA[0])))
    //console.log("MAPHFSA"+JSON.stringify(this.mapHFSA.get(this.imageArrHFSA[1])))
    //console.log("MAPHFSA"+JSON.stringify(this.mapHFSA.get(this.imageArrHFSA[2])))

    switch (this.contadorPreg % 4) {
      case 0:
        console.log("holaacase 0")

        if (this.contadorPreg == 16) {
          console.log("quieres parar loco?")
          this.mapHFSA = new Map();
          this.mapLFSW = new Map();
          this.mapHFSW = new Map();
          this.mapLFSA = new Map();

          this.descanso = true;
        }

        if (this.contadorPreg == 32) {
          console.log("El fin? meh oki ")
          //this.descanso= false;
          this.fin = true;
        }


        //preguntas
        this.pregunta = this.preguntasArr[this.contadorPreg % 2].text;

        //console.log(JSON.stringify(this.imageArrLFSA))
        //console.log(JSON.stringify(this.imageArrLFSW))

        //imagen
        console.log('contadorPREGG case 0: ' + this.contadorPreg)
        if (this.contadorPreg < 16) {
          let random: number = Math.floor((Math.random() * (Object.keys(this.imageArrHFSA).length - 0)))+0;
          while (this.mapHFSA.get(this.imageArrHFSA[random])) {
            random = Math.floor((Math.random() * (Object.keys(this.imageArrHFSA).length - 1))) + 1;
            console.log('calculando randommm....'+random)
          }
          console.log('FUERA randommm....'+random)
          this.mapHFSA.set(this.imageArrHFSA[random], this.imageArrHFSA[random]);
          this.url = this.imageArrHFSA[random].url;
          this.idImagen = this.imageArrHFSA[random].id;

        } else {
          let random: number = Math.floor((Math.random() * (Object.keys(this.imageArrLFSW).length - 1)))+1;
          while (this.mapLFSW.get(this.imageArrLFSW['imagen' + random]) && this.contadorPreg < 29) {
            random = Math.floor((Math.random() * (Object.keys(this.imageArrLFSW).length - 1)));
            console.log('calculando randommm....')
          }
          this.mapLFSW.set(this.imageArrLFSW['imagen' + random], this.imageArrLFSW['imagen' + random]);
          this.url = this.imageArrLFSW['imagen' + random];
        }

        break;

      case 1:
        console.log("holacase1")

        //preguntas
        this.pregunta = this.preguntasArr[this.contadorPreg % 2].text;
        console.log('contadorPREGG case 1: ' + this.contadorPreg)

        //imagen
        if (this.contadorPreg < 16) {
          let random: number = Math.floor((Math.random() * (Object.keys(this.imageArrHFSA).length - 0)))+0;
          while (this.mapLFSW.get(this.imageArrLFSW[random])) {
            random = Math.floor((Math.random() * (Object.keys(this.imageArrLFSW).length - 1))) + 1;
            console.log('calculando randommm....'+random)
          }
          console.log('FUERA randommm....'+random)
          this.mapLFSW.set(this.imageArrLFSW[random], this.imageArrLFSW[random]);
          this.url = this.imageArrLFSW[random].url;
          this.idImagen = this.imageArrLFSW[random].id;

        } else {

          let random: number = Math.floor((Math.random() * (Object.keys(this.imageArrHFSA).length - 1))) + 1;
          while (this.mapHFSA.get(this.imageArrHFSA['imagen' + random])) {
            random = Math.floor((Math.random() * (Object.keys(this.imageArrHFSA).length - 1))) + 1;
            console.log('calculando randommm....')

          }
          this.mapHFSA.set(this.imageArrHFSA['imagen' + random], this.imageArrHFSA['imagen' + random]);
          this.url = this.imageArrHFSA['imagen' + random];

        }
        break;

      case 2:
        console.log("holacase2")
        this.pregunta = this.preguntasArr[this.contadorPreg % 2].text;

        console.log('contadorPREGG case 2: ' + this.contadorPreg)
        if (this.contadorPreg < 16) {
          let random: number = Math.floor((Math.random() * (Object.keys(this.imageArrLFSA).length - 0)))+0;
          while (this.mapLFSA.get(this.imageArrLFSA[random])) {
            random = Math.floor((Math.random() * (Object.keys(this.imageArrLFSA).length - 1))) + 1;
            console.log('calculando randommm....'+random)
          }
          console.log('FUERA randommm....'+random)
          this.mapLFSA.set(this.imageArrLFSA[random], this.imageArrLFSA[random]);
          this.url = this.imageArrLFSA[random].url;
          this.idImagen = this.imageArrLFSA[random].id;

        } else {
          let random: number = Math.floor((Math.random() * (Object.keys(this.imageArrHFSW).length - 1))) + 1;
          while (this.mapHFSW.get(this.imageArrHFSW['imagen' + random])) {
            random = Math.floor((Math.random() * (Object.keys(this.imageArrHFSW).length - 1))) + 1;
            console.log('calculando randommm....')
          }
          this.mapHFSW.set(this.imageArrHFSW['imagen' + random], this.imageArrHFSW['imagen' + random]);
          this.url = this.imageArrHFSW['imagen' + random];
        }
        break;

      case 3:
        console.log("holacase3")
        this.pregunta = this.preguntasArr[this.contadorPreg % 2].text;

        console.log('contadorPREGG case 2: ' + this.contadorPreg)
        if (this.contadorPreg < 16) {
          let random: number = Math.floor((Math.random() * (Object.keys(this.imageArrHFSW).length - 0)))+0;
          while (this.mapHFSW.get(this.imageArrHFSW[random])) {
            random = Math.floor((Math.random() * (Object.keys(this.imageArrHFSW).length - 1))) + 1;
            console.log('calculando randommm....'+random)
          }
          console.log('FUERA randommm....'+random)
          this.mapHFSW.set(this.imageArrHFSW[random], this.imageArrHFSW[random]);
          this.url = this.imageArrHFSW[random].url;
          this.idImagen = this.imageArrHFSW[random].id;

        } else {
          let random: number = Math.floor((Math.random() * (Object.keys(this.imageArrLFSA).length - 1))) + 1;
          while (this.mapLFSA.get(this.imageArrLFSA['imagen' + random])) {
            random = Math.floor((Math.random() * (Object.keys(this.imageArrLFSA).length - 1))) + 1;
            console.log('calculando randommm....')
          }
          this.mapLFSA.set(this.imageArrLFSA['imagen' + random], this.imageArrLFSA['imagen' + random]);
          this.url = this.imageArrLFSA['imagen' + random];
        }
        break;

      default:
        break;
    }


    if (this.changeQuestion == 0) {
      this.color = "secondary";
      console.log(this.value);



      this.changeQuestion = 1;

    }
    else {
      this.color = "danger";
      console.log(this.value);

      this.changeQuestion = 0;


    }//end else

    this.value = 50;
  }


  continuar() {
    this.descanso = false;
    //this.startTest();
  }

  salir() {
    this.router.navigateByUrl('home');

  }

}
