import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-formularios",
  templateUrl: "./formularios.page.html",
  styleUrls: ["./formularios.page.scss"],
})
export class FormulariosPage implements OnInit {

  submitted = false;

  checked: Boolean;

  aceptado: Boolean;
  idUser: string = null;


  constructor(
    private modalController: ModalController,
    
  ) {
    

  }

  ngOnInit() {
    this.aceptado = false;
   
  }

  


 
  enlace() {
    window.open(
      "https://drive.google.com/file/d/1R115VmbKofXSOw6fqMdTneMvo0bQpNx7/view?usp=sharing",
      "_system"
    );
  }

  dismiss() {

    console.log(this.aceptado)
    if(this.aceptado){

      sessionStorage.setItem("idUser",JSON.stringify(this.idUser));
      this.modalController.dismiss({
        dismissed: true,
        resultado: true,
        
      });

    }else{

      alert('Debe aceptar los terminos y condiciones.');
    }
    
  }

  cerrar() {
    this.modalController.dismiss({
      dismissed: false,
      resultado: false,
    });
  }
}
