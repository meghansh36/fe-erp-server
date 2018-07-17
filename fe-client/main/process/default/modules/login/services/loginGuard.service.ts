import { Injectable } from '@angular/core';
import { Router, CanActivate,ActivatedRouteSnapshot } from '@angular/router';
import { LoginService } from '@L3Process/default/modules/login/services/login.service';
import { AuthService } from '@L3Process/default/modules/login/services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn:'root'
})
export class FeLoginGuardService implements CanActivate {

  constructor(public _login: LoginService,
     public _router: Router,
    public _auth: AuthService) {}
/**
 * Method for route guard:for handling protected routes
 */
canActivate():Observable<boolean>{
  return this._login.isLoggedIn().pipe(map(res => {
    if(res.status) {
      this._auth.setLoggedIn(true)
      return true
       } else {
      this._router.navigate(['/login'])
      return false
      }
}))
}
}   



    
 
 
