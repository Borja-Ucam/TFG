import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleTestPageRoutingModule } from './single-test-routing.module';

import { SingleTestPage } from './single-test.page';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleTestPageRoutingModule,
    TranslateModule.forChild()

  ],
  declarations: [SingleTestPage]
})
export class SingleTestPageModule {
  


}
