import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular'


import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { PreguntasService, preg } from '../../Services/preguntas.service';
import { ImagesService, image,food } from '../../Services/images.service';


@NgModule({
  imports: [
    FormsModule
  ],
})


@Component({
  selector: 'app-paired-test',
  templateUrl: './paired-test.page.html',
  styleUrls: ['./paired-test.page.scss'],
})
export class PairedTestPage implements OnInit {


  public imageArrHFSA: any = [];
  public imageArrHFSW: any = [];
  public imageArrLFSA: any = [];
  public imageArrLFSW: any = [];


  constructor(
    public loadingController: LoadingController,
    public imagenes: ImagesService,

  ) {
    this.imageArrHFSA = new Array();
    this.imageArrHFSW = new Array();
    this.imageArrLFSA = new Array();
    this.imageArrLFSW = new Array();

   }
  
 
  ngOnInit() {
    
    /*
    this.imagenes.getImage().subscribe(food => {
      this.imageArrHFSA = food.find(element => element.id == 'hfsa');
      this.imageArrLFSW = food.find(element => element.id == 'lfsw');
      this.imageArrHFSW = food.find(element => element.id == 'hfsw');
      this.imageArrLFSA = food.find(element => element.id == 'lfsa');
      console.log('aquiiuiuiui:'+JSON.stringify(this.imageArrHFSA));
      console.log('aquiiuiuiui:'+JSON.stringify(this.imageArrLFSW));

    })*/
  }
  nomostrar = 'hide';
  enunciado = '';
  urli = '';
  urld = '';
  showButton = true;

  //mediciones de tiempo
  //before=null;
  before2=null;
  after=null;
  tiempo=null;
  
  hideButtonComenzar = true; 
  showButtonNext = false;

  randomI:number;
  randomD:number;


  mapHFSA = new Map();
  mapLFSW = new Map();
  mapHFSW = new Map();
  mapLFSA = new Map();


  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');

    //llamada a funcion que empieza el test onclick()
    this.startTest();
  }

  startTest() {
    console.log('Test Comenzado!');

    this.nomostrar = 'block';
    this.enunciado = 'Elija el alimento que más desee comer ahora';

    this.hideButtonComenzar = false; 
    this.showButtonNext = true;

    this.calculateImage();
   

    this.startTimer();
    //console.time("t1");
  }
  startTimer(){
    this.before2 = null
    this.before2 = Date.now();
  }

 

  nextQuestionLeft() {
    console.log('hola izquierda');

    this.after = Date.now();
    this.tiempo = (this.after-this.before2)/1000;
    console.log(this.tiempo);
    //console.log((this.after-this.before)/1000);
    console.log("tiempooo IZQQQ: " +this.tiempo);

  }
  nextQuestionRight() {
    console.log('hola derecha');

    this.after = Date.now();
    this.tiempo = (this.after-this.before2)/1000;
    console.log(this.tiempo);
    console.log("tiempooo DERECC: " +this.tiempo);

  }

  Next(){

    this.calculateImage();
    this.startTimer();

  }


  focusInput(input) {
    input.setFocus();
  }

  calculateImage(){

 //añadir imagen al html  ((izquierda))
 let randomI:number = Math.floor((Math.random()*(Object.keys(this.imageArrHFSA).length-1)))+1;
 this.mapHFSA.set(this.imageArrHFSA['imagen'+randomI],this.imageArrHFSA['imagen'+randomI]);
 //console.log(JSON.stringify('aaaaaaa: '+this.selectedHFSA))
 this.urli = this.imageArrHFSA['imagen'+randomI];

 //añadir imagen al html  ((derecha))
 let randomD:number = Math.floor((Math.random()*(Object.keys(this.imageArrLFSW).length-1)))+1;
 this.mapHFSA.set(this.imageArrLFSW['imagen'+randomD],this.imageArrLFSW['imagen'+randomD]);
 //console.log(JSON.stringify('aaaaaaa: '+this.selectedHFSA))
 this.urld = this.imageArrLFSW['imagen'+randomD];
  }


}
