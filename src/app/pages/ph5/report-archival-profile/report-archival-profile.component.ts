import { Component, OnInit } from '@angular/core';
import { TableWidthConfig } from 'ng-devui/data-table';
import { Subscription } from 'rxjs';

import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-report-archival-profile',
  templateUrl: './report-archival-profile.component.html',
  styleUrls: ['./report-archival-profile.component.scss']
})
export class ReportArchivalProfileComponent implements OnInit {
  basicDataSource: any[] = [];
  datepicker1: any;


  serviceData: any = {
    xAxis: {
      type: "category",
      data: []
    },
    yAxis: {},
    series: [{
      data: [],
      type: "line"
    }]
  };
  pieChart: any;
  getPieChart(e: any) {
    this.pieChart = e;
    console.log(e)
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
      console.log(this.basicDataSource);

      let datax: Array<any>=new Array;
      let timeList: Array<any>=new Array;
      let datay: Array<any>=new Array;
      for(let i=0;i<this.basicDataSource.length;i++){
        let time:any;
        if(this.basicDataSource[i].from_date==null){
          // time= new Date(new Date());
          continue;
        }
        else{
          time= new Date(this.basicDataSource[i].from_date);
        }
        let year=time.getFullYear();
        let month=time.getMonth()+1;
        let day=time.getDate();
        let newTime=day+"/"+month+"/"+year;

        if(timeList.length==0){
            // sumlist.unshift(sum);
            timeList.unshift({timeItem:newTime,sum:1});
          }
          else{
            // debugger
            let check=true;
            for(let j=0;j<timeList.length;j++){
              console.log(timeList[j].timeItem==newTime);
              if(timeList[j].timeItem==newTime){
                check=true;
                timeList[j].sum=timeList[j].sum+1;
                break;
              }
              else{
                check=false;
              }
            }
            if(check==false){
              timeList.unshift({timeItem:newTime,sum:1});
            }
          }

        // console.log(timeList);
      }
      console.log(timeList);
      for(let i =0; i<timeList.length;i++){
        datay.unshift(timeList[i].sum);
        datax.unshift(timeList[i].timeItem);
      }

      console.log(datay);
      this.serviceData.xAxis.data=datax;
      this.serviceData.series[0].data=datay;

      this.pager.total = a.totalItems;
      this.pieChart.setOption(this.serviceData, true);
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
    this.getList()
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
