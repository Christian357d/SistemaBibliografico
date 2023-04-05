import { Injectable } from '@angular/core';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor() { }
 
  
  convenc(usuario:any, passw:any){
      return CryptoJS.AES.encrypt(usuario.toString().trim(),passw.toString().trim()).toString();
  }
  // Reporte PDF
  reportePDF(encabezado:string[], cuerpo:Array<any>, titulo:string){
    //Fecha Impresion
     const fecha=new Date();
     //Gererar PDF
     const doc = new jsPDF({
       orientation: "portrait",
       unit: "px",
       format: "letter"
     });
     //Logo PDF
     var imageData=this.obtenerImagenHtml();
     doc.addImage(imageData.img,'PNG',5,10,imageData.width, imageData.height);
     //Encabezado PDF
     doc.text(titulo,doc.internal.pageSize.width/2,25,{align:'center',baseline:'bottom'});
     //Fecha
     doc.text(String(fecha.getDate()+'/'+(fecha.getUTCMonth() + 1)+'/'+fecha.getFullYear()),400,25,{align:'left'});
     //Tabla Datos
     autoTable(doc, {
       theme: 'striped',
       head: [encabezado],
       margin: { top: 60 },
       body: cuerpo,
       
     })
 
     //Nombre Documento PDF
     doc.setProperties({ title: titulo });
     //Paginacion
     this.paginacion(doc);
     //Abrir PDF Navegador
     doc.output('dataurlnewwindow');
  
     
   }
   
  //REPORTE EXCEL
  reporteExcel(id:any,nombreArchivo:string,columnaBotones:number){
   //obtener Datos Tabla
   const data: XLSX.WorkSheet =XLSX.utils.table_to_sheet(id);
   data['!cols'] = [];
   data['!cols'][columnaBotones] = { hidden: true };
   //Generar Excel 
   const excel: XLSX.WorkBook = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(excel, data, 'hoja1');
 
   //Guardar Documento  
   XLSX.writeFile(excel, nombreArchivo);
  }
   obtenerImagenHtml() {
     
     var img = document.getElementById('logoupdsmin');
     var canvas = document.createElement('canvas');
     canvas.classList.add('myStyle');
     var imgWidth = canvas.width > 140 ? 140 : canvas.width;
     var imgHeight = canvas.height > 80 ? 80: canvas.height;
     var ctx: any = canvas.getContext('2d');
     ctx.drawImage(img, 0, 0,imgWidth, imgHeight);
     var dataURL = canvas.toDataURL('image/png');
     return { img: dataURL, width: imgWidth, height: imgHeight};
     
   } 
 //Numero Paginas PDF
   paginacion(doc:any){
 
     const pages = doc.internal.getNumberOfPages();
     const pageWidth = doc.internal.pageSize.width;  //Optional
      const pageHeight = doc.internal.pageSize.height;  //Optional
      doc.setFontSize(12);  //Optional
         
 for (let j = 1; j < pages + 1 ; j++) {
       let horizontalPos = pageWidth / 2;  //Can be fixed number
       let verticalPos = pageHeight - 10;  //Can be fixed number
       doc.setPage(j);
       doc.text(`${j} de ${pages} paginas`, horizontalPos, verticalPos, {align: 'center'})  //Optional text styling;
 }
 
 return doc;
   }
}
