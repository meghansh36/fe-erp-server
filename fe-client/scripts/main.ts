import { enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { HomeModule } from '@L3Modules/default/controllers/home/home.module';
import { LoginModule } from '@L3Modules/default/controllers/login/login.module';
import { LoginGuardService } from '@L3Modules/default/controllers/login/services/loginGuard.service';
import { environment } from '../environments/environment';


if (environment.production) {
  enableProdMode();
}
  platformBrowserDynamic().bootstrapModule(HomeModule)
  .catch(err => console.log(err));
