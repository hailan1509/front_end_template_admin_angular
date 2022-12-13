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
exports.ReportCancellationProfileComponent = void 0;
var core_1 = require("@angular/core");
var ReportCancellationProfileComponent = /** @class */ (function () {
    function ReportCancellationProfileComponent(api) {
        this.api = api;
        this.basicDataSource = [];
        this._search = {
            cancellation_method: null,
            // return_date: null,
            staff_name: '',
            cancellation_minutes_number: null,
            status: -1
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
        this.miningFileStatusValue = {
            '--Tất cả--': null,
            'Chờ xét duyệt': 0,
            'Đã duyệt': 1,
            'Từ chối': 2
        };
        this.searchForm = {
            borderType: 'bordered',
            size: 'md',
            layout: 'auto'
        };
    }
    ReportCancellationProfileComponent.prototype.ngOnInit = function () {
        this.getList();
    };
    ReportCancellationProfileComponent.prototype.search = function () {
        this.getList();
    };
    ReportCancellationProfileComponent.prototype.getList = function () {
        var _this = this;
        var data = __assign(__assign({ page: this.pager.pageIndex, pageSize: this.pager.pageSize }, this._search), { status: this.miningFileStatusValue[this.miningFileStatus] });
        this.busy = this.api.post("api/Statistic/ReportCancellationMinutesSearch", data).subscribe(function (res) {
            var a = JSON.parse(JSON.stringify(res));
            console.log(a.data);
            _this.basicDataSource = a.data;
            _this.pager.total = a.totalItems;
        });
    };
    ReportCancellationProfileComponent.prototype.reset = function () {
        this.searchForm = {
            borderType: '',
            size: 'md',
            layout: 'auto'
        };
        this.pager.pageIndex = 1;
        this.getList();
    };
    ReportCancellationProfileComponent.prototype.onPageChange = function (e) {
        this.pager.pageIndex = e;
        this.getList();
    };
    ReportCancellationProfileComponent.prototype.onSizeChange = function (e) {
        this.pager.pageSize = e;
        this.getList();
    };
    ReportCancellationProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-report-cancellation-profile',
            templateUrl: './report-cancellation-profile.component.html',
            styleUrls: ['./report-cancellation-profile.component.scss']
        })
    ], ReportCancellationProfileComponent);
    return ReportCancellationProfileComponent;
}());
exports.ReportCancellationProfileComponent = ReportCancellationProfileComponent;
