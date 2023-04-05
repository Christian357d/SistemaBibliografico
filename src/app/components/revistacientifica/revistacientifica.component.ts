import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticuloService } from 'src/app/services/articulo.service';
import { EditorService } from 'src/app/services/editor.service';
import { RevistacientificaService } from 'src/app/services/revistacientifica.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { TemaService } from 'src/app/services/tema.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Mensaje } from 'src/app/validar/Mensaje';
import { ReporteService } from 'src/app/services/reporte.service';

declare var $: any;

@Component({
  selector: 'app-revistacientifica',
  templateUrl: './revistacientifica.component.html',
  styleUrls: ['./revistacientifica.component.css']
})
export class RevistacientificaComponent implements OnInit {
  
  listaRevistaCientifica:any[]=[];
  form:FormGroup;
  accion="Agregar";
  id:number|undefined;
  listaTemasRevista: any[] = [];
  listaArticulo: any[] = [];
  listaEditor: any[] = [];
  listaTemas: any[] = [];
  idcont = 0;
  criterio='nombreRevista';
  criterio2='frecuenciaRevista';
  criterio3='revarticulo';
  criterio4='reveditor';
  search='';
  search2='';
  search3='';
  search4='';

  //Mensajes Error
  lista: Mensaje=new Mensaje();
  pageSize = 5;
  page = 1;
  pagesizee : any;
   //Lista ID Temas
   public listdata:any[]=[];
   listaTemaRevista: any[] = [];
   public temas: any[]=[];
   public temasRevista: any[]=[];

  constructor(private reporteService:ReporteService,public modalService:NgbModal,private revistacientificaservice: RevistacientificaService, private fb:FormBuilder, private articuloservice: ArticuloService, private editorservice: EditorService,private temaservice: TemaService,) 
  { 
        this.form = this.fb.group({
        NombreRevista: ['', [Validators.required, Validators.maxLength(50)]],
        AnioPublicacion: ['', [Validators.required]],
        Frecuencia: ['', [Validators.required]],
        NroRevista: ['', [Validators.required,Validators.pattern('^[0-9]+')]],
        PagInicio: ['', [Validators.required,Validators.pattern('^[0-9]+')]],
        PagFinal: ['', [Validators.required,Validators.pattern('^[0-9]+')]],
        Anio: ['', [Validators.required]],
        articuloid: ['', [Validators.required]],
        EditorId: ['', [Validators.required]],
        temaId: [''],
      });

    }

