import { Routes, RouterModule } from '@angular/router';
import { LoginGuardService } from '@L3Process/default/modules/login/services/loginGuard.service';

export const routesL1: Routes = [
  { path: 'formBuilder',
    loadChildren: '@L3Process/system/modules/formBuilder/formBuilder.module#FormBuilderModule',
   // canActivate:[LoginGuardService]
  },
  { path: 'default',
    loadChildren: '@L3Process/default/modules/default/default.module#DefaultModule',
    //canActivate:[LoginGuardService]
  },
  { path: 'login',
    loadChildren: '@L3Process/default/modules/login/login.module#LoginModule'
  },
  {
    path:'**',
    redirectTo:'login'
  }
];
