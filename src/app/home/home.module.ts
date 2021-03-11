import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { TranslateModule } from "@ngx-translate/core";
import { FormulariosPage } from '../pages/formularios/formularios.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    TranslateModule.forChild()

  ],
  //entryComponents: [FormulariosPage],
  declarations: [HomePage
    ]
})
export class HomePageModule {}
