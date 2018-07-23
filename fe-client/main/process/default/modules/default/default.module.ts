import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from '@L3Process/default/modules/default/default.component';
import { FRM0000001Component } from '@L3Forms/FRM0000001.component';
import { FormGeneratorModule } from '@L3Process/system/modules/formGenerator/formGenerator.module';
//import { GridGeneratorModule } from '@L3Process/system/modules/gridGenerator/gridGenerator.module';
import { routes } from '@L3Process/default/modules/default/default.routing';

const routing: ModuleWithProviders = RouterModule.forChild(routes);

@NgModule({
  declarations: [
    DefaultComponent,
    FRM0000001Component,
  ],
  imports: [
    CommonModule,
    routing,
    //GridGeneratorModule,
    FormGeneratorModule,
  ],
  providers: [],
})
export class FeDefaultModule { }
