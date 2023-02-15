import { Api } from './../../service/api';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usu_id: String = "";
  usu_nome: String = "";
  usu_nivel: String = "";

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private actRouter: ActivatedRoute,
    private provider: Api
    ) {}

  ngOnInit() {
    //ACT ROUTER SERVE PARA RECEBER E PASSAR PARAMETROS ENTRE AS PAGINAS
    this.actRouter.params.subscribe((data: any)=>{
      this.usu_id = data.usu_id;
      this.usu_nome = data.usu_nome;
      this.usu_nivel = data.usu_nivel;

    })
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Desativar conta',
          handler: () => {
            this.alert();
          },
        },
        {
          text: 'Alterar senha',
          handler: () => {
              // Abrir component "Alert Text Inputs"
            }
        }
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
  }

  async alert() {
    const alert = await this.alertController.create({
      header: 'Deseja desativar a sua conta?',
      buttons: [
        {
          text: 'Voltar',
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: () => {
            this.router.navigateByUrl('/login'); // Pagina de Login
          }
        },
      ],
    });
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Conta desativada com sucesso!',
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }

}
