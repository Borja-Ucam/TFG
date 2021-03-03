import { formatDate } from "@angular/common";
import { Injectable } from "@angular/core";
import { Workbook } from "exceljs";
import * as fs from "file-saver";
import * as logo from "./logo.service.js";

@Injectable({
  providedIn: "root",
})
export class ExcelService {
  constructor() {}

  public fecha: string = null;


  exportExcel(excelData) {
    //Title, Header & Data
    const title = excelData.title;
    const header = excelData.headers;
    const data = excelData.data;

    //Create a workbook with a worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("LFPQ");

    //Add Row and formatting
    worksheet.mergeCells("C1", "G4");
    let titleRow = worksheet.getCell("C1");
    titleRow.value = title;
    titleRow.font = {
      name: "Calibri",
      size: 16,
      underline: "single",
      bold: true,
      color: { argb: "004379" },
    };
    titleRow.alignment = { vertical: "middle", horizontal: "center" };

    // Date
    let now = new Date();
    this.fecha = formatDate(now, "dd/MM/yyyy", 'es');
    
    worksheet.mergeCells("H1:I4");
    let d = new Date();
    let date = this.fecha;
    let dateCell = worksheet.getCell("H1");
    dateCell.value = date;
    dateCell.font = {
      name: "Calibri",
      size: 12,
      bold: true,
    };
    dateCell.alignment = { vertical: "middle", horizontal: "center" };

    //Add Image
    let myLogoImage = workbook.addImage({
      base64: logo.imgBase64,
      extension: "jpeg",
    });
    worksheet.mergeCells("A1:B4");
    worksheet.addImage(myLogoImage, "A1:B4");

    //Blank Row
    worksheet.addRow([]);

    //Adding Header Row
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

    // Adding Data with Conditional Formatting
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
    worksheet.getColumn(1).width = 15;
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

    worksheet.addRow([]);

    //Footer Row
    let footerRow = worksheet.addRow(["UCAM Validation LFPQ a fecha: " + this.fecha]);
    footerRow.getCell(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "EDAB00" },
    };

    //Merge Cells
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
