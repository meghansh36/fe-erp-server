import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { HomeModule } from '@L3Process/default/modules/home/home.module';
import { LoginModule } from '@L3Process/default/modules/login/login.module';
import { LoginGuardService } from '@L3Process/default/modules/login/services/loginGuard.service';


import { environment } from '../environments/environment';


if (environment.production) {
  enableProdMode();
}
  platformBrowserDynamic().bootstrapModule(HomeModule)
  .catch(err => console.log(err));
