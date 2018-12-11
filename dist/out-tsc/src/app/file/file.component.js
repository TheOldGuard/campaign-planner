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
var FileComponent = /** @class */ (function () {
    function FileComponent() {
        this.emitter = new core_1.EventEmitter();
        this.saveEmitter = new core_1.EventEmitter();
    }
    FileComponent.prototype.onImport = function (data) {
        this.emitter.emit(data);
    };
    FileComponent.prototype.emitSave = function () {
        this.saveEmitter.emit();
    };
    FileComponent.prototype.ngOnInit = function () {
    };
    FileComponent.prototype.ngOnDestroy = function () {
    };
    __decorate([
        core_1.Input('campaigns'),
        __metadata("design:type", Array)
    ], FileComponent.prototype, "campaigns", void 0);
    __decorate([
        core_1.Output('import'),
        __metadata("design:type", core_1.EventEmitter)
    ], FileComponent.prototype, "emitter", void 0);
    __decorate([
        core_1.Output('save'),
        __metadata("design:type", core_1.EventEmitter)
    ], FileComponent.prototype, "saveEmitter", void 0);
    FileComponent = __decorate([
        core_1.Component({
            selector: 'og-file',
            templateUrl: './file.component.html',
            styleUrls: ['./file.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], FileComponent);
    return FileComponent;
}());
exports.FileComponent = FileComponent;
//# sourceMappingURL=file.component.js.map