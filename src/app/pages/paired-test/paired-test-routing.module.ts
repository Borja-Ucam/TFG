import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PairedTestPage } from './paired-test.page';

const routes: Routes = [
  {
    path: '',
    component: PairedTestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PairedTestPageRoutingModule {}
