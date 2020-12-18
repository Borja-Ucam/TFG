import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';



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
  }


  nextQuestionLeft() {
    console.log('hola izquierda');
  }
  nextQuestionRight() {
    console.log('hola derecha');

  }




}
