import { Component } from '@angular/core';



@Component({
  selector: 'home-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class FeHomeComponent {
  title = 'global';
  constructor() {
    console.log('something');
  }
}
