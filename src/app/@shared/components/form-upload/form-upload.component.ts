import { Component, OnInit, Input,TemplateRef, ViewChild, EventEmitter } from '@angular/core';
import { FileUploader, IFileOptions, IUploadOptions } from 'ng-devui/upload';
import { FormLayout } from 'ng-devui/form';
import { DialogService } from 'ng-devui';
import { ApiService } from 'src/app/api.service';
import { API_BASE_URL } from 'src/config/config'
@Component({
  selector: 'app-form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.scss']
})
export class FormUploadComponent implements OnInit {
  @Input() data: any;
  branch = 'develop';
  tagName = '';
  des = '';
  layoutDirection: FormLayout = FormLayout.Vertical;

  additionalParameter2 = {
  };
  onAdd = new EventEmitter();
  onDelete = new EventEmitter();
  uploadOptions2: IUploadOptions = {
    uri: API_BASE_URL + 'api/manager/DocumentRef/Upload',
    additionalParameter: this.additionalParameter2,
    maximumSize: 200,
    checkSameName: true
  };
  fileOptions2: IFileOptions = {
    multiple: true,
    accept: '.xls,.xlsx,.jpg,.pdf,.png',
  };
  uploadedFiles2: Array<Object> = [

  ];
  UPLOADED: string;
  FAILED: string;
  DELETE: string;
  PRELOAD: string;
  UPLOADING: string;
  UPLOAD: string;

  constructor(private api: ApiService, private dialogService: DialogService) {
    this.UPLOAD = 'Tải lên';
    this.PRELOAD = 'Chưa tải';
    this.UPLOADING = 'Đang tải';
    this.UPLOADED = 'Thành công';
    this.FAILED = 'Thất bại';
    this.DELETE = 'Xóa';
  }

  onSuccess3(result:any) {
    this.onAdd.emit("success");
  }

  onError3(error:any) {
  }

  deleteUploadedFile3(filePath: string) {
    // console.log(`delete ${filePath}`);
  }
  setCustomUploadOptions(file:any, options:any) {
    let uploadOptions = options;
    // uploadOptions.uri = 'http://localhost:61029/api/manager/DocumentRef/Upload/'+ this.data.document_rcd;
    if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      uploadOptions.maximumSize = 0.1;
    }
    if (file.type  === 'image/png') {
      uploadOptions.maximumSize = 0.5;
    }
    return uploadOptions;
  }
  ngOnInit(): void {
    const param = [this.data.document_rcd, this.data.year, this.data.profile_number, this.data.acceptOCR];
    this.uploadOptions2.uri = API_BASE_URL + 'api/manager/DocumentRef/Upload/' + param.join('_');
    // console.log(this.data);
  }

  onClick(event: any): void {

  }
  
  delete(id:any) {
    const results = this.dialogService.open({
      id: 'delete-dialog',
      width: '346px',
      maxHeight: '600px',
      title: 'Xóa file tài liệu',
      showAnimate: false,
      content: 'Bạn có chắc chắn muốn xóa?',
      backdropCloseable: true,
      onClose: () => {},
      buttons: [
        {
          cssClass: 'primary',
          text: 'Xóa',
          disabled: false,
          handler: ($event: Event) => {
            this.api.get("api/manager/DocumentAttachment/Delete/"+id).subscribe((res:any) => {
              let a = JSON.parse(JSON.stringify(res));
              
              if(a.data) {
                this.onDelete.emit("success");
                this.data['document_attachment'] = this.data['document_attachment'].filter((x:any) => x.document_attachment_id != id);
              }
              else {
                this.onDelete.emit("error");
              }
            });
            results.modalInstance.hide();
          },
        },
        {
          id: 'btn-cancel',
          cssClass: 'common',
          text: 'Không',
          handler: ($event: Event) => {
            results.modalInstance.hide();
          },
        },
      ],
    });
    
  }

  



}
