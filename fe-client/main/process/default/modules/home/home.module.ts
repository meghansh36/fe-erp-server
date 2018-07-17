import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '@L3Process/default/modules/home/home.component';
import { FormBuilderModule } from '@L3Process/system/modules/formBuilder/formBuilder.module';
import { DefaultModule } from '@L3Process/default/modules/default/default.module';
import { LoginModule } from '@L3Process/default/modules/login/login.module';
import { routes  } from '@L3Process/default/modules/home/home.routing';

// import { routes as LoginRoutes } from '@L3Process/default/modules/login/login.routing';
// import { LoginComponent } from '@L3Process/default/modules/login/login.component';

import { HttpClientModule } from '@angular/common/http';

import { FormGeneratorModule } from '@L1Process/system/modules/formGenerator/formGenerator.module';


// function getToken():string{
//   console.log(localStorage.getItem('token'));
//   return localStorage.getItem('token');
// }

// let routes,component;

// if(getToken()){
//   routes = HomeRoutes;
//   component = HomeComponent;
// }
// else {
//   routes = LoginRoutes;
//   component = LoginComponent;
// }
// console.log(routes);

const routing: ModuleWithProviders = RouterModule.forRoot(routes);


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormGeneratorModule,
    NgbModule.forRoot(),
    routing,
    HttpClientModule,
  ],
  providers: [],
 bootstrap: [HomeComponent]
})
export class FeHomeModule { }
