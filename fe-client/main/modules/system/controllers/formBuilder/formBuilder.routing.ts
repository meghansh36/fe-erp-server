import { Routes, RouterModule } from '@angular/router';
import { FormBuilderComponent } from '@L3Modules/system/controllers/formBuilder/formBuilder.component';
import { NgModule } from '@angular/core';

const formRoutesL1: Routes = [
    {
        path: '',
        component: FormBuilderComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(formRoutesL1)],
    exports: [RouterModule]
})
export class FeFormBuilderRoutes {}


