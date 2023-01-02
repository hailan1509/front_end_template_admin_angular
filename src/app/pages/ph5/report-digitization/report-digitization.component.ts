import { Component, OnInit } from '@angular/core';
import { TableWidthConfig } from 'ng-devui/data-table';
import { Subscription } from 'rxjs';

import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-report-digitization',
  templateUrl: './report-digitization.component.html',
  styleUrls: ['./report-digitization.component.scss']
})
export class ReportDigitizationComponent implements OnInit {
  basicDataSource: any[] = [];
  basicDataSource1: any[] = [];
  datepicker1: any;


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
      this.pager.total = a.totalItems;
    });
  }


  _search = {
    // borrowed_date: null,
    profile_number:null,
    profile_name:null,
    from_date: null,
    to_date: null,
    // mining_purpose: null,
    profile_rcd: "",
    status: 1
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
      page: 0,
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
      let data1: Array<any> = new Array();

      for (let i = 0; i < this.basicDataSource1.length; i++) {
        let time: any;
        time = new Date(this.basicDataSource1[i].created_date_time);
        let year1 = time.getFullYear();
        if(data.length==0){
          data.unshift({year:year1,sum:1,font:this.basicDataSource1[i].archive_fonts_name});
        }
        else{
          let check=false;
          for(let j=0;j<data.length;j++){
            if(data[j].year==year1){
              data[j].sum+=1;
              check=false;
              break;
            }
            else{
              check=true;
              continue;
            }
          }
          if(check){
            data.unshift({year:year1,sum:1,font:this.basicDataSource1[i].archive_fonts_name});
          }        
      }
    }
      // console.log(data);
      for(let i=0;i<data.length;i++){
        if(data1.length==0){
          data1.unshift({font:data[i].font,sum:data[i].sum});
        }
        else{
          let check=true;
          for(let j=0;j<data1.length;j++){
            if(data1[j].font==data[i].font){
              data1[j].sum+=data[i].sum;
              check=true;
              break;
            }else{
              check=false;
            }
          }
          if(check==false){
            data1.unshift({font:data[i].font,sum:data[i].sum});
          }
        }
      }

      for(let i=0;i<data1.length;i++){
        datax.unshift(data1[i].font);
        datay.unshift(data1[i].sum);
      }

      // console.log(datax);
      // console.log(datay);
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
