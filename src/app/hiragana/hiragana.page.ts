import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hiragana',
  templateUrl: './hiragana.page.html',
  styleUrls: ['./hiragana.page.scss'],
})
export class HiraganaPage implements OnInit {

  niveis = ['/nivel1'];

  constructor() {
  }

  ngOnInit() {
  }

}
