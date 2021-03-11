import { AuthService } from 'src/app/Services/auth.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import {Location} from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    private _location: Location,
    private router: Router,
    public authService: AuthService,
    public translate: TranslateService,
    public translateModule: TranslateModule

  ) {
    this.initializeApp();
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.translate.setDefaultLang('en');
      this.translate.use('es');
      
    });
  }

  openCustom() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  navigateBack() {
    this._location.back();
    
  }
  closeSession(){
    this.router.navigateByUrl("");

    sessionStorage.clear();
  }
  

  
  
}
