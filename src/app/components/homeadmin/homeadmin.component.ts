import { Component, OnInit } from '@angular/core';
import { AutorService } from 'src/app/services/autor.service';
import { EditorService } from 'src/app/services/editor.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import {Chart,ChartData,ChartDataset,ChartType, DatasetChartOptions } from 'chart.js'
import { ActasdecongresoService } from 'src/app/services/actasdecongreso.service';
import { InformeService } from 'src/app/services/informe.service';
import { RevistacientificaService } from 'src/app/services/revistacientifica.service';

@Component({
  selector: 'app-homeadmin',
  templateUrl: './homeadmin.component.html',
  styleUrls: ['./homeadmin.component.css']
})

export class HomeadminComponent implements OnInit {

  constructor(private autorservice: AutorService,private usuarioService: UsuarioService,private autorService: AutorService,
    private editorService:EditorService, private actasdecongresoservice: ActasdecongresoService,
    private informeservice: InformeService,private revistacientificaservice: RevistacientificaService, ) { }
admin:number=0;
estudiante:number=0;
autor:number=0;
editor:number=0;
lista:any[]=[];
selected=new Date();
grafico:string='barra';
barra:Chart | undefined;
barra2:Chart | undefined;
barra3:Chart | undefined;
barra4:Chart | undefined;
barra5:Chart | undefined;
barra6:Chart | undefined;
barra7:Chart | undefined;
barra8:Chart | undefined;
donut:Chart | undefined;
pie:Chart | undefined;
public barChartType:ChartType='doughnut';
public pieChartType:ChartType='pie';
//VARIABLES GRAFICO AUTORES
cientifico:number=0;
investigador:number=0;
//VARIABLES GRAFICO BARRAS 3
cientFem:number=0;
cientMas:number=0;
investFem:number=0;
investMas:number=0;

//VARIABLES GRAFICO BARRAS 
actas:number=0;
informes:number=0;
revistas:number=0;

enero:string="ENE-JUN";
julio:string="JUL-DIC";

//VARIABLES MESES
Ames1:number=0;
Ames2:number=0;
Ames3:number=0;
Ames4:number=0;
Ames5:number=0;
Ames6:number=0;

Imes1:number=0;
Imes2:number=0;
Imes3:number=0;
Imes4:number=0;
Imes5:number=0;
Imes6:number=0;

Rmes1:number=0;
Rmes2:number=0;
Rmes3:number=0;
Rmes4:number=0;
Rmes5:number=0;
Rmes6:number=0;
labels:any[]=[];
dataGrafico:ChartDataset[]=[];
dataGrafico1:ChartDataset[]=[];
dataGrafico2:ChartDataset[]=[];
dataGrafico3:ChartDataset[]=[];
dataGrafico4:ChartDataset[]=[];
dataGrafico5:ChartDataset[]=[];
dataGrafico6:ChartDataset[]=[];
dataGrafico7:ChartDataset[]=[];
dataGrafico8:ChartDataset[]=[];


  ngOnInit(): void {
 
    this.calcularPersonas();
    this.mostrarGrafico();
    this.graficoBarra();
    this.graficoBarra2(2023);
    this.graficoBarra3();  
    this.graficoArticulo2();
    this.graficoAutor();
   
  }
  crearGrafico(barra:Chart | undefined,canvas:string,tipo:ChartType,label:any[],datos:ChartDataset[],responsive:boolean,sub:boolean){
    barra=new Chart(canvas,{
        type:tipo,
        data:{
         labels:label,
         datasets:datos,   
        },
        options: {
          responsive: responsive,     
          plugins: {
            legend: {
                display: sub,               
            },           
        }         
      }
    })       
    }
contador(op:number,fin:number){
  let i = -1;
const interval = setInterval((): void => {
 
    switch (op) {
      case 1:
          this.admin=i+1;
          break;
      case 2:
        this.estudiante=i+1;
          break;
      case 3:
        this.autor=i+1;
          break;
      case 4:
        this.editor=i+1;
        break;}
    if (++i==fin) {
      clearInterval(interval);
    }
  
},1000);
}
  calcularPersonas(){
    this.usuarioService.getUsuarioadmin().subscribe(resp=>{
      this.lista=resp;
      this.contador(1,this.lista.filter(x=>x.estado==1).length);
  })
    this.usuarioService.getUsuarioestudent().subscribe(resp=>{
      this.lista=resp;
      this.contador(2,this.lista.filter(x=>x.estado==1).length);
  })
    this.autorService.getAutor().subscribe(resp=>{
      this.lista=resp;
      this.contador(3,this.lista.filter(x=>x.estado==1).length);
  })
    this.editorService.getEditor().subscribe(resp=>{
      this.lista=resp;
      this.contador(4,this.lista.filter(x=>x.estado==1).length);
  })
  
  }

