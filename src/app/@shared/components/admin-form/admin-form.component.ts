import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormLayout } from 'ng-devui';
import { FormConfig } from './admin-form.type';
import { MapToPipe } from './mapToPipe.pipe';

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
  currentOption:any = null;

  @Input() set formData(val: any) {
    this._formData = JSON.parse(JSON.stringify(val));
    this.formConfig.items.map((item:any) => {
      if(item.type == "select-haidv") {
        this.currentOption = this._formData[item.prop];
      }
    })
  }

  @Output() submitted = new EventEmitter();

  @Output() canceled = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  submitPlanForm({ valid }: { valid: boolean }) {
    if (valid) {
      this.submitted.emit(this._formData);
      console.log(this._formData,this.currentOption)
      this.formConfig.items.map((item:any) => {
        if(item.type == "select-haidv") {
          this._formData[item.prop] = this.currentOption;
        }
      })
    }
  }
  modelChange(value:any) {
    this.currentOption = new MapToPipe().transform(value, 'id');
  }

  cancel() {
    this.canceled.emit();
  }
}
