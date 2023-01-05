import { Component, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';

import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-report-digitization',
  templateUrl: './report-digitization.component.html',
  styleUrls: ['./report-digitization.component.scss']
})
export class ReportDigitizationComponent implements OnInit {

  basicDataSource: any[] = [];

  _search: any = {
    profile_code: null,
    profile_name: null,
    status: null,
    year: null,
    archive_fonts_rcd: null,
    phong_rcd: null,
    is_digital_profile: null,
  };

  pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
  };

  isDigitalOptions: any[] = [
    {
      label: "Đã số hóa",
      value: true
    },
    {
      label: "Chưa số hóa",
      value: false
    },
  ]

  isDigitalCurrent: any;


  statusOptions: any[] = [
    {
      label: "Chờ chỉnh lý",
      value: 0
    },
    {
      label: "Đã chỉnh lý",
      value: 1
    },
    {
      label: "Chờ hủy",
      value: 2
    },
    {
      label: "Đã hủy",
      value: -1
    },
  ]

  year2: any;

  statusCurrent: any;

  archiveFontsOptions: any[] = [];

  archiveFontsCurrent: any;

  phongOptions: any[] = [];

  phongCurrent: any;

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

  byArchiveFontOption: any;
  byPhongOption: any;

  chartOption: any = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Đã số hóa', 'Chưa số hóa']
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
        name: 'Đã số hóa',
        type: 'bar',
        barGap: 0,
        emphasis: {
          focus: 'series'
        },
        data: [320, 332, 301, 334, 390],

      },
      {
        name: 'Chưa số hóa',
        type: 'bar',
        emphasis: {
          focus: 'series'
        },
        data: [220, 182, 191, 234, 290],
        color: 'rgb(238 102 102)',
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
    this.byArchiveFontChart();
    this.byPhongChart();
  }

  search() {
    this.getList();
  }

  getList(year: any = null) {
    const data = {
      page: this.pager.pageIndex,
      pageSize: this.pager.pageSize,
      ...this._search,
      status: this.statusCurrent?.value,
      year: year?.selectedDate?.getFullYear(),
      archive_font_rcd: this.archiveFontsCurrent?.value,
      phong_rcd: this.phongCurrent?.value,
      is_digital_profile: this.isDigitalCurrent?.value
    };

    this.busy = this.api.post('api/Statistic/ReportProfileSearch', data).subscribe((res: any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.basicDataSource = a.data;
      this.pager.total = a.totalItems;
    });
  }

  getOptions() {
    let arrayRequest = [];
    arrayRequest.push(this.api.get('api/manager/ProfileRef/GetListDropdownArchiveFonts'));
    arrayRequest.push(this.api.get('api/manager/ProfileRef/GetListDropdownPhongRef'));

    combineLatest(arrayRequest).subscribe((res: any[]) => {
      this.archiveFontsOptions = res[0].data
      this.phongOptions = res[1].data
    });
  }

  byArchiveFontChart() {
    let byArchiveFontOption :any =  JSON.parse(JSON.stringify(this.chartOption))

    this.busy = this.api.get("api/Statistic/ReportProfileDigitalByArchiveFont").subscribe((res: any) => {
      let result = JSON.parse(res.data);

      byArchiveFontOption.xAxis[0].data = result.map((item: any) => item.archive_fonts_name_l.toString())
      byArchiveFontOption.series[0].data = result.map((item: any) => item.number_of_is_digital)
      byArchiveFontOption.series[1].data = result.map((item: any) => item.number_of_is_not_digital)

      this.byArchiveFontOption = byArchiveFontOption;
    });
  }

  byPhongChart() {
    let byPhongOption :any =  JSON.parse(JSON.stringify(this.chartOption))

    this.busy = this.api.get("api/Statistic/ReportProfileDigitalByPhong").subscribe((res: any) => {
      let result = JSON.parse(res.data);

      byPhongOption.xAxis[0].data = result.map((item: any) => item.phong_name_l.toString())
      byPhongOption.series[0].data = result.map((item: any) => item.number_of_is_digital)
      byPhongOption.series[1].data = result.map((item: any) => item.number_of_is_not_digital)

      this.byPhongOption = byPhongOption;
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