  mostrarGrafico(){
  
    if(this.grafico=='barra'){
       document.getElementById("barra")?.setAttribute('style', 'display:block');
        document.getElementById("circular")?.setAttribute('style', 'display:none');
        this.grafico='circular';

        
    }
    else{
      document.getElementById("barra")?.setAttribute('style', 'display:none');
      document.getElementById("circular")?.setAttribute('style', 'display:block');
      this.grafico='barra';   
       
     }
  
   
  }
  //BARRA TIPOS PUBLICACIONES 2023
  graficoBarra2(a:Number){
    document.getElementById("barra2")?.setAttribute('style', 'display:block');
    document.getElementById("barra4")?.setAttribute('style', 'display:none');
    document.getElementById("barra5")?.setAttribute('style', 'display:none');
    document.getElementById("barra6")?.setAttribute('style', 'display:none');
    document.getElementById("barra7")?.setAttribute('style', 'display:none');
    document.getElementById("barra8")?.setAttribute('style', 'display:none');
    this.actasdecongresoservice.getActaCongreso().subscribe(act=>{      
      this.informeservice.getInforme().subscribe((inf) => {       
        this.revistacientificaservice.getRevistaCientifica().subscribe((rev) => {
          this.Ames1=act.filter((x:any)=>Number(new Date(x.fechaInicio).getMonth()+1)==1 
                        && Number(new Date(x.fechaInicio).getFullYear())==a).length;
          this.Ames2=act.filter((x:any)=>Number(new Date(x.fechaInicio).getMonth()+1)==2
                        && Number(new Date(x.fechaInicio).getFullYear())==a).length;
          this.Ames3=act.filter((x:any)=>Number(new Date(x.fechaInicio).getMonth()+1)==3
                        && Number(new Date(x.fechaInicio).getFullYear())==a).length;
          this.Ames4=act.filter((x:any)=>Number(new Date(x.fechaInicio).getMonth()+1)==4
                        && Number(new Date(x.fechaInicio).getFullYear())==a).length;
          this.Ames5=act.filter((x:any)=>Number(new Date(x.fechaInicio).getMonth()+1)==5
                        && Number(new Date(x.fechaInicio).getFullYear())==a).length;
          this.Ames6=act.filter((x:any)=>Number(new Date(x.fechaInicio).getMonth()+1)==6
                        && Number(new Date(x.fechaInicio).getFullYear())==a).length;
          
                        this.Imes1=inf.filter((x:any)=>Number(new Date(x.fechaPublicacion).getMonth()+1)==1&& Number(new Date(x.fechaPublicacion).getFullYear())==a).length;
                        this.Imes2=inf.filter((x:any)=>Number(new Date(x.fechaPublicacion).getMonth()+1)==2&& Number(new Date(x.fechaPublicacion).getFullYear())==a).length;
                        this.Imes3=inf.filter((x:any)=>Number(new Date(x.fechaPublicacion).getMonth()+1)==3&& Number(new Date(x.fechaPublicacion).getFullYear())==a).length;
                        this.Imes4=inf.filter((x:any)=>Number(new Date(x.fechaPublicacion).getMonth()+1)==4&& Number(new Date(x.fechaPublicacion).getFullYear())==a).length;
                        this.Imes5=inf.filter((x:any)=>Number(new Date(x.fechaPublicacion).getMonth()+1)==5&& Number(new Date(x.fechaPublicacion).getFullYear())==a).length;
                        this.Imes6=inf.filter((x:any)=>Number(new Date(x.fechaPublicacion).getMonth()+1)==6&& Number(new Date(x.fechaPublicacion).getFullYear())==a).length;
              
                        this.Rmes1=rev.filter((x:any)=>Number(new Date(x.anio).getMonth()+1)==1&& Number(new Date(x.anio).getFullYear())==a).length;
                        this.Rmes2=rev.filter((x:any)=>Number(new Date(x.anio).getMonth()+1)==2&& Number(new Date(x.anio).getFullYear())==a).length;
                        this.Rmes3=rev.filter((x:any)=>Number(new Date(x.anio).getMonth()+1)==3&& Number(new Date(x.anio).getFullYear())==a).length;
                        this.Rmes4=rev.filter((x:any)=>Number(new Date(x.anio).getMonth()+1)==4&& Number(new Date(x.anio).getFullYear())==a).length;
                        this.Rmes5=rev.filter((x:any)=>Number(new Date(x.anio).getMonth()+1)==5&& Number(new Date(x.anio).getFullYear())==a).length;
                        this.Rmes6=rev.filter((x:any)=>Number(new Date(x.anio).getMonth()+1)==6&& Number(new Date(x.anio).getFullYear())==a).length;
        this.labels=["Ene","Feb","Mar","Abr","May","Jun"];
        const datos={
          data:[this.Ames1,this.Ames2,this.Ames3,this.Ames4,this.Ames5,this.Ames6],
            label:'Actas',
            borderWidth: 1};           
        const datos2= {data:[this.Imes1,this.Imes2,this.Imes3,this.Imes4,this.Imes5,this.Imes6],
            label:'Informes',
            borderWidth: 1};
        const datos3= {data:[this.Rmes1,this.Rmes2,this.Rmes3,this.Rmes4,this.Rmes5,this.Rmes6],
            label:'Revistas',
            borderWidth: 1};
         this.dataGrafico1.push(datos); 
         this.dataGrafico1.push(datos2); 
         this.dataGrafico1.push(datos3); 
        this.crearGrafico(this.barra2,'canvas2','bar',this.labels,this.dataGrafico1,true,false);
        
        })})});
   }
//BARRA TIPOS PUBLICACIONES 2022
graficoBarra4(a:Number){
  document.getElementById("barra2")?.setAttribute('style', 'display:none');
  document.getElementById("barra4")?.setAttribute('style', 'display:block');
  document.getElementById("barra5")?.setAttribute('style', 'display:none');
  document.getElementById("barra6")?.setAttribute('style', 'display:none');
  document.getElementById("barra7")?.setAttribute('style', 'display:none');
  document.getElementById("barra8")?.setAttribute('style', 'display:none');
  this.actasdecongresoservice.getActaCongreso().subscribe(act=>{      
    this.informeservice.getInforme().subscribe((inf) => {       
      this.revistacientificaservice.getRevistaCientifica().subscribe((rev) => {
        this.Ames1=act.filter((x:any)=>Number(new Date(x.fechaInicio).getMonth()+1)==1 
                      && Number(new Date(x.fechaInicio).getFullYear())==a).length;
        this.Ames2=act.filter((x:any)=>Number(new Date(x.fechaInicio).getMonth()+1)==2
                      && Number(new Date(x.fechaInicio).getFullYear())==a).length;
        this.Ames3=act.filter((x:any)=>Number(new Date(x.fechaInicio).getMonth()+1)==3
                      && Number(new Date(x.fechaInicio).getFullYear())==a).length;
        this.Ames4=act.filter((x:any)=>Number(new Date(x.fechaInicio).getMonth()+1)==4
                      && Number(new Date(x.fechaInicio).getFullYear())==a).length;
        this.Ames5=act.filter((x:any)=>Number(new Date(x.fechaInicio).getMonth()+1)==5
                      && Number(new Date(x.fechaInicio).getFullYear())==a).length;
        this.Ames6=act.filter((x:any)=>Number(new Date(x.fechaInicio).getMonth()+1)==6
                      && Number(new Date(x.fechaInicio).getFullYear())==a).length;
        
                      this.Imes1=inf.filter((x:any)=>Number(new Date(x.fechaPublicacion).getMonth()+1)==1&& Number(new Date(x.fechaPublicacion).getFullYear())==a).length;
                      this.Imes2=inf.filter((x:any)=>Number(new Date(x.fechaPublicacion).getMonth()+1)==2&& Number(new Date(x.fechaPublicacion).getFullYear())==a).length;
                      this.Imes3=inf.filter((x:any)=>Number(new Date(x.fechaPublicacion).getMonth()+1)==3&& Number(new Date(x.fechaPublicacion).getFullYear())==a).length;
                      this.Imes4=inf.filter((x:any)=>Number(new Date(x.fechaPublicacion).getMonth()+1)==4&& Number(new Date(x.fechaPublicacion).getFullYear())==a).length;
                      this.Imes5=inf.filter((x:any)=>Number(new Date(x.fechaPublicacion).getMonth()+1)==5&& Number(new Date(x.fechaPublicacion).getFullYear())==a).length;
                      this.Imes6=inf.filter((x:any)=>Number(new Date(x.fechaPublicacion).getMonth()+1)==6&& Number(new Date(x.fechaPublicacion).getFullYear())==a).length;
            
                      this.Rmes1=rev.filter((x:any)=>Number(new Date(x.anio).getMonth()+1)==1&& Number(new Date(x.anio).getFullYear())==a).length;
                      this.Rmes2=rev.filter((x:any)=>Number(new Date(x.anio).getMonth()+1)==2&& Number(new Date(x.anio).getFullYear())==a).length;
                      this.Rmes3=rev.filter((x:any)=>Number(new Date(x.anio).getMonth()+1)==3&& Number(new Date(x.anio).getFullYear())==a).length;
                      this.Rmes4=rev.filter((x:any)=>Number(new Date(x.anio).getMonth()+1)==4&& Number(new Date(x.anio).getFullYear())==a).length;
                      this.Rmes5=rev.filter((x:any)=>Number(new Date(x.anio).getMonth()+1)==5&& Number(new Date(x.anio).getFullYear())==a).length;
                      this.Rmes6=rev.filter((x:any)=>Number(new Date(x.anio).getMonth()+1)==6&& Number(new Date(x.anio).getFullYear())==a).length;
          this.labels=["Ene","Feb","Mar","Abr","May","Jun"];
          const datos={
            data:[this.Ames1,this.Ames2,this.Ames3,this.Ames4,this.Ames5,this.Ames6],
              label:'Actas',
              borderWidth: 1};           
          const datos2= {data:[this.Imes1,this.Imes2,this.Imes3,this.Imes4,this.Imes5,this.Imes6],
              label:'Informes',
              borderWidth: 1};
          const datos3= {data:[this.Rmes1,this.Rmes2,this.Rmes3,this.Rmes4,this.Rmes5,this.Rmes6],
              label:'Revistas',
              borderWidth: 1};
          this.dataGrafico2.push(datos); 
          this.dataGrafico2.push(datos2); 
          this.dataGrafico2.push(datos3); 
          this.crearGrafico(this.barra4,'canvas4','bar',this.labels,this.dataGrafico2,true,false);       
      })})});  
  }

//BARRA TIPOS PUBLICACIONES 2021
graficoBarra5(a:Number){
  document.getElementById("barra2")?.setAttribute('style', 'display:none');
  document.getElementById("barra4")?.setAttribute('style', 'display:none');
  document.getElementById("barra5")?.setAttribute('style', 'display:block');
  document.getElementById("barra6")?.setAttribute('style', 'display:none');
  document.getElementById("barra7")?.setAttribute('style', 'display:none');
  document.getElementById("barra8")?.setAttribute('style', 'display:none');
  this.actasdecongresoservice.getActaCongreso().subscribe(act=>{      
    this.informeservice.getInforme().subscribe((inf) => {       
      this.revistacientificaservice.getRevistaCientifica().subscribe((rev) => {
        this.Ames1=act.filter((x:any)=>Number(new Date(x.fechaInicio).getMonth()+1)==1 
                      && Number(new Date(x.fechaInicio).getFullYear())==a).length;
        this.Ames2=act.filter((x:any)=>Number(new Date(x.fechaInicio).getMonth()+1)==2
                      && Number(new Date(x.fechaInicio).getFullYear())==a).length;
        this.Ames3=act.filter((x:any)=>Number(new Date(x.fechaInicio).getMonth()+1)==3
                      && Number(new Date(x.fechaInicio).getFullYear())==a).length;
        this.Ames4=act.filter((x:any)=>Number(new Date(x.fechaInicio).getMonth()+1)==4
                      && Number(new Date(x.fechaInicio).getFullYear())==a).length;
        this.Ames5=act.filter((x:any)=>Number(new Date(x.fechaInicio).getMonth()+1)==5
                      && Number(new Date(x.fechaInicio).getFullYear())==a).length;
        this.Ames6=act.filter((x:any)=>Number(new Date(x.fechaInicio).getMonth()+1)==6
                      && Number(new Date(x.fechaInicio).getFullYear())==a).length;
        
        this.Imes1=inf.filter((x:any)=>Number(new Date(x.fechaPublicacion).getMonth()+1)==1&& Number(new Date(x.fechaPublicacion).getFullYear())==a).length;
        this.Imes2=inf.filter((x:any)=>Number(new Date(x.fechaPublicacion).getMonth()+1)==2&& Number(new Date(x.fechaPublicacion).getFullYear())==a).length;
        this.Imes3=inf.filter((x:any)=>Number(new Date(x.fechaPublicacion).getMonth()+1)==3&& Number(new Date(x.fechaPublicacion).getFullYear())==a).length;
        this.Imes4=inf.filter((x:any)=>Number(new Date(x.fechaPublicacion).getMonth()+1)==4&& Number(new Date(x.fechaPublicacion).getFullYear())==a).length;
        this.Imes5=inf.filter((x:any)=>Number(new Date(x.fechaPublicacion).getMonth()+1)==5&& Number(new Date(x.fechaPublicacion).getFullYear())==a).length;
        this.Imes6=inf.filter((x:any)=>Number(new Date(x.fechaPublicacion).getMonth()+1)==6&& Number(new Date(x.fechaPublicacion).getFullYear())==a).length;

        this.Rmes1=rev.filter((x:any)=>Number(new Date(x.anio).getMonth()+1)==1&& Number(new Date(x.anio).getFullYear())==a).length;
        this.Rmes2=rev.filter((x:any)=>Number(new Date(x.anio).getMonth()+1)==2&& Number(new Date(x.anio).getFullYear())==a).length;
        this.Rmes3=rev.filter((x:any)=>Number(new Date(x.anio).getMonth()+1)==3&& Number(new Date(x.anio).getFullYear())==a).length;
        this.Rmes4=rev.filter((x:any)=>Number(new Date(x.anio).getMonth()+1)==4&& Number(new Date(x.anio).getFullYear())==a).length;
        this.Rmes5=rev.filter((x:any)=>Number(new Date(x.anio).getMonth()+1)==5&& Number(new Date(x.anio).getFullYear())==a).length;
        this.Rmes6=rev.filter((x:any)=>Number(new Date(x.anio).getMonth()+1)==6&& Number(new Date(x.anio).getFullYear())==a).length;
        this.labels=["Ene","Feb","Mar","Abr","May","Jun"];
        const datos={
          data:[this.Ames1,this.Ames2,this.Ames3,this.Ames4,this.Ames5,this.Ames6],
            label:'Actas',
            borderWidth: 1};           
        const datos2= {data:[this.Imes1,this.Imes2,this.Imes3,this.Imes4,this.Imes5,this.Imes6],
            label:'Informes',
            borderWidth: 1};
        const datos3= {data:[this.Rmes1,this.Rmes2,this.Rmes3,this.Rmes4,this.Rmes5,this.Rmes6],
            label:'Revistas',
            borderWidth: 1};
        this.dataGrafico3.push(datos); 
        this.dataGrafico3.push(datos2); 
        this.dataGrafico3.push(datos3); 
        this.crearGrafico(this.barra5,'canvas5','bar',this.labels,this.dataGrafico3,true,false);
      })})});


  
 }
 //BARRA TIPOS PUBLICACIONES 2023 SEMESTRE 2
 graficoBarra6(a:Number){
  document.getElementById("barra2")?.setAttribute('style', 'display:none');
  document.getElementById("barra4")?.setAttribute('style', 'display:none');
  document.getElementById("barra5")?.setAttribute('style', 'display:none');
  document.getElementById("barra6")?.setAttribute('style', 'display:block');
  document.getElementById("barra7")?.setAttribute('style', 'display:none');
  document.getElementById("barra8")?.setAttribute('style', 'display:none');
  this.actasdecongresoservice.getActaCongreso().subscribe(act=>{      
    this.informeservice.getInforme().subscribe((inf) => {       
      this.revistacientificaservice.getRevistaCientifica().subscribe((rev) => {
        this.Ames1=act.filter((x:any)=>Number(new Date(x.fechaInicio).getMonth()+1)==7 
                      && Number(new Date(x.fechaInicio).getFullYear())==a).length;
        this.Ames2=act.filter((x:any)=>Number(new Date(x.fechaInicio).getMonth()+1)==8
                      && Number(new Date(x.fechaInicio).getFullYear())==a).length;
        this.Ames3=act.filter((x:any)=>Number(new Date(x.fechaInicio).getMonth()+1)==9
                      && Number(new Date(x.fechaInicio).getFullYear())==a).length;
        this.Ames4=act.filter((x:any)=>Number(new Date(x.fechaInicio).getMonth()+1)==10
                      && Number(new Date(x.fechaInicio).getFullYear())==a).length;
        this.Ames5=act.filter((x:any)=>Number(new Date(x.fechaInicio).getMonth()+1)==11
                      && Number(new Date(x.fechaInicio).getFullYear())==a).length;
        this.Ames6=act.filter((x:any)=>Number(new Date(x.fechaInicio).getMonth()+1)==12
                      && Number(new Date(x.fechaInicio).getFullYear())==a).length;
        
        this.Imes1=inf.filter((x:any)=>Number(new Date(x.fechaPublicacion).getMonth()+1)==7&& Number(new Date(x.fechaPublicacion).getFullYear())==a).length;
        this.Imes2=inf.filter((x:any)=>Number(new Date(x.fechaPublicacion).getMonth()+1)==8&& Number(new Date(x.fechaPublicacion).getFullYear())==a).length;
        this.Imes3=inf.filter((x:any)=>Number(new Date(x.fechaPublicacion).getMonth()+1)==9&& Number(new Date(x.fechaPublicacion).getFullYear())==a).length;
        this.Imes4=inf.filter((x:any)=>Number(new Date(x.fechaPublicacion).getMonth()+1)==10&& Number(new Date(x.fechaPublicacion).getFullYear())==a).length;
        this.Imes5=inf.filter((x:any)=>Number(new Date(x.fechaPublicacion).getMonth()+1)==11&& Number(new Date(x.fechaPublicacion).getFullYear())==a).length;
        this.Imes6=inf.filter((x:any)=>Number(new Date(x.fechaPublicacion).getMonth()+1)==12&& Number(new Date(x.fechaPublicacion).getFullYear())==a).length;

        this.Rmes1=rev.filter((x:any)=>Number(new Date(x.anio).getMonth()+1)==7&& Number(new Date(x.anio).getFullYear())==a).length;
        this.Rmes2=rev.filter((x:any)=>Number(new Date(x.anio).getMonth()+1)==8&& Number(new Date(x.anio).getFullYear())==a).length;
        this.Rmes3=rev.filter((x:any)=>Number(new Date(x.anio).getMonth()+1)==9&& Number(new Date(x.anio).getFullYear())==a).length;
        this.Rmes4=rev.filter((x:any)=>Number(new Date(x.anio).getMonth()+1)==10&& Number(new Date(x.anio).getFullYear())==a).length;
        this.Rmes5=rev.filter((x:any)=>Number(new Date(x.anio).getMonth()+1)==11&& Number(new Date(x.anio).getFullYear())==a).length;
        this.Rmes6=rev.filter((x:any)=>Number(new Date(x.anio).getMonth()+1)==12&& Number(new Date(x.anio).getFullYear())==a).length;
        this.labels=["Jul","Ago","Sep","Oct","Nov","Dic"];
  const datos={
    data:[this.Ames1,this.Ames2,this.Ames3,this.Ames4,this.Ames5,this.Ames6],
      label:'Actas',
      borderWidth: 1};           
  const datos2= {data:[this.Imes1,this.Imes2,this.Imes3,this.Imes4,this.Imes5,this.Imes6],
      label:'Informes',
      borderWidth: 1};
  const datos3= {data:[this.Rmes1,this.Rmes2,this.Rmes3,this.Rmes4,this.Rmes5,this.Rmes6],
      label:'Revistas',
      borderWidth: 1};
  this.dataGrafico4.push(datos); 
  this.dataGrafico4.push(datos2); 
  this.dataGrafico4.push(datos3); 
  this.crearGrafico(this.barra6,'canvas6','bar',this.labels,this.dataGrafico4,true,false);       
      })})}) 
 }
 //BARRA TIPOS PUBLICACIONES 2022 SEMESTRE 2
 graficoBarra7(a:Number){
  document.getElementById("barra2")?.setAttribute('style', 'display:none');
  document.getElementById("barra4")?.setAttribute('style', 'display:none');
  document.getElementById("barra5")?.setAttribute('style', 'display:none');
  document.getElementById("barra6")?.setAttribute('style', 'display:none');
  document.getElementById("barra7")?.setAttribute('style', 'display:block');
  document.getElementById("barra8")?.setAttribute('style', 'display:none');
  this.actasdecongresoservice.getActaCongreso().subscribe(act=>{      
    this.informeservice.getInforme().subscribe((inf) => {       
      this.revistacientificaservice.getRevistaCientifica().subscribe((rev) => {
        this.Ames1=act.filter((x:any)=>Number(new Date(x.fechaInicio).getMonth()+1)==7 
                      && Number(new Date(x.fechaInicio).getFullYear())==a).length;
        this.Ames2=act.filter((x:any)=>Number(new Date(x.fechaInicio).getMonth()+1)==8
                      && Number(new Date(x.fechaInicio).getFullYear())==a).length;
        this.Ames3=act.filter((x:any)=>Number(new Date(x.fechaInicio).getMonth()+1)==9
                      && Number(new Date(x.fechaInicio).getFullYear())==a).length;
        this.Ames4=act.filter((x:any)=>Number(new Date(x.fechaInicio).getMonth()+1)==10
                      && Number(new Date(x.fechaInicio).getFullYear())==a).length;
        this.Ames5=act.filter((x:any)=>Number(new Date(x.fechaInicio).getMonth()+1)==11
                      && Number(new Date(x.fechaInicio).getFullYear())==a).length;
        this.Ames6=act.filter((x:any)=>Number(new Date(x.fechaInicio).getMonth()+1)==12
                      && Number(new Date(x.fechaInicio).getFullYear())==a).length;
        
        this.Imes1=inf.filter((x:any)=>Number(new Date(x.fechaPublicacion).getMonth()+1)==7&& Number(new Date(x.fechaPublicacion).getFullYear())==a).length;
        this.Imes2=inf.filter((x:any)=>Number(new Date(x.fechaPublicacion).getMonth()+1)==8&& Number(new Date(x.fechaPublicacion).getFullYear())==a).length;
        this.Imes3=inf.filter((x:any)=>Number(new Date(x.fechaPublicacion).getMonth()+1)==9&& Number(new Date(x.fechaPublicacion).getFullYear())==a).length;
        this.Imes4=inf.filter((x:any)=>Number(new Date(x.fechaPublicacion).getMonth()+1)==10&& Number(new Date(x.fechaPublicacion).getFullYear())==a).length;
        this.Imes5=inf.filter((x:any)=>Number(new Date(x.fechaPublicacion).getMonth()+1)==11&& Number(new Date(x.fechaPublicacion).getFullYear())==a).length;
        this.Imes6=inf.filter((x:any)=>Number(new Date(x.fechaPublicacion).getMonth()+1)==12&& Number(new Date(x.fechaPublicacion).getFullYear())==a).length;

        this.Rmes1=rev.filter((x:any)=>Number(new Date(x.anio).getMonth()+1)==7&& Number(new Date(x.anio).getFullYear())==a).length;
        this.Rmes2=rev.filter((x:any)=>Number(new Date(x.anio).getMonth()+1)==8&& Number(new Date(x.anio).getFullYear())==a).length;
        this.Rmes3=rev.filter((x:any)=>Number(new Date(x.anio).getMonth()+1)==9&& Number(new Date(x.anio).getFullYear())==a).length;
        this.Rmes4=rev.filter((x:any)=>Number(new Date(x.anio).getMonth()+1)==10&& Number(new Date(x.anio).getFullYear())==a).length;
        this.Rmes5=rev.filter((x:any)=>Number(new Date(x.anio).getMonth()+1)==11&& Number(new Date(x.anio).getFullYear())==a).length;
        this.Rmes6=rev.filter((x:any)=>Number(new Date(x.anio).getMonth()+1)==12&& Number(new Date(x.anio).getFullYear())==a).length;
        
    this.labels=["Jul","Ago","Sep","Oct","Nov","Dic"];
const datos={
data:[this.Ames1,this.Ames2,this.Ames3,this.Ames4,this.Ames5,this.Ames6],
  label:'Actas',
  borderWidth: 1};           
const datos2= {data:[this.Imes1,this.Imes2,this.Imes3,this.Imes4,this.Imes5,this.Imes6],
  label:'Informes',
  borderWidth: 1};
const datos3= {data:[this.Rmes1,this.Rmes2,this.Rmes3,this.Rmes4,this.Rmes5,this.Rmes6],
  label:'Revistas',
  borderWidth: 1};
this.dataGrafico5.push(datos); 
this.dataGrafico5.push(datos2); 
this.dataGrafico5.push(datos3); 
this.crearGrafico(this.barra7,'canvas7','bar',this.labels,this.dataGrafico5,true,false);       
      })})})     
 }
 //BARRA TIPOS PUBLICACIONES 2021 SEMESTRE 2
 graficoBarra8(a:Number){
  document.getElementById("barra2")?.setAttribute('style', 'display:none');
  document.getElementById("barra4")?.setAttribute('style', 'display:none');
  document.getElementById("barra5")?.setAttribute('style', 'display:none');
  document.getElementById("barra6")?.setAttribute('style', 'display:none');
  document.getElementById("barra7")?.setAttribute('style', 'display:none');
  document.getElementById("barra8")?.setAttribute('style', 'display:block');
  this.actasdecongresoservice.getActaCongreso().subscribe(act=>{      
    this.informeservice.getInforme().subscribe((inf) => {       
      this.revistacientificaservice.getRevistaCientifica().subscribe((rev) => {
        this.Ames1=act.filter((x:any)=>Number(new Date(x.fechaInicio).getMonth()+1)==7 
                      && Number(new Date(x.fechaInicio).getFullYear())==a).length;
        this.Ames2=act.filter((x:any)=>Number(new Date(x.fechaInicio).getMonth()+1)==8
                      && Number(new Date(x.fechaInicio).getFullYear())==a).length;
        this.Ames3=act.filter((x:any)=>Number(new Date(x.fechaInicio).getMonth()+1)==9
                      && Number(new Date(x.fechaInicio).getFullYear())==a).length;
        this.Ames4=act.filter((x:any)=>Number(new Date(x.fechaInicio).getMonth()+1)==10
                      && Number(new Date(x.fechaInicio).getFullYear())==a).length;
        this.Ames5=act.filter((x:any)=>Number(new Date(x.fechaInicio).getMonth()+1)==11
                      && Number(new Date(x.fechaInicio).getFullYear())==a).length;
        this.Ames6=act.filter((x:any)=>Number(new Date(x.fechaInicio).getMonth()+1)==12
                      && Number(new Date(x.fechaInicio).getFullYear())==a).length;
        
        this.Imes1=inf.filter((x:any)=>Number(new Date(x.fechaPublicacion).getMonth()+1)==7&& Number(new Date(x.fechaPublicacion).getFullYear())==a).length;
        this.Imes2=inf.filter((x:any)=>Number(new Date(x.fechaPublicacion).getMonth()+1)==8&& Number(new Date(x.fechaPublicacion).getFullYear())==a).length;
        this.Imes3=inf.filter((x:any)=>Number(new Date(x.fechaPublicacion).getMonth()+1)==9&& Number(new Date(x.fechaPublicacion).getFullYear())==a).length;
        this.Imes4=inf.filter((x:any)=>Number(new Date(x.fechaPublicacion).getMonth()+1)==10&& Number(new Date(x.fechaPublicacion).getFullYear())==a).length;
        this.Imes5=inf.filter((x:any)=>Number(new Date(x.fechaPublicacion).getMonth()+1)==11&& Number(new Date(x.fechaPublicacion).getFullYear())==a).length;
        this.Imes6=inf.filter((x:any)=>Number(new Date(x.fechaPublicacion).getMonth()+1)==12&& Number(new Date(x.fechaPublicacion).getFullYear())==a).length;

        this.Rmes1=rev.filter((x:any)=>Number(new Date(x.anio).getMonth()+1)==7&& Number(new Date(x.anio).getFullYear())==a).length;
        this.Rmes2=rev.filter((x:any)=>Number(new Date(x.anio).getMonth()+1)==8&& Number(new Date(x.anio).getFullYear())==a).length;
        this.Rmes3=rev.filter((x:any)=>Number(new Date(x.anio).getMonth()+1)==9&& Number(new Date(x.anio).getFullYear())==a).length;
        this.Rmes4=rev.filter((x:any)=>Number(new Date(x.anio).getMonth()+1)==10&& Number(new Date(x.anio).getFullYear())==a).length;
        this.Rmes5=rev.filter((x:any)=>Number(new Date(x.anio).getMonth()+1)==11&& Number(new Date(x.anio).getFullYear())==a).length;
        this.Rmes6=rev.filter((x:any)=>Number(new Date(x.anio).getMonth()+1)==12&& Number(new Date(x.anio).getFullYear())==a).length;
        this.labels=["Jul","Ago","Sep","Oct","Nov","Dic"];
const datos={
data:[this.Ames1,this.Ames2,this.Ames3,this.Ames4,this.Ames5,this.Ames6],
  label:'Actas',
  borderWidth: 1};           
const datos2= {data:[this.Imes1,this.Imes2,this.Imes3,this.Imes4,this.Imes5,this.Imes6],
  label:'Informes',
  borderWidth: 1};
const datos3= {data:[this.Rmes1,this.Rmes2,this.Rmes3,this.Rmes4,this.Rmes5,this.Rmes6],
  label:'Revistas',
  borderWidth: 1};
this.dataGrafico6.push(datos); 
this.dataGrafico6.push(datos2); 
this.dataGrafico6.push(datos3); 
this.crearGrafico(this.barra8,'canvas8','bar',this.labels,this.dataGrafico6,true,false);     
      })})})   
 }
 
