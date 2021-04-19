import { TranslateService } from '@ngx-translate/core';
import { ConfiguracionPage } from './pages/configuracion/configuracion.page';
import { FormulariosPage } from './pages/formularios/formularios.page';
import { AuthService } from 'src/app/Services/auth.service';
import { ImagesService } from './Services/images.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { PreguntasService } from './Services/preguntas.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicSelectableModule } from 'ionic-selectable';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  
  declarations: [	AppComponent,
    FormulariosPage,
    ConfiguracionPage
    
   ],
  entryComponents: [FormulariosPage, ConfiguracionPage],
  imports: [
    BrowserModule,
    FormsModule,
    
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    IonicSelectableModule,
    
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    PreguntasService, ImagesService, AuthService
  ],
  exports:[TranslateModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
