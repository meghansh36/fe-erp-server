import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsComponent } from '@L3Process/default/modules/forms/forms.component';
import { GridGeneratorModule } from '@L3Process/system/modules/gridGenerator/gridGenerator.module';
import { routes } from '@L3Process/default/modules/forms/forms.routing';

const routing: ModuleWithProviders = RouterModule.forChild(routes);

@NgModule({
  declarations: [
    FormsComponent
  ],
  imports: [
    CommonModule,
    routing,
    GridGeneratorModule
  ],
  providers: [],
})
export class FeFormsModule { }
