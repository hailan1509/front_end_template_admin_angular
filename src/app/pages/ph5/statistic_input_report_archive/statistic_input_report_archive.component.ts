import { Component, OnInit } from '@angular/core';
import { TableWidthConfig } from 'ng-devui/data-table';
import { Subscription } from 'rxjs';

import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-statistic_input_report_archive',
  templateUrl: './statistic_input_report_archive.component.html',
  styleUrls: ['./statistic_input_report_archive.component.scss']
})
export class StatisticInputReportArchiveComponent implements OnInit {
  basicDataSource: any[] = [];
  datepicker1: any;
  basicDataSource1:any[]=[];

  _search = {
    // borrowed_date: null,
    profile_number:null,
    profile_name:null,
    from_date: null,
    to_date: null,
    // mining_purpose: null,
    profile_rcd: "",
    status: 0
  };
  pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
  };

  miningFileStatus = '--Tất cả---';

  miningFileStatusOptions = [
    '--Tất cả---',
    'Chờ xét duyệt',
    'Đã duyệt',
    'Từ chối'
  ];


  // miningFileStatusValue: { [key: string]: any } = {
  //   '--Tất cả--': null,
  //   'Chờ xét duyệt': 0,
  //   'Đã duyệt': 1,
  //   'Từ chối': 2
  // };

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

  ngOnInit(): void {
    this.getList();
    this.getData();
  }

  search() {
    this.getList();
  }

  getList() {
    const data = {
      page: this.pager.pageIndex,
      pageSize: this.pager.pageSize,
      ...this._search
      //status: this.miningFileStatusValue[this.miningFileStatus]
    }

    this.busy = this.api.post("api/Statistic/StatisticProfileSearch", data).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.basicDataSource = a.data;
      console.log(a.data);
      this.pager.total = a.totalItems;
    });
  }

  reset() {
    this.searchForm = {
      borderType: '',
      size: 'md',
      layout: 'auto',
    };
    this.pager.pageIndex = 1;
    this.getList();
    this.getData();
  }

  onPageChange(e: number) {
    this.pager.pageIndex = e;
    this.getList();
  }

  onSizeChange(e: number) {
    this.pager.pageSize = e;
    this.getList();
  }



//biểu đồ

  getData() {
    const data = {
      page:0,
      pageSize: 0,
      ...this._search
    }
    this.busy = this.api.post("api/Statistic/StatisticProfileSearch", data).subscribe((res:any) => {
      let a = JSON.parse(JSON.stringify(res));
      this.basicDataSource1 = a.data;
      console.log(this.basicDataSource1);
      let datax: Array<any> = new Array();
      let datay: Array<any> = new Array();
      let data: Array<any> = new Array();

      for (let i = 0; i < this.basicDataSource1.length; i++) {
        let time: any;
        time = new Date(this.basicDataSource1[i].created_date_time);
        let year1 = time.getFullYear();
        if(data.length==0){
          data.unshift({year:year1,sum:1});
        }
        else{
          let check=true;
          for(let j=0;j<data.length;j++){
            if(data[j].year==year1){
              data[j].sum+=1;
              check=true;
              break;
            }
            else{
              check=false;
            }
          }
          if(!check){
            data.unshift({year:year1,sum:1});
        }        
      }
    }
      console.log(data);
      for(let i=0;i<data.length;i++){
        datax.unshift(data[i].year);
        datay.unshift(data[i].sum);
      }
      this.serviceData.series[0].data = datay;
      this.serviceData.xAxis.data=datax;

      this.pieChart.setOption(this.serviceData, true);
    });
  }
  serviceData: any = {
    xAxis: {
      type: "category",
      name: 'Năm',
      data: [],
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        type: 'bar',
        data: [],
        lineStyle:{
          width:20
        }
      }
    ]
  };

  pieChart: any;

  getPieChart(e: any) {
    this.pieChart = e;
    console.log(e)
  }


}
