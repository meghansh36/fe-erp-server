import { Component } from '@angular/core';
import { FeBaseComponent } from '@L1Process/system/modules/formGenerator/components/feBase.component';

const buttonThemeClasses = {
  "primary": "btn btn-primary",
  "secondary": "btn btn-secondary",
  "success": "btn btn-success",
  "danger": "btn btn-danger",
  "warning": "btn btn-warning",
  "info": "btn btn-info",
  "light": "btn btn-light",
  "dark": "btn btn-dark",
  "link": "btn btn-link",
  "outline-primary": "btn btn-outline-primary",
  "outline-secondary": "btn btn-outline-secondary",
  "outline-success": "btn btn-outline-success",
  "outline-danger": "btn btn-outline-danger",
  "outline-warning": "btn btn-outline-warning",
  "outline-info": "btn btn-outline-info",
  "outline-light": "btn btn-outline-light",
  "outline-dark": "btn btn-outline-dark",
  "primary btn-lg": "btn btn-primary btn-lg",
  "secondary btn-lg": "btn btn-secondary btn-lg",
  "primary btn-sm": "btn btn-primary btn-sm",
  "secondary btn-sm": "btn btn-secondary btn-sm",
  "primary btn-lg btn-block": "btn btn-primary btn-lg btn-block",
  "secondary btn-lg btn-block": "btn btn-secondary btn-lg btn-block",
  "lg btn-primary": "btn btn-lg btn-primary"
};

const buttonSizeClasses = {
  'large': 'btn-lg',
  'small': 'btn-sm',
  'medium': 'btn-md'
};

@Component({
  selector: 'feButton',
  styleUrls: ['feButton.component.css'],
  templateUrl: 'feButton.component.html'
})
export class FeButtonComponent extends FeBaseComponent {

  defaultTheme: string = 'secondary';

  beforeSetDefaultClasses( classesObj ) {
    console.log('beforeSetDefaultClasses for field ', this.type, this.icon );
    let themeClass = buttonThemeClasses[ this.theme ];
    if ( !themeClass ) {
      themeClass = buttonThemeClasses[ this.defaultTheme ];
    }
    classesObj[ 'fieldClasses' ][ themeClass ] = true;

    if ( this.size ) {
      classesObj[ 'fieldClasses' ][ buttonSizeClasses[ this.size ] ] = true;
    }
    return classesObj;
  }

}
