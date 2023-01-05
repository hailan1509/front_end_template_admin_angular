import { Component, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';

import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-report-document-in-profile-type',
  templateUrl: './report-document-in-profile-type.component.html',
  styleUrls: ['./report-document-in-profile-type.component.scss']
})
export class ReportDocumentInProfileTypeComponent implements OnInit {

  basicDataSource: any[] = [];

  _search: any = {
    document_number: null,
    document_name: null,
    profile_rcd: null,
    profile_code: null,
    profile_type_rcd: null,
  };

  pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
  };

  searchForm: {
    borderType: '' | 'borderless' | 'bordered';
    size: 'sm' | 'md' | 'lg';
    layout: 'auto' | 'fixed';
  } = {
      borderType: 'bordered',
      size: 'md',
      layout: 'auto',
    };

  busy: Subscription;

  profileTypeOptions: any[] = [];
  profileTypeCurrent: any;

  byProfileTypeOption: any;
  chartOption: any = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Số hồ sơ']
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar', 'stack'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['2012', '2013', '2014', '2015', '2016']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Số hồ sơ',
        type: 'bar',
        barGap: 0,
        emphasis: {
          focus: 'series'
        },
        data: [320, 332, 301, 334, 390],

      },
    ]
  };

  year: any = {
    selectedDate: new Date()
  };

  date: any = {
    selectedDate: new Date()
  };

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getList();
    this.getOptions();
    this.byProfileTypeChart();
  }

  search() {
    this.getList();
  }

  getList(year: any = null) {
    const data = {
      page: this.pager.pageIndex,
      pageSize: this.pager.pageSize,
      ...this._search,
      profile_type_rcd: this.profileTypeCurrent?.value
    };
    this.api.post('api/manager/DocumentRef/Search', data).subscribe((res: any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.basicDataSource = a.data;
      this.pager.total = a.totalItems;
    });
  }

  getOptions() {
    let arrayRequest = [];
    arrayRequest.push(this.api.get('api/manager/ProfileRef/GetListDropdownProfileType'));

    combineLatest(arrayRequest).subscribe((res: any[]) => {
      this.profileTypeOptions = res[0].data
    });
  }

  byProfileTypeChart() {
    let byProfileTypeOption :any =  JSON.parse(JSON.stringify(this.chartOption))

    this.busy = this.api.get("api/Statistic/ReportDocumentByProfileType").subscribe((res: any) => {
      let result = JSON.parse(res.data);

      byProfileTypeOption.xAxis[0].data = result.map((item: any) => item.profile_type_name_l)
      byProfileTypeOption.series[0].data = result.map((item: any) => item.number_of_document)

      this.byProfileTypeOption = byProfileTypeOption;
    });
  }

  reset() {
    this.searchForm = {
      borderType: 'bordered',
      size: 'md',
      layout: 'auto',
    };
    this.pager.pageIndex = 1;
    this.getList();
  }

  onPageChange(e: number) {
    this.pager.pageIndex = e;
    this.getList();
  }

  onSizeChange(e: number) {
    this.pager.pageSize = e;
    this.getList();
  }

}
