import { Routes, RouterModule } from '@angular/router';
import { LoginGuardService } from '@L3Modules/default/controllers/login/services/loginGuard.service';

export const routesL1: Routes = [
  {
    path: 'formBuilder/:formId',
    loadChildren: '@L3Modules/system/controllers/formBuilder/formBuilder.module#FormBuilderModule',
     //canActivate:[LoginGuardService]
  },
  {
    path: 'formBuilder',
    loadChildren: '@L3Modules/system/controllers/formBuilder/formBuilder.module#FormBuilderModule',
    // canActivate:[LoginGuardService]
  },
  { path: 'forms',
    loadChildren: '@L3Modules/default/controllers/forms/forms.module#FormsModule',
    //canActivate:[LoginGuardService]
  },
  {
    path: 'formGenerator/:formId',
    loadChildren: '@L3Modules/system/controllers/formGenerator/formGenerator.module#FormGeneratorModule',
    //canActivate:[LoginGuardService]
  },
  {
    path: 'default',
    loadChildren: '@L3Modules/default/controllers/default/default.module#DefaultModule',
   // canActivate:[LoginGuardService]
  },
  {
    path: 'login',
    loadChildren: '@L3Modules/default/controllers/login/login.module#LoginModule'
  },
  {
    path: '**',
    redirectTo: 'forms'
  }
];
