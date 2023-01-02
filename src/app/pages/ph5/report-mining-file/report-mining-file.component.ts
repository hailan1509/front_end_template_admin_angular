import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-report-mining-file',
  templateUrl: './report-mining-file.component.html',
  styleUrls: ['./report-mining-file.component.scss']
})
export class ReportMiningFileComponent implements OnInit {

  basicDataSource: any[] = [];

  _search = {
    borrowed_date: null,
    return_date: null,
    staff_name: '',
    mining_purpose: null,
    status: null
  };

  pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
  };

  miningFileStatus = '--Tất cả--';

  miningFileStatusOptions = [
    '--Tất cả--',
    'Chờ xét duyệt',
    'Đã duyệt',
    'Từ chối'
  ];

  miningFileStatusValue: { [key: string]: any } = {
    '--Tất cả--': null,
    'Chờ xét duyệt': 0,
    'Đã duyệt': 1,
    'Từ chối': 2
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

  miningFileByYearOption: any;
  miningFileForMonthOfYearOption: any;
  miningFileForDayOfMonthOption: any;

  chartOption: any = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Đã duyệt', 'Từ chối']
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
        name: 'Đã duyệt',
        type: 'bar',
        barGap: 0,
        emphasis: {
          focus: 'series'
        },
        data: [320, 332, 301, 334, 390],

      },
      {
        name: 'Từ chối',
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
    this.miningFileByYearChart();
  }

  search() {
    this.getList();
  }

  getList() {
    const data = {
      page: this.pager.pageIndex,
      pageSize: this.pager.pageSize,
      ...this._search,
      status: this.miningFileStatusValue[this.miningFileStatus]
    }

    this.busy = this.api.post("api/Statistic/ReportMiningFileSearch", data).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.basicDataSource = a.data;
      this.pager.total = a.totalItems;
    });
  }

  getMiningFileForMonthOfYear(year: any) {
    if (!year|| !year.selectedDate) {
      return false;
    }
    let miningFileForMonthOfYearOption = JSON.parse(JSON.stringify(this.chartOption))
    this.busy = this.api.get("api/Statistic/ReportMiningFileByMonthOfYear/" + year?.selectedDate?.getFullYear()).subscribe((res: any) => {
      let result = JSON.parse(res.data);

      miningFileForMonthOfYearOption.xAxis[0].data = result.map((item: any) => `Tháng ${item.month}`)
      miningFileForMonthOfYearOption.series[0].data = result.map((item: any) => item.number_of_accept)
      miningFileForMonthOfYearOption.series[1].data = result.map((item: any) => item.number_of_refuse)

      console.log(miningFileForMonthOfYearOption)

      this.miningFileForMonthOfYearOption = miningFileForMonthOfYearOption;

    });

    return true;
  }

  getMiningFileForDayOfMonthOption(date: any) {
    if (!date|| !date.selectedDate) {
      return false;
    }
    let miningFileForDayOfMonthOption = JSON.parse(JSON.stringify(this.chartOption))
    this.busy = this.api.get(`api/Statistic/ReportMiningFileByMonthOfYear/${date?.selectedDate?.getFullYear()}/${date?.selectedDate?.getMonth() + 1}`).subscribe((res: any) => {
      let result = JSON.parse(res.data);

      miningFileForDayOfMonthOption.xAxis[0].data = result.map((item: any) => new Date(item.date).getDate())
      miningFileForDayOfMonthOption.series[0].data = result.map((item: any) => item.number_of_accept)
      miningFileForDayOfMonthOption.series[1].data = result.map((item: any) => item.number_of_refuse)

      console.log(miningFileForDayOfMonthOption)

      this.miningFileForDayOfMonthOption = miningFileForDayOfMonthOption;

    });

    return true;
  }

  miningFileByYearChart() {
    let miningFileByYearOption :any =  JSON.parse(JSON.stringify(this.chartOption))

    this.busy = this.api.get("api/Statistic/ReportMiningFileByYear").subscribe((res: any) => {
      let result = JSON.parse(res.data);

      miningFileByYearOption.xAxis[0].data = result.map((item: any) => item.year.toString())
      miningFileByYearOption.series[0].data = result.map((item: any) => item.number_of_accept)
      miningFileByYearOption.series[1].data = result.map((item: any) => item.number_of_refuse)

      this.miningFileByYearOption = miningFileByYearOption;
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
