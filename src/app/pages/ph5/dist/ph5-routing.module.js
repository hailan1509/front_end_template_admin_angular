"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PH5RoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var ph5_component_1 = require("./ph5-component");
var report_mining_file_component_1 = require("./report-mining-file/report-mining-file.component");
var report_cancellation_profile_component_1 = require("./report-cancellation-profile/report-cancellation-profile.component");
var report_archival_profile_component_1 = require("./report-archival-profile/report-archival-profile.component");
var statistic_document_component_1 = require("./statistic-document/statistic-document.component");
var report_profile_document_borrowed_component_1 = require("./report-profile-document-borrowed/report-profile-document-borrowed.component");
var statistic_input_report_archive_component_1 = require("./statistic_input_report_archive/statistic_input_report_archive.component");
var statistic_quantity_profile_for_year_component_1 = require("./statistic-quantity-profile-for-year/statistic-quantity-profile-for-year.component");
var report_data_alter_component_1 = require("./report-data-alter/report-data-alter.component");
var routes = [
    {
        path: '',
        component: ph5_component_1.PH5Component,
        children: [
            { path: 'bchslt', component: report_archival_profile_component_1.ReportArchivalProfileComponent },
            { path: 'bchsh', component: report_cancellation_profile_component_1.ReportCancellationProfileComponent },
            { path: 'bcpkt', component: report_mining_file_component_1.ReportMiningFileComponent },
            { path: 'bchstldm', component: report_profile_document_borrowed_component_1.ReportProfileDocumentBorrowedComponent },
            { path: 'tksltltn', component: statistic_document_component_1.StatisticDocumentComponent },
            { path: 'tkhsdvlt', component: statistic_input_report_archive_component_1.StatisticInputReportArchiveComponent },
            { path: 'tkslhstn', component: statistic_quantity_profile_for_year_component_1.StatisticQuantityProfileForYearComponent },
            { path: 'bcdlskdn', component: report_data_alter_component_1.DataAlterComponent },
        ]
    }
];
var PH5RoutingModule = /** @class */ (function () {
    function PH5RoutingModule() {
    }
    PH5RoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], PH5RoutingModule);
    return PH5RoutingModule;
}());
exports.PH5RoutingModule = PH5RoutingModule;
