import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PairedTestPageRoutingModule } from './paired-test-routing.module';

import { PairedTestPage } from './paired-test.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PairedTestPageRoutingModule
  ],
  declarations: [PairedTestPage]
})
export class PairedTestPageModule {}
