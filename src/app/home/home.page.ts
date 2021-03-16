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


  
  allData: any = [];
  allData1: any = [];

  allDataPac: Respuesta[];

  public fecha: string = null;

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
    this.translate.use(selectedValue);
  }
  openSelect() {
    this.selectRef.open();
  }

  async openModuleS() {
    this.checkPoliticies().then(
      (resultado) => {
        if (resultado) {
          this.router.navigateByUrl("/pages/single-test");
        }
      },
      (rejected) => {
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
    ("llega");

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
            resolve(true);
          },
          (rejected) => {
            reject(true);
          }
        );
      }
    });

    return resultado;
  }

  exportToExcel() {
    let subscription: Subscription;
    let subscriptionPaired: Subscription;

    this.allData = [];
    this.allData1 = [];

    subscriptionPaired = this.firebaseUpload
      .getAllPaired()
      .subscribe((reports1) => {
        this.allData1 = reports1.filter((element) => element.Paciente);
        this.allData1.sort((a, b) =>
          a.Fecha < b.Fecha ? 1 : b.Fecha < a.Fecha ? -1 : 0
        );

        let now = new Date();
        this.fecha = formatDate(now, "dd/MM/yyyy", "es");
        this.dataForExcel1 = [];

        this.allData1.forEach((row: any) => {
          this.dataForExcel1.push(Object.values(row));
        });
        subscriptionPaired.unsubscribe();
      });
    subscription = this.firebaseUpload.getAll().subscribe((reports) => {
      this.allData = reports.filter((element) => element.Paciente);
      this.allData.sort((a, b) =>
        a.Fecha < b.Fecha ? 1 : b.Fecha < a.Fecha ? -1 : 0
      );

      let now = new Date();
      this.fecha = formatDate(now, "dd/MM/yyyy", "es");
      this.dataForExcel = [];

      this.allData.forEach((row: any) => {
        this.dataForExcel.push(Object.values(row));
      });

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

  exportToExcelPaciente(id) {
    let subscription: Subscription;

    this.allDataPac = new Array();

    this.firebaseUpload.getPaciente(id).then((reports) => {
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
