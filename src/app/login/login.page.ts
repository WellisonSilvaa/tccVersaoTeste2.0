import { ToastController } from '@ionic/angular';
import { Api } from './../../service/api';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usu_id: String = "";
  usu_nome: String = "";
  usu_nivel: String = "";
  usuario: string = "";
  senha: string = "";

  constructor(
    private router: Router,
    private provider: Api,
    private actRouter: ActivatedRoute,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  login(){
    return new Promise(resolve =>{
      let dados = {
        usuario: this.usuario,
        senha: this.senha,
      }
      this.provider.dadosApi(dados, 'login/login.php').subscribe(
        (data: any)=>{

          if(data['ok'] == true){
            this.mensagem(data['mensagem'], 'success');

            this.usu_id = data['usu']['usu_id'];
            this.usu_nome = data['usu']['usu_nome'];
            this.usu_nivel = data['usu']['usu_nivel'];

            console.log(this.usu_id, this.usu_nivel, this.usu_nome);
            this.router.navigate(['home/' + this.usu_id + '/' + this.usu_nome + '/' + this.usu_nivel])

          }else{
            this.mensagem(data['mensagem'], 'danger');
          }

        }
      )
    });
  }

  async mensagem(mensagem: any, cor: any){
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      color: cor
    })
    await toast.present();
  }



}