  //BARRA ARTICULOS PUBLICADOS
  graficoBarra(){
   
    this.actasdecongresoservice.getActaCongreso().subscribe(act=>{      
      this.informeservice.getInforme().subscribe((inf) => {       
        this.revistacientificaservice.getRevistaCientifica().subscribe((rev) => {
         this.actas=act.length;
         this.informes=inf.length;
         this.revistas=rev.length;         
         this.labels=["Actas","Informes","Revistas"];
         const datos={
         data:[this.actas,this.informes,this.revistas],
         label:'Articulos',
         borderWidth: 1,
         backgroundColor:["#ffa1b5","#86c7f3","#ffe29a"]
         };
        this.dataGrafico.push(datos);     
       this.crearGrafico(this.barra,'canvas','bar',this.labels,this.dataGrafico,true,false);
        });
       
      });
  })
  
  }
  //DOUGHNUT ARTICULOS PUBLICADOS
  graficoArticulo2(){   
    this.actasdecongresoservice.getActaCongreso().subscribe(act=>{      
      this.informeservice.getInforme().subscribe((inf) => {       
        this.revistacientificaservice.getRevistaCientifica().subscribe((rev) => {          
          this.labels=["Actas","Informes","Revistas"];
          this.crearGrafico(this.donut,'doughnut','doughnut',this.labels,this.dataGrafico,false,true);                      
        })
      })
    })   
   }
 
