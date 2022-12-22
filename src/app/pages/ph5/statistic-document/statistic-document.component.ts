import { Component, OnInit } from '@angular/core';
import { TableWidthConfig } from 'ng-devui/data-table';
import { Subscription } from 'rxjs';

import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-statistic-document',
  templateUrl: './statistic-document.component.html',
  styleUrls: ['./statistic-document.component.scss']
})
export class StatisticDocumentComponent implements OnInit {

  basicDataSource: any[] = [];
  datepicker1: any;
  yearNow = new Date();
  year = 0;
  dataSourceArchivalProfile: any[] = [];
  profileData: any[] = [];



  ngOnInit(): void {
    this.year = this.yearNow.getFullYear();
    this.getList();
  }


  serviceData: any = {
    title: {
      text: "Thống kê số lượng tài liệu mỗi tháng",
      textStyle:{
        fontFamily: 'sans-serif'
      }
    },
    xAxis: {
      type: "category",
      data: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
      ],
    },
    yAxis: {},
    series: [{
      data: [120, 200, 150],
      type: "bar"
    }]
  };
  pieChart: any;
  getPieChart(e: any) {
    this.pieChart = e;
    console.log(e)
  }

    //year
    selectedDate1 = null;
    //  selectedDate2 = null;
    maxDate = new Date().setMonth(8);
    getValue(value: any) {
      if (value.selectedDate) {
        this.year = value.selectedDate.getFullYear();
        this.getList();
        //console.log(this.year);
      }
    }


  getList() {
    this.profileData = [];
    const data = {
      page: this.pager.pageIndex,
      pageSize: this.pager.pageSize,
      ...this._search,
    };
    this.api.post('api/Statistic/ReportDocumentRefSearch', data).subscribe((res: any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.dataSourceArchivalProfile = a.data;
      this.basicDataSource = this.dataSourceArchivalProfile;
      console.log(this.dataSourceArchivalProfile);
      let datax: Array<any> = new Array();
      // let datay: Array<any>=new Array;
      for (let i = 0; i < this.dataSourceArchivalProfile.length; i++) {
        let time: any;
        time = new Date(this.dataSourceArchivalProfile[i].created_date_time);
        let year1 = time.getFullYear();
        // console.log(year1);
        if (year1 == this.year) {
          let month = time.getMonth() + 1;
          if (this.profileData.length == 0) {
            this.profileData.unshift({ month: month, sum: 1 });
          } else {
            let check = true;
            for (let i = 0; i < this.profileData.length; i++) {
              if (this.profileData[i].month == month) {
                check = true;
                this.profileData[i].sum = this.profileData[i].sum + 1;
                break;
              } else {
                check = false;
              }
            }
            if (check == false) {
              this.profileData.unshift({ month: month, sum: 1 });
            }
          }
        } else {
          continue;
        }
      }

      for (let i = 1; i <= 12; i++) {
        for (let j = 0; j < this.profileData.length; j++) {
          if (this.profileData[j].month == i) {
            datax[i - 1] = this.profileData[j].sum;
            break;
          } else {
            if (j == this.profileData.length - 1) {
              datax[i - 1] = 0;
            } else {
              continue;
            }
          }
        }
      }
      // console.log(datax);

      this.serviceData.series[0].data = datax;

      // console.log(this.generality);

      this.pieChart.setOption(this.serviceData, true);
    });
    // this.busy = this.api.post("api/Statistic/ReportDocumentRefSearch", data).subscribe((res:any) => {
    //   let a = JSON.parse(JSON.stringify(res));
    //   this.basicDataSource = a.data;
    //   console.log(this.basicDataSource);
    // });
  }

  _search = {
    document_rcd: "",
    document_number: ""
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
  constructor(private api: ApiService) { }


  onPageChange(e: number) {
    this.pager.pageIndex = e;
    this.getList();
  }

  onSizeChange(e: number) {
    this.pager.pageSize = e;
    this.getList();
  }

}
