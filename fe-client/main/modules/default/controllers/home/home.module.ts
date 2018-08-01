import { BrowserModule } from '@angular/platform-browser';
import { NgModule as NgController } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DefaultsService } from '@L3Modules/system/services/defaults.service';
import { HomeComponent } from '@L3Modules/default/controllers/home/home.component';
import { FormBuilderModule } from '@L3Modules/system/controllers/formBuilder/formBuilder.module';
import { DefaultModule } from '@L3Modules/default/controllers/default/default.module';
import { FormsModule } from '@L3Modules/default/controllers/forms/forms.module';
import { LoginModule } from '@L3Modules/default/controllers/login/login.module';
import { FormGeneratorModule } from '@L3Modules/system/controllers/formGenerator/formGenerator.module';
import { GridGeneratorModule } from '@L3Modules/system/controllers/gridGenerator/gridGenerator.module';
import { routes  } from '@L3Modules/default/controllers/home/home.routing';

// import { routes as LoginRoutes } from '@L3Modules/default/controllers/login/login.routing';
// import { LoginComponent } from '@L3Modules/default/controllers/login/login.component';



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


@NgController({
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
