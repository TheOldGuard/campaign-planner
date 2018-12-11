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
var data_service_1 = require("./data.service");
var campaign_model_1 = require("./models/campaign.model");
var modal_service_1 = require("./modal/modal.service");
var AppComponent = /** @class */ (function () {
    function AppComponent(dataService, modalService) {
        this.dataService = dataService;
        this.modalService = modalService;
        this.title = 'app';
        this.data = {
            campaigns: [],
            config: {
                autosave: false
            }
        };
        this.data.campaigns = this.dataService.load();
        this.data.config.autosave = this.dataService.getValue('autosave');
    }
    AppComponent.prototype.selectCampaign = function (campaign) {
        this.selectedCampaign = campaign;
    };
    AppComponent.prototype.addCampaign = function () {
        var c = new campaign_model_1.Campaign();
        this.data.campaigns.push(c);
    };
    AppComponent.prototype.onImport = function (campaigns) {
        this.data.campaigns = campaigns;
        console.log(campaigns);
    };
    AppComponent.prototype.onSave = function () {
        this.dataService.save(this.data.campaigns);
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.interval = window.setInterval(function () {
            if (_this.data.config.autosave) {
                _this.dataService.save(_this.data.campaigns);
            }
        }, 30000);
    };
    AppComponent.prototype.onAutosaveChange = function () {
        this.dataService.setValue('autosave', this.data.config.autosave);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        }),
        __metadata("design:paramtypes", [data_service_1.DataService, modal_service_1.ModalService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map