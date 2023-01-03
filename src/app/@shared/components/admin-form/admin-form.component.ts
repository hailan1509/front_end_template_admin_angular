import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormLayout } from 'ng-devui';
import { FormConfig } from './admin-form.type';
import { MapToPipe } from './mapToPipe.pipe';
import { ApiService } from 'src/app/api.service';
import form from 'src/assets/i18n/zh-CN/form';

@Component({
  selector: 'da-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss'],
})
export class AdminFormComponent implements OnInit {
  @Input() formConfig: FormConfig = {
    layout: FormLayout.Horizontal,
    labelSize: 'sm',
    items: [],
  };

  _formData: any = {};
  currentOption:any = {};

  @Input() insert : boolean = true;

  @Input() set formData(val: any) {
    this._formData = JSON.parse(JSON.stringify(val));
    
  }

  @Output() submitted = new EventEmitter();

  @Output() canceled = new EventEmitter();

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.formConfig.items.map((item:any) => {
      if(item.type == "select-object") {
        this.currentOption[item.prop] = this._formData[item.prop];
      }
    })
  }

  submitPlanForm({ valid }: { valid: boolean }) {
    if (valid) {
      this.formConfig.items.map((item:any) => {
        if(item.type == "select-object") {
          this._formData[item.prop] = this.currentOption[item.prop];
        }
      })
      this.submitted.emit(this._formData);
    }
  }
  modelChange(value:any,prop:any) {
    this.currentOption[prop] = new MapToPipe().transform(value, 'id');
    console.log(prop,this.currentOption);
  }

  cancel() {
    this.canceled.emit();
  }
  upLoad() {
    var input:any = document.getElementById('file_upload') as HTMLInputElement | null;
    var file:any = input.files[0];
    const formdata = new FormData();
    formdata.append('file',file);
    this.api.post("api/manager/DocumentRef/PDFToText/",formdata).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      if(a.content) {
        console.log(JSON.parse(a.content))// this.showToast("success");
      }
      else {
        // this.showToast("error");
      }
      // this.getList();
    });
  }
}
