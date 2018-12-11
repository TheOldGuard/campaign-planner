"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var ng_contenteditable_1 = require("ng-contenteditable");
var app_component_1 = require("./app.component");
var file_component_1 = require("./file/file.component");
var export_component_1 = require("./file/export/export.component");
var import_component_1 = require("./file/import/import.component");
var toggle_component_1 = require("./form/toggle/toggle.component");
var config_component_1 = require("./config/config.component");
var campaign_component_1 = require("./campaign/campaign.component");
var front_component_1 = require("./campaign/front/front.component");
var modal_component_1 = require("./modal/modal.component");
var danger_component_1 = require("./campaign/danger/danger.component");
var portent_component_1 = require("./campaign/danger/portent/portent.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                file_component_1.FileComponent,
                export_component_1.ExportComponent,
                import_component_1.ImportComponent,
                toggle_component_1.ToggleComponent,
                config_component_1.ConfigComponent,
                campaign_component_1.CampaignComponent,
                front_component_1.FrontComponent,
                modal_component_1.ModalComponent,
                danger_component_1.DangerComponent,
                portent_component_1.PortentComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                ng_contenteditable_1.ContenteditableModule
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map