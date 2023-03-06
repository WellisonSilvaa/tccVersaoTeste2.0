import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hiragana',
  templateUrl: './hiragana.page.html',
  styleUrls: ['./hiragana.page.scss'],
})
export class HiraganaPage implements OnInit {

  niveis = ['/nivel1'];
  profile: any = {};

  constructor(
    private authService: AuthService,
  ) {

  }

  ngOnInit() {
    this.authService.getUserProfile().subscribe((data) => {
      this.profile = data;
      // console.log(this.profile);
    })
  }

}
