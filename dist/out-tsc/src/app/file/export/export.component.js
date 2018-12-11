"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var data_service_1 = require("src/app/data.service");
var ExportComponent = /** @class */ (function () {
    function ExportComponent(dataService) {
        this.dataService = dataService;
    }
    ExportComponent.prototype.export = function () {
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(this.dataService.export(this.campaigns));
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "og_planner_data.json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };
    __decorate([
        core_1.Input('campaigns'),
        __metadata("design:type", Array)
    ], ExportComponent.prototype, "campaigns", void 0);
    ExportComponent = __decorate([
        core_1.Component({
            selector: 'og-export',
            templateUrl: './export.component.html',
            styleUrls: ['./export.component.css']
        }),
        __metadata("design:paramtypes", [data_service_1.DataService])
    ], ExportComponent);
    return ExportComponent;
}());
exports.ExportComponent = ExportComponent;
//# sourceMappingURL=export.component.js.map