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
var modal_service_1 = require("../modal/modal.service");
var ConfigComponent = /** @class */ (function () {
    function ConfigComponent(modalService) {
        this.modalService = modalService;
        this.emitAutosave = new core_1.EventEmitter();
        this.emitImport = new core_1.EventEmitter();
        this.emitSave = new core_1.EventEmitter();
        this.open = false;
    }
    ConfigComponent.prototype.toggle = function () {
        this.modalService.open('config-modal');
    };
    ConfigComponent.prototype.closeModal = function () {
        this.modalService.close('config-modal');
    };
    ConfigComponent.prototype.onAutosaveChange = function () {
        this.emitAutosave.emit(this.data.config.autosave);
    };
    ConfigComponent.prototype.onImport = function (campaigns) {
        this.emitImport.emit(campaigns);
        console.log('import caught in config', campaigns);
    };
    ConfigComponent.prototype.onSave = function () {
        this.emitSave.emit();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ConfigComponent.prototype, "data", void 0);
    __decorate([
        core_1.Output('autosave'),
        __metadata("design:type", core_1.EventEmitter)
    ], ConfigComponent.prototype, "emitAutosave", void 0);
    __decorate([
        core_1.Output('import'),
        __metadata("design:type", core_1.EventEmitter)
    ], ConfigComponent.prototype, "emitImport", void 0);
    __decorate([
        core_1.Output('save'),
        __metadata("design:type", core_1.EventEmitter)
    ], ConfigComponent.prototype, "emitSave", void 0);
    ConfigComponent = __decorate([
        core_1.Component({
            selector: 'og-config',
            templateUrl: './config.component.html',
            styleUrls: ['./config.component.scss']
        }),
        __metadata("design:paramtypes", [modal_service_1.ModalService])
    ], ConfigComponent);
    return ConfigComponent;
}());
exports.ConfigComponent = ConfigComponent;
//# sourceMappingURL=config.component.js.map