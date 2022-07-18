import { ExcelPacienteService } from "./../../Services/excelPaciente.service";
import { forEach } from "mathjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController, NavController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/Services/auth.service";
import { ExcelService } from "src/app/Services/excel.service";
import { FirebaseUploadService } from "src/app/Services/firebaseUpload.service";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Respuesta } from "src/app/Classes/Respuesta";
import { IonicSelectableModule } from "ionic-selectable";

@Component({
  selector: "app-downloads",
  templateUrl: "./downloads.page.html",
  styleUrls: ["./downloads.page.scss"],
})
export class DownloadsPage implements OnInit {

  public idiomas = [
    { idioma: 'Español', isChecked: true },
    { idioma: 'English', isChecked: false }
  ];

  title = "angular-export-to-excel";

  ids: any;
  idSelected: String;
  //idiomSelected: any;
  public idiomSelected: string = "es";

  allDataPac: Respuesta[];

  now1 = new Date();
  dataForExcel = [];
  dataForExcel1 = [];

  allData: any = [];
  allData1: any = [];

  public fecha: string = null;

  constructor(
    private router: Router,
    public modalController: ModalController,
    private navController: NavController,
    public ete: ExcelService,
    public etePac: ExcelPacienteService,
    public firebaseUpload: FirebaseUploadService,
    public authService: AuthService,
    public ionicSelectableModule: IonicSelectableModule
  ) {}

  ngOnInit() {
    this.ids = [];
    this.fecha = sessionStorage.getItem("date");
    this.idSelected = "";
    sessionStorage.setItem("idiomSelected", this.idiomSelected);
    this.getIdDoc();

  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null && user.emailVerified !== false ? true : false;
  }

  async getIdDoc() {
    let subscription: Subscription;

    subscription = (await this.firebaseUpload.getPruebaPaciente()).subscribe(
      (reports1) => {
        this.ids = reports1;
        console.log("here: "+this.ids)
        console.log("here1: "+JSON.stringify(this.ids))

      }
    );
  }

  onSelectChange(value) {
    this.idSelected = value;
  }

  onRadioChange($event:any){
    this.idiomSelected = $event.detail.value;
    sessionStorage.setItem("idiomSelected", this.idiomSelected);
    this.getIdDoc();
    //console.log(sessionStorage.getItem("idiomSelected"));
  }

  formatValue(value) {
    if (value == 'Infinity' || parseFloat(value) > 1.0) {
      return "100";
    } else if (value == '-Infinity' || parseFloat(value) < -1.0) {
      return "-100";
    } else {
      return Math.round(value*100).toString();
    }
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

        this.allData1 = this.allData1.map(row => {
          row.FrecuenciaHFSA = this.formatValue(row.FrecuenciaHFSA);
          row.FrecuenciaHFSW = this.formatValue(row.FrecuenciaHFSW);
          row.FrecuenciaLFSA = this.formatValue(row.FrecuenciaLFSA);
          row.FrecuenciaLFSW = this.formatValue(row.FrecuenciaLFSW);
          return row;
        });

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

//console.log(this.allData1);


      //uncomment this
      this.ete.exportExcel(reportData, reportData1);
      subscription.unsubscribe();
    });
  }

  exportToExcelPaciente(id) {

    this.allDataPac = new Array();
    this.fecha = "";
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
      this.allDataPac.sort((a, b) =>
          a.imagen > b.imagen ? 1 : b.imagen > a.imagen ? -1 : 0
        );
      this.fecha = reports.Fecha;
      let Paciente = reports.Paciente;
      this.dataForExcel = [];

      this.allDataPac.forEach((row: any) => {
        this.dataForExcel.push(Object.values(row));
      });

      let reportData = {
        title: "Investigación UCAM Report - " + Paciente,
        data: this.dataForExcel,
        headers: Object.keys(this.allDataPac[0]),
        fecha: this.fecha,
      };

      this.etePac.exportExcelPaciente(reportData);
    });
  }
}