    idper = 0;
    idtemas:any[]=[];
    ListaRevista(){
      this.revistacientificaservice.getRevistaCientifica().subscribe(resp=>{
          this.listaRevistaCientifica=resp;
          this.pagesizee = this.listaRevistaCientifica.length;
      })
    };
    LimpiarSearch() {
      this.search='';
      this.search2='';
      this.search3='';
      this.search4='';
    }
    ngOnInit(): void {
      this.listadoRevistaCientifica();
    }
   
    
    obtenerTemasId(){
   
      var options = (<HTMLSelectElement>document.getElementById('temaIdR')).selectedOptions;
        for (let i = 0; i < options.length; i++) {
          if(options[i].value!= undefined){
            this.listdata.push((options[i]?.value)?.split(" ")?.pop()?.replace(/[']/g, ''))
          }
        }
        this.listdata.forEach((item)=>{
          const datos:any={
            revistaCientificaId:0,
            temaId:Number(item)
          }
          this.temas.push(datos);
  
        });
    }

    Guardar(){
      
      const time=Date.now();
      const format = 'yyyy-MM-dd';
      const locale = 'en-US';
      const timer = formatDate(time, format, locale);
      if (this.form.get('PagFinal')?.value > this.form.get('PagInicio')?.value && this.form.get('AnioPublicacion')?.value<=timer && this.form.get('Anio')?.value<=timer ) {
        this.obtenerTemasId();
        const revistacientifica:any = {
          NombreRevista: this.form.get('NombreRevista')?.value,
          AnioPublicacion: this.form.get('AnioPublicacion')?.value,
          Frecuencia: this.form.get('Frecuencia')?.value,
          NroRevista: this.form.get('NroRevista')?.value,
          PagInicio: this.form.get('PagInicio')?.value,
          PagFinal: this.form.get('PagFinal')?.value,
          Anio: this.form.get('Anio')?.value,
          estado: 1,
          ArticuloId: this.form.get('articuloid')?.value,
          EditorId: this.form.get('EditorId')?.value,
          revistaDetalle: this.temas
        }
        // console.log(this.temas);
        // console.log(revistacientifica);
        if(this.id == undefined){
          this.revistacientificaservice.postRevistaCientifica(revistacientifica).subscribe(data => {
            Swal.fire({
              icon: 'success',
              title: 'Revista Cientifica creado con Exito'
            });
            this.form.reset();
            this.temas =[];
            this.listadoRevistaCientifica();
          },error =>{
            Swal.fire({
              icon: 'error',
              title: 'Error en el Formulario',
              html: error.error.errors[Object.keys(error.error.errors)[0]]
            })
          });
        }
        else{
          const revistacientificaedi:any = {
            NombreRevista: this.form.get('NombreRevista')?.value,
            AnioPublicacion: this.form.get('AnioPublicacion')?.value,
            Frecuencia: this.form.get('Frecuencia')?.value,
            NroRevista: this.form.get('NroRevista')?.value,
            PagInicio: this.form.get('PagInicio')?.value,
            PagFinal: this.form.get('PagFinal')?.value,
            Anio: this.form.get('Anio')?.value,
            estado: 1,
            ArticuloId: this.form.get('articuloid')?.value,
            EditorId: this.form.get('EditorId')?.value,
          }
          revistacientificaedi.id=this.id;
          this.revistacientificaservice.putRevistaCientifica(this.id,revistacientificaedi).subscribe(x=>{
            this.accion="Agregar";
            Swal.fire({
              icon: 'success',
              title: 'Revista Cientifica Modificado con Exito'
            })
            this.listadoRevistaCientifica();
    
          },error =>{
            Swal.fire({
              icon: 'error',
              title: 'Error Modificar',
              html: error.error.errors[Object.keys(error.error.errors)[0]]
                    
            })
            //console.log(error);
          });
          for(let x=0; x < this.idtemas.length; x ++){      
            this.revistacientificaservice.deleteRevistaDetalle(this.idtemas[x].id).subscribe(x=>{
            });                
          };         
         for(let x=0; x < this.temas.length; x ++){
              this.temasRevista[x] = {revistaCientificaId: this.idtemas[0].revistaCientificaId, temaId: this.temas[x].temaId}
              this.revistacientificaservice.postRevistaDetalle(this.temasRevista[x]).subscribe(x=>{
              });          
            };    
          this.ngOnInit();    
        }
        document.getElementById("ModalClose")?.click();
        this.listdata=[];	
        this.temas=[];	
        this.idtemas=[];
      }else{
          Swal.fire({
            icon: 'error',
            title: 'No Registrado La Página Final debe ser mayor a Página. Inicio o Verifique las fechas',
                  
          })
      }
      
    }
    mensa: any;
    Guardarinstruct(){

    //Limpiar Form
    this.form.markAsUntouched();
    this.form.markAsPristine();
      this.mensa = "";
      this.id = undefined;
      this.form.patchValue({
        NombreRevista: "",
        AnioPublicacion: "",
        Frecuencia: "",
        NroRevista: "",
        PagInicio: "",
        PagFinal: "",
        Anio: "",
        estado: "",
        articuloid: "",
        EditorId: "",
        temaId: "",
      })
    }

    async listadoRevistaCientifica() {
      await this.revistacientificaservice.getRevistaCientifica().subscribe((data) => {
        this.listaRevistaCientifica = data;
         console.log(data);
        this.pagesizee = this.listaRevistaCientifica.length;
       
      });

      await this.revistacientificaservice.getRevistaDetalle().subscribe((data) => {
        this.listaTemasRevista = data;
        // console.log("Los articulos activos son"+data);
        // console.log(data);
      });

      await this.editorservice.getEditorActivo().subscribe((data) => {
        this.listaEditor = data;
        //  console.log(data);
      });

      await this.temaservice.getTemaActivos().subscribe((data) => {
        this.listaTemas = data;
      });
  
      await this.articuloservice.getArticuloActivo().subscribe((data) => {
        this.listaArticulo = data;
     
      });


    }

    fecha= Date;
    SeleccionarRevistaCientifica(revistacientifica:any){

      this.mensa= "Si desea puede cambiar de temas.."
      const format = 'yyyy-MM-dd';
      const locale = 'en-US';
      this.accion = "Editar";
      this.id=revistacientifica.id;
      const formattedDate1 = formatDate(revistacientifica.anioPublicacion, format, locale);
      const formattedDate2 = formatDate(revistacientifica.anio, format, locale);
      this.form.patchValue({
        
          NombreRevista: revistacientifica.nombreRevista,
          AnioPublicacion: formattedDate1,
          Frecuencia: revistacientifica.frecuencia,
          NroRevista: revistacientifica.nroRevista,
          PagInicio: revistacientifica.pagInicio,
          PagFinal: revistacientifica.pagFinal,
          Anio: formattedDate2,
          articuloid: revistacientifica.articulo.id,
          EditorId: revistacientifica.editor.id,
          temaId: revistacientifica.revistaDetalle
      })
      this.mensa= "Si desea puede cambiar de temas.."
      this.idtemas = this.form.value.temaId;
        //Seleccionar items Select2 Temas
    var element = document.getElementById('temaIdR') as HTMLSelectElement;

    for (var i = 0; i < element.options.length; i++) {
      this.idtemas.forEach(obj=>
        {               
          if(element.options[i].value==i+": '"+obj.temaId+"'"){
            element.options[i].defaultSelected=true;
            element.options[i].selected=true;
          }
          
        }
        )
    }
    element.dispatchEvent(new Event("change"));
    console.log(this.idtemas);
    }

    CambiarEstado(revistacientifica: any, accion: number) {
      this.id = revistacientifica.id;
      
      if (this.id != undefined) {
        const revistas:any = {
          NombreRevista: revistacientifica.nombreRevista,
          AnioPublicacion: revistacientifica.AnioPublicacion,
          Frecuencia: revistacientifica.frecuencia,
          NroRevista: revistacientifica.NroRevista,
          PagInicio: revistacientifica.PagInicio,
          PagFinal: revistacientifica.PagFinal,
          Anio: revistacientifica.Anio,
          articuloid: revistacientifica.articulo.id,
          EditorId: revistacientifica.editor.id,
          estado: accion,
          
        }
        //console.log();
        this.revistacientificaservice
          .putRevistaCientifica(this.id, revistas)
          .subscribe((r) => {
            if (revistas.estado == 0) {
              Swal.fire({
                icon: 'error',
                title: 'La revista cientifica ha sido dado de baja con Exito',
              });
            } else {
              Swal.fire({
                icon: 'success',
                title: 'La revista cientifica ha sido activada con Exito',
              });
            }
            this.listadoRevistaCientifica();
          });
      }
    }

     //REPORTE PDF
   reportePDF(){
    //Encabezado de Tabla
    const encabezado=['ID', 'Nombre', 'Año Publicacion','Frecuencia', 'Nro. Revista','Articulo','Editor'];
    this.revistacientificaservice.getRevistaCientifica().subscribe(
      (data) => {
      const cuerpo = Object(data).map((obj:any)=>
      [
        //Datos Tabla
        obj.id,
        obj.nombreRevista,
        obj.anioPublicacion,
        obj.frecuencia,
        obj.nroRevista,
        obj.articulo.titulo,
        this.buscarEditor(obj.editor.id)
        
        
      ]);
      this.reporteService.reportePDF(encabezado,cuerpo,"REPORTE REVISTA CIENTIFICA");
     
    });
    
  }
    //REPORTE EXCEL
  reporteExcel(){
    var nombreArchivo="reporteRevista.xlsx"
    var id = document.getElementById('datos');
    this.reporteService.reporteExcel(id,nombreArchivo,12);
  }

  buscarEditor(id:number){
   
    var nombreEditor:string='';
    this.listaEditor.forEach(obj=>{
      if(id==obj.id){
        nombreEditor=obj.persona.nombre+' '+obj.persona.apellido;
      }
    })
    return nombreEditor;
    
   

  }
    
}
