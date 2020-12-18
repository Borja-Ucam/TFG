import { Component, OnInit } from '@angular/core';
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
export class SingleTestPage implements OnInit {

  public preguntasArr: any = [];

  constructor(
    public loadingController: LoadingController,
    public angularFirestore: AngularFirestore,
    private db: AngularFireDatabase,
    public preguntas: PreguntasService

  ) { }

  ngOnInit() {

    this.preguntas.getText().subscribe(pregunta => {
      this.preguntasArr = pregunta;
    })

  }
  question = '';
  url = "/assets/img/hfsa03.bmp";
  color = '';
  value = null;
  showButton = true;
  changeQuestion = 0;
  i = 4;
  a = 0;



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





    //console.log(this.showButton);
    if (this.showButton == true) {
      //console.log("entra 1");
      //this.question = "¿Cuanto deseas comer esto?";
      this.color = "danger";
      this.value = 50;

      document.getElementById("start-btn").style.display = "none";
      document.getElementById("next-btn").style.display = "block";
      document.getElementById("question-container").style.display = "block";
      return this.showButton = false;
    }
    else {
      //console.log("entra 2");
      document.getElementById("start-btn").style.display = "block";

      document.getElementById("next-btn").style.display = "none";

      return this.showButton = true;

    }

  }

  nextQuestion() {
    //console.log(this.changeQuestion);




    if (this.changeQuestion == 0) {
      //console.log(this.valueRange);
      //this.question = "¿Cómo de placentero sería comer esto?";
      this.color = "secondary";
      if (this.value != 50) {
        this.value = 50;
      }
      this.url = "/assets/img/hfsa04.bmp"

      this.changeQuestion = 1;


    }
    else {
      this.question = "¿Cuanto deseas comer esto?";
      this.color = "danger";
      //document.getElementById("question").style.color = "#3dc2ff";
      this.url = "/assets/img/hfsa03.bmp"
      console.log(this.value);
      if (this.value != 50) {
        this.value = 50;
      }
      this.changeQuestion = 0;

    }//end else


  }
}