  //PIE AUTORES
  graficoAutor(){
    this.autorservice.getAutor().subscribe((data) => {    
    this.cientifico = data.filter((x:any)=>x.tipoAutor=='Cientifico').length;
    this.investigador = data.filter((x:any)=>x.tipoAutor=='Investigador').length;
    this.labels=["Cientifico","Investigador"];
      const datos={
      data:[this.cientifico,this.investigador],
      label:'Autores',
      borderWidth: 1,     
      };
    this.dataGrafico7.push(datos);     
    this.crearGrafico(this.pie,'pie','pie',this.labels,this.dataGrafico7,false,true);      
    });        
   }
  //BARRAS AUTORES ARTICULOS
   graficoBarra3(){
    this.autorservice.getAutor().subscribe((data) => {
    this.cientFem = data.filter((x:any)=>x.tipoAutor=='Cientifico'&&x.persona.genero=='Femenino').length;
    this.cientMas = data.filter((x:any)=>x.tipoAutor=='Cientifico'&&x.persona.genero=='Masculino').length;
    this.investFem = data.filter((x:any)=>x.tipoAutor=='Investigador' && x.persona.genero=='Femenino').length
    this.investMas = data.filter((x:any)=>x.tipoAutor=='Investigador' && x.persona.genero=='Masculino').length
    this.labels=["Cientifico","Investigador"];
    const datos={
    data:[this.cientFem,this.investFem],
    label:'Femenino',
    borderWidth: 1,     
    };
    const datos2={
      data:[this.cientMas,this.investMas],
      label:'Masculino',
      borderWidth: 1,     
      };
  this.dataGrafico8.push(datos); 
  this.dataGrafico8.push(datos2);    
  this.crearGrafico(this.barra3,'canvas3','bar',this.labels,this.dataGrafico8,true,true);  
    })        
   }
obtenerFecha(){
  var f=document.getElementById("fecha") as HTMLInputElement;
  if(f!=null){
var fecha=f.value
if(fecha=="2023"){
  this.graficoBarra2(Number(fecha));
}
if(fecha=="2022"){
  this.graficoBarra4(Number(fecha));
}if(fecha=="2021"){
  this.graficoBarra5(Number(fecha));
}
  } 
}
obtenerFecha2(){
  var f=document.getElementById("fecha") as HTMLInputElement;
  if(f!=null){
var fecha=f.value
if(fecha=="2023"){
  this.graficoBarra6(Number(fecha));
}
if(fecha=="2022"){
  this.graficoBarra7(Number(fecha));
}if(fecha=="2021"){
  this.graficoBarra8(Number(fecha));
}
  } 
}
}
