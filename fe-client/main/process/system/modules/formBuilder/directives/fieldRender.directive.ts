import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[host]',
})
export class FeFieldRenderDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
