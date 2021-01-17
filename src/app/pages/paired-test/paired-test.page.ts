import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular'



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



  constructor(
    public loadingController: LoadingController,

  ) { }
  
 
  ngOnInit() {
    
  }
  nomostrar = 'hide';
  enunciado = '';
  urli = 'assets/img/hfsa03.bmp';
  urld = 'assets/img/hfsa04.bmp';
  showButton = true;

  //mediciones de tiempo
  //before=null;
  before2=null;
  after=null;
  tiempo=null;
  

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
    this.enunciado = 'Elija una de las dos imágenes lo más rapido posible';
    this.nomostrar = 'block';
    document.getElementById("start-btnP").style.display = "none";


    //console.log(this.showButton);
    //this.before = Date.now();
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
    console.timeEnd("t1");
  }
  nextQuestionRight() {
    console.log('hola derecha');

    this.after = Date.now();
    this.tiempo = (this.after-this.before2)/1000;
    console.log(this.tiempo);
    //console.log((this.after-this.before)/1000);
    console.timeEnd("t1");
  }

  focusInput(input) {
    input.setFocus();
  }


}
