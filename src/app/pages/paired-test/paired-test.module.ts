import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PairedTestPageRoutingModule } from './paired-test-routing.module';

import { PairedTestPage } from './paired-test.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PairedTestPageRoutingModule,
    TranslateModule.forChild()

  ],
  declarations: [PairedTestPage]
})
export class PairedTestPageModule {}
