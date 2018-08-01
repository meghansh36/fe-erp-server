import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from '@L3Modules/default/controllers/login/login.component';
import { LoginService } from '@L3Modules/default/controllers/login/services/login.service';
import { LoginGuardService } from '@L3Modules/default/controllers/login/services/loginGuard.service';


import { routes } from '@L3Modules/default/controllers/login/login.routing';
import { AuthService } from '@L3Modules/default/controllers/login/services/auth.service';

const routing: ModuleWithProviders = RouterModule.forChild(routes);

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    FormsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    routing
  ],
  providers: [LoginService, LoginGuardService, AuthService]
})
export class FeLoginModule { }


