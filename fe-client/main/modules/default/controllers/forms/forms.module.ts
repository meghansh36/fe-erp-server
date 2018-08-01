import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsComponent } from '@L3Modules/default/controllers/forms/forms.component';
import { GridGeneratorModule } from '@L3Modules/system/controllers/gridGenerator/gridGenerator.module';
import { routes } from '@L3Modules/default/controllers/forms/forms.routing';

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
