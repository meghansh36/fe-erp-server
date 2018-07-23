import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DefaultsService } from '@L3Process/system/services/Defaults.service';
import { HomeComponent } from '@L3Process/default/modules/home/home.component';
import { FormBuilderModule } from '@L3Process/system/modules/formBuilder/formBuilder.module';
import { DefaultModule } from '@L3Process/default/modules/default/default.module';
import { FormsModule } from '@L3Process/default/modules/forms/forms.module';
import { LoginModule } from '@L3Process/default/modules/login/login.module';
import { FormGeneratorModule } from '@L3Process/system/modules/formGenerator/formGenerator.module';
import { GridGeneratorModule } from '@L3Process/system/modules/gridGenerator/gridGenerator.module';
import { routes  } from '@L3Process/default/modules/home/home.routing';

// import { routes as LoginRoutes } from '@L3Process/default/modules/login/login.routing';
// import { LoginComponent } from '@L3Process/default/modules/login/login.component';



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
    //GridGeneratorModule,
    //FormGeneratorModule,
    NgbModule.forRoot(),
    routing,
    HttpClientModule,
  ],
  providers: [DefaultsService],
 bootstrap: [HomeComponent]
})
export class FeHomeModule { }
