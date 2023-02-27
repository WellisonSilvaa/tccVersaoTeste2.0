import { getAuth } from '@angular/fire/auth';
import { DataService } from './../services/data.service';
import { User, onAuthStateChanged } from '@firebase/auth';
import { AuthService } from './../services/auth.service';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usu_id: String = "";
  // usu_nome: String = "";
  // usu_nivel: String = "";
  // usuario: string = "";
  // senha: string = "";
  credentials!: FormGroup;


  constructor(
    private router: Router,
    private actRouter: ActivatedRoute,
    private toastController: ToastController,
    private fb:  FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['',[ Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    })
    // this.getUserProfile();
  }

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  //Login pelo Google ------------
  async googleLoginWeb() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.googleLoginWeb();
    await loading.dismiss();

    if(user) {

      // this.usu_id = user.user.uid;
      // console.log(this.usu_id);
      this.router.navigateByUrl('/home', { replaceUrl: true});
    }else{
      this.showAlert('Login falhou', 'Tente Novamente');
    }
  }

  async login(){
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.login(this.credentials.value);
    await loading.dismiss();

    if(user) {
      // console.log(user.user.uid);
      // this.notes.push =user.user.uid, user.user.uid;
      // console.log(this.notes);

      //Criação no Banco de Dados

      this.router.navigateByUrl('/home', { replaceUrl: true});
    }else{
      this.showAlert('Login falhou', 'Tente Novamente');
    }

  }

  // ------- Método de Cadastro de Usuario ------------
  async register(){
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.register(this.credentials.value);
    await loading.dismiss();

    if(user) {

      // this.notes.push =user.user.uid, user.user.uid;
      // console.log(this.notes);
      this.router.navigateByUrl('/home', { replaceUrl: true});
    }else{
      this.showAlert('registro falhou', 'Tente Novamente');
    }


  }

  async showAlert(header: any, message: any) {
    const toast = await this.alertController.create({
      header,
      message,
      buttons: ['ok']
    })
    await toast.present();
  }


  async mensagem( header: any, message: any,){
    const toast = await this.toastController.create({
      header,
      message,
      duration: 2000,
      buttons: ['ok']
    })
    await toast.present();
  }

  //Método de Criação de Usuário no Banco de Dados
  async addNote() {

    // handler: (res: any) => {
    //   this.authService.addUser(user: { id: res.user.uid, email: res.user.email, name: aleatorio });
    // }
}

// getUserProfile() {

//   const auth = getAuth();

//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       // User is signed in, see docs for a list of available properties
//       // https://firebase.google.com/docs/reference/js/firebase.User
//       const uid = user.uid;
//       console.log(user, '$$$', uid);
//       // ...
//     } else {
//       // User is signed out
//       // ...
//     }
//   });

// }


}

