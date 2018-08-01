import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';

export interface userDetails {
  username:string;
  exp:number;
  iat:number;
}

interface isLoggedIn {
  status: boolean;
}

interface logOutStatus {
  success:boolean;
}

@Injectable({
  providedIn: 'root'
})

export class FeLoginService {

  private apiUrl ="/api/default/login";

  constructor(private _http: HttpClient,private _router: Router) { }

  loginUser(userData){
    return this._http.post<any>(`${this.apiUrl}/login`,userData);
  }

  isLoggedIn(): Observable<isLoggedIn>{
    return this._http.get<isLoggedIn>(`${this.apiUrl}/isloggedin`);
  }

  logOut(): Observable<logOutStatus>{
    return this._http.get<logOutStatus>(`${this.apiUrl}/logout`);
  }

}





// loginUser(userData){
  //   return this._http.post<any>(`${this.apiUrl}/login`, userData)
  //             .pipe(
  //               map((data:tokenResponse)=>{
  //               if(data.token){
  //                 console.log(userData);
  //                 console.log('LoginUser');
  //                 console.log(data.token);
  //                 this.saveToken(data.token);
  //               }        
  //               })
  //             );
  // }

  // /**
  //  * Logout method: removes token from LocalStorage 
  //  * and Redirects to login page
  //  */
  // public logOut(): void {
  //   this.token='';
  //   window.localStorage.removeItem('token');
  //   this._router.navigateByUrl(`${this.apiUrl}/logout`);
  // }

  // /**
  //  * Method to check whether user is Logged in or not
  //  * Checks with token's expiry time
  //  */
  // // public isLoggedIn(): boolean {
  // //   const token = localStorage.getItem('token');
  // //   return this._jwtHelper.isTokenExpired(token);
  // // }
  
  // public isLoggedIn(): boolean {
  //   const user = this.getUserDetails();
  //   if (user) {
  //     return user.exp > Date.now() / 1000;
  //   } else {
  //     return false;
  //   }
  // }

  // /**
  //  * Method to check whether Logged out or not
  //  * checks login status 
  //  */

  // isLoggedOut():boolean {
  //   return !this.isLoggedIn();
  // }




