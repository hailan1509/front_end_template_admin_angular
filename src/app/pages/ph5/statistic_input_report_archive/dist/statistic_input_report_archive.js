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
exports.StatisticInputReportArchiveComponent = void 0;
var core_1 = require("@angular/core");
var StatisticInputReportArchiveComponent = /** @class */ (function () {
    function StatisticInputReportArchiveComponent(api) {
        this.api = api;
        this.basicDataSource = [];
        this.serviceData = {
            tooltip: {
                trigger: 'axis',
                confine: true
            },
            legend: {
                type: 'scroll',
                show: false,
                orient: 'horizontal',
                top: '6%',
                right: '6%',
                icon: 'circle',
                itemWidth: 13,
                itemHeight: 6,
                itemGap: 13,
                textStyle: {
                    fontSize: 14,
                    color: '#E5E5E5'
                }
            },
            xAxis: {
                type: "category",
                data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
            },
            yAxis: {
                type: "value"
            },
            series: [
                {
                    type: 'bar',
                    data: [23, 24, 18, 25, 27, 28, 25]
                },
                {
                    type: 'bar',
                    data: [26, 24, 18, 22, 23, 20, 27]
                },
                {
                    type: 'bar',
                    data: [26, 24, 18, 22, 23, 20, 27]
                },
                {
                    type: 'bar',
                    data: [26, 24, 18, 22, 23, 20, 27]
                }
            ]
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
    StatisticInputReportArchiveComponent.prototype.ngOnInit = function () {
        this.getList();
    };
    StatisticInputReportArchiveComponent.prototype.search = function () {
        this.getList();
    };
    StatisticInputReportArchiveComponent.prototype.getList = function () {
        var _this = this;
        var data = __assign({ page: this.pager.pageIndex, pageSize: this.pager.pageSize }, this._search
        //status: this.miningFileStatusValue[this.miningFileStatus]
        );
        this.busy = this.api.post("api/Statistic/StatisticProfileSearch", data).subscribe(function (res) {
            var a = JSON.parse(JSON.stringify(res));
            _this.basicDataSource = a.data;
            console.log(a.data);
            _this.pager.total = a.totalItems;
        });
    };
    StatisticInputReportArchiveComponent.prototype.reset = function () {
        this.searchForm = {
            borderType: '',
            size: 'md',
            layout: 'auto'
        };
        this.pager.pageIndex = 1;
        this.getList();
    };
    StatisticInputReportArchiveComponent.prototype.onPageChange = function (e) {
        this.pager.pageIndex = e;
        this.getList();
    };
    StatisticInputReportArchiveComponent.prototype.onSizeChange = function (e) {
        this.pager.pageSize = e;
        this.getList();
    };
    StatisticInputReportArchiveComponent = __decorate([
        core_1.Component({
            selector: 'app-statistic_input_report_archive',
            templateUrl: './statistic_input_report_archive.component.html',
            styleUrls: ['./statistic_input_report_archive.scss']
        })
    ], StatisticInputReportArchiveComponent);
    return StatisticInputReportArchiveComponent;
}());
exports.StatisticInputReportArchiveComponent = StatisticInputReportArchiveComponent;
