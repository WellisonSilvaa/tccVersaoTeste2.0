import { onAuthStateChanged } from '@firebase/auth';
import { DataService } from './../services/data.service';
import { AuthService } from './../services/auth.service';
import { LoginPage } from './../login/login.page';
import { signOut, Auth, getAuth } from '@angular/fire/auth';
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
  usu_nome: any;
  usu_nivel: String = "";
  profileInfo: any = {};

  constructor(
    private authService: AuthService,
    private actionSheetCtrl: ActionSheetController,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private actRouter: ActivatedRoute,
    private dataService: DataService
    ) {
      // this.getUserProfile();
    }

  ngOnInit() {
    // //ACT ROUTER SERVE PARA RECEBER E PASSAR PARAMETROS ENTRE AS PAGINAS
    // this.actRouter.params.subscribe((data: any)=>{
    //   this.usu_id = data.usu_id;
    //   this.usu_nome = data.usu_nome;
    //   this.usu_nivel = data.usu_nivel;
// })
    this.getUserProfile();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Sair',
          handler: () => {
            this.logout();
          },
        },
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

  async logout(){
    await this.authService.logout();
    this.router.navigateByUrl('/', {replaceUrl: true});
  }

  // getUserProfile() {
  //   this.dataService.getUserProfile().subscribe(user =>{
  //     if(user){
  //       this.profileInfo = user
  //     }
  //     console.log('%%%%', this.profileInfo);
  //   })
  // }
  getUserProfile() {

      const auth = getAuth();

      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          console.log(user.uid, user.email, user.photoURL);
          this.usu_id = user.uid;
          this.usu_nome = user.email;
          this.profileInfo = user;
          // ...
        } else {
          // User is signed out
          // ...
        }
      });

    }



}
