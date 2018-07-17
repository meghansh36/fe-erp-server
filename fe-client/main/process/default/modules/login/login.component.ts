import { Component, OnInit, ViewChild } from '@angular/core';
//import { HttpClient } from '@angular/common/http';  
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
//import { Observable } from 'rxjs/Observable';
import { LoginService } from '@L3Process/default/modules/login/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class FeLoginComponent implements OnInit {
  
  @ViewChild('f') loginForm : NgForm;

  userData = { 
      username:'',
      password:'' 
    };

  submitted:boolean = false;
  
  constructor(private _auth: LoginService, private _router: Router) { }

  ngOnInit() {
  }

  login(){
    this.submitted = true;
    this.userData.username = this.loginForm.value.username;
    this.userData.password = this.loginForm.value.password;
    console.log(this.userData);
    console.log('loginhit');

    this._auth.loginUser(this.userData)
      .subscribe(
        res =>{
          console.log(res);
          console.log('resHit');
          this._router.navigate(['/formBuilder'])
        },
        err => {
          console.log(err)
        }
      )
  }
  logout(){
    this._auth.logOut()
    .subscribe(
      res=>{
        console.log(res);
        console.log('logout');
        this._router.navigate(['/login']);
      }
    );
  }
    
}
