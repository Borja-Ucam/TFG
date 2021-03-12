import { RespuestaPac } from "./../Classes/RespuestaPac";
import {
  TranslatePipe,
  TranslateService,
  TranslateModule,
} from "@ngx-translate/core";
import { AuthService } from "src/app/Services/auth.service";
import { ConfiguracionPage } from "./../pages/configuracion/configuracion.page";
import { Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController, NavController, IonSelect } from "@ionic/angular";
import { FormulariosPage } from "../pages/formularios/formularios.page";
import { ExcelService } from "../Services/excel.service";
import { formatDate } from "@angular/common";
import {
  FirebaseUploadService,
  reports,
} from "../Services/firebaseUpload.service";
import { Subscription } from "rxjs";
import { forEach } from "mathjs";
import { ExcelPacienteService } from "../Services/excelPaciente.service";
import { Respuesta } from "../Classes/Respuesta";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  title = "angular-export-to-excel";

  dataForExcel = [];
  dataForExcel1 = [];
  dataForExcel2 = [];

  public paciente = [];

  allData: any = [];
  allData1: any = [];
  //allData2:any = [];

  //prueba: Object;
  allDataPac: Respuesta[];

  public fecha: string = null;
  //public activeLang= 'en';

  @ViewChild("mySelect") selectRef: IonSelect;
  showList = true;

  constructor(
    private router: Router,
    public modalController: ModalController,
    private navController: NavController,
    public ete: ExcelService,
    public etePac: ExcelPacienteService,
    public firebaseUpload: FirebaseUploadService,
    public authService: AuthService,
    public translate: TranslateService,
    public TranslateModule: TranslateModule
  ) {}

  ngOnInit() {
    this.fecha = sessionStorage.getItem("date");
  }

  cambioIdioma(selectedValue) {
    console.log("llega esto: " + JSON.stringify(selectedValue));
    this.translate.use(selectedValue);
    //this.translate.use('en');
  }
  openSelect() {
    this.selectRef.open();
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

  openModuleTutorial() {
    //this.firebaseUpload.getPaciente();
    this.router.navigateByUrl("/tutorial");
  }

  open() {
    if (this.authService.isLoggedIn) {
      this.router.navigateByUrl("/downloads");
    } else {
      this.router.navigateByUrl("/login");
    }
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
        cssClass: "my-modal-class",
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
            console.log("modal llega");

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
    let subscriptionPaired: Subscription;

    this.allData = [];
    this.allData1 = []

    subscriptionPaired = this.firebaseUpload.getAllPaired().subscribe((reports1) => {
      this.allData1 = reports1.filter((element)=> element.Paciente);
      this.allData1.sort((a, b) =>
        a.Fecha < b.Fecha ? 1 : b.Fecha < a.Fecha ? -1 : 0
      );
      
      console.log("SORTED PAIRED: " + JSON.stringify(this.allData1));
      let now = new Date();
      this.fecha = formatDate(now, "dd/MM/yyyy", "es");
      this.dataForExcel1 = [];

      this.allData1.forEach((row: any) => {
        this.dataForExcel1.push(Object.values(row));
      });
      console.log(this.dataForExcel1);
      subscriptionPaired.unsubscribe();

    });
    subscription = this.firebaseUpload.getAll().subscribe((reports) => {
      this.allData = reports.filter((element) => element.Paciente);
      console.log("ALLDATA: " + JSON.stringify(this.allData));
      //const sorted = this.allData.sort(function(o){ return o.Fecha});
      this.allData.sort((a, b) =>
        a.Fecha < b.Fecha ? 1 : b.Fecha < a.Fecha ? -1 : 0
      );
      //tengo que hacer el sort de los datos alldata1
      console.log("SORTED SINGLE: " + JSON.stringify(this.allData));

      let now = new Date();
      this.fecha = formatDate(now, "dd/MM/yyyy", "es");
      this.dataForExcel = [];
      

      this.allData.forEach((row: any) => {
        this.dataForExcel.push(Object.values(row));
      });
      console.log("DATA EXCEL : "+this.dataForExcel);
      console.log("DATA EXCEL 1: "+this.dataForExcel1)
     

      let reportData = {
        title: "Investigación UCAM Report",
        data: this.dataForExcel,
        headers: Object.keys(this.allData[0]),
      };
      let reportData1 = {
        title1: "Investigación UCAM Report",
        data1: this.dataForExcel1,
        headers1: Object.keys(this.allData1[0]),
      };
      //uncomment this
      this.ete.exportExcel(reportData, reportData1);
      subscription.unsubscribe();
    });
  }

  exportToExcelPaciente() {
    let subscription: Subscription;

    this.allDataPac = new Array();

    this.firebaseUpload.getPaciente().then((reports) => {
      /*console.log("fasdfasdfasdfasdfasdfasdfasd");
      console.log(JSON.stringify(reports.respuestas));
      console.log(reports.respuestas.length)
*/

      for (let index = 0; index < reports.respuestas.length; index++) {
        const respuesta = reports.respuestas[index];

        this.allDataPac.push(
          new Respuesta(
            respuesta.imagen,
            respuesta.idPregunta,
            respuesta.respuesta
          )
        );
      }

      //console.log("PRUEBAAAAAA: " ,JSON.stringify(this.allDataPac));

      let now = new Date();
      let Paciente = reports.Paciente;
      this.fecha = formatDate(now, "dd/MM/yyyy", "es");
      this.dataForExcel = [];

      this.allDataPac.forEach((row: any) => {
        this.dataForExcel.push(Object.values(row));
      });

      let reportData = {
        title: "Investigación UCAM Report - " + Paciente,
        data: this.dataForExcel,

        headers: Object.keys(this.allDataPac[0]),
      };

      this.etePac.exportExcelPaciente(reportData);
    });
  }
}
