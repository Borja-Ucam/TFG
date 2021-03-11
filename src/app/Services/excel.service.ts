import { formatDate } from "@angular/common";
import { TemplateDefinitionBuilder } from "@angular/compiler/src/render3/view/template";
import { Injectable, IterableDiffers } from "@angular/core";
import { Workbook } from "exceljs";
import * as fs from "file-saver";
import * as logo from "./logo.service.js";

@Injectable({
  providedIn: "root",
})
export class ExcelService {
  constructor() {}

  public fecha: string = null;

  exportExcel(excelData,excelData1) {
    //Title, Header & Data
    const title = excelData.title;
    const header = excelData.headers;
    const data = excelData.data;

    const title1 = excelData1.title1;
    const header1 = excelData1.headers1;
    const data1 = excelData1.data1;
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
    //Add Row and formatting W2
    worksheet1.mergeCells("C1", "G6");
    let titleRow1 = worksheet1.getCell("C1");
    titleRow1.value = title1;
    titleRow1.fill = {
      type: "pattern",
        pattern: "solid",
        fgColor: { argb: "004379" },
        bgColor: { argb: "" },
    }
    titleRow1.font = {
      name: "Calibri",
      size: 24,
      bold: true,
      color: { argb: "EDAB00" },
    };
    titleRow1.alignment = { vertical: "middle", horizontal: "center" };

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

    //Date W2
    worksheet1.mergeCells("H1:I6");
    //let d = new Date();
    let date1 = this.fecha;
    let dateCell1 = worksheet1.getCell("H1");
    dateCell1.value = date1;
    dateCell1.font = {
      name: "Calibri",
      size: 16,
      bold: true,
    };
    dateCell1.alignment = { vertical: "middle", horizontal: "center" };

    //Add Image W1
    let myLogoImage = workbook.addImage({
      base64: logo.imgBase64,
      extension: "jpeg",
    });
    worksheet.mergeCells("A1:B6");
    worksheet.addImage(myLogoImage, "A1:B6");

    //Add Image W2
    /*let myLogoImage1 = workbook.addImage({
      base64: logo.imgBase64,
      extension: "jpeg",
    });*/
    worksheet1.mergeCells("A1:B6");
    worksheet1.addImage(myLogoImage, "A1:B6");

    //Blank Row W1
    worksheet.addRow([]);
    //Blank Row W1
    worksheet1.addRow([]);

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
    //Adding Header Row W2
    let headerRow1 = worksheet1.addRow(header1);
    headerRow1.eachCell((cell, number) => {
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

    // Adding Data with Conditional Formatting W2
    data1.forEach((d) => {
      let row1 = worksheet1.addRow(d);
      row1.eachCell(function (cell, colNumber) {
        if (cell.value < 50.0) {
          row1.getCell(colNumber).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FF7171" },
          };
        } else if (cell.value > 50.0) {
          row1.getCell(colNumber).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "A3FFA3" },
          };
        }
      });

      /*
    let sales = row.getCell(4);
    let color = 'FF99FF99';
    
    if (+sales.value < 50.00) {
      color = 'FF0000'
    }else{
      color = '0AFF1B'
    }

    sales.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: color }
    }*/
    });


  
    worksheet.columns.forEach(column =>{
      column.width = 18
    })
    worksheet1.columns.forEach(column =>{
      column.width = 18
    })

    //Worksheet width W1
    /*
    worksheet.getColumn(1).width = 18;
    worksheet.getColumn(2).width = 18;
    worksheet.getColumn(3).width = 18;
    worksheet.getColumn(4).width = 15;
    worksheet.getColumn(5).width = 18;
    worksheet.getColumn(6).width = 15;
    worksheet.getColumn(7).width = 18;
    worksheet.getColumn(8).width = 15;
    worksheet.getColumn(9).width = 18;
    worksheet.getColumn(10).width = 15;
    worksheet.getColumn(11).width = 18;
    worksheet.getColumn(12).width = 15;
    worksheet.getColumn(13).width = 18;
    worksheet.getColumn(14).width = 15;
    worksheet.getColumn(15).width = 18;
    worksheet.getColumn(16).width = 15;
    worksheet.getColumn(17).width = 18;
    worksheet.getColumn(18).width = 15;
*/
/*
    //Worksheet width W2
    worksheet1.getColumn(1).width = 18;
    worksheet1.getColumn(2).width = 18;
    worksheet1.getColumn(3).width = 18;
    worksheet1.getColumn(4).width = 15;
    worksheet1.getColumn(5).width = 18;
    worksheet1.getColumn(6).width = 15;
    worksheet1.getColumn(7).width = 18;
    worksheet1.getColumn(8).width = 15;
    worksheet1.getColumn(9).width = 18;
    worksheet1.getColumn(10).width = 15;
    worksheet1.getColumn(11).width = 18;
    worksheet1.getColumn(12).width = 15;
    worksheet1.getColumn(13).width = 18;
    worksheet1.getColumn(14).width = 15;
    worksheet1.getColumn(15).width = 18;
    worksheet1.getColumn(16).width = 15;
    worksheet1.getColumn(17).width = 18;
    worksheet1.getColumn(18).width = 15;
*/
    worksheet.addRow([]);
    worksheet1.addRow([]);

    //Footer Row W1
    let footerRow = worksheet.addRow([
      "UCAM Validation LFPQ a fecha: " + this.fecha,
    ]);
    footerRow.getCell(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "EDAB00" },
    };
    //Footer Row W2
    let footerRow1 = worksheet1.addRow([
      "UCAM Validation LFPQ a fecha: " + this.fecha,
    ]);
    footerRow1.getCell(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "EDAB00" },
    };
    //Merge Cells W1
    worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);
    //Merge Cells W2
    worksheet1.mergeCells(`A${footerRow1.number}:F${footerRow1.number}`);

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
