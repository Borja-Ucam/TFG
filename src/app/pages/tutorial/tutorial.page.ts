import { Component, OnInit } from '@angular/core';
import { PreguntasService } from 'src/app/Services/preguntas.service';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {
  public preguntasArr: any = [];
  public imageArrHFSA: any = [];

  mapHFSA = new Map();

  constructor(    public preguntas: PreguntasService,
    ) { }

  ngOnInit() {
    this.preguntas.getText().subscribe((pregunta) => {
      this.preguntasArr = pregunta;
    });
  }
  showButton = true;
  showQuestion = false;
  hideButton = false;
  hideButtonComenzar = true;
  color: string = "";


  contadorPreg: number = 0;
  pregunta: string = "";
  idPregunta: string = "";
  idImagen: string = "";
  url: string = "";
  tipo: string = "";

  startTest(){
    this.pregunta = this.preguntasArr[this.contadorPreg].text;
    //console.log(JSON.stringify(this.preguntasArr[this.contadorPreg].text))

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
}
