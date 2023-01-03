import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-statistic-document',
  templateUrl: './statistic-document.component.html',
  styleUrls: ['./statistic-document.component.scss']
})
export class StatisticDocumentComponent implements OnInit {

  basicDataSource: any[] = [];

  _search: any = {
    document_number: null,
    document_name: null,
    profile_rcd: null,
    profile_code: null,
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

  byYearOption: any;
  byMonthOfYearOption: any;
  forDayOfMonthOption: any;

  chartOption: any = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Đã chỉnh lý', 'Đã hủy']
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
        name: 'Đã chỉnh lý',
        type: 'bar',
        barGap: 0,
        emphasis: {
          focus: 'series'
        },
        data: [320, 332, 301, 334, 390],

      },
      {
        name: 'Đã hủy',
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
    this.byYearChart();
  }

  search() {
    this.getList();
  }

  getList(year: any = null) {
    const data = {
      page: this.pager.pageIndex,
      pageSize: this.pager.pageSize,
      ...this._search,
    };
    this.api.post('api/manager/DocumentRef/Search', data).subscribe((res: any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.basicDataSource = a.data;
      this.pager.total = a.totalItems;
    });
  }

  byMonthOfYearChart(year: any) {
    if (!year|| !year.selectedDate) {
      return false;
    }
    let byMonthOfYearOption = JSON.parse(JSON.stringify(this.chartOption))
    this.busy = this.api.get("api/Statistic/ReportQuantityDocumentByMonthOfYear/" + year?.selectedDate?.getFullYear()).subscribe((res: any) => {
      let result = JSON.parse(res.data);

      byMonthOfYearOption.xAxis[0].data = result.map((item: any) => `Tháng ${item.month}`)
      byMonthOfYearOption.series[0].data = result.map((item: any) => item.number_of_edited)
      byMonthOfYearOption.series[1].data = result.map((item: any) => item.number_of_cancellation)

      console.log(byMonthOfYearOption)

      this.byMonthOfYearOption = byMonthOfYearOption;

    });

    return true;
  }

  forDayOfMonthChart(date: any) {
    if (!date|| !date.selectedDate) {
      return false;
    }
    let forDayOfMonthOption = JSON.parse(JSON.stringify(this.chartOption))
    this.busy = this.api.get(`api/Statistic/ReportQuantityDocumentForDayByMonthOfYear/${date?.selectedDate?.getFullYear()}/${date?.selectedDate?.getMonth() + 1}`).subscribe((res: any) => {
      let result = JSON.parse(res.data);

      forDayOfMonthOption.xAxis[0].data = result.map((item: any) => new Date(item.date).getDate())
      forDayOfMonthOption.series[0].data = result.map((item: any) => item.number_of_edited)
      forDayOfMonthOption.series[1].data = result.map((item: any) => item.number_of_cancellation)

      console.log(forDayOfMonthOption)

      this.forDayOfMonthOption = forDayOfMonthOption;

    });

    return true;
  }

  byYearChart() {
    let byYearOption :any =  JSON.parse(JSON.stringify(this.chartOption))

    this.busy = this.api.get("api/Statistic/ReportQuantityDocumentByYear").subscribe((res: any) => {
      let result = JSON.parse(res.data);

      byYearOption.xAxis[0].data = result.map((item: any) => item.year.toString())
      byYearOption.series[0].data = result.map((item: any) => item.number_of_edited)
      byYearOption.series[1].data = result.map((item: any) => item.number_of_cancellation)

      this.byYearOption = byYearOption;
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
