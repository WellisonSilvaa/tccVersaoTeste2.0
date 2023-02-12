import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

  botao = "Pular";

  constructor() { }

  ngOnInit() {
  }

  mudar(m:string) {
    this.botao = m;
  }

}
