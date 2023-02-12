import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscritaPage } from './escrita.page';

const routes: Routes = [
  {
    path: '',
    component: EscritaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscritaPageRoutingModule {}
