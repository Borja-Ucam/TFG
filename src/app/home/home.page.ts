import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private router:Router,

  ) {}

  openModuleS(){
    this.router.navigateByUrl("/pages/single-test");
  }
  openModuleP(){
    this.router.navigateByUrl("/pages/paired-test");
  }
}
