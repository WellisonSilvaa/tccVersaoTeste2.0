import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public usuario = "nomeUsuário";

  constructor(private actionSheetCtrl: ActionSheetController) {}

  ngOnInit() {
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Desativar conta',
          data: {
            action: 'cancel',
          },
        },
        {
          text: 'Alterar senha',
          data: {
            action: 'cancel',
          },
        }
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
  }

}
