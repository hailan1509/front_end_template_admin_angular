import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DialogService, FormLayout, TableWidthConfig, DataTableComponent } from 'ng-devui';
import { ApiService } from 'src/app/api.service';
import { Subscription } from 'rxjs';
import { Item, Users } from 'src/app/@core/data/listData';
import { ListDataService } from 'src/app/@core/mock/list-data.service';
import { FormConfig } from 'src/app/@shared/components/admin-form';

@Component({
  selector: 'app-profile-permission',
  templateUrl: './profile-permission.component.html',
  styleUrls: ['./profile-permission.component.scss']
})
export class ProfilePermissionComponent implements OnInit {

  constructor(private listDataService: ListDataService, private dialogService: DialogService, private cdr: ChangeDetectorRef,private api: ApiService ) {}
  options = ['normal', 'borderless', 'bordered'];

  sizeOptions = ['sm', 'md', 'lg'];

  layoutOptions = ['auto', 'fixed'];
  searchForm: {
    borderType: '' | 'borderless' | 'bordered';
    size: 'sm' | 'md' | 'lg';
    layout: 'auto' | 'fixed';
  } = {
    borderType: 'bordered',
    size: 'md',
    layout: 'auto',
  };
  lstDepartment : any;
  @ViewChild(DataTableComponent, { static: true })
  datatable: DataTableComponent;
  deleteList: Item[] = [];

  dataTableOptions = {
    columns: [
      {
        field: 'full_name',
        header: 'Tên người dùng',
      },
      {
        field: 'gender',
        header: 'Giới tính',
      },
      {
        field: 'date_of_birth',
        header: 'Ngày sinh',
      },
      {
        field: 'phone_number',
        header: 'Số điện thoại',
      },
      {
        field: 'user_name',
        header: 'Tên đăng nhập',
      },
      {
        field: 'role_name_l',
        header: 'Quyền',
      }
    ]
  };

  tableWidthConfig: TableWidthConfig[] = [
    {
      field: 'checkbox',
      width: '30px',
    },
    {
      field: 'user_rcd',
      width: '150px',
    },
    {
      field: 'user_code',
      width: '150px',
    },
    {
      field: 'full_name',
      width: '150px',
    },
    {
      field: 'gender',
      width: '50px',
    },
    {
      field: 'date_of_birth',
      width: '100px',
    },
    {
      field: 'email',
      width: '100px',
    },
    {
      field: 'phone_number',
      width: '100px',
    },
    {
      field: 'address',
      width: '100px',
    },
    {
      field: 'user_name',
      width: '100px',
    },
    {
      field: 'user_note_e',
      width: '100px',
    },
    {
      field: 'user_note_l',
      width: '100px',
    },
    {
      field: 'role_name_l',
      width: '100px',
    },
  ];

  basicDataSource: Users[] = [];

  formConfig: FormConfig = {
    layout: FormLayout.Horizontal,
    items: [
      
    ],
    labelSize: '',
  };

  pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 5,
  };

  _search = {
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
  };

  busy: Subscription;

  ngOnInit(): void {
    this.api.post("api/manager/RoleRef/Search",{page : 1 , pageSize: 50 , role_name_l : ""}).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      let rs = a.data.map((x:any) => {
        return { id : parseInt(x.role_rcd) , name : x.role_name_l};
      });
      this.getList();
    });
  }
  search() {
    this.getList();
  }

  onResize({ width }: { width: string }, field: string) {
    const index = this.tableWidthConfig.findIndex((config) => {
      return config.field === field;
    });
    if (index > -1) {
      this.tableWidthConfig[index].width = width + 'px';
    }
  }

  onRowCheckChange(checked: boolean, rowIndex: number, nestedIndex: string, rowItem: any) {
    rowItem.$checked = checked;
    rowItem.$halfChecked = false;
    this.datatable.setRowCheckStatus({
      rowIndex: rowIndex,
      nestedIndex: nestedIndex,
      rowItem: rowItem,
      checked: checked,
    });
    this.deleteList = this.datatable.getCheckedRows();
  }

  getList() {
    const searchBody = {
      page: this.pager.pageIndex,
      pageSize: this.pager.pageSize,
      ...this._search
    }

    this.api.post("api/manager/UserRef/Search", searchBody).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      console.log(a.data);
      this.basicDataSource = a.data.filter((x: any) => x.role_rcd != 2);
      this.pager.total = a.totalItems;
    });
  }

  onPageChange(e: number) {
    this.pager.pageIndex = e;
    this.getList();
  }

  onSizeChange(e: number) {
    this.pager.pageSize = e;
    this.getList();
  }

  reset() {
    this.searchForm = {
      borderType: '',
      size: 'md',
      layout: 'auto',
    };
    this.pager.pageIndex = 1;
    this.getList();
  }

  onClick(event: any): void {

  }

}
