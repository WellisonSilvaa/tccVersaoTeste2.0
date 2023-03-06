import { Firestore } from '@angular/fire/firestore';
import { setDoc, doc } from 'firebase/firestore';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-nivel1',
  templateUrl: './nivel1.page.html',
  styleUrls: ['./nivel1.page.scss'],
})
export class Nivel1Page implements OnInit {

  hiraganaA = ["あ", "い", "う", "え", "お"];
  romaji = ["A", "I", "U", "E", "O"];
  resposta = "";
  front = "";
  back = "";
  random = this.sortear();
  p: number;
  profile: any = {};
  profileAuth: any = {};
  nivel: any;
  id: any;

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router,
    private authService: AuthService,
    private firestore: Firestore
    )
    {
    this.front = this.hiraganaA[this.random];
    this.back = this.romaji[this.random];
    this.p = 0;
  }

  ngOnInit() {
    this.authService.getUserProfile().subscribe((data) => {
      this.profile = data;
      // console.log(this.profile);
    })
  }

  async concluir() {
    const alert = await this.alertController.create({
      header: 'Parabéns!',
      buttons: [
        {
          text: 'Voltar',
          handler: () => {
            this.router.navigateByUrl('/nivel1');
          }
        },
        {
          text: 'Próximo nível',
          handler: () => {
            this.router.navigateByUrl('/tutorial');
          }
        },
        {
          text: 'Teste Nivel',
          handler: () => {
            // this.authService.updateNivel();
            this.router.navigateByUrl('/hiragana');
          }
        },
      ],
    });
    alert.classList.add('animate__animated', 'animate__heartBeat');
    await alert.present();
  }

  async presentToast(m: string, c: string) {
    const toast = await this.toastController.create({
      message: m,
      duration: 1500,
      position: 'middle',
      color: c
    });

    await toast.present();
  }

  progredir(v: number) {
    this.p += v;
    if (this.p == 100) {
      setTimeout(() => {
        this.concluir();

        this.p = 0;
      }, 1500);
    } else if (this.p <= 0) {
      this.p = 0;
    }
  }

  responder(r: string) {
    this.resposta = this.romaji[this.hiraganaA.indexOf(r)];
    setTimeout(() => {
      this.verificar(r);
      this.virar();
      setTimeout(() => {
        this.resposta = "";
        this.desvirar();
        this.random = this.sortear();
        setTimeout(() => {
          this.front = this.hiraganaA[this.random];
          this.back = this.romaji[this.random];
        }, 240);
      }, 1500);
    }, 600);
  }

  verificar(r: string) {
    if (r == this.front) {
      this.progredir(10);
      this.updateNivel();
      setTimeout(() => {
        this.presentToast('Correto!', 'success');
      }, 200);
    } else {
      this.progredir(-10);
      setTimeout(() => {
        this.presentToast('Errado', 'danger');
      }, 200);
    }
  }

  sortear() {
    return Math.floor(Math.random() * 2);
  }

  virar() {
    var checkbox = document.querySelector("#flip");
    function ativarCheckbox(el: any) {
      el.checked = true;
    }
    ativarCheckbox(checkbox);
  }

  desvirar() {
    var checkbox = document.querySelector("#flip");
    function desativarCheckbox(el: any) {
      el.checked = false;
    }
    desativarCheckbox(checkbox);
  }

   async updateNivel() {

    const auth = getAuth();
      const user = auth.currentUser;

    this.nivel = this.profile.nivel;
    this.profileAuth = user;

      try {

      var nivel = +(this.nivel);
      nivel = nivel + 1;
      console.log(nivel);
      const email = this.profile.email;
      const name = this.profile.name;

      const userDocRef = doc(this.firestore, `users/${this.profileAuth.uid}`);
      await setDoc(userDocRef, {
        nivel,
        email,
        name

      })
      } catch (error) {
        console.log('Erro', 'Erro na atualizacao no nivel');
      }

  }


}
