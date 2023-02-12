import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'escrita',
    loadChildren: () => import('./escrita/escrita.module').then( m => m.EscritaPageModule)
  },
  {
    path: 'hiragana',
    loadChildren: () => import('./hiragana/hiragana.module').then( m => m.HiraganaPageModule)
  },
  {
    path: 'nivel1',
    loadChildren: () => import('./nivel1/nivel1.module').then( m => m.Nivel1PageModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./tutorial/tutorial.module').then( m => m.TutorialPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
