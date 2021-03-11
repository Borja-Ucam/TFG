import { ExcelPacienteService } from './../../Services/excelPaciente.service';
import { forEach } from 'mathjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { ExcelService } from 'src/app/Services/excel.service';
import { FirebaseUploadService } from 'src/app/Services/firebaseUpload.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.page.html',
  styleUrls: ['./downloads.page.scss'],

  
})
export class DownloadsPage implements OnInit {

  title = "angular-export-to-excel";

  dataForExcel = [];
  dataForExcel1 = [];

  allData = [];
  allData1 = [];


  public fecha: string = null;

  constructor(
    private router: Router,
    public modalController: ModalController,
    private navController: NavController,
    public ete: ExcelService,
    public etePac: ExcelPacienteService,
    public firebaseUpload: FirebaseUploadService,
    public authService: AuthService,

  ) {}

  ngOnInit() {
    this.fecha = sessionStorage.getItem("date");
  }


  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log("prueba:"+JSON.stringify(localStorage.getItem('user')))
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  exportToExcel() {

    let subscription: Subscription;
    
    this.allData = [];
    //this.firebaseUpload.getAll();
    subscription = this.firebaseUpload.getAll().subscribe((reports) => {

      this.allData = reports.filter((element) => element.Paciente);
      console.log("ALLDATA: " + JSON.stringify(this.allData));
      //const sorted = this.allData.sort(function(o){ return o.Fecha});
      this.allData.sort((a,b) => (a.Fecha < b.Fecha) ? 1 : ((b.Fecha < a.Fecha) ? -1 : 0))
      //tengo que hacer el sort de los datos alldata1
      console.log("SORTED: " + JSON.stringify(this.allData));

      let now = new Date();
      this.fecha = formatDate(now, "dd/MM/yyyy", "es");
      this.dataForExcel = [];
      this.allData1 = [{"imagen":"Croquetas","idPregunta":"preg1","pregunta":"¿Cuánto placer le daría comer algo de este alimento ahora?","respuesta":"50"},{"imagen":"Fresas","idPregunta":"preg2","pregunta":"¿Cuánto le apetece comer de este alimento ahora?","respuesta":"50"},{"imagen":"Tomate","idPregunta":"preg1","pregunta":"¿Cuánto placer le daría comer algo de este alimento ahora?","respuesta":"50"}];

      this.allData.forEach((row: any) => {
        this.dataForExcel.push(Object.values(row));
      });
      console.log(this.dataForExcel)

      this.allData1.forEach((row: any) => {
        this.dataForExcel1.push(Object.values(row));
      });
      console.log(this.dataForExcel1)

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
      this.ete.exportExcel(reportData,reportData1);
      subscription.unsubscribe();
    });
    
  }

  exportToExcelPaciente(){
    
    let subscription: Subscription;
    
    this.allData = [];
    //this.firebaseUpload.getAll();
    subscription = this.firebaseUpload.getAll().subscribe((reports) => {

      this.allData = reports.filter((element) => element.Paciente);
      console.log("ALLDATA: " + JSON.stringify(this.allData));
      //const sorted = this.allData.sort(function(o){ return o.Fecha});
      /*this.allData.sort((a,b) => (a.Fecha < b.Fecha) ? 1 : ((b.Fecha < a.Fecha) ? -1 : 0))
      //tengo que hacer el sort de los datos alldata1
      console.log("SORTED: " + JSON.stringify(this.allData));
      */
      let now = new Date();
      var Paciente = this.allData.length ? this.allData[0].Paciente : null;
      this.fecha = formatDate(now, "dd/MM/yyyy", "es");
      this.dataForExcel = [];
      //this.allData1 = [{"imagen":"Croquetas","idPregunta":"preg1","pregunta":"¿Cuánto placer le daría comer algo de este alimento ahora?","respuesta":"50"},{"imagen":"Fresas","idPregunta":"preg2","pregunta":"¿Cuánto le apetece comer de este alimento ahora?","respuesta":"50"},{"imagen":"Tomate","idPregunta":"preg1","pregunta":"¿Cuánto placer le daría comer algo de este alimento ahora?","respuesta":"50"}];


      this.allData.forEach((row: any) => {
        this.dataForExcel.push(Object.values(row));
      });
      console.log(this.dataForExcel)

     
      let reportData = {
        title: "Investigación UCAM Report - " +Paciente,
        data: this.dataForExcel,
        headers: Object.keys(this.allData[0]),
      };
     
      //uncomment this
      this.etePac.exportExcelPaciente(reportData);
      subscription.unsubscribe();
    });
    
  }

}
