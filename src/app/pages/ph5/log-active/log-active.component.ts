import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { DialogService, FormLayout, TableWidthConfig } from 'ng-devui';
import { ApiService } from 'src/app/api.service';
import { DataTableComponent } from 'ng-devui/data-table';
import { Subscription } from 'rxjs';
import { Item, Profile } from 'src/app/@core/data/listData';
import { MapToPipe } from 'src/app/@shared/components/admin-form/mapToPipe.pipe';
import { ListDataService } from 'src/app/@core/mock/list-data.service';
import { ProfilePermissionComponent } from 'src/app/@shared/components/modals/profile-permission/profile-permission.component';
import { FormConfig } from 'src/app/@shared/components/admin-form';
// import { parse } from 'path';
import { LoadingService } from 'ng-devui/loading';

@Component({
  selector: 'app-log-active',
  templateUrl: './log-active.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./log-active.component.scss']
})
export class LogActiveComponent implements OnInit {

  constructor(private listDataService: ListDataService, private dialogService: DialogService, private cdr: ChangeDetectorRef,private api: ApiService, private loadingService: LoadingService ) {}
  _search = {
    user_rcd: '',
    from_date: null,
    to_date: null,
  };
  busy: Subscription;
  searchForm: {
    borderType: '' | 'borderless' | 'bordered';
    size: 'sm' | 'md' | 'lg';
    layout: 'auto' | 'fixed';
  } = {
    borderType: 'bordered',
    size: 'md',
    layout: 'auto',
  };

  user_select:any;

  tableWidthConfig: TableWidthConfig[] = [
    {
      field: 'username',
      width: '150px',
    },
    {
      field: 'full_name',
      width: '150px',
    },
    {
      field: 'action',
      width: '100px',
    },
    {
      field: 'function',
      width: '100px',
    },
    {
      field: 'created_at',
      width: '100px',
    },
    {
      field: 'success',
      width: '100px',
    },
    {
      field: 'exception',
      width: '100px',
    },
  ];
  basicDataSource: Profile[] = [];
  formConfig: FormConfig = {
    layout: FormLayout.Horizontal,
    items: [
      {
        label: 'Số hồ sơ',
        prop: 'profile_number',
        type: 'input',
        primary: false,
        required: true,
        rule: {
          validators: [{ required: true }],
        },
      },
      {
        label: 'Tên hồ sơ',
        prop: 'profile_name_l',
        type: 'input',
        primary: false,
        required: true,
        rule: {
          validators: [{ required: true }],
        },
      },
      {
        label: 'Năm',
        prop: 'year',
        primary: false,
        type: 'input',
      },
      {
        label: 'Ngày bắt đầu',
        prop: 'from_date',
        primary: false,
        type: 'datePicker',
      },
      {
        label: 'Ngày kết thúc',
        prop: 'to_date',
        primary: false,
        type: 'datePicker',
      },
      {
        label: 'Ghi chú',
        prop: 'profile_note_l',
        type: 'input',
      },
    ],
    labelSize: '',
  };

  pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
  };
  userSelected = {id : '' , name : "Tất cả"};
  dateRange = [null, null];
  msgs: Array<Object> = [];
  ngOnInit(): void {
    this.getUsers();
    this.getList();
  }
  getList() {
    let to_date = "";
    let from_date = "";
    if(this.dateRange[0]) {
      from_date = this.convertDateToString(this.dateRange[0]);
    }
    if(this.dateRange[1]) {
      to_date = this.convertDateToString(this.dateRange[1]);
    }
    this.api.post("api/manager/UserRef/SearchLogs",{page : this.pager.pageIndex , pageSize: this.pager.pageSize , lang : 'e', user_rcd: this._search.user_rcd, from_date : from_date, to_date : to_date}).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.basicDataSource = a.data;
      this.pager.total = a.totalItems;
    })
  }
  onPageChange(e: number) {
    this.pager.pageIndex = e;
    this.getList();
  }
  onRowCheckChange(checked: any, rowIndex: any, nestedIndex: any, rowItem: any) {
    rowItem.$checked = checked;
    rowItem.$halfChecked = false;
    // this.datatable.setRowCheckStatus({
    //   rowIndex: rowIndex,
    //   nestedIndex: nestedIndex,
    //   rowItem: rowItem,
    //   checked: checked,
    // });
  }

  onSizeChange(e: number) {
    this.pager.pageSize = e;
    this.getList();
  }
  search() {

  }
  getUsers() {
    const _search = {
      lang: 'l',
       user_rcd: "",
      user_code: "",
      full_name: "",
       gender:"",
       date_of_birth:"",
       email:"",
       phone_number:"",
       address:"",
       user_name:"",
       pass_word:"",   
      user_note_e: "",
      user_note_l: "",
      department_rcd:"",
      role_rcd : 1,
      page: 1,
      pageSize: 1000,
    };
    this.user_select = [{id : '' , name : "Tất cả"}];
    this.api.post("api/manager/UserRef/Search", _search).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      a.data.forEach((v:any) => {
        let tmp = {
          id : v.user_rcd,
          name : v.full_name + '-' + v.user_name
        };
        this.user_select.push(tmp);
      })
    })
  }
  formatDateView(date:any, yearFirst:boolean) {
    if (date) {

      let arr_date_time = date.split('T');
      let  arr_date = arr_date_time[0].split('-');
      return arr_date[yearFirst ?2 : 0 ] + '/' + arr_date[1] + '/' + arr_date[yearFirst ? 0 :2] + " " + arr_date_time[1];
    }
    return "";
  }
  modelChange(value:any) {
    this._search.user_rcd = new MapToPipe().transform(value, 'id');
    this.getList();
  }
  everyRange(range: any) {
    return range.every((_:any) => !!_);
  }
  getValue(value:any) {
    this.getList();
    // console.log(value, this.dateRange);
    
  }

  convertDateToString(dateString:any) {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0 nên cần +1 và padStart để đảm bảo luôn 2 chữ số
    const day = String(dateObject.getDate()).padStart(2, '0'); // padStart để đảm bảo luôn 2 chữ số

    // Kết hợp thành chuỗi theo định dạng yyyy-mm-dd
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  reset() {
    this._search = {
      user_rcd: '',
      from_date: null,
      to_date: null,
    };
    this.pager.pageIndex = 1;
    this.getList();
  }

}
