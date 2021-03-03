import { ConfiguracionPage } from "./../pages/configuracion/configuracion.page";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController, NavController } from "@ionic/angular";
import { FormulariosPage } from "../pages/formularios/formularios.page";
import { ExcelService } from "../Services/excel.service";
import { formatDate } from "@angular/common";
import {
  FirebaseUploadService,
  reports,
} from "../Services/firebaseUpload.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  title = "angular-export-to-excel";

  dataForExcel = [];

  allData = [];


  public fecha: string = null;

  constructor(
    private router: Router,
    public modalController: ModalController,
    private navController: NavController,
    public ete: ExcelService,
    public firebaseUpload: FirebaseUploadService
  ) {}

  ngOnInit() {
    this.fecha = sessionStorage.getItem("date");
  }

  openTest() {
    //boton para configurar random test
  }

  async openModuleS() {
    this.checkPoliticies().then(
      (resultado) => {
        console.log("AAAAresultado:  " + resultado);
        if (resultado) {
          console.log("AAAAresultado:  ");

          this.router.navigateByUrl("/pages/single-test");
        }
      },
      (rejected) => {
        console.log("AAAArejected:  " + rejected);

        //this.navController.back();
        this.router.navigateByUrl("");
      }
    );
  }

  openModuleP() {
    this.router.navigateByUrl("/pages/paired-test");
  }
  openModuleF() {
    this.router.navigateByUrl("/pages/formularios");
  }

  openModuleC() {
    this.presentModalConfig();
  }

  async presentModalConfig() {
    const modal = await this.modalController.create({
      component: ConfiguracionPage,
    });
    console.log("llega");

    await modal.present();
  }

  async presentModal(): Promise<Boolean> {
    let resultado: Promise<Boolean> = new Promise(async (resolve, reject) => {
      const modal = await this.modalController.create({
        component: FormulariosPage,
        backdropDismiss: false,
      });

      modal.onDidDismiss().then((data) => {
        console.log("AQUI EIASJEFIAS " + JSON.stringify(data));

        console.log("RESULTADO " + JSON.stringify(data.data.resultado));

        if (data.data.resultado) {
          resolve(true);
          sessionStorage.setItem("accept", "OK");
        } else {
          reject(true);
        }
      });

      await modal.present();
    });
    return resultado;
  }

  checkPoliticies(): Promise<Boolean> {
    let resultado: Promise<Boolean> = new Promise(async (resolve, reject) => {
      if (!sessionStorage.getItem("accept")) {
        this.presentModal().then(
          (resultado) => {
            console.log("checkpoliticies  " + JSON.stringify(resultado));

            resolve(true);
          },
          (rejected) => {
            console.log("rejected  ");

            reject(true);
          }
        );
      }
    });

    return resultado;
  }
  //FUNCIONA BUENA
  /*
  exportToExcel() {
    //this.firebaseUpload.getRespuestas().subscribe()
      
    this.firebaseUpload.getAll().subscribe((reports) => {
      this.allData = reports;

    console.log("ALLDATA: "+JSON.stringify(this.allData))
    let now = new Date();
    this.fecha = formatDate(now, "dd/MM/yyyy", 'es');

    this.allData.forEach((row: any) => {
      this.dataForExcel.push(Object.values(row))
    })

    let reportData = {
      title: 'Investigación UCAM Report - '+this.fecha,
      data: this.dataForExcel,
      headers: Object.keys(this.allData[0])
    }
    this.ete.exportExcel(reportData);
  });


}*/

  exportToExcel() {

    let subscription: Subscription;
    
    this.allData = [];
    //this.firebaseUpload.getAll();
    subscription = this.firebaseUpload.getAll().subscribe((reports) => {

      this.allData = reports.filter((element) => element.Paciente);
      console.log("ALLDATA: " + JSON.stringify(this.allData));

      let now = new Date();
      this.fecha = formatDate(now, "dd/MM/yyyy", "es");
      this.dataForExcel = [];
      this.allData.forEach((row: any) => {
        this.dataForExcel.push(Object.values(row));
      });
      console.log(this.dataForExcel)

      let reportData = {
        title: "Investigación UCAM Report - " + this.fecha,
        data: this.dataForExcel,
        headers: Object.keys(this.allData[0]),
      };
      //uncomment this
      this.ete.exportExcel(reportData);
      subscription.unsubscribe();
    });
    
  }
}
