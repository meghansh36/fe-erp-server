import { Component, ViewChild, ComponentFactoryResolver, ViewContainerRef, DoCheck, Renderer2, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormMasterService } from '@L3Process/system/modules/formBuilder/services/formMaster.service';
import { FieldControlService } from '@L3Process/system/modules/formBuilder/services/fieldControl.service';
import { FormJsonService } from '@L3Process/system/modules/formBuilder/services/formJson.service';
import { DragulaService } from 'ng2-dragula';
import { FormBuilderService } from '@L3Process/system/modules/formBuilder/services/formBuilder.service';
import { FstComponent } from '@L3Process/system/modules/formBuilder/components/formElements/fst/fst.component';

// import { FieldRenderDirective } from '@L3Process/system/modules/formBuilder/directives/fieldRender.directive';
@Component({
  selector: 'form-builder',
  templateUrl: './formBuilder.component.html',
  styleUrls: ['./formBuilder.component.css']
})
export class FeFormBuilderComponent implements DoCheck, OnInit {

  @ViewChild('host', {read: ViewContainerRef}) host: ViewContainerRef;
  // @ViewChildren(FstComponent) fstArray: QueryList<FstComponent>;
  @ViewChild('content') content;
  cond: Boolean = false;
  basic: String = 'basic';
  advanced: String = 'advanced';
  modalRef: NgbModalRef;
  component: any;
  finalJSON;
  rootDrop;
  DOMArray: any = [];

  constructor(private bootstrapService: NgbModal,
              private masterFormService: FormMasterService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private fieldControlService: FieldControlService,
              private formJsonService: FormJsonService,
              private dragulaService: DragulaService,
              private formBuilderService: FormBuilderService,
              private renderer: Renderer2
              ) {
                this.dragulaService.setOptions('bag-one', {
                  revertOnSpill: true,
                  copy: function(el, source) {
                    return source.id === 'not_copy';
                  }
                });

                this.dragulaService.drop.subscribe((value) => {
                  // const componentName = value[1].attributes[2].nodeValue;
                  console.log(value);
                  if (this.rootDrop === undefined) {
                    this.rootDrop = value[2];
                  }
                  if (value[1].nodeName === 'LI') {
                    value[1].innerHTML = '';
                    value[1].outerHTML = '';
                    const componentName = value[1].attributes[2].nodeValue;
                    const index = this.calculateIndex(value);
                    this.dropComplete(this.formBuilderService.getComponent(componentName), index, value);
                  } else {
                    //this.DOMArray = document.querySelectorAll('.fieldcomponent');
                   // this.formJsonService.setDOMComponentArray(value[2].children);
                   const index = this.calculateIndex(value);
                   //this.formJsonService.updateMasterJSON(index, value[1].generatedKey, value[2]);
                   //this.formJsonService.updateMasterJSON(value[2]);
                    //this.formJsonService.buildFinalJSON();
                  }
                });
              }


     ngDoCheck() {
       this.finalJSON = this.formJsonService.getFinalJSON();
     }

     ngOnInit() {
     // console.log('fstArray', this.fstArray);
    // this.rootDrop = this.renderer.selectRootElement('#root_drop');
     }

  calculateIndex(value) {
    const [bag, el, target, source, sibling] = value;
    const children = target.children;

    if (sibling === null) {
      return children.length;
    } else {
      // for (let i = 0; i < children.length; i++) {
      //   if (sibling !== children[i]) {
      //     index++;
      //   } else {
      //     break;
      //   }
      // }
     return Array.prototype.indexOf.call(children, sibling) ;
    }
  }

  dropComplete(componentObj, index, value) {
    // console.log(event);
    // this.component = event.dragData;
    this.createComponentFunc(componentObj, index, value[2]);
    this.openModal();

  }


  openModal() {
    this.modalRef = this.bootstrapService.open(this.content, {size: 'lg'});
    this.masterFormService.setModalRef(this.modalRef);
  }

  generateNewKey() {
    return  '_' + Math.random().toString(36).substr(2, 9);
  }

  createComponentFunc(componentObj, index, target) {
    const key = this.generateNewKey();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentObj.component);
    this.masterFormService.setCurrentKey(key);


    if (target.className === 'FSTdropZone') {
    const componentRef = this.fieldControlService.getFstCollection(target.id).createComponent(componentFactory, index);
    this.fieldControlService.setFieldRef(componentRef, this, componentObj);
    // console.log("index", index);
    this.formJsonService.addComponentToMasterJSON(key, componentRef, target.id, index);
    //  target.children[index].generatedKey = key;
    //  target.children[index].parentComponent = target.id;
    // console.log('target childkey', target.children[index].childkey);
    //this.formJsonService.setDOMComponentArray(this.rootDrop.children);
    //console.log('dom array 1', target);

    } else {
    const viewContainerRef = this.host;
    console.log("index", index);
    const componentRef = viewContainerRef.createComponent(componentFactory, index);
    this.fieldControlService.setFieldRef(componentRef, this, componentObj);
    this.formJsonService.addComponentToMasterJSON(key, componentRef, target.id, index);
    // console.log('target', target.children)
    // target.children[index].generatedKey = key;
    // target.children[index].parentComponent = target.id;
    // console.log('target childkey', target.children[index].generatedKey);
  //  this.formJsonService.setDOMComponentArray(this.rootDrop.children);
    // console.log('dom array 2', target);
    }

    target.children[index].generatedKey = key;
    target.children[index].parentComponent = target.id;
    this.formJsonService.updateMasterJSON(target);
    this.formJsonService.buildFinalJSON();
    //this.DOMArray = document.querySelectorAll('.fieldcomponent');
    // this.DOMArray[this.DOMArray.length - 1].generatedKey = key;
    // this.DOMArray[this.DOMArray.length - 1].parentComponent = target.id;

   // setTimeout(() => {
     // this.formJsonService.updateMasterJSON(target);
      // this.formJsonService.buildFinalJSON();
   // }, 1000);
    //console.log("index", index);
    
    //console.log('dom array 3', target);
    //this.formJsonService.updateMasterJSON(index, key, target);
    
    // this.formJsonService.setDOMComponentArray(this.DOMArray);
    console.log(this.formJsonService.getMasterJSON());
    //console.log('dom array 4', target);
  }

  save(){
    this.formBuilderService.postData(this.finalJSON)
    .subscribe((res)=>{console.log('resolve data')},
                (err)=>{console.log('getting error')} );
  }

  reset() {
    
  }


  preview(){



  }



}
