import { ImagesService } from './../../Services/images.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {

  public imageArrHFSA: any = [];
  public imageArrHFSW: any = [];
  public imageArrLFSA: any = [];
  public imageArrLFSW: any = [];

  public auximageArrHFSA: any = [];
  public auximageArrHFSW: any = [];
  public auximageArrLFSA: any = [];
  public auximageArrLFSW: any = [];


  constructor(public imagenes: ImagesService,
    private modalController: ModalController) { }

  ngOnInit() {

    this.imageArrHFSA = new Array();
    this.imageArrHFSW = new Array();
    this.imageArrLFSA = new Array();
    this.imageArrLFSW = new Array();


    if(sessionStorage.getItem("imageArrHFSA")){
      
      this.imageArrHFSA = JSON.parse(sessionStorage.getItem("imageArrHFSA"));

    }else{
      this.imagenes.getImageHFSA().subscribe(food => {
        this.imageArrHFSA = food;
      })
    }

    if(sessionStorage.getItem("imageArrHFSW")){
      
      this.imageArrHFSW = JSON.parse(sessionStorage.getItem("imageArrHFSW"));

    }else{
      this.imagenes.getImageHFSW().subscribe(food => {
        this.imageArrHFSW = food;
      })
    }

    if(sessionStorage.getItem("imageArrLFSA")){
      
      this.imageArrLFSA = JSON.parse(sessionStorage.getItem("imageArrLFSA"));

    }else{
      this.imagenes.getImageLFSA().subscribe(food => {
        this.imageArrLFSA = food;
      })
    }

    if(sessionStorage.getItem("imageArrLFSW")){
      
      this.imageArrLFSW = JSON.parse(sessionStorage.getItem("imageArrLFSW"));

    }else{
      this.imagenes.getImageLFSW().subscribe(food => {
        this.imageArrLFSW = food;
      })
    }



  }

  dismiss(){
    sessionStorage.setItem("imageArrHFSA",JSON.stringify(this.imageArrHFSA));
    sessionStorage.setItem("imageArrHFSW",JSON.stringify(this.imageArrHFSW));
    sessionStorage.setItem("imageArrLFSA",JSON.stringify(this.imageArrLFSA));
    sessionStorage.setItem("imageArrLFSW",JSON.stringify(this.imageArrLFSW));

    this.modalController.dismiss({
      'dismissed': true,
      'resultado':true
    });
  }

  contar(){

    //let counter: number;

    this.auximageArrHFSA = this.imageArrHFSA.filter(element => element.available)
    this.auximageArrHFSW = this.imageArrHFSW.filter(element => element.available)
    this.auximageArrLFSA = this.imageArrLFSA.filter(element => element.available)
    this.auximageArrLFSW = this.imageArrLFSW.filter(element => element.available)
/*
    counter = this.auximageArrHFSA.length + this.auximageArrHFSW.length + this.auximageArrLFSA.length + this.auximageArrLFSW.length;
    console.log("CONTADOR" +counter);

    if(counter<16){
      alert('Se debe elegir 16 alimentos a la vez. Elegidos totales: '+counter);
      return;
    }else if(counter>16){
      alert('else Se debe elegir 16 alimentos a la vez. Elegidos totales: '+counter);
      return;
    }
    
*/
    if(this.auximageArrHFSA.length != 4){
      alert('El grupo HFSA debe tener 4 alimentos. Elegidos HFSA: '+this.auximageArrHFSA.length);
      return;
    }
    if(this.auximageArrHFSW.length != 4){
      alert('El grupo HFSW debe tener 4 alimentos. Elegidos HFSW: '+this.auximageArrHFSW.length);
      return;
    }
    if(this.auximageArrLFSA.length != 4){
      alert('El grupo LFSA debe tener 4 alimentos. Elegidos LFSA: '+this.auximageArrLFSA.length);
      return;
    }
    if(this.auximageArrLFSW.length != 4){
      alert('El grupo LFSW debe tener 4 alimentos. Elegidos LFSW: '+this.auximageArrLFSW.length);
      return;
    }

    this.dismiss();
    //return counter;
      
  }

}

