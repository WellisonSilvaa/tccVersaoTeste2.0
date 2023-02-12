import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscritaPageRoutingModule } from './escrita-routing.module';

import { EscritaPage } from './escrita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EscritaPageRoutingModule
  ],
  declarations: [EscritaPage]
})
export class EscritaPageModule {}
