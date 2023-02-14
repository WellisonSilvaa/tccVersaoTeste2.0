import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public usuario = "nomeUsuário";
  public nivel = "1";

  constructor(private actionSheetCtrl: ActionSheetController, private router: Router, private alertController: AlertController, private toastController: ToastController) {}

  ngOnInit() {
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
            this.router.navigateByUrl('/home'); // Pagina de Login
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
