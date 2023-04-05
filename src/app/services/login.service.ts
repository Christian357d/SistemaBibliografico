import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public isLogin: any = false;
  public userData: any =[];
  public rol:any='';
  listausuario:any[]=[];
  public nombreuser: any;
  public correo: any;

  constructor(private usuarioservice: UsuarioService, private router: Router,) { 

  }

  ngOnInit(): void {
    this.listadoUsuario();
    this.rol = this.leerUsuario();
  }

  async listadoUsuario() {
    await this.usuarioservice.getUsuarioActivo().subscribe((data) => {
      this.listausuario = data;
    });
  }

  async startLogin(user: string, passwo: string) {
    let users: any;
    this.usuarioservice.getUsuarioActivo().subscribe((resp) => {
      users = resp;
      try {
        let descrip:any;
        for (let userData of users) {
          descrip=CryptoJS.AES.decrypt(userData.password.trim(),passwo.trim()).toString(CryptoJS.enc.Utf8);
          // console.log(descrip);
          if(descrip==user){
            passwo=userData.password;
            this.nombreuser = userData.nombreUsuario;
            // console.log(userData);
            if (
              userData.nombreUsuario == user &&
              userData.password == passwo &&
              userData.estado == 1
            ) {
              //console.log('Login correcto');
              Swal.fire({
                icon: 'success',
                title: 'Login Correcto!',
                text: 'Bienvenido',
              });
              this.userData = userData;
              this.isLogin = true;
              this.rol = userData.rol.nombre;
              // console.table(userData);
              window.localStorage.setItem('data', JSON.stringify(userData));
              window.localStorage.setItem('login',(this.isLogin));
              window.localStorage.setItem('rol',(this.rol));
              window.localStorage.setItem('correo',(this.nombreuser));
              window.localStorage.setItem('id',(userData.id));
              // console.log(userData.id);
              if (userData.rol.nombre == 'Administrador') {
                this.router.navigate(['/homeadmin']);
              } else {
                this.router.navigateByUrl('/homecliente')
              }
              break;
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Login Incorrecto!',
                text: 'Correo y/o contraseña incorrecta',
              });
            }
          }else {
            Swal.fire({
              icon: 'error',
              title: 'Login Incorrecto!',
              text: 'Correo y/o contraseña incorrecta',
            });
          }
        }
      } catch  {
        // manejar error
      }
      return;
    });
  }

  destruirSesion(){
    window.localStorage.removeItem('data');
    window.localStorage.removeItem('rol');
    window.localStorage.removeItem('login');
    this.rol = "";
    this.router.navigateByUrl('/login');
  }

  leerUsuario(){
    let rol= window.localStorage.getItem('rol');
    return rol;
  }

  leerLogin(){
    let login= window.localStorage.getItem('login');
    return login;
  }
}