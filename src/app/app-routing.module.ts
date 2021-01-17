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
    path: 'pages/single-test',
    loadChildren: () => import('./pages/single-test/single-test.module').then( m => m.SingleTestPageModule)
  },
  {
    path: 'pages/paired-test',
    loadChildren: () => import('./pages/paired-test/paired-test.module').then( m => m.PairedTestPageModule)
  },
  {
    path: 'pages/formularios',
    loadChildren: () => import('./pages/formularios/formularios.module').then( m => m.FormulariosPageModule)
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  },
 
 
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
