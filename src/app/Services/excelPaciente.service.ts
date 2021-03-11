import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as logo from "./logo.service.js";
import * as fs from "file-saver";

@Injectable({
  providedIn: 'root'
})
export class ExcelPacienteService {

constructor() { }



public fecha: string = null;

exportExcelPaciente(excelData) {
  //Title, Header & Data
  const title = excelData.title;
  const header = excelData.headers;
  const data = excelData.data;


  //Create a workbook with a worksheet
  let workbook = new Workbook();
  let worksheet = workbook.addWorksheet("Single-Test");
  //Create second worksheet
  let worksheet1 = workbook.addWorksheet("Paired-Test");

  //Add Row and formatting W1
  worksheet.mergeCells("C1", "G6");
  let titleRow = worksheet.getCell("C1");
  titleRow.value = title;
  titleRow.font = {
    name: "Calibri",
    size: 24,
    bold: true,
    color: { argb: "004379" },
  };
  titleRow.alignment = { vertical: "middle", horizontal: "center" };
 
  // Date W1
  let now = new Date();
  this.fecha = formatDate(now, "dd/MM/yyyy", "es");

  worksheet.mergeCells("H1:I6");
  //let d = new Date();
  let date = this.fecha;
  let dateCell = worksheet.getCell("H1");
  dateCell.value = date;
  dateCell.font = {
    name: "Calibri",
    size: 16,
    bold: true,
  };
  dateCell.alignment = { vertical: "middle", horizontal: "center" };


  //Add Image W1
  let myLogoImage = workbook.addImage({
    base64: logo.imgBase64,
    extension: "jpeg",
  });
  worksheet.mergeCells("A1:B6");
  worksheet.addImage(myLogoImage, "A1:B6");


  //Blank Row W1
  worksheet.addRow([]);
 
  //Adding Header Row W1
  let headerRow = worksheet.addRow(header);
  headerRow.eachCell((cell, number) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "004379" },
      bgColor: { argb: "" },
    };
    cell.font = {
      bold: true,
      color: { argb: "FFFFFF" },
      size: 12,
    };
  });
 

  // Adding Data with Conditional Formatting W1
  data.forEach((d) => {
    let row = worksheet.addRow(d);
    row.eachCell(function (cell, colNumber) {
      if (cell.value < 50.0) {
        row.getCell(colNumber).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FF7171" },
        };
      } else if (cell.value > 50.0) {
        row.getCell(colNumber).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "A3FFA3" },
        };
      }
    });
  });

  



  worksheet.columns.forEach(column =>{
    column.width = 18
  })
 
  worksheet.addRow([]);

  //Footer Row W1
  let footerRow = worksheet.addRow([
    "UCAM Validation LFPQ a fecha: " + this.fecha,
  ]);
  footerRow.getCell(1).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "EDAB00" },
  };
 
  //Merge Cells W1
  worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);
  

  //Generate & Save Excel File
  workbook.xlsx.writeBuffer().then((data) => {
    let blob = new Blob([data], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    fs.saveAs(blob, title + ".xlsx");
  });
}

}
