import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormDragComponent } from '@L3Process/system/modules/formBuilder/components/formDrag/formDrag.component';
import { FormBuilderService } from '@L3Process/system/modules/formBuilder/services/formBuilder.service';
import { FormMasterService } from '@L3Process/system/modules/formBuilder/services/formMaster.service';
import { FieldControlService } from '@L3Process/system/modules/formBuilder/services/fieldControl.service';
import { FormJsonService } from '@L3Process/system/modules/formBuilder/services/formJson.service';
import { DndModule } from 'ng2-dnd';
import { FormBuilderComponent } from '@L3Process/system/modules/formBuilder/formBuilder.component';
import { FormBuilderRoutes } from '@L3Process/system/modules/formBuilder/formBuilder.routing';
import { CommonModule } from '@angular/common';
import { MasterFormComponent } from '@L3Process/system/modules/formBuilder/components/Master/masterForm.component';
import { SortablejsModule } from 'angular-sortablejs/dist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';
import { DefaultsService } from '@L3Process/system/services/Defaults.service';
import { TxtComponent } from '@L3Process/system/modules/formBuilder/components/formElements/txt/txt.component';
import { TxaComponent } from '@L3Process/system/modules/formBuilder/components/formElements/txa/txa.component';
import { TimComponent } from '@L3Process/system/modules/formBuilder/components/formElements/tim/tim.component';
import { PwdComponent } from '@L3Process/system/modules/formBuilder/components/formElements/pwd/pwd.component';
import { PhnComponent } from '@L3Process/system/modules/formBuilder/components/formElements/phn/phn.component';
import { NumComponent } from '@L3Process/system/modules/formBuilder/components/formElements/num/num.component';
import { MonComponent } from '@L3Process/system/modules/formBuilder/components/formElements/mon/mon.component';
import { HidComponent } from '@L3Process/system/modules/formBuilder/components/formElements/hid/hid.component';
import { EmlComponent } from '@L3Process/system/modules/formBuilder/components/formElements/eml/eml.component';
import { DtiComponent } from '@L3Process/system/modules/formBuilder/components/formElements/dti/dti.component';
import { DatComponent } from '@L3Process/system/modules/formBuilder/components/formElements/dat/dat.component';
import { CurComponent } from '@L3Process/system/modules/formBuilder/components/formElements/cur/cur.component';
import { AdrComponent } from '@L3Process/system/modules/formBuilder/components/formElements/adr/adr.component';
import { DragulaModule } from 'ng2-dragula';
import { ChkComponent } from '@L3Process/system/modules/formBuilder/components/formElements/chk/chk.component';
import { AncComponent } from '@L3Process/system/modules/formBuilder/components/formElements/anc/anc.component';
import { BlkComponent } from '@L3Process/system/modules/formBuilder/components/formElements/blk/blk.component';
import { BtnComponent } from '@L3Process/system/modules/formBuilder/components/formElements/btn/btn.component';
import { RadComponent } from '@L3Process/system/modules/formBuilder/components/formElements/rad/rad.component';
import { FstComponent } from '@L3Process/system/modules/formBuilder/components/formElements/fst/fst.component';
import { SelComponent } from '@L3Process/system/modules/formBuilder/components/formElements/sel/sel.component';
import { MslComponent } from '@L3Process/system/modules/formBuilder/components/formElements/msl/msl.component';
import { IcbComponent } from '@L3Process/system/modules/formBuilder/components/formElements/icb/icb.component';
import { AcsComponent } from '@L3Process/system/modules/formBuilder/components/formElements/acs/acs.component';
import { NgxSelectModule, INgxSelectOptions } from 'ngx-select-ex';
import { JSONEditorModule } from 'ngx-jsoneditor';
import { HTMLComponent } from "@L3Process/system/modules/formBuilder/components/formElements/html/html.component";
import { FileComponent } from "@L3Process/system/modules/formBuilder/components/formElements/file/file.component";
import { CKEditorModule } from 'ng2-ckeditor';
import { FormGeneratorModule } from '../../../../../legislations/fe/clients/fe/main/process/system/modules/formGenerator/formGenerator.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const CustomSelectOptions: INgxSelectOptions = { // Check the interface for more options
  optionValueField: 'code',
  optionTextField: 'meaning'
};
@NgModule({
  declarations: [
    FormBuilderComponent,
    FormDragComponent,
    MasterFormComponent,
    TxtComponent,
    TxaComponent,
    TimComponent,
    PwdComponent,
    PhnComponent,
    NumComponent,
    MonComponent,
    HidComponent,
    EmlComponent,
    DtiComponent,
    DatComponent,
    CurComponent,
    AdrComponent,
    ChkComponent,
    AncComponent,
    BlkComponent,
    BtnComponent,
    RadComponent,
    FstComponent,
    SelComponent,
    MslComponent,
    IcbComponent,
    AcsComponent,
    HTMLComponent,
    FileComponent
  ],
  imports: [
    CommonModule,
    NgxSelectModule.forRoot(CustomSelectOptions),
    NgbModule,
    DndModule.forRoot(),
    FormBuilderRoutes,
    FormsModule,
    SortablejsModule.forRoot({ animation: 500 }),
    DragulaModule,
    HttpClientModule,
    ReactiveFormsModule,
    JSONEditorModule,
    TextMaskModule,
    CKEditorModule,
    FormGeneratorModule
  ],
  entryComponents: [TxtComponent, TxaComponent, TimComponent, PwdComponent, PhnComponent,
                    NumComponent, MonComponent, HidComponent, EmlComponent, DtiComponent,
                    DatComponent, CurComponent, AdrComponent, ChkComponent,
                    AncComponent, BlkComponent, BtnComponent, RadComponent,
                    AcsComponent, FstComponent, IcbComponent, SelComponent,
                    MslComponent, HTMLComponent, FileComponent],
  providers: [FormBuilderService, FormMasterService, FieldControlService, FormJsonService, DefaultsService],
  bootstrap: [FormBuilderComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class FeFormBuilderModule { }
