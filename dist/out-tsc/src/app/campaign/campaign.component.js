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
var campaign_model_1 = require("../models/campaign.model");
var front_model_1 = require("../models/front.model");
var danger_model_1 = require("../models/danger.model");
var CampaignComponent = /** @class */ (function () {
    function CampaignComponent() {
        this.currentTab = 'fronts';
        this.isEditing = false;
    }
    CampaignComponent.prototype.selectTab = function (newTab) {
        this.currentTab = newTab;
    };
    CampaignComponent.prototype.onFieldFocus = function (field) {
        if (this.isDefault(field)) {
            this.campaign[field] = '';
        }
    };
    CampaignComponent.prototype.onFieldBlur = function (field) {
        if (!this.campaign[field]) {
            this.campaign[field] = campaign_model_1.Campaign.defaults()[field];
        }
    };
    CampaignComponent.prototype.isDefault = function (field) {
        return campaign_model_1.Campaign.defaults()[field] === this.campaign[field];
    };
    CampaignComponent.prototype.newFront = function () {
        var front = new front_model_1.Front();
        this.campaign.fronts.push(front);
    };
    CampaignComponent.prototype.newDanger = function () {
        var danger = new danger_model_1.Danger();
        this.campaign.dangers.push(danger);
    };
    CampaignComponent.prototype.toggleEditing = function () {
        this.isEditing = !this.isEditing;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CampaignComponent.prototype, "campaign", void 0);
    CampaignComponent = __decorate([
        core_1.Component({
            selector: 'og-campaign',
            templateUrl: './campaign.component.html',
            styleUrls: ['./campaign.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], CampaignComponent);
    return CampaignComponent;
}());
exports.CampaignComponent = CampaignComponent;
//# sourceMappingURL=campaign.component.js.map