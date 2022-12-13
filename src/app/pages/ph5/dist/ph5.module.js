"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PH5Module = void 0;
var core_1 = require("@angular/core");
var ng_devui_1 = require("ng-devui");
var echarts_module_1 = require("src/app/@shared/components/echarts/echarts.module");
var ph5_routing_module_1 = require("./ph5-routing.module");
var ph5_component_1 = require("./ph5-component");
var shared_module_1 = require("src/app/@shared/shared.module");
var report_cancellation_profile_component_1 = require("./report-cancellation-profile/report-cancellation-profile.component");
var report_archival_profile_component_1 = require("./report-archival-profile/report-archival-profile.component");
var report_mining_file_component_1 = require("./report-mining-file/report-mining-file.component");
var report_profile_document_borrowed_component_1 = require("./report-profile-document-borrowed/report-profile-document-borrowed.component");
var statistic_document_component_1 = require("./statistic-document/statistic-document.component");
var statistic_input_report_archive_component_1 = require("./statistic_input_report_archive/statistic_input_report_archive.component");
var PH5Module = /** @class */ (function () {
    function PH5Module() {
    }
    PH5Module = __decorate([
        core_1.NgModule({
            declarations: [
                ph5_component_1.PH5Component,
                report_archival_profile_component_1.ReportArchivalProfileComponent,
                report_cancellation_profile_component_1.ReportCancellationProfileComponent,
                report_mining_file_component_1.ReportMiningFileComponent,
                report_profile_document_borrowed_component_1.ReportProfileDocumentBorrowedComponent,
                statistic_document_component_1.StatisticDocumentComponent,
                statistic_input_report_archive_component_1.StatisticInputReportArchiveComponent
            ],
            imports: [
                ng_devui_1.PaginationModule,
                ng_devui_1.TooltipModule,
                shared_module_1.SharedModule,
                ng_devui_1.DatepickerModule,
                ng_devui_1.InputNumberModule,
                echarts_module_1.EchartsModule,
                ph5_routing_module_1.PH5RoutingModule
            ]
        })
    ], PH5Module);
    return PH5Module;
}());
exports.PH5Module = PH5Module;
