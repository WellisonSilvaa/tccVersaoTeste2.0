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

  // usu_id: String = "";
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
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['',[ Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    })
  }

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  async login(){
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.login(this.credentials.value);
    await loading.dismiss();

    if(user) {
      console.log(user);
      this.router.navigateByUrl('/home', { replaceUrl: true});
    }else{
      this.showAlert('login falhou', 'Tente Novamente');
    }

  }

  async register(){
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.register(this.credentials.value);
    await loading.dismiss();

    if(user) {
      console.log(user);
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



}

