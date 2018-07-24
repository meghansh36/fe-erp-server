import { Routes, RouterModule } from '@angular/router';
import { LoginGuardService } from '@L3Process/default/modules/login/services/loginGuard.service';

export const routesL1: Routes = [
  {
    path: 'formBuilder',
    loadChildren: '@L3Process/system/modules/formBuilder/formBuilder.module#FormBuilderModule',
    // canActivate:[LoginGuardService]
  },
  { path: 'forms',
    loadChildren: '@L3Process/default/modules/forms/forms.module#FormsModule',
    //canActivate:[LoginGuardService]
  },
  {
    path: 'formGenerator/:id?',
    loadChildren: '@L3Process/system/modules/formGenerator/formGenerator.module#FormGeneratorModule',
    //canActivate:[LoginGuardService]
  },
  {
    path: 'default',
    loadChildren: '@L3Process/default/modules/default/default.module#DefaultModule',
    //canActivate:[LoginGuardService]
  },
  {
    path: 'login',
    loadChildren: '@L3Process/default/modules/login/login.module#LoginModule'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
