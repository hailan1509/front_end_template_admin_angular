"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ReportArchivalProfileComponent = void 0;
var core_1 = require("@angular/core");
var ReportArchivalProfileComponent = /** @class */ (function () {
    function ReportArchivalProfileComponent(api) {
        this.api = api;
        this.basicDataSource = [];
        this.serviceData = {
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
        this._search = {
            // borrowed_date: null,
            profile_number: null,
            profile_name: null,
            from_date: null,
            to_date: null,
            // mining_purpose: null,
            profile_rcd: "",
            status: 1
        };
        this.pager = {
            total: 0,
            pageIndex: 1,
            pageSize: 10
        };
        this.miningFileStatus = '--Tất cả---';
        this.miningFileStatusOptions = [
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
        this.searchForm = {
            borderType: 'bordered',
            size: 'md',
            layout: 'auto'
        };
    }
    ReportArchivalProfileComponent.prototype.getPieChart = function (e) {
        this.pieChart = e;
        console.log(e);
    };
    ReportArchivalProfileComponent.prototype.getList = function () {
        var _this = this;
        var data = __assign({ page: this.pager.pageIndex, pageSize: this.pager.pageSize }, this._search
        //status: this.miningFileStatusValue[this.miningFileStatus]
        );
        this.busy = this.api.post("api/Statistic/StatisticProfileSearch", data).subscribe(function (res) {
            var a = JSON.parse(JSON.stringify(res));
            _this.basicDataSource = a.data;
            console.log(_this.basicDataSource);
            var datax = new Array;
            var timeList = new Array;
            var datay = new Array;
            for (var i = 0; i < _this.basicDataSource.length; i++) {
                var time = void 0;
                if (_this.basicDataSource[i].from_date == null) {
                    // time= new Date(new Date());
                    continue;
                }
                else {
                    time = new Date(_this.basicDataSource[i].from_date);
                }
                var year = time.getFullYear();
                var month = time.getMonth() + 1;
                var day = time.getDate();
                var newTime = day + "/" + month + "/" + year;
                if (timeList.length == 0) {
                    // sumlist.unshift(sum);
                    timeList.unshift({ timeItem: newTime, sum: 1 });
                }
                else {
                    // debugger
                    var check = true;
                    for (var j = 0; j < timeList.length; j++) {
                        console.log(timeList[j].timeItem == newTime);
                        if (timeList[j].timeItem == newTime) {
                            check = true;
                            timeList[j].sum = timeList[j].sum + 1;
                            break;
                        }
                        else {
                            check = false;
                        }
                    }
                    if (check == false) {
                        timeList.unshift({ timeItem: newTime, sum: 1 });
                    }
                }
                // console.log(timeList);
            }
            console.log(timeList);
            for (var i = 0; i < timeList.length; i++) {
                datay.unshift(timeList[i].sum);
                datax.unshift(timeList[i].timeItem);
            }
            console.log(datay);
            _this.serviceData.xAxis.data = datax;
            _this.serviceData.series[0].data = datay;
            _this.pager.total = a.totalItems;
            _this.pieChart.setOption(_this.serviceData, true);
        });
    };
    ReportArchivalProfileComponent.prototype.ngOnInit = function () {
        this.getList();
    };
    ReportArchivalProfileComponent.prototype.search = function () {
        this.getList();
    };
    ReportArchivalProfileComponent.prototype.reset = function () {
        this.searchForm = {
            borderType: '',
            size: 'md',
            layout: 'auto'
        };
        this.pager.pageIndex = 1;
        this.getList();
    };
    ReportArchivalProfileComponent.prototype.onPageChange = function (e) {
        this.pager.pageIndex = e;
        this.getList();
    };
    ReportArchivalProfileComponent.prototype.onSizeChange = function (e) {
        this.pager.pageSize = e;
        this.getList();
    };
    ReportArchivalProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-report-archival-profile',
            templateUrl: './report-archival-profile.component.html',
            styleUrls: ['./report-archival-profile.component.scss']
        })
    ], ReportArchivalProfileComponent);
    return ReportArchivalProfileComponent;
}());
exports.ReportArchivalProfileComponent = ReportArchivalProfileComponent;
